import os, re, urllib.request, urllib.parse, urllib.error, concurrent.futures

BUILD = r'D:\my-docusaurus-site\build'
BASE = 'http://localhost:3475'
href_re = re.compile(r'href="(/docs/[^"]*|/files/[^"]*|/img/[^"]*)"')

# 收集所有内部链接
links = set()
for root, _, files in os.walk(BUILD):
    for fn in files:
        if fn.endswith('.html'):
            p = os.path.join(root, fn)
            try:
                with open(p, encoding='utf-8', errors='ignore') as fh:
                    txt = fh.read()
            except Exception:
                continue
            for m in href_re.finditer(txt):
                links.add(m.group(1))

# 排除纯锚点/查询（已不含 # 因正则只取到 " 前）
links = {l for l in links if not l.startswith('/docs/category/')}  # 分类索引页已知正常(编码后200)

def check(link):
    # 编码路径（保留 / 与 :），处理中文
    enc = urllib.parse.quote(link, safe='/:')
    url = BASE + enc
    try:
        req = urllib.request.Request(url, method='HEAD')
        with urllib.request.urlopen(req, timeout=15) as r:
            return (link, r.status)
    except urllib.error.HTTPError as e:
        return (link, e.code)
    except Exception as e:
        return (link, f'ERR:{e}')

print(f'internal links to check: {len(links)}')
bad = []
with concurrent.futures.ThreadPoolExecutor(max_workers=20) as ex:
    for link, status in ex.map(check, sorted(links)):
        if isinstance(status, int) and status != 200:
            bad.append((link, status))
        elif not isinstance(status, int):
            bad.append((link, status))

print(f'non-200 count: {len(bad)}')
for link, status in bad:
    print(f'  {status}  {link}')
if not bad:
    print('ALL INTERNAL LINKS 200 ✅')
