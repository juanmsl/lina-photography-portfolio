---
name: Lina María Nieto Gómez · Fotografía
description: Portfolio and services site for a Bogotá photographer. Two final directions: C · Fusión (light) and D · Cuarto oscuro (dark).
colors:
  fusion-fondo-base: "#F4F7F6"
  fusion-fondo-elevado: "#FFFFFF"
  fusion-fondo-banda: "#DDEAE4"
  fusion-fondo-lavanda: "#ECE7F4"
  fusion-fondo-invertido: "#1F4F63"
  fusion-fondo-profundo: "#163B47"
  fusion-texto-primario: "#18323D"
  fusion-texto-secundario: "#4A626C"
  fusion-texto-invertido: "#F7FAF9"
  fusion-texto-agua: "#2F6F92"
  fusion-acento-azul: "#7DB6D3"
  fusion-acento-verde: "#4C8667"
  fusion-acento-oro: "#C49A4E"
  fusion-acento-morado: "#8C78B4"
  fusion-borde-fino: "#7A9A90"
  fusion-borde-fuerte: "#18323D"
  fusion-estado-error: "#B4473A"
  fusion-estado-exito: "#4C8667"
  fusion-vidrio: "rgba(255, 255, 255, 0.55)"
  fusion-vidrio-borde: "rgba(255, 255, 255, 0.85)"
typography:
  fusion-display-xl:
    fontFamily: "Anta, Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "104px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  fusion-display-l:
    fontFamily: "Anta, Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "64px"
    fontWeight: 400
    lineHeight: 1.05
  fusion-titular:
    fontFamily: "Anta, Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "40px"
    fontWeight: 400
    lineHeight: 1.15
  fusion-subtitulo:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 500
  fusion-cuerpo:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  fusion-cuerpo-s:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
  fusion-lugar:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 500
  fusion-etiqueta:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.12em"
  fusion-boton:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
  fusion-coordenada:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
rounded:
  recto: "0px"
  foto: "2px"
  campo: "6px"
  campo-fusion: "14px"
  vidrio: "24px"
  vidrio-l: "32px"
  pildora: "999px"
spacing:
  espacio-1: "4px"
  espacio-2: "8px"
  espacio-3: "12px"
  espacio-4: "16px"
  espacio-5: "24px"
  espacio-6: "32px"
  espacio-7: "48px"
  espacio-8: "64px"
  espacio-9: "96px"
  espacio-10: "128px"
components:
  fusion-boton-primario:
    backgroundColor: "{colors.fusion-fondo-invertido}"
    textColor: "{colors.fusion-texto-invertido}"
    typography: "{typography.fusion-boton}"
    rounded: "{rounded.pildora}"
    padding: "14px 28px"
  fusion-boton-secundario:
    backgroundColor: "{colors.fusion-vidrio}"
    textColor: "{colors.fusion-texto-primario}"
    typography: "{typography.fusion-boton}"
    rounded: "{rounded.pildora}"
    padding: "14px 28px"
  fusion-boton-texto:
    textColor: "{colors.fusion-texto-primario}"
    typography: "{typography.fusion-boton}"
  fusion-campo:
    backgroundColor: "{colors.fusion-vidrio}"
    textColor: "{colors.fusion-texto-primario}"
    typography: "{typography.fusion-cuerpo-s}"
    rounded: "{rounded.campo-fusion}"
    padding: "12px 16px"
  fusion-navegacion:
    backgroundColor: "{colors.fusion-vidrio}"
    textColor: "{colors.fusion-texto-primario}"
    typography: "{typography.fusion-cuerpo-s}"
    rounded: "{rounded.pildora}"
  fusion-asa-revelado:
    backgroundColor: "{colors.fusion-vidrio}"
    rounded: "{rounded.pildora}"
    size: "48px"
  fusion-whatsapp:
    backgroundColor: "{colors.fusion-acento-verde}"
    textColor: "{colors.fusion-texto-invertido}"
    rounded: "{rounded.pildora}"
    size: "56px"
---

<!-- TWO FINAL DIRECTIONS. C · Fusión (light; Figma variable mode "Fusión" of the "Tema" collection, file w3WthJXOQOkFUEW9wKw6Gy) and D · Cuarto oscuro (dark; D/ paint and text styles). Directions A · Plancha and B · Cianotipia were retired in October 2026 and removed from the file and from this document. Shared: icon set and Borde de emulsión on the "Recursos compartidos" page; photos on "Fotos provisionales". -->

# Design System: Lina María Nieto Gómez · Fotografía

## Overview

**Creative North Star: "A field survey that becomes a print"**

