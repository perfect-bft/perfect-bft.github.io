#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
扫描 sidebars.js 里所有 label（doc + category），找出"双重编号"的，
即形如 '3.1.11.1 1. 一位多车' —— 侧边栏编号后面又跟了一个文档自带的旧编号。

用法：
  python scripts/qa_double_number.py
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# inner 数字后面必须跟 '.' —— 紧贴（'2.地库...'） 或带空格（'5. 通过...'）。
# 这样 '3.1 4G免流控制模块' 不会被误判为 3.1 + inner=4 + text=G免流...
DOUBLE = re.compile(
    r'^(\d+(?:\.\d+)*\.?)\s+(\d+)\.(?:\s|$)(.*)$'
)


def main():
    src = open(os.path.join(ROOT, 'sidebars.js'), encoding='utf-8').read()

    # 所有 label: '...'
    labels = re.findall(r"label:\s*'([^']+)'", src)
    # 去重但保留顺序
    seen = []
    for l in labels:
        if l not in seen:
            seen.append(l)

    hits = []
    for l in seen:
        m = DOUBLE.match(l)
        if m:
            n1, n2, rest = m.group(1), m.group(2), m.group(3)
            # 内层编号要紧接 '.'
            if n2.isdigit() and (rest.strip() or not rest):
                hits.append((l, n1, n2, rest.strip()))

    print(f'sidebars.js 中 label 总数（去重后）: {len(seen)}')
    print(f'双重编号的 label: {len(hits)}')
    print()
    # 按外层编号排序输出
    hits_sorted = sorted(hits, key=lambda x: [int(p) for p in x[1].rstrip('.').split('.')])
    for label, n1, n2, text in hits_sorted:
        print(f'  {label!r}')
        print(f'      外层={n1}  inner={n2}.  文本={text!r}')
        print(f'      建议 →  {n1} {text}')
        print()
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
