import os

# Define the corrupted files and their details
# Format: (path, name, color_start, color_end)
images = [
    # Zara
    ("public/images/zara/lisboa.svg", "Lisboa", "#9AE1FF", "#6E93CC"),
    ("public/images/zara/man_silver.svg", "Man Silver", "#D3D3D3", "#808080"),
    ("public/images/zara/regal_white.svg", "Regal White", "#F5F5F5", "#E0E0E0"),
    ("public/images/zara/blue_spirit.svg", "Blue Spirit", "#4facfe", "#00f2fe"),
    
    # Originals
    ("public/images/originals/acqua_di_gio.svg", "Acqua di Gio", "#E0F7FA", "#B2EBF2"),
    ("public/images/originals/baccarat_rouge.svg", "Baccarat Rouge", "#FFCDD2", "#EF9A9A"),
    ("public/images/originals/bleu_de_chanel.svg", "Bleu de Chanel", "#1A237E", "#0D47A1"),
    ("public/images/originals/erba_pura.svg", "Erba Pura", "#FFF9C4", "#FFF59D"),
    ("public/images/originals/fat_electrician.svg", "Fat Electrician", "#CFD8DC", "#B0BEC5"),
    ("public/images/originals/gucci_guilty.svg", "Gucci Guilty", "#FFE082", "#FFCA28"),
    ("public/images/originals/invictus.svg", "Invictus", "#B3E5FC", "#81D4FA"),
    ("public/images/originals/kilian_angels_share.svg", "Angel's Share", "#D7CCC8", "#A1887F"),
    ("public/images/originals/tobacco_vanille.svg", "Tobacco Vanille", "#5D4037", "#3E2723"),
    ("public/images/originals/wood_sage.svg", "Wood Sage & Sea Salt", "#DCEDC8", "#AED581"),
]

base_dir = "d:/python/profumi"

def create_svg(path, text, color1, color2):
    svg_content = f'''<svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" />
  <rect x="50" y="50" width="300" height="500" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" rx="20" />
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="rgba(0,0,0,0.6)" text-anchor="middle" dominant-baseline="middle">
    {text}
  </text>
  <text x="50%" y="90%" font-family="Arial, sans-serif" font-size="14" fill="rgba(0,0,0,0.4)" text-anchor="middle">
    ScentSense Placeholder
  </text>
</svg>'''
    
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Generated {full_path}")

for img in images:
    create_svg(*img)
