#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
检查 sidebars.js 里显式写了 label 的 doc，其编号前缀（"4.2 " / "1. "）
与文档自身 frontmatter title / 正文 H1 的编号前缀是否一致。

背景：给侧边栏加编号时，如果只改 sidebars.js 的 label，
而忘了同步改 .md 文件的 frontmatter title 和正文 H1，就会出现
「侧边栏显示 4.2、点进去 H1 却是 4.3」的名实不一致。

比对策略：
  只比编号前缀（如 "4.2"）。label 与 doc title 经常使用不同长度的
  主题文字（label 用缩写、title 用全名），那是合理差异，本脚本不抓。

用法：
  python scripts/qa_label_sync.py
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)


def get_num_prefix(s):
    """取出开头的编号部分（如 '4.2' 或 '1.' 或 '6.1'），没有则返回 None。

    要求最末必须以 '.' 或 '.digit' 收尾，避免误识别 '4G免流' 这类。"""
    if not s:
        return None
    m = re.match(r'^\s*((?:\d+\.)+\d+|\d+\.)', s)
    return m.group(1).rstrip('.') if m else None


def parse_frontmatter_title(path):
    """从 .md 里取 frontmatter 的 title，以及正文第一个 H1。"""
    with open(path, encoding='utf-8') as f:
        text = f.read()

    fm_title = None
    m = re.match(r'^---\s*\n(.*?)\n---\s*\n', text, re.S)
    if m:
        fm = m.group(1)
        mt = re.search(r'^title:\s*(.+?)\s*$', fm, re.M)
        if mt:
            fm_title = mt.group(1).strip().strip('"\'')

    h1 = None
    mh = re.search(r'^#\s+(.+?)\s*$', text, re.M)
    if mh:
        h1 = mh.group(1).strip()

    return fm_title, h1


def main():
    sidebar_path = os.path.join(ROOT, 'sidebars.js')
    if not os.path.exists(sidebar_path):
        print('找不到 sidebars.js')
        return 1

    src = open(sidebar_path, encoding='utf-8').read()

    # 抓取所有 { type: 'doc', id: '...', label: '...' } 三元组（含跨行）
    # 允许尾部 , 或 } 二选一（部分条目是最末一个，没有 , 跟随）
    pattern = re.compile(
        r"\{\s*type:\s*'doc'\s*,\s*id:\s*'([^']+)'\s*,\s*label:\s*'([^']+)'\s*[,}]",
        re.S
    )
    entries = pattern.findall(src)
    print(f'=== 侧边栏显式 label 的 doc 条目：共 {len(entries)} 条 ===\n')

    missing_file = []
    mismatch_fm = []
    mismatch_h1 = []
    no_label_num = []
    no_doc_num = []

    for doc_id, label in entries:
        md = os.path.join(ROOT, 'docs', doc_id + '.md')
        mdx = os.path.join(ROOT, 'docs', doc_id + '.mdx')
        path = md if os.path.exists(md) else (mdx if os.path.exists(mdx) else None)

        if path is None:
            missing_file.append((doc_id, label))
            continue

        label_num = get_num_prefix(label)
        if not label_num:
            no_label_num.append((doc_id, label))
            continue

        fm_title, h1 = parse_frontmatter_title(path)

        if fm_title:
            fm_num = get_num_prefix(fm_title)
            if not fm_num:
                # frontmatter 有 title 但无编号 → 可能是漏挂编号
                no_doc_num.append((doc_id, label, 'title', fm_title))
            elif fm_num != label_num:
                mismatch_fm.append((doc_id, label, label_num, fm_title, fm_num))

        if h1:
            h1_num = get_num_prefix(h1)
            if not h1_num:
                no_doc_num.append((doc_id, label, 'H1', h1))
            elif h1_num != label_num:
                mismatch_h1.append((doc_id, label, label_num, h1, h1_num))

    # ---- 输出 ----
    if missing_file:
        print(f'--- A. label 指向的 doc 文件不存在：{len(missing_file)} 条 ---')
        for doc_id, label in missing_file:
            print(f'  MISS  {doc_id}  (label={label})')
        print()
    else:
        print('--- A. label 指向的 doc 文件：全部存在 ---\n')

    print(f'--- B. frontmatter title 编号与 label 编号不一致：{len(mismatch_fm)} 条 ---')
    for doc_id, label, ln, fm, fn in mismatch_fm:
        print(f'  {doc_id}')
        print(f'      label = {label}（编号 {ln}）')
        print(f'      title = {fm}（编号 {fn}）')
    print()

    print(f'--- C. 正文 H1 编号与 label 编号不一致：{len(mismatch_h1)} 条 ---')
    for doc_id, label, ln, h1, hn in mismatch_h1:
        print(f'  {doc_id}')
        print(f'      label = {label}（编号 {ln}）')
        print(f'      H1    = {h1}（编号 {hn}）')
    print()

    if no_doc_num:
        print(f'--- D. label 有编号、但 doc title/H1 完全没有编号：{len(no_doc_num)} 条 ---')
        for doc_id, label, where, content in no_doc_num:
            print(f'  {doc_id}（{where} 无编号, label={label[:50]}）')
        print()

    if no_label_num:
        print(f'--- E. label 本来就不带编号：{len(no_label_num)} 条 ---')
        for doc_id, label in no_label_num[:8]:
            print(f'  {doc_id} → {label}')
        if len(no_label_num) > 8:
            print(f'  ... 还有 {len(no_label_num) - 8} 条')
        print()

    total = len(missing_file) + len(mismatch_fm) + len(mismatch_h1)
    print('=' * 50)
    if total == 0:
        print('编号一致，无需处理。')
    else:
        print(f'共发现 {total} 处「label 与页面编号不一致」需处理。')
    return 0


if __name__ == '__main__':
    sys.exit(main())
