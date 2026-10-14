# -*- coding: utf-8 -*-
"""从施工说明书 PDF 中裁出示意图（自动避开页眉/页脚品牌区域）"""
import os
import fitz
from PIL import Image

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(BASE, 'static', 'img', 'sg')
SCALE = 2.6

# (pdf, page_index, bbox, out_name)
JOBS = [
    ('sg/说明书-车牌识别设备安装2401 V1.0.pdf', 0, (78, 180, 317, 394), 'lpr-fig1-1.png'),
    ('sg/说明书-车牌识别设备安装2401 V1.0.pdf', 0, (318, 180, 516, 393), 'lpr-fig1-2.png'),
    ('sg/说明书-车牌识别设备安装2401 V1.0.pdf', 0, (82, 401, 288, 532), 'lpr-fig1-3.png'),
    ('sg/说明书-车牌识别设备安装2401 V1.0.pdf', 0, (290, 401, 518, 531), 'lpr-fig1-4.png'),
    ('sg/说明书-车牌识别设备安装2401 V1.0.pdf', 0, (61, 611, 284, 784), 'lpr-fig2-1.png'),
    ('sg/说明书-车牌识别设备安装2401 V1.0.pdf', 0, (287, 614, 539, 783), 'lpr-fig2-2.png'),
    ('sg/说明书-车牌识别设备安装2401 V1.0.pdf', 1, (54, 147, 309, 366), 'lpr-fig3-1.png'),
    ('sg/说明书-车牌识别设备安装2401 V1.0.pdf', 1, (317, 144, 540, 366), 'lpr-fig3-2.png'),
    ('sg/说明书-车牌识别设备安装2401 V1.0.pdf', 1, (56, 475, 538, 760), 'lpr-fig4-1.png'),

    ('sg/说明书-道闸设备安装2401 V1.0.pdf', 0, (52, 175, 248, 351), 'bar-fig1-1.png'),
    ('sg/说明书-道闸设备安装2401 V1.0.pdf', 0, (249, 175, 499, 351), 'bar-fig1-2.png'),
    ('sg/说明书-道闸设备安装2401 V1.0.pdf', 0, (52, 352, 275, 502), 'bar-fig1-3.png'),
    ('sg/说明书-道闸设备安装2401 V1.0.pdf', 0, (276, 352, 498, 502), 'bar-fig1-4.png'),
    ('sg/说明书-道闸设备安装2401 V1.0.pdf', 0, (41, 528, 264, 781), 'bar-fig2-1.png'),
    ('sg/说明书-道闸设备安装2401 V1.0.pdf', 1, (52, 393, 552, 575), 'bar-fig3-1.png'),
    ('sg/说明书-道闸设备安装2401 V1.0.pdf', 1, (52, 578, 236, 780), 'bar-fig3-2.png'),
    ('sg/说明书-道闸设备安装2401 V1.0.pdf', 1, (246, 578, 483, 781), 'bar-fig3-3.png'),
    ('sg/说明书-道闸设备安装2401 V1.0.pdf', 2, (52, 89, 301, 416), 'bar-fig4-1.png'),
    ('sg/说明书-道闸设备安装2401 V1.0.pdf', 2, (306, 238, 443, 387), 'bar-fig4-2.png'),
]

cache = {}


def main():
    os.makedirs(OUT, exist_ok=True)
    for pdf, pno, bbox, name in JOBS:
        path = os.path.join(BASE, pdf.replace('/', os.sep))
        if path not in cache:
            cache[path] = fitz.open(path)
        doc = cache[path]
        page = doc[pno]
        pix = page.get_pixmap(matrix=fitz.Matrix(SCALE, SCALE))
        img = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
        x0, y0, x1, y1 = [int(v * SCALE) for v in bbox]
        x0 = max(0, x0); y0 = max(0, y0)
        x1 = min(pix.width, x1); y1 = min(pix.height, y1)
        crop = img.crop((x0, y0, x1, y1))
        if crop.width > 1500:
            h = int(crop.height * 1500 / crop.width)
            crop = crop.resize((1500, h), Image.LANCZOS)
        out = os.path.join(OUT, name)
        crop.save(out, optimize=True)
        print(name, crop.size, os.path.getsize(out) // 1024, 'KB')


if __name__ == '__main__':
    main()
