#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
按 sidebars.js 中的 label，整齐地把 doc 文件的 frontmatter title 与正文 H1 改一致。

策略：
  - 读取 sidebars.js，提取所有 { id, label } 对。
  - 对每个 id：
      - title/H1 与 label 不一致（编号不一样、或者 label 有编号但 title/H1 完全没编号）
        → 把 frontmatter 的 title 改成 label。
      - 正文 H1 若存在且有编号前缀，把 H1 改成与 label 相同（带编号）。
  - 默认跳过无编号的 label（label 不带 N./N.M/任何编号 → 不动；这类属正常命名风格）。
  - 默认作用域：所有 docs/parking-boss/**（其它分类的 192 条 "软警告" 是用户
    喜欢的命名风格，不动；之前 qa_label_sync.py 的 D 段已列出）。

用法：
  python scripts/sync_labels_in_docs.py            # 干跑，只打印会怎么改
  python scripts/sync_labels_in_docs.py --apply    # 落盘
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

DOC_ROOTS = ['docs']

ENTRY = re.compile(
    r"\{\s*type:\s*'doc'\s*,\s*id:\s*'([^']+)'\s*,\s*label:\s*'([^']+)'\s*[,}]",
    re.S
)


def load_labels(sidebar_path):
    src = open(sidebar_path, encoding='utf-8').read()
    labels = {}
    for doc_id, label in ENTRY.findall(src):
        labels[doc_id] = label
    return labels


def find_doc(doc_id):
    for root in DOC_ROOTS:
        for ext in ('.md', '.mdx'):
            p = os.path.join(ROOT, root, doc_id + ext)
            if os.path.exists(p):
                return p
    return None


def get_num_prefix(s):
    if not s:
        return None
    # 数字点序列，最末必须以 '\.' 或 '\.digit' 收尾（用 '.' 卡死边界）。
    # 这样：'2.地库'→'2.'；'3.1.11.2 地库'→'3.1.11.2'；'4G免流'→None（没 .）。
    m = re.match(r'^\s*((?:\d+\.)+\d+|\d+\.)', s)
    return m.group(1).rstrip('.') if m else None


def main():
    apply = '--apply' in sys.argv

    labels = load_labels(os.path.join(ROOT, 'sidebars.js'))
    print(f'侧边栏条目总数: {len(labels)}')
    print(f'扫描范围: docs/parking-boss/** + docs/local-software/faq/qa/common/**')
    print(f'模式: {"落盘" if apply else "干跑"}')
    print()

    targets = []
    for doc_id, label in labels.items():
        # 默认作用域：parking-boss 子站全部 + local-software/faq/qa/common 五条
        # （其它子站的"label 有编号、doc 无编号"属设计风格，不动）
        in_scope = (
            doc_id.startswith('parking-boss/')
            or doc_id.startswith('local-software/faq/qa/common/')
        )
        if not in_scope:
            continue
        path = find_doc(doc_id)
        if path is None:
            continue
        if not get_num_prefix(label):
            continue

        text = open(path, encoding='utf-8').read()
        m = re.match(r'^(---)\s*\n(.*?)\n(---)\s*\n(.*)$', text, re.S)
        if not m:
            print(f'  [SKIP 无 fm] {doc_id}')
            continue
        fm = m.group(2)
        body = m.group(4)

        mt = re.search(r'^title:\s*(.+?)\s*$', fm, re.M)
        old_title = mt.group(1).strip().strip('"\'') if mt else None

        mh = re.search(r'^#\s+(.+?)\s*$', body, re.M)
        old_h1 = mh.group(1).strip() if mh else None

        plan = []
        if old_title is not None and old_title != label:
            # 仅当 doc 自身的 frontmatter title 也带编号、且编号与 label 不一致时才改。
            # 跳过 D 段"label 有编号、doc 无编号"——属用户设计风格，不动。
            old_num = get_num_prefix(old_title)
            new_num = get_num_prefix(label)
            if old_num is not None and old_num != new_num:
                plan.append(('title', old_title, label))
        if old_h1 is not None:
            old_h1_num = get_num_prefix(old_h1)
            if old_h1_num and old_h1_num != get_num_prefix(label):
                plan.append(('H1', old_h1, label))
            elif old_h1_num is None:
                # H1 没编号、label 有编号，跳过（属"label 加编号、title 不加"的风格）
                pass

        if plan:
            targets.append((path, doc_id, fm, body, old_title, old_h1, plan))

    if not targets:
        print('无需要同步的条目。')
        return 0

    print(f'=== 待同步：{len(targets)} 条 ===\n')
    for path, doc_id, fm, body, old_title, old_h1, plan in targets:
        print(f'  {doc_id}')
        for kind, old, new in plan:
            print(f'      {kind}: {old!r}  →  {new!r}')

    print()
    if not apply:
        print('当前为干跑。加 --apply 落盘。')
        return 0

    for path, doc_id, fm, body, old_title, old_h1, plan in targets:
        new_text = open(path, encoding='utf-8').read()

        for kind, old, new in plan:
            if kind == 'title':
                new_text = re.sub(
                    r'^(title:\s*)(.+?)\s*$',
                    lambda m, n=new: m.group(1) + n,
                    new_text,
                    count=1,
                    flags=re.M
                )
            elif kind == 'H1':
                new_text = re.sub(
                    r'^(#\s+).+?$',
                    lambda m, n=new: m.group(1) + n,
                    new_text,
                    count=1,
                    flags=re.M
                )

        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_text)

    print(f'已落盘 {len(targets)} 个文件。')
    return 0


if __name__ == '__main__':
    sys.exit(main())
