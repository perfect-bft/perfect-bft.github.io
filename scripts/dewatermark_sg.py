# -*- coding: utf-8 -*-
"""去掉裁剪出来的示意图四个角的「云智泊」水印 logo。

策略：用图周边像素的均值填充 logo 矩形，并对 mask 边界做局部高斯模糊
使边缘自然过渡（不依赖 numpy / cv2）。
"""
import os
from PIL import Image, ImageDraw, ImageFilter

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR = os.path.join(BASE, 'static', 'img', 'sg')


def _mean(img_):
    s = [0, 0, 0]
    n = img_.width * img_.height
    if n == 0:
        return (255, 255, 255)
    px = img_.load()
    for yy in range(img_.height):
        for xx in range(img_.width):
            r, g, b = px[xx, yy]
            s[0] += r; s[1] += g; s[2] += b
    return tuple(int(v / n) for v in s)


def _mask_corner(im, x0, y0, x1, y1):
    w, h = im.size
    if x1 <= x0 or y1 <= y0:
        return
    band_w = max(6, int(min(w, h) * 0.012))
    # 采样左邻与上邻
    sx0, sy0 = max(0, x0 - band_w), y0
    sx1, sy1 = min(w, x0), min(h, y1)
    sx2_0, sy2_0 = x0, max(0, y0 - band_w)
    sx2_1, sy2_1 = min(w, x1), y0
    cl = _mean(im.crop((sx0, sy0, sx1, sy1))) if sx1 > sx0 and sy1 > sy0 else (255, 255, 255)
    cu = _mean(im.crop((sx2_0, sy2_0, sx2_1, sy2_1))) if sx2_1 > sx2_0 and sy2_1 > sy2_0 else (255, 255, 255)
    draw = ImageDraw.Draw(im)
    half_w = (x1 - x0) // 2
    draw.rectangle((x0, y0, x0 + half_w, y1), fill=cu)
    draw.rectangle((x0 + half_w, y0, x1, y1), fill=cl)
    fade = max(8, int(min(w, h) * 0.015))
    pad_top = max(0, y0 - fade)
    pad_bot = min(h, y1 + fade)
    pad_left = max(0, x0 - fade)
    pad_right = min(w, x1 + fade)
    if pad_right > pad_left and pad_bot > pad_top:
        region = im.crop((pad_left, pad_top, pad_right, pad_bot))
        region = region.filter(ImageFilter.GaussianBlur(radius=3.0))
        im.paste(region, (pad_left, pad_top, pad_right, pad_bot))


def dewatermark(path):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    # 左上角水印：宽 ~14% × 高 ~12%
    _mask_corner(im, 0, 0, int(w * 0.14), int(h * 0.12))
    # 左下角水印：宽 ~13% × 高 ~14%
    _mask_corner(im, 0, int(h * 0.86), int(w * 0.13), h)
    # 右下角水印：宽 ~15% × 高 ~14%
    _mask_corner(im, int(w * 0.85), int(h * 0.86), w, h)
    im.save(path, optimize=True)
    return True


def main():
    n = 0
    for f in sorted(os.listdir(DIR)):
        if not (f.startswith('lpr-fig') or f.startswith('bar-fig')):
            continue
        p = os.path.join(DIR, f)
        if dewatermark(p):
            n += 1
            print('clean', f, os.path.getsize(p) // 1024, 'KB')
    print('done', n)


if __name__ == '__main__':
    main()