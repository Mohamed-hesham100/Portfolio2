from PIL import Image, ImageDraw, ImageFilter
import os

src = r"C:\Users\MASR FRANSA\.cursor\projects\d-portfolio\assets\logo-mh.png"
img = Image.open(src).convert("RGBA")
size = 1024
img = img.resize((size, size), Image.Resampling.LANCZOS)

pad = 4
mask = Image.new("L", (size, size), 0)
d = ImageDraw.Draw(mask)
d.ellipse([pad, pad, size - 1 - pad, size - 1 - pad], fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(0.6))

navy = Image.new("RGBA", (size, size), (0, 0, 0, 0))
nd = ImageDraw.Draw(navy)
nd.ellipse([pad, pad, size - 1 - pad, size - 1 - pad], fill=(11, 18, 32, 255))
navy.paste(img, (0, 0), img)
navy.putalpha(mask)

for dest in [
    r"d:\portfolio\my-portfolio\public\logo-mh.png",
    r"d:\portfolio\my-portfolio\public\logo.png",
]:
    navy.save(dest, "PNG", optimize=True)
    print("saved", dest, os.path.getsize(dest))
