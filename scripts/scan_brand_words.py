import re, os
ROOTS = ['docs', 'src', 'sidebars.js', 'docusaurus.config.js', 'README.md']
WORDS = ['臻识','华夏','方控','道通','华安','答案']
pat = re.compile('|'.join(WORDS))
files = []
for r in ROOTS:
    if os.path.isfile(r): files.append(r)
    else:
        for dp,dn,fn in os.walk(r):
            for f in fn:
                if f.lower().endswith(('.md','.mdx','.js','.jsx','.ts','.tsx','.html','.json','.yml','.yaml')):
                    files.append(os.path.join(dp,f))
tot = {}
samples = {}
for fp in files:
    try: t = open(fp, encoding='utf-8').read()
    except Exception: continue
    for m in pat.finditer(t):
        w = m.group(0)
        tot[w] = tot.get(w,0)+1
        s = t[max(0,m.start()-12):m.end()+14].replace('\n','\\n')
        samples.setdefault(w, []).append((fp, s))
print('=== 总计数 ===')
for w,c in sorted(tot.items(), key=lambda x:-x[1]): print(f'{w}: {c}')
print()
for w in WORDS:
    lst = samples.get(w,[])
    print(f'=== {w} ({len(lst)}) 样例(最多40) ===')
    for fp,s in lst[:40]: print(f'  [{fp}] ...{s}...')
    print()
