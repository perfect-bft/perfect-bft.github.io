import shutil, os
targets = [r'D:\.build_trash', r'D:\my-docusaurus-site\my-docusaurus-site']
for t in targets:
    if os.path.exists(t):
        shutil.rmtree(t)
        print('REMOVED', t)
    else:
        print('MISSING', t)
print('DONE')
