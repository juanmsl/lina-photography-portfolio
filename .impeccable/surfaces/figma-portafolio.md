---
version: 1
slug: "figma-portafolio"
primary_target: "figma/portafolio"
related_targets: []
---

# Lina María Nieto Gómez portfolio — public site

Scope: whole public site (home, category, enlarged photo, services, about me, quote) desktop 1440 + mobile 390, designed in Figma. Mode: Experience (the work leads). Two directions built side by side at the user's request for comparison.

Audience: brands (product/fashion), private clients (portraits), editorial/tourism. Action: quote form or WhatsApp. Proof: her photographs only (provisional generated images until real ones arrive).

## Direction contract — C · Fusión (final, light)
THESIS: A light, misty field journal: Plancha's surveyed places (coordinates, fichas) meet Cianotipia's brushed plates, and every photo can be dragged from cyanotype (left) to full colour (right). Refuses the dark, serious portfolio.
OWN-WORLD: Light mist ground (#F4F7F6) moving through soft section gradients (mist→sage→lavender, dawn gold→lilac→sky); lighter sky blue, forest green, gold and lavender accents; frosted-glass panels (nav, legend, forms) as the user requested; brushed emulsion edges on plates; mono coordinates on every ficha. Display in Anta (user-pinned), body Archivo, data JetBrains Mono.
STORY: Visitor drags the hero slider, sees the eye at work, explores categories from a glass legend, opens a series, writes via form or WhatsApp.
FIRST VIEWPORT: Full-width brushed plate of the páramo with coordinate ticks on its collar; the image is split by a draggable handle (cyanotype left, colour right); name in Anta on a glass panel bottom-left with Cotizar; glass legend top-right; floating glass nav.
FORM: User-pinned fusion of A and B (no roll). seed:dea7aa8db2631a0a (original roll, kept for trace). Signature interaction: the reveal slider on hero and on hover over every plate.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, docs/DESIGN.md, and every shipping raster carrying its provenance

## D · Cuarto oscuro (new direction, its own page)
- Client reference: a long single-page portfolio, black background, projects one after another (large title, italic subtitle, centered paragraph, two-column fact sheet, photo rows), dividers by type of photography, contact at the end.
- Mode: Experience. The photo leads; the interface is black, bone and gray.
- Typography: Bricolage Grotesque ExtraBold (display, -3% tracking), Instrument Serif Italic (subtitles and second voice), Hanken Grotesk (text, fact sheet, navigation), Geist Mono for coordinates only.
- Color: ink #0A0A0B, charcoal #151517, graphite #2A2A2E (rules), bone #F2EFEA (text), ash #A3A3A8 (secondary), Prussian blue #5B8FC0 (minimal links/accents), gold #C49A4E (at most one touch per block).
- Signature: the "Cianotipias" series in personal projects keeps the blue reveal from the earlier directions.
- Not allowed: eyebrows above titles, section numbers, glass cards, color gradients.
- Code (November 2026): direction D is implemented in this repository with React + Vite + Polpo; see README.md.


Note: directions A · Plancha and B · Cianotipia were retired (October 2026). Finals: C · Fusión and D · Cuarto oscuro.
