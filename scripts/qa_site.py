# -*- coding: utf-8 -*-
"""站点质量门禁（自检，不动文件）：

  A. sidebars.js 引用的 doc id 是否都存在
  B. 各 doc 内 ../img/./img//img/ 路径是否能在文件系统里找到
  C. 文本层品牌残留扫描（云智泊 / 52tingche / YZB / 深圳云智）
  D. 侧边栏所有 label 是否带数字编号（顶级 category 除外）

跑法：python scripts/qa_site.py
"""
import os
import re
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
DOCS = BASE / 'docs'
STATIC = BASE / 'static'
SIDEBAR = BASE / 'sidebars.js'
BRAND = ['云智泊', '52tingche', 'YZB', '深圳云智']


def A_docs_from_sidebar():
    txt = SIDEBAR.read_text(encoding='utf-8')
    ids = sorted(set(re.findall(r"id: '([^']+)'", txt)))
    miss = [d for d in ids if not (DOCS / f'{d}.md').exists() and not (DOCS / f'{d}.mdx').exists()]
    return ids, miss


def B_image_refs():
    img_pat = re.compile(r'(\.\./|\./|/)?img/[A-Za-z0-9_\-\.\/]+\.(?:png|jpg|jpeg|webp|gif|svg)')
    miss = []
    seen = set()
    for p in DOCS.rglob('*.md'):
        text = p.read_text(encoding='utf-8')
        for m in img_pat.findall(text):
            # 把相对路径解析到 doc 所在目录
            line = text[max(0, text.find(m) - 200): text.find(m)]
            if m.startswith('./') or m.startswith('../'):
                ref = (p.parent / m).resolve()
                rel = ref.relative_to(BASE).as_posix()
                key = (str(p), rel)
                if key in seen:
                    continue
                seen.add(key)
                if not ref.exists():
                    miss.append((str(p.relative_to(BASE)), m, str(rel)))
            elif m.startswith('/img/'):
                # /img/xxx → static/xxx
                key = m
                if key in seen:
                    continue
                seen.add(key)
                p2 = STATIC / m[5:]
                if not p2.exists():
                    miss.append((str(p.relative_to(BASE)), m, str(p2.relative_to(BASE))))
    return miss


def C_brand_in_text():
    hits = []
    for p in DOCS.rglob('*.md'):
        for i, line in enumerate(p.read_text(encoding='utf-8').splitlines(), 1):
            for kw in BRAND:
                if kw in line:
                    hits.append((str(p.relative_to(BASE)), i, line.strip()[:120]))
    src_files = []
    for root in ('src',):
        r = BASE / root
        if not r.exists():
            continue
        for p in r.rglob('*'):
            if p.suffix in {'.js', '.tsx', '.ts', '.css'}:
                for i, line in enumerate(p.read_text(encoding='utf-8').splitlines(), 1):
                    for kw in BRAND:
                        if kw in line:
                            src_files.append((str(p.relative_to(BASE)), i, line.strip()[:120]))
    return hits, src_files


def D_sidebar_labels_numbered():
    # 顶级 category label 不强求，但子条目 label 形如 `1. xxx / 1.1 xxx` 应该统一
    txt = SIDEBAR.read_text(encoding='utf-8')
    labels = re.findall(r"label: '([^']+)'", txt)
    not_num = [l for l in labels if not re.match(r'^[0-9]+(?:\.[0-9]+)*\.?\s', l)]
    return labels, not_num


def main():
    print('=== A. sidebars.js → doc id 缺失 ===')
    ids, miss = A_docs_from_sidebar()
    print(f'  引用 {len(ids)} 个 doc id, 缺失 {len(miss)}')
    for m in miss[:20]:
        print('  MISS', m)
    print()
    print('=== B. 图片引用是否都在 static/docs 存在 ===')
    miss = B_image_refs()
    print(f'  缺失 {len(miss)} 处')
    for src, ref, target in miss[:25]:
        print(f'  {src}  ref={ref}  →  {target}')
    print()
    print('=== C. 文本层品牌残留 ===')
    h1, h2 = C_brand_in_text()
    print(f'  docs/{len(h1)} / src+{len(h2)}')
    for src, ln, t in (h1 + h2)[:15]:
        print(f'  {src}:{ln}  {t}')
    print()
    print('=== D. 侧边栏 label 是否带数字编号 ===')
    labels, not_num = D_sidebar_labels_numbered()
    print(f'  共 {len(labels)} 个 label, 未带数字 {len(not_num)}')
    for l in not_num[:20]:
        print('  NOT NUM', l)


if __name__ == '__main__':
    sys.exit(main() or 0)