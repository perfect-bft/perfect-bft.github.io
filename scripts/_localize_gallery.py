#!/usr/bin/env python3
"""针对 docs/gallery.mdx 的外链图片本地化（补充 _localize_external_imgs.py 遗漏的非 Markdown 语法）。

gallery.mdx 用 JSX 字符串字面量引用图片：cover: "url" 与 images: ["url", ...]
其中：
  - jsdmirror / bolinkpaas / ax1x / remit.ee 的真实图 -> 下载到 static/img/remote/ 并改写
  - 占位符 https://你的图床地址/... 与 https://图床/... -> 原样保留（用户未填）
已存在于 static/img/remote/ 的同名资源会直接复用，不重复下载。
"""
import os, re, sys, hashlib, shutil, urllib.request

REPO = r'D:\my-docusaurus-site'
GALLERY = os.path.join(REPO, 'docs', 'gallery.mdx')
REMOTE = os.path.join(REPO, 'static', 'img', 'remote')

PLACEHOLDER = re.compile(r'https?://(你的图床地址|图床)/', re.I)
REAL_HOST = re.compile(r'https?://(cdn\.jsdmirror\.com|doc\.bolinkpaas\.com|s41\.ax1x\.com|img\.remit\.ee)/', re.I)
# 任意被双引号包裹的 http(s) 图片 URL
URL_RE = re.compile(r'"((?:https?://[^"]+?\.(?:png|jpe?g|gif|webp|webp|bmp|svg)))"', re.I)


def local_name(url: str) -> str:
    base = url.rsplit('/', 1)[-1]
    base = re.sub(r'[^A-Za-z0-9._-]', '_', base)
    h = hashlib.sha1(url.encode('utf-8')).hexdigest()[:10]
    return f'g_{h}_{base}'


def main():
    apply = '--apply' in sys.argv
    with open(GALLERY, encoding='utf-8') as f:
        text = f.read()

    urls = URL_RE.findall(text)
    # 去重保序
    seen, real, placeholders = set(), [], []
    for u in urls:
        if u in seen:
            continue
        seen.add(u)
        if PLACEHOLDER.search(u):
            placeholders.append(u)
        elif REAL_HOST.search(u):
            real.append(u)
        # 其他外链：本脚本只管已知图床，忽略

    print(f'[扫描] 真实图床 URL: {len(real)}，占位符: {len(placeholders)}')

    if not apply:
        print('[dry] 不下载、不改动。加 --apply 执行。')
        for u in real:
            print('  REAL ', u)
        for u in placeholders:
            print('  KEEP ', u)
        return

    # 备份
    os.makedirs(os.path.join(REPO, '_trash'), exist_ok=True)
    from datetime import datetime
    ts = datetime.now().strftime('%Y%m%d-%H%M%S')
    bak = os.path.join(REPO, '_trash', f'gallery_mdx_bak_{ts}.mdx')
    shutil.copy2(GALLERY, bak)
    print(f'[备份] {bak}')

    os.makedirs(REMOTE, exist_ok=True)
    mapping = {}
    for u in real:
        fn = local_name(u)
        dest = os.path.join(REMOTE, fn)
        # 复用已有
        if os.path.exists(dest):
            print(f'[复用] {fn}')
        else:
            try:
                req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=30) as r, open(dest, 'wb') as w:
                    w.write(r.read())
                print(f'[下载] {fn}')
            except Exception as e:
                print(f'[失败] {u} -> {e}')
                continue
        mapping[u] = f'/img/remote/{fn}'

    # 改写（仅替换真实 URL）
    new_text = text
    for u, local in mapping.items():
        new_text = new_text.replace(f'"{u}"', f'"{local}"')

    with open(GALLERY, 'w', encoding='utf-8') as f:
        f.write(new_text)

    print(f'[改写] {len(mapping)} 处 -> /img/remote/')
    print(f'[保留] {len(placeholders)} 处占位符未动')


if __name__ == '__main__':
    main()