**C · Fusión** is a light, misty field journal: coordinate fichas, a legend and brushed plates, with every photograph draggable from cyanotype (left) to full colour (right).

Both directions share a premise: every photograph is a place she stood in, and the interface is the paper that place gets recorded on. The photograph leads and the interface recedes. Chrome is drawn from the world's own materials (coordinate frames, emulsion edges, specimen labels), not from generic gallery UI. Density is calm. Sections are wide, separated by whole-band colour changes or hairlines, never by cards floating on a neutral canvas.

**C · Fusión.** A light mist ground moves through soft section gradients (mist to sage to lavender, dawn gold to lilac to sky) and closes on a deep forest-blue footer. Accents are light: sky blue, forest green, gold and lavender. Frosted-glass panels (the user's request) float only over photographs: the nav pill, the legend, the name panel, forms, and the slider handle. Every photo is a brushed plate with a place ficha (category dot, place, mono coordinates) and a reveal handle. Display is set in Anta (confirmed), body in Archivo, data in JetBrains Mono. Only the glass pieces that sit over photographs lift off the page.

**Key Characteristics:**
- C · Fusión binds to the semantic variable collection "Tema" (mode "Fusión"); D · Cuarto oscuro uses D/ styles. Every component binds to semantic tokens (`var(--fondo-base)`, `var(--texto-primario)`, `var(--acento-oro)`, and so on), never to primitives.
- Gold is rare in every theme, and it marks actions. The one exception is C's Arquitectura category dot.
- Blue and sober green carry the palette, as the brand commitment requires. Gold appears only as an occasional detail.
- In C, frosted glass lifts only the pieces that float over photographs.
- One signature motion per direction. C uses the drag-to-reveal slider; D reveals the Cianotipias series from blue to colour on hover.
- All photographs are provisional AI-generated placeholders until her real work arrives.

## Colors

C is a light, cool mist with four soft accents and a deep forest-blue close.

Semantic roles by mode, CSS `var(--role)`. Fusión binds the `fusion-*` values directly. Two semantic tokens are new with Fusión: fondo/lavanda, and acento/morado (#8C78B4 in every mode).

| Semantic token | Fusión (working) |
|---|---|
| fondo/base | fusion-fondo-base |
| fondo/elevado | fusion-fondo-elevado |
| fondo/banda | fusion-fondo-banda |
| fondo/invertido | fusion-fondo-invertido |
| fondo/profundo | fusion-fondo-profundo |
| fondo/lavanda | fusion-fondo-lavanda |
| texto/primario | fusion-texto-primario |
| texto/secundario | fusion-texto-secundario |
| texto/invertido | fusion-texto-invertido |
| texto/agua | fusion-texto-agua |
| acento/azul | fusion-acento-azul |
| acento/verde | fusion-acento-verde |
| acento/oro | fusion-acento-oro |
| borde/fino | fusion-borde-fino |
| borde/fuerte | fusion-borde-fuerte |
| estado/error | fusion-estado-error |
| estado/exito | fusion-estado-exito |
| acento/morado | fusion-acento-morado |

### Primary
- **Mist Ground** (fusion-fondo-base) with **Field White** (fusion-fondo-elevado): Theme C. The light ground of every section and the raised white surfaces.
- **Fjord Blue** (fusion-fondo-invertido) and **Forest Night** (fusion-fondo-profundo): Theme C. Deep blue appears only on the primary button and the footer.

### Secondary
- **Sky Accent** (fusion-acento-azul), **Forest Green** (fusion-acento-verde), **Lavender** (fusion-acento-morado): Theme C. Category dots, success, WhatsApp (green), and the gradient endpoints.
- **Lake Blue** (fusion-texto-agua): Theme C. Blue text (texto/agua) and the Moda category dot.

### Tertiary
- **Field Gold** (fusion-acento-oro): Theme C. The primary button's arrow, the Texto button's underline, the Oro button gradient, and the Arquitectura category dot.

### Neutral
- **Ink Slate** (fusion-texto-primario, also borde/fuerte) and **Lichen Slate** (fusion-texto-secundario): Theme C. Primary and secondary text.
- **Sage Band** (fusion-fondo-banda) and **Lavender Mist** (fusion-fondo-lavanda): Theme C. Section tints and gradient stops.
- **Frost Line** (fusion-borde-fino): Theme C. Thin dividers and the Producto category dot.
- **Glass** (fusion-vidrio, stroke fusion-vidrio-borde): Theme C. The fill and 1px stroke of C/Vidrio panels.

### Gradients (Theme C paint styles)
- **C/Degradado/Neblina** (sección, vertical #F4F7F6 → #E3EEE9 → #ECE7F4): Mist to sage to lavender section grounds.
- **C/Degradado/Amanecer** (acento, diagonal #F6E7C8 → #E9E1F1 → #D5E8EF): Dawn gold to lilac to sky accent grounds.
- **C/Degradado/Bosque** (cierre, vertical #2E6A72 → #1F4F63 → #163B47): The footer close.
- **C/Degradado/Velo de foto**: A legibility veil over photographs (stops not reported).
- **C/Degradado/Oro** (botón, #D9B46A → #B98A3F): Gold paint for button details.

### Category colours (Theme C)
Paisaje acento/verde · Naturaleza acento/azul (sky) · Arquitectura acento/oro · Retrato lavanda · Moda texto/agua · Producto borde/fino. Retrato's lavanda is assumed to bind to acento/morado; confirm the binding in Figma.

### Named Rules
**The Deep Blue Close Rule (C).** Fusión is a light theme. Deep blue (fondo/invertido, fondo/profundo, Bosque) appears only on the primary button and the footer.

**The Connecting Gradient Rule (C).** Gradients connect sections as grounds, and never fill text.





## Typography

**Theme C (working). Display:** Anta (provisional; Sora SemiBold and League Spartan SemiBold are still being compared on the page "C · Fusión — Inicio"). **Body:** Archivo. **Data:** JetBrains Mono.

**Character.** C reads like a field journal: a rounded, technical display face set large and plain, a calm Archivo for reading and place names, and mono for anything measured.

### Hierarchy (Theme C · Fusión, working)
- **Display XL** (Anta 400, 104px, 100%, -1%): Her name on the glass name panel in the hero.
- **Display L** (Anta 400, 64px, 105%): Section headings.
- **Titular** (Anta 400, 40px, 115%): Statements and the CTA heading.
- **Subtítulo** (Archivo 500, 22px): Sub-heads and service names.
- **Lugar** (Archivo 500, 16px): The place name in the Ficha de lugar.
- **Cuerpo / Cuerpo S** (Archivo 400, 17px at 160% / 15px): Reading text, at most about 65ch.
- **Etiqueta** (Archivo 600, 12px, +12%, uppercase): Field labels and legend titles.
- **Botón** (Archivo 600, 15px, sentence case): Button labels.
- **Coordenada** (JetBrains Mono 400, 12px): Coordinates and measured data on every ficha.



### Named Rules
**The Ficha Rule (C).** Every photograph carries a Ficha de lugar: category dot, then the Lugar place name, then Coordenada. Mono is used only for those coordinates and other measured data.




## Layout

Desktop is 1440px with 12 columns and 40px margins. Mobile is 390px with 20px margins. Spacing follows the espacio scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Section padding sits at the top of the scale (96 to 128px), component interiors use 12 to 24px, and label-to-value gaps use 4 to 8px.

- **C.** The hero is a full-width brushed plate of the páramo with coordinate ticks on its collar. The image is split by the reveal handle at 58%, so the slider invites dragging. The Anta name and Cotizar sit on a glass panel at bottom left, the glass legend at top right, and a floating glass nav pill above. The whole page sits on ONE continuous vertical gradient (mist → sage → lavender → warm dawn → sky → forest-blue footer) with soft blurred light orbs at section seams, so no section has its own hard-edged fill. Services is a bento of photo cards ("Tarjeta de servicio": photo background, radius 28, glass label panel; hover lifts and reveals "Cotizar este servicio") plus a "Cómo trabajamos" timeline card. Contact pairs a glass form that opens with selectable photo tiles ("Mosaico de servicio") with channel cards ("Canal de contacto": WhatsApp in green with a prefilled-message bubble, correo, Instagram) and a base card with contour lines over Bogotá. On mobile, services become a horizontal card carousel.
- **All.** Services are full-width rows (name, description, action) with hairline dividers. The CTA is a full-width band. The footer is a deep block with Contacto / Redes / Base columns.

## Elevation & Depth

**C** is layered, but only over photographs. Frosted glass lifts the nav, legend, name panel, forms, and the slider handle off the image. Elsewhere C stays flat on its gradient grounds. **D** is flat: black ground, hairlines in grafito, no shadows.

### Shadow Vocabulary
- **C/Vidrio** (`backdrop-filter: blur(28px); box-shadow: 0 16px 40px -12px rgba(23,51,61,0.10)`, with fusion-vidrio fill, 1px fusion-vidrio-borde stroke, 24 to 32px radius): Theme C glass pieces floating over photographs only.
- **C/Sombra suave** (`box-shadow: 0 20px 48px -16px rgba(23,51,61,0.14)`): Theme C soft lift. Its exact placements were not reported.

### Named Rules
**The Glass Over Photo Rule (C).** Glass is used only on pieces that float over a photograph. A glass panel on a plain ground is out of system.


## Shapes

- **C: soft field journal.** Buttons, the nav, chips, the reveal handle, and the WhatsApp button are pills or circles (999px). Glass panels use 24 to 32px corners, and fields use 14px. Every plate is framed by the brushed emulsion edge.

**Radii outside the Figma radius variables (0, 2, 999):** C's 14px field corner, and C's 24 to 32px glass corners are all used by the build but not bound to variables. They are recorded as `rounded.campo`, `rounded.campo-fusion`, `rounded.vidrio`, and `rounded.vidrio-l`.

## Components

### Buttons
- **C, Primario:** A deep-blue pill (fondo/invertido, label texto/invertido, Botón type) with a gold arrow.
- **C, Secundario:** A glass pill (C/Vidrio) with a texto/primario label.
- **C, Texto:** A label with a gold (acento/oro) underline.
- **All:** Disabled drops to reduced-contrast label and border. Focus uses acento/azul.

### Chips (Chip de servicio)
- **C:** A pill chip with Inactivo and Activo states. Its exact fills were not reported.

### Cards / Containers (Tarjeta de foto)
- **C, Tarjeta de revelado:** A brushed-edge plate with a Ficha de lugar below and the Asa de revelado on it. Its Posición variants are Cianotipia, Deslizando, and Color. At rest it shows Color. Dragging left reveals the cyanotype and dragging right reveals colour, and on release the handle returns with a 400ms ease-out. The same slider appears on the hero and on hover over every plate.

### Inputs / Fields (Campo)
- **C:** A glass field (C/Vidrio) with 14px corners, used inside forms that float over photos.

### Ítem de categoría (legend / index row)
In C, it is a glass legend row with a category dot (see Category colours), the name, and a count.

### Navigation
- **C:** A floating glass pill with the name, links, and the primary Cotizar button.
- **Mobile:** Name block and a menu icon. The menu opens full-screen on fondo/base.

### Pie de página
In C, the footer is the deep Bosque gradient block, one of the two places deep blue is allowed. It has Contacto / Redes / Base columns and a stacked mobile version.

### WhatsApp flotante
In C, it is a 56px round acento/verde button.

### Icons
The shared set is drawn at 24px with a 1.5px stroke and square caps: flecha, cerrar, menú, anterior/siguiente, whatsapp, instagram, correo, ubicación, calendario, check, ampliar, mojón, rama. The rama sprig marks reveal hints in C.

### Ficha de lugar (C)
A category dot, then the Lugar place name, then the Coordenada line. Every C photo carries one.

### Asa de revelado (C)
A 48px glass knob on a vertical split line. It sits at 58% on the hero.

### Signature motion
- **C, reveal slider:** Dragging the handle moves the split between cyanotype (left) and colour (right). On release the handle returns with a 400ms ease-out. At rest the plate shows Color.

## Do's and Don'ts

### Do:
- **Do** design light surfaces in C · Fusión and dark ones in D · Cuarto oscuro; never mix the two on one surface.
- **Do** bind every component to the "Tema" semantic variables (mode "Fusión"). Never bind to primitives.
- **Do** (C) give every photograph the brushed emulsion edge and a Ficha de lugar with mono coordinates.
- **Do** (C) set the hero split at 58% so the slider invites dragging.
- **Do** keep one signature motion per direction (C: drag-to-reveal; D: Cianotipias reveal) and show the final state under reduced motion.
- **Do** mark every generated photo as provisional until Lina's real work replaces it.

### Don't:
- **Don't** (C) use deep blue anywhere other than the primary button and the footer.
- **Don't** (C) put glass on anything that is not floating over a photograph.
- **Don't** (C) run gradients inside text.
- **Don't** use gold for anything except actions: the filete de oro, the arrow, underline and Oro detail (C). C's Arquitectura category dot is the one exception. Never set text or decoration in gold.
- **Don't** mix C and D on one surface.


**Rule — Continuous Gradient (C).** Sections never carry their own background fill; colour changes live in a single page-length gradient whose stops sit at section midpoints, softened by blurred light orbs at the seams. **Rule — Plates vs. cards (C).** Portfolio photos are brushed plates with fichas; service photos are UI cards with radius 28 and no brushed edge.

## Hero "Hola, soy Lina" (Fusión, Home) — includes About me
- Lina's photo full-bleed, sharp and centered (not blurred). The left side reveals as a cyanotype through a soft gradient mask (no hard cut) that turns to color towards the right; the slider is still hinted with "Desliza: cianotipia ← → color".
- Petrol veil for legibility, side vignette, warm golden light, grain; the bottom edge fades into mist (#EEF2F1) so the next section comes in without a jump.
- Centered text: "¡Hola!" in Anta; "Soy Lina Nieto" with "Lina Nieto" in Moirai One, light gold (#E2C07E). Below it, the About me text with key words in light green, gold and lavender, the category row with its color dots, and the glass pill with Cotizar + Explorar.
- The standalone "Sobre Lina" section was removed; its content lives in the hero.
- Moirai One is used only for Lina's name; every other heading stays in Anta.
- Every appearance of the photo is an instance of the "Foto de Lina" component ("Fotos provisionales" page).

## Fusión screens (desktop)
- Home (edited by hand by the team: hero text aligned left, name in Anta).
- Portfolio — Landscape: header with a photo (cyanotype → color reveal through a soft mask), "Ítem de categoría" filters, a 3-column mosaic of reveal cards, a "Sobre esta serie" glass card, a "Siguiente categoría" band.
- Enlarged photo: plate with an emulsion edge and reveal handle, previous/next in glass circles, side fact sheet (coordinates, altitude, series), thumbnails with the active one in a gold rule.
- Services: 6 service cards, "Cómo trabajamos" in 4 steps, FAQ, call-to-quote band.
- About me: header with Lina's photo, story, "Cómo miro" (patience, natural light, clean composition), "Con quién trabajo".
- Quote: short header, form + channels (same block as Contact on Home), "Qué pasa después".
- Request sent: blurred photo with a veil, glass card with a summary and actions.
- Header rule (from the team's redesigned home): every screen opens with the "Lámina principal": a petrol gradient dissolving downwards, name/title in white Anta 104 on the left, a "specimen label" (gold top rule + three lines in Courier Prime 13), actions, and on the right a 779×623 photo plate with a Prussian tint in SCREEN over its left part and a 4 px "gold rule" marking the split. Below: the plate caption (place in Courier Prime Bold + coordinates in JetBrains Mono) and a hint with a gold sprig.
- Courier Prime comes in for captions and hints (specimen typewriter); JetBrains Mono stays for coordinates.
- The reveal is marked with the gold rule, not the white line and handle (Enlarged photo updated accordingly).

## D · Cuarto oscuro ("D · Cuarto oscuro" page) — implemented in this repository
- Single-page portfolio on black (#0A0A0B), following the reference of projects in sequence.
- Typography: Bricolage Grotesque ExtraBold (Display 160, Divider 112, Project title 80), Instrument Serif Italic as the second voice under each title, Hanken Grotesk for text and fact sheets, Geist Mono for coordinates only.
- Color (code tokens in `src/index.css`): `bone` #F2EFEA for text, `ash` #A3A3A8 secondary, `graphite` #2A2A2E for rules, `ink` #0A0A0B ground, `charcoal` #151517 surfaces; `prussian` blue only in the Cianotipias series; `gold` #C49A4E for the active photo tile.
- Structure: Hero (Lina in black and white with a fade, "Portafolio / fotográfico") → ¿Quién soy? → divider per type (landscape, architecture, people, product, personal projects) → Project (centered heading, paragraph, 2-column fact sheet, photo rows at 1360 with a 16 px gap) → Contact → footer.
- Components: D/Botón (bone primary, outlined secondary; rest/hover), D/Dato de ficha (graphite top rule, label + value), D/Encabezado de proyecto (title + serif subtitle).
- D screens (desktop and 390 mobile): Portfolio, Project (Cordillera, with "Del azul al color" and next project), Enlarged photo, Services (editorial list with rules), Quote (bottom-line fields, chips, WhatsApp column), Request sent; on mobile also the Menu (overlay).
- Added components: D/Navegación (desktop/mobile), D/Campo (rest/focus/error/paragraph; bottom line only, error in #E07A6A with a message), D/Chip (inactive/active).
- Prototype starting points: "Cuarto oscuro · Escritorio" and "Cuarto oscuro · Móvil".
- Code names: `DualTitle` (two-voice heading), `FactSheet`/`FactItem`, `ProjectHeading`, `Navigation`, `PlateFrame` (white plate frame on the enlarged photo), `ServiceTilePicker` (D/Mosaico de servicio), `Gallery`, `Photo` (with the cyanotype reveal).
