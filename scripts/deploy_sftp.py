# -*- coding: utf-8 -*-
"""
增量 SFTP 部署脚本：本地 build/ -> 远端 IIS 站点根目录(默认 C:/website/doc)

v2 修复（重要）：
 - 旧版用「文件大小」判定是否更新 -> Docusaurus 的 HTML 因哈希文件名等长、
   内容变化但字节数不变，会被误判为"无需更新"，导致 HTML 不更新、
   而旧资源被删 => 线上 404 无样式。**已改为「内容 MD5 清单」判定**。
 - 删除改为默认不执行，需显式 --prune；且仅删「受管子树」内文件，
   永久保留 web.config / .nojekyll / 根目录验证 .txt。

判定方式：本地文件 MD5 与 .deploy-manifest.json（上次成功部署的快照）比对，
  新增或内容变化的才上传；远端遍历只在 --prune 时进行。

用法（凭据可存在 scripts/deploy.config.json，环境变量优先）：
  # 探测远端路径格式
  python scripts/deploy_sftp.py --probe
  # 预演（不写远端）
  python scripts/deploy_sftp.py
  # 正式发布（增量，安全）
  python scripts/deploy_sftp.py --apply
  # 强制全量覆盖（忽略清单）
  python scripts/deploy_sftp.py --apply --force
  # 发布并清理远端多余文件（受管子树内）
  python scripts/deploy_sftp.py --apply --prune
"""
import os
import sys
import io
import time
import json
import hashlib
import argparse

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import paramiko

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCAL = os.path.join(BASE, 'build')
MANIFEST = os.path.join(BASE, '.deploy-manifest.json')
CONFIG_PATH = os.path.join(BASE, 'scripts', 'deploy.config.json')


def load_config():
    """读取 scripts/deploy.config.json（用户存储的服务器信息）。
    环境变量优先级高于配置文件。不含口令时返回 {}。"""
    if os.path.exists(CONFIG_PATH):
        try:
            return json.load(open(CONFIG_PATH, encoding='utf-8'))
        except Exception:
            return {}
    return {}

# 受管条目（来自 docusaurus build 产出），删除仅限这些子树
MANAGED = [
    'docs', 'assets', 'img', 'js', 'files', 'images', 'markdown-page',
    'gallery-manifest.json', '404.html', 'index.html', 'sitemap.xml',
    'robots.txt', 'asset-manifest.json', 'manifest.webmanifest', 'sw.js',
]
# 根目录永久保留（非 build 产出）
PROTECT = {'web.config', '.nojekyll'}


def log(*a):
    print('[%s]' % time.strftime('%H:%M:%S'), *a, flush=True)


def connect(cfg=None):
    cfg = cfg or {}
    host = os.environ.get('DEPLOY_HOST') or cfg.get('host')
    port = int(os.environ.get('DEPLOY_PORT') or cfg.get('port', 22))
    user = os.environ.get('DEPLOY_USER') or cfg.get('user')
    passwd = os.environ.get('DEPLOY_PASS') or cfg.get('password')
    key = os.environ.get('DEPLOY_KEY') or cfg.get('key')
    if not host or not user:
        raise SystemExit('缺少 host/user：请配置 scripts/deploy.config.json 或传 DEPLOY_HOST/DEPLOY_USER')
    last = None
    for i in range(15):
        try:
            log('connecting %s@%s:%d ... (attempt %d)' % (user, host, port, i + 1))
            t = paramiko.Transport((host, port))
            if key:
                pkey = paramiko.RSAKey.from_private_key_file(
                    key, password=os.environ.get('DEPLOY_KEY_PASS'))
                t.connect(username=user, pkey=pkey)
            else:
                t.connect(username=user, password=passwd)
            sftp = paramiko.SFTPClient.from_transport(t)
            log('connected')
            return t, sftp
        except Exception as e:
            last = e
            wait = 4 + i * 2
            log('connect failed: %s; retry in %ds' % (repr(e)[:120], wait))
            time.sleep(wait)
    raise last


def md5_file(path):
    h = hashlib.md5()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(1 << 16), b''):
            h.update(chunk)
    return h.hexdigest()


