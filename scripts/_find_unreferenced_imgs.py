import os, re, shutil, datetime, sys

REPO = r'D:\my-docusaurus-site'
IMG_EXT = {'.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp'}

# 引用扫描范围（排除大目录/构建产物/回收）
SCAN_DIRS = ['docs', 'src', 'static']
SCAN_ROOT_FILES = []  # 根级配置另行处理
EXCLUDE_DIRS = {'node_modules', 'build', 'build_v21', 'build_v22', 'build_v23',
                '_trash', '.git', '.docusaurus', '.workbuddy', 'scripts'}
REF_EXT = {'.md', '.mdx', '.js', '.ts', '.tsx', '.jsx', '.css', '.html',
           '.json', '.yml', '.yaml'}

def collect_images():
    imgs = []
    for d in SCAN_DIRS:
        root = os.path.join(REPO, d)
        if not os.path.isdir(root):
            continue
        for dp, dn, fn in os.walk(root):
            dn[:] = [x for x in dn if x not in EXCLUDE_DIRS]
            for f in fn:
                if os.path.splitext(f)[1].lower() in IMG_EXT:
                    imgs.append(os.path.join(dp, f))
    # 根级配置文件
    for f in os.listdir(REPO):
        p = os.path.join(REPO, f)
        if os.path.isfile(p) and os.path.splitext(f)[1].lower() in REF_EXT:
            pass  # 配置引用极少，跳过以防误判（如 docusaurus.config 引用 static 资源）
    return imgs

def collect_ref_text():
    """读取所有源码文件内容，拼接为小写文本；返回 (text, list_of_files_scanned)。"""
    parts = []
    scanned = 0
    # 根级配置文件（docusaurus.config.js 引用 logo/favicon/social-card 等，必须纳入）
    for f in os.listdir(REPO):
        p = os.path.join(REPO, f)
        if os.path.isfile(p) and os.path.splitext(f)[1].lower() in REF_EXT:
            try:
                with open(p, encoding='utf-8', errors='ignore') as fh:
                    parts.append(fh.read())
                scanned += 1
            except Exception:
                pass
    for d in SCAN_DIRS:
        root = os.path.join(REPO, d)
        if not os.path.isdir(root):
            continue
        for dp, dn, fn in os.walk(root):
            dn[:] = [x for x in dn if x not in EXCLUDE_DIRS]
            for f in fn:
                if os.path.splitext(f)[1].lower() in REF_EXT:
                    p = os.path.join(dp, f)
                    try:
                        with open(p, encoding='utf-8', errors='ignore') as fh:
                            parts.append(fh.read())
                        scanned += 1
                    except Exception:
                        pass
    return '\n'.join(parts).lower(), scanned

def main():
    print('== 扫描图片文件 ==')
    imgs = collect_images()
    print(f'候选图片总数: {len(imgs)}')
    text, nfiles = collect_ref_text()
    print(f'引用扫描文件数: {nfiles}')

    unref = []
    for p in imgs:
        rel = os.path.relpath(p, REPO).replace('\\', '/')
        base = os.path.basename(p).lower()
        # 在引用文本中查找：basename，或路径片段（static/...、img/...、docs/...）
        hits = []
        if base in text:
            hits.append('basename')
        # 路径片段：取相对路径去掉顶级目录后更易命中
        frag = rel.lower()
        if frag in text:
            hits.append('relpath')
        # 也试 static/ 起、img/ 起
        for prefix in ('static/', 'docs/', 'img/', 'files/'):
            if frag.startswith(prefix) and frag[len(prefix):] in text:
                hits.append(prefix + '...')
                break
        if not hits:
            unref.append(p)

    total = sum(os.path.getsize(p) for p in unref)
    print(f'\n== 零引用图片: {len(unref)} 张, 合计 {total/1024/1024:.2f} MB ==')
    # 报告按目录分组
    bydir = {}
    for p in unref:
        rel = os.path.relpath(p, REPO).replace('\\', '/')
        top = rel.split('/')[0] + '/' + rel.split('/')[1] if '/' in rel else rel
        bydir.setdefault(top, []).append(rel)
    for k in sorted(bydir):
        sz = sum(os.path.getsize(os.path.join(REPO, x)) for x in bydir[k])
        print(f'\n[{k}] {len(bydir[k])} 张, {sz/1024/1024:.2f} MB')
        for x in sorted(bydir[k]):
            print('   ', x)

    # 写入报告
    rep = os.path.join(REPO, 'scripts', '_unref_imgs_report.txt')
    with open(rep, 'w', encoding='utf-8') as fh:
        fh.write(f'unreferenced images: {len(unref)}\n')
        fh.write(f'total MB: {total/1024/1024:.2f}\n')
        for p in unref:
            rel = os.path.relpath(p, REPO).replace('\\', '/')
            fh.write(f'{rel}\t{os.path.getsize(p)}\n')
    print(f'\n报告已写: {rep}')

    # --apply：把零引用图移入 _trash（同盘移动=重命名，可逆，不触发 safe-delete）
    if '--apply' in sys.argv:
        ts = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
        dst_root = os.path.join(REPO, '_trash', f'unref_imgs_{ts}')
        moved = 0
        for p in unref:
            rel = os.path.relpath(p, REPO).replace('\\', '/')
            dst = os.path.join(dst_root, rel)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.move(p, dst)
            moved += 1
        print(f'\n[--apply] 已移动 {moved} 张至: {dst_root}')

if __name__ == '__main__':
    main()
