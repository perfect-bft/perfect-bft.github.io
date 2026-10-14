import sys, re, urllib.request

URL = sys.argv[1]
WANT = set(int(x) for x in sys.argv[2:]) if len(sys.argv) > 2 else None
req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")
ta = re.findall(r"<textarea[^>]*>(.*?)</textarea>", html, re.S)
blob = ta[0] if ta else html
blob = blob.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&").replace("&nbsp;", " ")

parts = re.split(r"(!\[[^\]]*\]\(/(?:media|uploads)/[^)]+\))", blob)
i = 0
img_idx = 0
while i < len(parts):
    seg = parts[i]
    if seg.startswith("![") and ("](/media" in seg or "](/uploads" in seg):
        if WANT is None or img_idx in WANT:
            m = re.search(r"\((/[^)]+)\)", seg)
            prev = re.sub(r"\s+", " ", parts[i-1]).strip()[-120:] if i > 0 else "(start)"
            print(f"IMG {img_idx}: {m.group(1)}")
            print(f"   ctx: {prev}")
        img_idx += 1
    i += 1
