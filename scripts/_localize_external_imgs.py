import os, re, shutil, hashlib, urllib.request, ssl, datetime, sys
from urllib.parse import urlparse

REPO = r'D:\my-docusaurus-site'
DOCS = os.path.join(REPO, 'docs')
DEST = os.path.join(REPO, 'static', 'img', 'remote')
REL_PREFIX = '/img/remote/'
IMG_EXT = {'.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp', '.ico'}

md_img = re.compile(r'!\[[^\]]*\]\((https?://[^)\s]+)\)')
html_img = re.compile(r'<img[^>]+src=["\'](https?://[^"\']+)["\']', re.I)

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def is_img_url(u):
    path = u.split('?')[0].split('#')[0].lower()
    return os.path.splitext(path)[1] in IMG_EXT

def sanitize(url):
    p = url.split('?')[0].split('#')[0]
    name, ext = os.path.splitext(os.path.basename(p))
    if not ext:
        ext = '.png'
    h = hashlib.sha1(url.encode()).hexdigest()[:10]
    clean = re.sub(r'[^a-zA-Z0-9._-]', '_', name)[:60]
    return f'{h}_{clean}{ext}'

def download(url, path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=25, context=ctx) as r:
        data = r.read()
    with open(path, 'wb') as f:
        f.write(data)
    return len(data)

def main():
    dry = '--dry' in sys.argv
    # 1) 扫描全站外链图片
    files_urls = {}
    for dp, _, fn in os.walk(DOCS):
        for f in fn:
            if f.endswith(('.md', '.mdx')):
                p = os.path.join(dp, f)
                t = open(p, encoding='utf-8', errors='ignore').read()
                urls = set(md_img.findall(t)) | set(html_img.findall(t))
                img_urls = {u for u in urls if is_img_url(u)}
                if img_urls:
                    files_urls[p] = img_urls
    all_urls = set()
    for s in files_urls.values():
        all_urls |= s
    print(f'[扫描] 外链图片 URL 去重后: {len(all_urls)}，涉及 md 文件: {len(files_urls)}')
    hosts = {}
    for u in all_urls:
        h = urlparse(u).netloc
        hosts[h] = hosts.get(h, 0) + 1
    for h, c in sorted(hosts.items(), key=lambda x: -x[1]):
        print(f'   {h}: {c}')

    if dry:
        print('[dry] 仅扫描，未下载/改写。')
        return

    os.makedirs(DEST, exist_ok=True)
    # 2) 下载
    url_map = {}      # url -> local rel path
    failed = []
    total_bytes = 0
    for u in sorted(all_urls):
        fn = sanitize(u)
        dst = os.path.join(DEST, fn)
        if os.path.exists(dst):
            url_map[u] = REL_PREFIX + fn
            continue
        try:
            n = download(u, dst)
            total_bytes += n
            url_map[u] = REL_PREFIX + fn
        except Exception as e:
            failed.append((u, str(e)[:80]))
    print(f'[下载] 成功 {len(url_map)}/{len(all_urls)}，失败 {len(failed)}，本地共 {total_bytes/1024/1024:.2f} MB')

    # 3) 改写（先备份被改 md）
    ts = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
    backup_root = os.path.join(REPO, '_trash', f'md_backup_{ts}')
    changed = 0
    for p, urls in files_urls.items():
        t = open(p, encoding='utf-8', errors='ignore').read()
        new = t
        did = False
        for u in urls:
            if u in url_map:
                # 仅替换精确 URL 文本
                if u in new:
                    new = new.replace(u, url_map[u])
                    did = True
        if did:
            os.makedirs(os.path.dirname(os.path.join(backup_root, os.path.relpath(p, REPO))), exist_ok=True)
            shutil.copy2(p, os.path.join(backup_root, os.path.relpath(p, REPO)))
            open(p, 'w', encoding='utf-8').write(new)
            changed += 1
    print(f'[改写] 已备份并改写 {changed} 个 md 文件；本地图路径前缀 {REL_PREFIX}')

    # 报告
    rep = os.path.join(REPO, 'scripts', '_localize_report.txt')
    with open(rep, 'w', encoding='utf-8') as fh:
        fh.write(f'localized: {len(url_map)}\nfailed: {len(failed)}\n')
        for u, lp in sorted(url_map.items()):
            fh.write(f'{lp}\t{u}\n')
        for u, e in failed:
            fh.write(f'FAILED\t{u}\t{e}\n')
    print(f'[报告] {rep}')
    if failed:
        print('[失败样本]')
        for u, e in failed[:10]:
            print('  ', u, '->', e)

if __name__ == '__main__':
    main()
