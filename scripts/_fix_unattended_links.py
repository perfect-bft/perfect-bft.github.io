# 修复 docs/unattended/ 下三篇兄弟文档的互链。
#
# 关键：Docusaurus 解析相对链接时，把来源 .md 文件当作其“同名目录”处理。
#   docs/unattended/display-screen.md 在构建后位于 /docs/unattended/display-screen/，
#   因此从该页链接兄弟页时：
#     ./intercom-card  -> 解析为 /docs/unattended/display-screen/intercom-card/  ❌ 404
#     ../intercom-card -> 解析为 /docs/unattended/intercom-card/                  ✅ 正确
#   三篇（display-screen / intercom-card / intercom-phone）是 docs/unattended/ 下的
#   同级文件，互链必须用 ../ 回到 unattended/ 再进入兄弟页。
#
# 本脚本只把“错误”的 ./兄弟页 改成 ../兄弟页，已正确的 ../兄弟页 不动（幂等）。
import os, re

base = r'D:\my-docusaurus-site\docs\unattended'
bro = ['intercom-card', 'intercom-phone', 'display-screen']
# 匹配 ./兄弟页（错误写法），捕获兄弟页 id
pat = re.compile(r'\]\((\./)(' + '|'.join(bro) + r')\)')

for f in os.listdir(base):
    if f.endswith('.md'):
        p = os.path.join(base, f)
        t = open(p, encoding='utf-8').read()
        cnt = len(pat.findall(t))
        if cnt:
            new = pat.sub(lambda m: '](../' + m.group(2) + ')', t)
            open(p, 'w', encoding='utf-8').write(new)
            print(f'{f}: {cnt} 处 ./ -> ../ （修正为同级互链）')
