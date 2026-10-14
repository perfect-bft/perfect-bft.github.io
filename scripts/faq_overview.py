# -*- coding: utf-8 -*-
"""把 FAQ 938 张图拼成一张大网格缩略图，便于一次性肉眼扫水印。"""
import os
from PIL import Image

BASE = r'D:\my-docusaurus-site\docs\local-software\faq\img'
OUT = r'D:\my-docusaurus-site\docs\local-software\faq\img\__grid_overview.png'

TILE = 110
COLS = 30


def main():
    files = sorted(f for f in os.listdir(BASE)
                   if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))
                   and not f.startswith('__'))
    rows = (len(files) + COLS - 1) // COLS
    grid_w = COLS * TILE
    grid_h = rows * TILE
    canvas = Image.new('RGB', (grid_w, grid_h), (240, 240, 240))
    print('files', len(files), 'grid', grid_w, 'x', grid_h)
    for i, f in enumerate(files):
        r, c = i // COLS, i % COLS
        try:
            im = Image.open(os.path.join(BASE, f)).convert('RGB')
            im.thumbnail((TILE, TILE), Image.LANCZOS)
            canvas.paste(im, (c * TILE, r * TILE))
        except Exception as e:
            print('skip', f, e)
    # 缩放便于浏览
    if canvas.width > 2400:
        canvas.thumbnail((2400, 9999), Image.LANCZOS)
    canvas.save(OUT, optimize=True)
    print('wrote', OUT, canvas.size, os.path.getsize(OUT) // 1024, 'KB')


if __name__ == '__main__':
    main()