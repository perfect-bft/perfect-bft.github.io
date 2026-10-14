import sys, re, urllib.request

URL = sys.argv[1] if len(sys.argv) > 1 else "https://doc.bolinkpaas.com/doc/1171"
req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")
ta = re.findall(r"<textarea[^>]*>(.*?)</textarea>", html, re.S)
blob = ta[0] if ta else html
# unescape basic html entities
blob = blob.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&").replace("&nbsp;", " ")

# split by image markdown, keep preceding text
parts = re.split(r"(!\[[^\]]*\]\(/(?:media|uploads)/[^)]+\))", blob)
# parts: [text0, img1, text1, img2, text2, ...]
i = 0
img_idx = 0
while i < len(parts):
    seg = parts[i]
    if seg.startswith("![") and "](/media" in seg or "](/uploads" in seg:
        # this is an image token
        prev = parts[i-1] if i > 0 else ""
        # grab last 160 chars of previous text (strip newlines)
        ctx = re.sub(r"\s+", " ", prev).strip()[-160:]
        print(f"--- IMG {img_idx} {seg[:60]}...")
        print("   ctx:", ctx if ctx else "(start)")
        img_idx += 1
    i += 1
