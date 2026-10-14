import re, os
from collections import Counter
ROOTS = ['docs']
# 已知硬件/方案厂商名（用户已给的 6 个映射之外的候选）
CAND = ['臻时','真识','芊熠','海康','大华','宇视','科发','信路通','赛菲姆','红门','杨宗来','华夏',
        '万集','捷顺','科拓','臻识科技','火眼','华夏视讯','安霸','华为','TP-Link','锐捷','中兴']
pat = re.compile('|'.join(map(re.escape, CAND)))
cnt = Counter(); ctx = {}
for r in ROOTS:
    for dp,dn,fn in os.walk(r):
        for f in fn:
            if not f.lower().endswith(('.md','.mdx')): continue
            fp = os.path.join(dp,f)
            t = open(fp, encoding='utf-8').read()
            for m in pat.finditer(t):
                w = m.group(0); cnt[w]+=1
                if w not in ctx:
                    ctx[w] = (fp, t[max(0,m.start()-14):m.end()+16].replace('\n','\\n'))
print('=== docs 中出现的其他厂商名（按次数降序）===')
for w,c in cnt.most_common():
    fp,s = ctx[w]
    print(f'{c:>4}  {w:<8} 例: ...{s}...   [{fp}]')
