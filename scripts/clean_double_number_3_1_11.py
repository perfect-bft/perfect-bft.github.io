#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
清理 sidebars.js 中 3.1.11 组的"双重编号"label。
即把 '3.1.11.X Y. text'（Y 可带空格或不带空格）改写为 '3.1.11.X text'。

只作用于 label 是 '3.1.11.X Y. ...' 的项目；其他子站与 category 的 label 一概不碰。

用法：
  python scripts/clean_double_number_3_1_11.py            # 干跑
  python scripts/clean_double_number_3_1_11.py --apply    # 落盘
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 匹配: label: '3.1.11.X Y. text'
# 1. label:\s*'                — 起始
# 2. (3\.1\.11\.\d+)           — 外层编号（捕获组）
# 3. \s+                       — 至少一个空白
# 4. \d+\.                     — inner 数字 + dot
# 5. \s*                       — dot 后的可选空白
# 6. (.+?)                     — 文本主体（非贪婪）
# 7. '                         — 收尾单引号
PATTERN = re.compile(
    r"(label:\s*')(3\.1\.11\.\d+)\s+\d+\.\s*(.+?)(')"
)


def main():
    apply = '--apply' in sys.argv
    src_path = os.path.join(ROOT, 'sidebars.js')
    src = open(src_path, encoding='utf-8').read()

    matches = list(PATTERN.finditer(src))
    if not matches:
        print('无匹配，未做修改。')
        return 0

    print(f'3.1.11 双重编号 label 共 {len(matches)} 条：\n')

    seen = set()
    for m in matches:
        old = m.group(0)
        # 抽出干净的 label 字符串
        old_label = m.group(2) + ' ' + m.group(3) + m.group(2).split('.', 1)[0] + '...'
        # 直接打印前后
        full_label_before = f"{m.group(2)} {m.group(3)}"
        full_label_after = f"{m.group(2)} {m.group(3)}"
        if full_label_before not in seen:
            seen.add(full_label_before)
            print(f'  - {m.group(2)} {m.group(3)}')
            print(f'    + {m.group(2)} {m.group(3)}\n')

    print(f'（共 {len(seen)} 个独立 label 入改）')

    if not apply:
        print('\n当前为干跑。加 --apply 落盘。')
        return 0

    # 落盘
    def sub_fn(m):
        outer = m.group(2)
        text = m.group(3).strip()
        return f"{m.group(1)}{outer} {text}{m.group(4)}"

    new_src = PATTERN.sub(sub_fn, src)
    with open(src_path, 'w', encoding='utf-8') as f:
        f.write(new_src)

    # 统计替换次数
    diff = len(src) - len(new_src)
    print(f'\n已落盘。原始 {len(src)} 字符 → 新 {len(new_src)} 字符（差 {abs(diff)}）。')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
