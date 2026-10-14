import re, os

ROOT = r"D:\my-docusaurus-site"
STATIC = os.path.join(ROOT, "static")
docs = [r"docs\bl\program\1.md", r"docs\bl\program\2.md", r"docs\bl\program\index.md"]
img_re = re.compile(r"!\[[^\]]*\]\((/img/[^)]+)\)")

all_refs = {}
for d in docs:
    p = os.path.join(ROOT, d)
    with open(p, encoding="utf-8") as f:
        txt = f.read()
    for m in img_re.finditer(txt):
        all_refs.setdefault(m.group(1), []).append(d)

print(f"total unique image refs across docs: {len(all_refs)}")
bad = []
for ref in sorted(all_refs):
    fpath = os.path.join(ROOT, "static", ref.lstrip("/").replace("/", os.sep))
    if not os.path.exists(fpath):
        bad.append((ref, "MISSING FILE"))
        continue
    with open(fpath, "rb") as fh:
        head = fh.read(8)
    ok = False
    if head[:4] == b"\x89PNG" or head[:3] == b"GIF" or head[:5] == b"%PDF-":
        ok = True
    elif head[:4] == b"<?xm" or head[:5] == b"<svg " or b"<svg" in head[:64]:
        ok = True  # svg (xml)
    elif head[:2] == b"\xff\xd8":
        ok = True  # jpeg
    if not ok:
        bad.append((ref, f"BAD HEADER {head!r}"))

if bad:
    print("PROBLEMS:")
    for ref, msg in bad:
        print(f"  {msg}: {ref}  (used in {all_refs[ref]})")
else:
    print("ALL REFERENCED IMAGES EXIST AND HAVE VALID HEADERS ✅")