def remote_walk(sftp, root):
    """递归列出 root 下所有文件绝对路径"""
    files = set()
    if not root:
        return files
    try:
        entries = sftp.listdir_attr(root)
    except IOError:
        return files
    dirs = []
    for e in entries:
        p = root + '/' + e.filename
        mode = e.st_mode
        if mode is not None and (mode & 0o170000) == 0o040000:
            dirs.append(p)
        else:
            files.add(p)
    for d in dirs:
        files |= remote_walk(sftp, d)
    return files


def ensure_dir(sftp, path):
    try:
        sftp.stat(path)
    except IOError:
        parent = path.rsplit('/', 1)[0]
        if parent and parent != path:
            ensure_dir(sftp, parent)
        try:
            sftp.mkdir(path)
        except IOError:
            pass


def is_protected(rel):
    return rel.split('/', 1)[0] in PROTECT or rel in PROTECT


def in_managed(rel):
    top = rel.split('/', 1)[0]
    return top in MANAGED or rel in MANAGED


def main():
    ap = argparse.ArgumentParser()
    cfg = load_config()
    ap.add_argument('--remote-root', default=cfg.get('remote_root', 'C:/website/doc'))
    ap.add_argument('--apply', action='store_true', help='真正执行(默认 dry-run)')
    ap.add_argument('--probe', action='store_true', help='只探测远端路径格式')
    ap.add_argument('--force', action='store_true', help='忽略清单，强制上传全部本地文件')
    ap.add_argument('--prune', action='store_true',
                    help='删除远端受管子树内、本地已不存在的文件（默认不删）')
    args = ap.parse_args()

    t, sftp = connect(cfg)

    if args.probe:
        for cand in ['C:/website/doc', '/C:/website/doc']:
            try:
                st = sftp.stat(cand)
                log('PROBE OK:', cand, st)
            except Exception as e:
                log('PROBE FAIL:', cand, repr(e))
        t.close()
        return

    root = args.remote_root
    log('remote root:', root)

    # 1. 本地文件 + MD5
    local = {}
    for base, _dirs, fnames in os.walk(LOCAL):
        for f in fnames:
            full = os.path.join(base, f)
            rel = os.path.relpath(full, LOCAL).replace('\\', '/')
            local[rel] = (full, md5_file(full))
    log('local files:', len(local))

    # 2. 上次部署清单
    manifest = {}
    if os.path.exists(MANIFEST):
        try:
            manifest = json.load(open(MANIFEST, encoding='utf-8'))
        except Exception:
            manifest = {}
    log('manifest entries:', len(manifest))

    # 3. 需要上传 = 清单缺失 或 MD5 变化
    if args.force:
        to_upload = sorted(local.keys())
        log('FORCE mode: upload ALL %d files' % len(to_upload))
    else:
        to_upload = sorted(r for r, (_f, h) in local.items() if manifest.get(r) != h)
    log('UPLOAD(changed/new): %d' % len(to_upload))

    # 4. 删除（仅 --prune）
    to_delete = []
    if args.prune:
        remote_all = remote_walk(sftp, root)
        remote_rel = set(r[len(root) + 1:] for r in remote_all if r.startswith(root + '/'))
        to_delete = sorted(r for r in (remote_rel - set(local))
                           if in_managed(r) and not is_protected(r))
        log('PRUNE: remote files %d, to delete %d (managed, non-protected)'
            % (len(remote_rel), len(to_delete)))
        for r in to_delete[:100]:
            log('   del:', r)
        if len(to_delete) > 100:
            log('   ... (%d more)' % (len(to_delete) - 100))

    if not args.apply:
        log('DRY-RUN only. Add --apply to execute.')
        t.close()
        return

    # 5. 上传
    n = 0
    for rel in to_upload:
        lf, _h = local[rel]
        rf = root + '/' + rel
        ensure_dir(sftp, rf.rsplit('/', 1)[0])
        sftp.put(lf, rf)
        n += 1
        if n % 200 == 0:
            log('  uploaded %d/%d' % (n, len(to_upload)))
    log('uploaded %d' % n)

    # 6. 删除
    dn = 0
    for rel in to_delete:
        try:
            sftp.remove(root + '/' + rel)
            dn += 1
        except Exception as e:
            log('del fail', rel, e)
    log('deleted %d' % dn)

    # 7. 写清单（成功才写）
    new_manifest = {r: h for r, (_f, h) in local.items()}
    json.dump(new_manifest, open(MANIFEST, 'w', encoding='utf-8'), ensure_ascii=False)
    log('manifest written:', MANIFEST)

    t.close()
    log('done.')


if __name__ == '__main__':
    main()
