import sys, re, urllib.request

URL = sys.argv[1] if len(sys.argv) > 1 else "https://doc.bolinkpaas.com/doc/1992"
KW = sys.argv[2] if len(sys.argv) > 2 else ""

req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")

# doc cloud stores markdown inside <textarea>; extract image markdown lines
ta = re.findall(r"<textarea[^>]*>(.*?)</textarea>", html, re.S)
blob = ta[0] if ta else html

imgs = re.findall(r"!\[([^\]]*)\]\((/(?:media|uploads)/[^)]+)\)", blob)
print(f"# {URL} -> found {len(imgs)} images")
for cap, path in imgs:
    line = f"![{cap}]({path})"
    if KW and (KW in cap or KW in path):
        print(">> ", line)
    else:
        print("   ", line)
