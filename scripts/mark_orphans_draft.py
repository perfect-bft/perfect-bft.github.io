# -*- coding: utf-8 -*-
"""把「未被 sidebars.js 引用」的文档标记为 draft（构建时不生成页面），
并顺手修复畸形的 frontmatter（缺开头 --- / 缺结尾 ---）。

可逆：删除 frontmatter 里的 `draft: true` 即恢复正常显示。
用法：python scripts/mark_orphans_draft.py [--apply]
"""
import re, os, sys

APPLY = '--apply' in sys.argv
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(BASE, 'docs')
SIDEBAR = os.path.join(BASE, 'sidebars.js')

txt = open(SIDEBAR, encoding='utf-8').read()
explicit = set(re.findall(r"id: '([^']+)'", txt))
auto_dirs = re.findall(r"dirName: '([^']+)'", txt)


def doc_candidates(path):
    rel = os.path.relpath(path, DOCS).replace(os.sep, '/')
    rel = re.sub(r'\.mdx?$', '', rel)
    cands = {rel}
    if rel.endswith('/index'):
        cands.add(rel[: -len('/index')])
    elif rel == 'index':
        cands.add('')
    return cands


def covered(cands):
    if cands & explicit:
        return True
    for a in auto_dirs:
        for c in cands:
            if c == a or c.startswith(a.rstrip('/') + '/'):
                return True
    return False


targets = []
for dp, dn, fn in os.walk(DOCS):
    for f in fn:
        if not f.lower().endswith(('.md', '.mdx')):
            continue
        p = os.path.join(dp, f)
        if not covered(doc_candidates(p)):
            targets.append(p)

print(f"{'[APPLY]' if APPLY else '[DRY-RUN]'} 目标文档: {len(targets)} 个\n")

stats = {'complete': 0, 'no_open': 0, 'no_close': 0, 'none': 0, 'has_draft': 0}
for p in sorted(targets):
    with open(p, encoding='utf-8', newline='') as fh:
        text = fh.read()
    crlf = '\r\n' in text
    nl = '\r\n' if crlf else '\n'
    lines = text.splitlines()

    if re.search(r'^\s*draft:', text, re.M):
        stats['has_draft'] += 1
        continue

    has_open = bool(lines) and lines[0].strip() == '---'
    end_idx = None
    if has_open:
        for i in range(1, len(lines)):
            if lines[i].strip() == '---':
                end_idx = i
                break
    has_close = end_idx is not None

    if has_open and has_close:                      # 完整 frontmatter
        lines.insert(end_idx, 'draft: true')
        kind = 'complete'
    elif has_open and not has_close:                # 缺结尾 ---
        lines.append('draft: true')
        lines.append('---')
        kind = 'no_close'
    elif not has_open and any(l.strip() == '---' for l in lines):
        # 缺开头 ---（结尾那行 --- 其实是 frontmatter 的闭合）
        lines.insert(0, 'draft: true')
        lines.insert(0, '---')
        kind = 'no_open'
    else:                                           # 完全没有 frontmatter
        lines = ['---', 'draft: true', '---'] + lines
        kind = 'none'

    stats[kind] += 1
    if APPLY:
        with open(p, 'w', encoding='utf-8', newline='') as fh:
            fh.write(nl.join(lines) + nl)
    print(f'  [{kind:8}] {os.path.relpath(p, BASE).replace(os.sep, "/")}')

print(f"\n统计: 完整{stats['complete']} / 补结尾{stats['no_close']} / "
      f"补开头{stats['no_open']} / 新建{stats['none']} / 已有draft{stats['has_draft']}")
if not APPLY:
    print('（干跑，加 --apply 落盘）')
