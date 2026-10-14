# -*- coding: utf-8 -*-
import os, sys, io
from PIL import Image
APPLY = '--apply' in sys.argv
MAX_EDGE = 2000          # 长边超过则缩到 2000px（网页显示足够清晰）
MIN_RATIO = 0.8          # 新体积需 < 原*0.8 才替换
ROOTS = [r'D:\my-docusaurus-site\docs', r'D:\my-docusaurus-site\static']
EXTS = ('.png', '.jpg', '.jpeg', '.webp', '.gif')
total_saved = 0
n_save = n_skip = 0
for root in ROOTS:
    for dp, dn, fn in os.walk(root):
        for f in fn:
            if not f.lower().endswith(EXTS):
                continue
            p = os.path.join(dp, f)
            try:
                sz = os.path.getsize(p)
            except Exception:
                continue
            if sz < 1024 * 1024:
                continue
            try:
                img = Image.open(p)
                w, h = img.size
                fmt = img.format or ('JPEG' if f.lower().endswith(('.jpg', '.jpeg')) else 'PNG')
                scale = min(1.0, MAX_EDGE / max(w, h))
                new = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS) if scale < 1.0 else img
                buf = io.BytesIO()
                if fmt == 'JPEG':
                    if new.mode in ('RGBA', 'P', 'LA'):
                        new = new.convert('RGB')
                    new.save(buf, 'JPEG', quality=82, optimize=True, progressive=True)
                elif fmt == 'PNG':
                    new.save(buf, 'PNG', optimize=True)
                elif fmt == 'WEBP':
                    new.save(buf, 'WEBP', quality=82)
                else:
                    new.save(buf, fmt, optimize=True)
                new_sz = buf.tell()
            except Exception as e:
                print('ERR', p, e)
                continue
            if new_sz < sz * MIN_RATIO:
                n_save += 1
                saved = sz - new_sz
                total_saved += saved
                tag = 'WILL-SAVE' if not APPLY else 'SAVED'
                print(f'{tag} {sz/1024/1024:6.2f}->{new_sz/1024/1024:6.2f}MB (-{saved/1024/1024:.2f}) {w}x{h}->{new.size[0]}x{new.size[1]} {p}')
                if APPLY:
                    if fmt == 'JPEG':
                        new.save(p, 'JPEG', quality=82, optimize=True, progressive=True)
                    elif fmt == 'PNG':
                        new.save(p, 'PNG', optimize=True)
                    elif fmt == 'WEBP':
                        new.save(p, 'WEBP', quality=82)
                    else:
                        new.save(p, fmt, optimize=True)
            else:
                n_skip += 1
                print(f'SKIP {sz/1024/1024:6.2f}MB (压缩后{new_sz/1024/1024:.2f}MB) {p}')
print(f'\n{"[DRY-RUN] " if not APPLY else "[APPLY] "}将节省 {total_saved/1024/1024:.1f}MB；替换 {n_save} 张，跳过 {n_skip} 张')
