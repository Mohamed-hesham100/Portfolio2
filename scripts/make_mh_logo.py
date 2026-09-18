"""Build a clean flat MH monogram logo (circular PNG + SVG)."""
from PIL import Image, ImageDraw, ImageFilter
import math
import os

SIZE = 1024
OUT_DIR = r"d:\portfolio\my-portfolio\public"


def lerp(a, b, t):
    return a + (b - a) * t


def grad_at(t: float):
    stops = [
        (0.0, (59, 167, 255)),
        (0.38, (46, 200, 212)),
        (0.68, (82, 232, 120)),
        (1.0, (143, 255, 58)),
    ]
    t = max(0.0, min(1.0, t))
    for i in range(len(stops) - 1):
        t0, c0 = stops[i]
        t1, c1 = stops[i + 1]
        if t0 <= t <= t1:
            u = 0 if t1 == t0 else (t - t0) / (t1 - t0)
            return tuple(int(lerp(c0[j], c1[j], u)) for j in range(3)) + (255,)
    return stops[-1][1] + (255,)


def thick_poly(points, thickness):
    """Expand a polyline into a filled polygon strip."""
    if len(points) < 2:
        return []
    # Build left/right offsets along each segment and miter joins simply
    left, right = [], []
    for i in range(len(points) - 1):
        x1, y1 = points[i]
        x2, y2 = points[i + 1]
        dx, dy = x2 - x1, y2 - y1
        L = math.hypot(dx, dy) or 1
        nx, ny = -dy / L, dx / L
        half = thickness / 2
        if i == 0:
            left.append((x1 + nx * half, y1 + ny * half))
            right.append((x1 - nx * half, y1 - ny * half))
        left.append((x2 + nx * half, y2 + ny * half))
        right.append((x2 - nx * half, y2 - ny * half))
    return left + list(reversed(right))


def main():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    pad = 4
    # Navy circle
    draw.ellipse([pad, pad, SIZE - 1 - pad, SIZE - 1 - pad], fill=(11, 18, 32, 255))

    # Letter bounding box
    top, bottom = 210, 814
    left, right = 198, 816
    mid_x = 470  # shared stem center
    sw = 92  # stroke width

    # --- H mask ---
    h_mask = Image.new("L", (SIZE, SIZE), 0)
    hd = ImageDraw.Draw(h_mask)

    # Left stem of H (shared)
    hd.rounded_rectangle(
        [mid_x - sw // 2, top, mid_x + sw // 2, bottom], radius=6, fill=255
    )
    # Crossbar
    bar_y = (top + bottom) // 2
    hd.rounded_rectangle(
        [mid_x - sw // 2, bar_y - sw // 2, right - 20, bar_y + sw // 2],
        radius=6,
        fill=255,
    )
    # Right stem with bottom-inner diagonal cut
    rx0 = right - sw - 8
    rx1 = right
    # main rect
    hd.rounded_rectangle([rx0, top, rx1, bottom], radius=6, fill=255)
    # cut notch (erase triangle/wedge on inner side)
    cut = Image.new("L", (SIZE, SIZE), 0)
    cd = ImageDraw.Draw(cut)
    cy0 = bar_y + sw // 2 + 20
    cd.polygon(
        [
            (rx0 - 2, cy0),
            (rx0 + sw * 0.55, cy0 + 70),
            (rx0 - 2, cy0 + 140),
        ],
        fill=255,
    )
    # subtract cut from h_mask
    h_px = h_mask.load()
    c_px = cut.load()
    for y in range(SIZE):
        for x in range(rx0 - 2, rx0 + int(sw * 0.6)):
            if c_px[x, y] > 0:
                h_px[x, y] = 0

    # Fill H with gradient
    px = img.load()
    hm = h_mask.load()
    for y in range(top - 5, bottom + 5):
        t = (y - top) / max(1, (bottom - top))
        color = grad_at(t)
        for x in range(left, right + 5):
            if hm[x, y] > 128:
                px[x, y] = color

    # --- White M ---
    # Angular M path points (centerline)
    m_points = [
        (220, 780),
        (290, 230),
        (370, 230),
        (430, 560),
        (500, 230),
        (575, 230),
        (545, 340),  # short down into H
    ]
    # Draw as separate thick segments for sharper corners
    md = ImageDraw.Draw(img)
    white = (255, 255, 255, 255)

    def seg(a, b, th=sw):
        poly = thick_poly([a, b], th)
        if len(poly) >= 3:
            md.polygon(poly, fill=white)
        r = th / 2
        md.ellipse([a[0] - r, a[1] - r, a[0] + r, a[1] + r], fill=white)
        md.ellipse([b[0] - r, b[1] - r, b[0] + r, b[1] + r], fill=white)

    # Classic M: left up, down to valley, up to right peak, short into shared stem
    A = (215, 790)
    B = (295, 220)  # left peak
    C = (385, 620)  # valley
    D = (510, 220)  # right peak
    E = (545, 400)  # into H
    th = sw * 1.02
    seg(A, B, th)
    seg(B, C, th)
    seg(C, D, th)
    seg(D, E, th * 0.95)

    # Circular alpha
    mask = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(mask).ellipse([pad, pad, SIZE - 1 - pad, SIZE - 1 - pad], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(0.7))
    img.putalpha(mask)

    for name in ("logo-mh.png", "logo.png", "logo-3d.png"):
        path = os.path.join(OUT_DIR, name)
        img.save(path, "PNG", optimize=True)
        print("wrote", path, os.path.getsize(path))


if __name__ == "__main__":
    main()
