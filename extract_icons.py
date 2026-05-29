"""
Extrae íconos del anillo exterior (r=474-658) de rueda de procesos.png
usando connected components. Guarda en app/public/images/icon_XX.png
"""
from PIL import Image
import numpy as np
from scipy import ndimage
import math, os

img = Image.open("rueda de procesos.png").convert("RGBA")
arr = np.array(img)
W, H = img.size
cx, cy = 691, 691

# --- Máscara del anillo de íconos ---
y_c, x_c = np.mgrid[0:H, 0:W]
dist = np.sqrt((x_c - cx)**2 + (y_c - cy)**2)

R_INNER = 478   # radio interior del anillo blanco (después del cyan inner)
R_OUTER = 650   # radio exterior del anillo (antes del cyan outer)

ring_mask = (dist >= R_INNER) & (dist <= R_OUTER)

# Píxeles opacos en el anillo (alpha > 80)
alpha = arr[:,:,3]
opaque_in_ring = ring_mask & (alpha > 80)

# Excluir píxeles cyan del borde (los cyan son r,g,b ≈ 0,168,226)
r_ch = arr[:,:,0].astype(int)
g_ch = arr[:,:,1].astype(int)
b_ch = arr[:,:,2].astype(int)
is_cyan = (b_ch > 150) & (g_ch > 120) & (r_ch < 50)

icon_mask = opaque_in_ring & ~is_cyan

print(f"Píxeles ícono en anillo: {icon_mask.sum()}")

# --- Connected components ---
labeled, n_components = ndimage.label(icon_mask)
print(f"Componentes encontradas: {n_components}")

# Calcular tamaño y ángulo central de cada componente
components = []
for i in range(1, n_components + 1):
    comp_mask = labeled == i
    size = comp_mask.sum()
    if size < 200:  # ignorar ruido pequeño
        continue
    ys, xs = np.where(comp_mask)
    # centro de masa
    cy_comp = ys.mean()
    cx_comp = xs.mean()
    # ángulo desde centro de la imagen (0=este, sentido horario)
    angle = math.degrees(math.atan2(cy_comp - cy, cx_comp - cx))
    # normalizar a 0-360 (sentido horario desde norte)
    angle_cw_from_north = (angle + 90) % 360
    components.append({
        "id": i,
        "size": size,
        "cx": cx_comp,
        "cy": cy_comp,
        "angle_north_cw": angle_cw_from_north,
        "xmin": xs.min(), "xmax": xs.max(),
        "ymin": ys.min(), "ymax": ys.max(),
    })

# Ordenar por ángulo horario desde norte
components.sort(key=lambda c: c["angle_north_cw"])

print(f"\nComponentes válidas (size >= 200): {len(components)}")
print(f"{'Nº':>3}  {'Ángulo':>8}  {'Tamaño':>8}  {'Bounding box'}")
for i, c in enumerate(components):
    print(f"{i+1:>3}  {c['angle_north_cw']:>8.1f}°  {c['size']:>8}  "
          f"({c['xmin']},{c['ymin']})-({c['xmax']},{c['ymax']})")

# --- Agrupar componentes cercanas en ángulo (pertenecen al mismo ícono) ---
MERGE_ANGLE_DEG = 15  # si están a <15° se consideran el mismo ícono

merged = []
used = set()
for i, c in enumerate(components):
    if i in used:
        continue
    group = [c]
    used.add(i)
    for j, c2 in enumerate(components):
        if j in used:
            continue
        diff = abs(c["angle_north_cw"] - c2["angle_north_cw"])
        if diff > 180:
            diff = 360 - diff
        if diff < MERGE_ANGLE_DEG:
            group.append(c2)
            used.add(j)
    # bounding box unificado
    xmin = min(g["xmin"] for g in group)
    xmax = max(g["xmax"] for g in group)
    ymin = min(g["ymin"] for g in group)
    ymax = max(g["ymax"] for g in group)
    angle_avg = sum(g["angle_north_cw"] for g in group) / len(group)
    merged.append({
        "angle": angle_avg,
        "xmin": xmin, "xmax": xmax,
        "ymin": ymin, "ymax": ymax,
        "n_parts": len(group),
    })

merged.sort(key=lambda c: c["angle"])

print(f"\nÍconos agrupados: {len(merged)}")
for i, m in enumerate(merged):
    print(f"  {i+1:>2}. ángulo={m['angle']:.1f}° bbox=({m['xmin']},{m['ymin']})-({m['xmax']},{m['ymax']}) partes={m['n_parts']}")

# --- Exportar cada ícono con padding ---
out_dir = "app/public/images"
os.makedirs(out_dir, exist_ok=True)

PAD = 20  # padding en píxeles

for i, m in enumerate(merged):
    x1 = max(0, m["xmin"] - PAD)
    y1 = max(0, m["ymin"] - PAD)
    x2 = min(W, m["xmax"] + PAD)
    y2 = min(H, m["ymax"] + PAD)
    crop = img.crop((x1, y1, x2, y2))
    fname = os.path.join(out_dir, f"icon_{i+1:02d}.png")
    crop.save(fname)
    print(f"Guardado: {fname}  ({x2-x1}x{y2-y1}px)  ángulo={m['angle']:.1f}°")

print(f"\n✓ {len(merged)} íconos guardados en {out_dir}/")
print("Renombralos según corresponda a cada imagen del juego.")
