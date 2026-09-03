# Project Plan — India Cultural Heritage Experience

## Master Phased Roadmap

### Phase 1: Foundation (Current Milestone) ✅
- [x] Workspace structure and TypeScript/Vite/Tailwind setup
- [x] Warm parchment cultural color system with category-specific accents
- [x] Contextual CSS textures (parchment, sandstone, textile weave, paper)
- [x] Accessibility framework: Text scaling, high contrast, grayscale, color inversion, motion reduction, cursor enhancement
- [x] Multilingual architecture (English, Hindi, Marathi) with runtime switcher
- [x] Structured local mock data schemas (States, Cultural Items, Monuments, Festivals, Categories)
- [x] Modular AI cultural guide placeholder with dynamic context badge
- [x] Repository documentation (`README.md`, `PROJECT_PLAN.md`, `ARCHITECTURE.md`, `.env.example`)

---

### Phase 2: Homepage Experience
- [x] Hero section with project placeholder branding, minimal copy, and direct state actions
- [x] Sliding flashcards for "On This Day / Upcoming Cultural Celebrations" with mobile swipe & keyboard access
- [x] Controlled India Map section introduction without sticky scroll-jacking

---

### Phase 3: Interactive India Map
- [ ] Render accurate SVG state boundaries from `indiaMapData.json`
- [ ] Hover tooltips showing State Name, Capital, and Cultural Highlights
- [ ] Smooth state selection with keyboard accessibility and mobile touch support
- [ ] Guardrails: India as the sole entry point, Maharashtra opens only upon explicit selection

---

### Phase 4: Cinematic Cloud Transition
- [ ] Atmospheric cloud layer animation using Framer Motion
- [ ] Camera zoom effect from national perspective into Maharashtra
- [ ] Respect `prefers-reduced-motion` and mobile performance limits

---

### Phase 5: Maharashtra Core & Dynamic Landmark Map
- [ ] Integrated Maharashtra regional map
- [ ] Floating category slicer (All, Food, Fashion, Forts, Temples, Monuments, Dance, Music, Crafts, Festivals)
- [ ] Dynamic landmark marker positioning using geographic coordinates
- [ ] Staggered landmark animations

---

### Phase 6: Cultural Content & Deep Catalog
- [x] Verified dataset for Food (Misal, Vada Pav, Tambada/Pandhra Rassa, Ukadiche Modak)
- [x] Verified dataset for Textiles & Attire (Paithani Saree, Kolhapuri Chappal)
- [x] Verified dataset for Sahyadri Forts (Raigad, Sinhagad)
- [x] Verified dataset for Sacred Shrines & Monuments (Trimbakeshwar, Gateway of India, Ellora Caves)
- [x] Verified dataset for Folk Arts (Lavani, Powada, Warli Painting)

---

### Phase 7: Cultural Detail Experience & Star Schema
- [x] Immersive detail layout with origin, history, significance, and sources
- [x] Interactive Star Schema graph connecting History, Region, Materials, Tradition, and Festivals
- [x] Recipe CTA for authentic culinary preparations

---

### Phase 8: 3D Monument Experience
- [x] Hotspot annotation system with architectural notes
- [ ] Enhanced 3D Canvas integration with React Three Fiber procedural models and lighting presets (Dawn, Golden Hour)
- [ ] Guided architectural camera tours

---

### Phase 9: Polish & Production Optimization
- [ ] Code splitting and lazy loading of 3D modules
- [ ] Accessibility contrast verification (WCAG AAA compliance)
- [ ] Performance profiling across mobile viewports
