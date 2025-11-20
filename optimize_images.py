#!/usr/bin/env python3
"""
Resize and optimize large images used by the site.
Generates: IMG_8115-800.jpg and IMG_8115-400.jpg (quality=78)
Run: python optimize_images.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent
ASSETS = ROOT / "assets"
SOURCE = ASSETS / "IMG_8115.jpg"

TARGETS = [
    (800, "IMG_8115-800.jpg"),
    (400, "IMG_8115-400.jpg"),
]

if not SOURCE.exists():
    print(f"Source image not found: {SOURCE}")
    raise SystemExit(1)

print(f"Optimizing {SOURCE} -> {len(TARGETS)} variants")
with Image.open(SOURCE) as im:
    im = im.convert("RGB")
    for width, name in TARGETS:
        ratio = width / im.width
        height = int(im.height * ratio)
        resized = im.resize((width, height), Image.LANCZOS)
        out_path = ASSETS / name
        resized.save(out_path, format="JPEG", quality=78, optimize=True, progressive=True)
        print(f"Saved: {out_path} ({out_path.stat().st_size} bytes)")

print("Done")
