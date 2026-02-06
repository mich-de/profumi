# Profumi - Antigravity Memory Log

## Project Overview
**Project Name:** ScentSense Portal (profumi-zara-dupes)  
**Stack:** React 18 + Vite 5  
**Deployment:** GitHub Pages → https://mich-de.github.io/profumi/  
**Package Manager:** npm (package-lock.json detected)  
**Last Updated:** 2026-02-05

---

## Architecture Summary

### Frontend Stack
- **Framework:** React 18.2.0
- **Bundler:** Vite 5.2.0
- **Linting:** ESLint with React plugins
- **Deployment:** gh-pages package

### Project Structure
```
profumi/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Primary styling
│   ├── index.css        # Global styles
│   ├── main.jsx         # Entry point
│   └── data/
│       ├── perfumes-zara.js      # Zara dupes data
│       └── perfumes-lattafa.js   # Lattafa dupes data
├── public/
│   └── images/          # Product images (Zara, Lattafa, Originals)
├── dist/                # Build output (gh-pages deploys from here)
└── vite.config.js       # Vite configuration
```

---

## Key Features
1. **Dual Brand Comparison:** Zara & Lattafa perfume dupes vs originals
2. **Bilingual Support:** Italian (IT) / English (EN) toggle
3. **Responsive Grid Layout:** Premium card-based perfume display
4. **Image Lightbox:** Click-to-zoom product images
5. **Sort Controls:** Sort by name, original, price
6. **Sticky Navigation:** Scrollable header with section links

---

## Environment Execution Rules
Per global GEMINI.MD instructions:
- **Package Manager:** `npm` (package-lock.json present)
- **Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Deploy:** `npm run deploy` (uses gh-pages)

---

## Session Log

### 2026-02-05
- Applied system instructions from global GEMINI.MD
- Created project documentation files (GEMINI.MD, IMPLEMENTATION_PLAN.MD, TASKS.MD, README.MD)
- **SEO Improvements**: Added Open Graph, Twitter Cards, canonical URL, theme-color, keywords
- **Animation Enhancements**: VS badge floating/glow animation, shimmer hover on price tags
- **UI Polish**: Glassmorphism sticky sort toolbar, enhanced button hover with glow
- **Accessibility**: Lazy loading for grid images, keyboard navigation (Escape for lightbox), ARIA labels
- **Branding**: Created custom SVG favicon with gold gradient
- **Data Migration**: Extracted hardcoded JS data into `perfumes-zara.json` and `perfumes-lattafa.json` for better maintainability (Option A).

### Previous Sessions
- Integrated Lattafa perfumes with English translations
- Fixed image jagged edges on rotated hero images
- Deployed to GitHub Pages with correct base path
- Added Zara dupes (19 items) with sorting functionality

---

## Notes & Decisions
- Images stored in `public/images/` with subfolders: `zara/`, `lattafa/`, `originals/`
- Cache busting implemented via timestamp query params
- Placeholder images for missing product photos
