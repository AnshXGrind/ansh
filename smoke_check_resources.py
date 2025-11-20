# smoke_check_resources.py
# Quick resource & status checker for a local site

import sys, requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup

if len(sys.argv) < 2:
    print("Usage: python smoke_check_resources.py http://localhost:8080/")
    sys.exit(1)

url = sys.argv[1].rstrip('/') + '/'
print("Checking:", url)
try:
    r = requests.get(url, timeout=15)
except Exception as e:
    print("Error fetching page:", e); sys.exit(2)

print("Page status:", r.status_code)
html = r.text
soup = BeautifulSoup(html, "html.parser")
resources = []
# link/script/img tags
for tag, attr in (("link","href"),("script","src"),("img","src")):
    for t in soup.find_all(tag):
        src = t.get(attr)
        if not src: continue
        resources.append(urljoin(url, src))

print(f"Found {len(resources)} resources. Fetching statuses...")
total_bytes = 0
for res in resources:
    try:
        rr = requests.get(res, timeout=15)
        size = len(rr.content or b"")
        total_bytes += size
        print(f"{rr.status_code} {size:6d} bytes  {res}")
    except Exception as e:
        print("ERR", res, e)

print("Total resources bytes:", total_bytes)
