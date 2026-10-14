# -*- coding: utf-8 -*-
"""站点链接与资源健康度检查（只读，不改任何文件）。

1) 内部 markdown 链接是否指向存在的页面/文件
2) 外链图片引用（依赖第三方图床，有失效风险）
3) 本地图片体积 TOP N（加载性能）
用法：python scripts/qa_links_assets.py
"""
import re, os, sys
from collections import Counter, defaultdict

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(BASE, 'docs')
SIDE = os.path.join(BASE, 'sidebars.js')

LINK = re.compile(r'\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)')
IMG = re.compile(r'!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)')

md_files, all_links, all_imgs = [], [], []
for dp, dn, fn in os.walk(DOCS):
    for f in fn:
        if not f.lower().endswith(('.md', '.mdx')):
            continue
        p = os.path.join(dp, f)
        md_files.append(p)
        try:
            t = open(p, encoding='utf-8').read()
        except Exception:
            continue
        for m in LINK.finditer(t):
            all_links.append((p, m.group(1)))
        for m in IMG.finditer(t):
            all_imgs.append((p, m.group(1)))

print(f'扫描 md/mdx: {len(md_files)} 个；链接 {len(all_links)} 条；图片引用 {len(all_imgs)} 条')

# ---------- 1. 内部链接 ----------
print('\n=== 1. 内部链接检查 ===')
internal_bad = []
for p, u in all_links:
    if u.startswith(('http://', 'https://', 'mailto:', 'tel:', '#', '<' )):
        continue
    target = u.split('#')[0].split('?')[0]
    if not target:
        continue
    if target.startswith('/'):
        cand = os.path.join(BASE, 'static', target.lstrip('/'))
        ok = os.path.exists(cand)
    else:
        cand = os.path.normpath(os.path.join(os.path.dirname(p), target))
        ok = os.path.exists(cand)
    if not ok:
        internal_bad.append((os.path.relpath(p, BASE).replace(os.sep, '/'), u))

if internal_bad:
    print(f'  失效内部链接 {len(internal_bad)} 条：')
    for f, u in internal_bad[:40]:
        print(f'    {f}  ->  {u}')
    if len(internal_bad) > 40:
        print(f'    ... 其余 {len(internal_bad) - 40} 条')
else:
    print('  内部链接全部有效')

# ---------- 2. 外链图片 ----------
print('\n=== 2. 外链图片（依赖第三方图床）===')
ext_imgs = [(f, u) for f, u in all_imgs if u.startswith(('http://', 'https://'))]
dom = Counter(re.sub(r'^https?://', '', u).split('/')[0] for _, u in ext_imgs)
if ext_imgs:
    print(f'  外链图片 {len(ext_imgs)} 条，域名分布：')
    for d, c in dom.most_common():
        print(f'    {c:>4}  {d}')
    byfile = Counter(os.path.relpath(f, BASE).replace(os.sep, '/') for f, _ in ext_imgs)
    print('  涉及文件 TOP 10：')
    for f, c in byfile.most_common(10):
        print(f'    {c:>4}  {f}')
else:
    print('  无外链图片')

# ---------- 3. 本地图片体积 ----------
print('\n=== 3. 本地图片体积 ===')
local_imgs = []
for f, u in all_imgs:
    if u.startswith(('http://', 'https://')):
        continue
    path = os.path.normpath(os.path.join(os.path.dirname(f), u)) if not u.startswith('/') \
        else os.path.join(BASE, 'static', u.lstrip('/'))
    if os.path.exists(path):
        local_imgs.append(path)
uniq = sorted(set(local_imgs), key=lambda x: -os.path.getsize(x))
total = sum(os.path.getsize(x) for x in uniq)
print(f'  引用的本地图片 {len(uniq)} 张，合计 {total/1024/1024:.1f} MB')
print('  体积 TOP 15：')
for x in uniq[:15]:
    print(f'    {os.path.getsize(x)/1024/1024:>6.2f} MB  {os.path.relpath(x, BASE).replace(os.sep, "/")}')

# 未被任何 md 引用的图片（可能是垃圾）
print('\n=== 4. 未被任何 md 引用的本地图片 ===')
referenced = set()
for f, u in all_imgs:
    if u.startswith(('http://', 'https://')):
        continue
    path = os.path.normpath(os.path.join(os.path.dirname(f), u)) if not u.startswith('/') \
        else os.path.join(BASE, 'static', u.lstrip('/'))
    referenced.add(os.path.normcase(os.path.abspath(path)))

on_disk = []
for root in (os.path.join(BASE, 'static'), DOCS):
    for dp, dn, fn in os.walk(root):
        for f in fn:
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg')):
                on_disk.append(os.path.join(dp, f))

# static/ 下以 /img/... 引用的图也算引用
for p, u in all_imgs:
    if u.startswith('/'):
        referenced.add(os.path.normcase(os.path.join(BASE, 'static', u.lstrip('/'))))

unused = [x for x in on_disk
          if os.path.normcase(os.path.abspath(x)) not in referenced]
unused.sort(key=lambda x: -os.path.getsize(x))
utotal = sum(os.path.getsize(x) for x in unused)
print(f'  磁盘上图片 {len(on_disk)} 张，其中未被引用 {len(unused)} 张，合计 {utotal/1024/1024:.1f} MB')
for x in unused[:15]:
    print(f'    {os.path.getsize(x)/1024/1024:>6.2f} MB  {os.path.relpath(x, BASE).replace(os.sep, "/")}')
