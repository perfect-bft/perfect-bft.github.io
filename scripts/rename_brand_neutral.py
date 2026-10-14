# -*- coding: utf-8 -*-
"""品牌名 -> 中性代号。干跑默认；加 --apply 落盘。"""
import re, os, sys

APPLY = '--apply' in sys.argv
ROOTS = ['docs', 'src', 'sidebars.js', 'docusaurus.config.js', 'README.md']
EXTS = ('.md', '.mdx', '.js', '.jsx', '.ts', '.tsx', '.html', '.json', '.yml', '.yaml')

MAP = {'臻识': 'VZ', '华夏': 'HX', '方控': 'FK', '道通': 'DT', '华安': 'HA'}
# 答案：仅当后面紧跟「人脸」时视为品牌，其余（如「找到答案」）保留
PAT = re.compile(r'答案(?=人脸)|臻识|华夏|方控|道通|华安')
ASCII = re.compile(r'[A-Za-z0-9]')

def repl_factory(text):
    def _r(m):
        w = m.group(0)
        code = 'DA' if w == '答案' else MAP[w]
        before = text[m.start() - 1] if m.start() > 0 else ''
        after = text[m.end()] if m.end() < len(text) else ''
        pre = ' ' if before and ASCII.match(before) else ''
        post = ' ' if after and ASCII.match(after) else ''
        return pre + code + post
    return _r

files = []
for r in ROOTS:
    if os.path.isfile(r):
        files.append(r)
    else:
        for dp, dn, fn in os.walk(r):
            for f in fn:
                if f.lower().endswith(EXTS):
                    files.append(os.path.join(dp, f))

changed_files, total, samples = [], 0, []
for fp in files:
    with open(fp, encoding='utf-8', newline='') as fh:
        text = fh.read()
    matches = list(PAT.finditer(text))
    if not matches:
        continue
    new = PAT.sub(repl_factory(text), text)
    total += len(matches)
    changed_files.append((fp, len(matches)))
    if len(samples) < 30:
        for m in matches[:2]:
            s = text[max(0, m.start() - 10):m.end() + 12].replace('\n', '\\n')
            d = new[max(0, m.start() - 12):m.end() + 14].replace('\n', '\\n')
            samples.append((fp, s, d))
    if APPLY and new != text:
        with open(fp, 'w', encoding='utf-8', newline='') as fh:
            fh.write(new)

print(f"{'[APPLY] 已写入' if APPLY else '[DRY-RUN] 将修改'} 文件 {len(changed_files)} 个，替换 {total} 处")
for fp, c in sorted(changed_files, key=lambda x: -x[1])[:25]:
    print(f'  {c:>3} 处  {fp}')
if len(changed_files) > 25:
    print(f'  ... 其余 {len(changed_files)-25} 个文件')
print('\n=== 样例 ===')
for fp, a, b in samples:
    print(f'[{fp}]\n  旧: ...{a}...\n  新: ...{b}...')
