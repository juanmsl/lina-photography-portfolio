---
name: Lina María Nieto Gómez · Fotografía
description: Portfolio and services site for a Bogotá photographer. Direction D · Cuarto oscuro (dark), the only one in use.
colors:
  ink: "#0A0A0B"
  charcoal: "#151517"
  graphite: "#2A2A2E"
  bone: "#F2EFEA"
  ash: "#A3A3A8"
  prussian: "#5B8FC0"
  gold: "#C49A4E"
  alert: "#E07A6A"
typography:
  display:
    fontFamily: "Bricolage Grotesque"
    fontWeight: 800
    fontSize: "160px"
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  divider:
    fontFamily: "Bricolage Grotesque"
    fontWeight: 800
    fontSize: "112px"
    lineHeight: 0.94
    letterSpacing: "-0.03em"
  project-title:
    fontFamily: "Bricolage Grotesque"
    fontWeight: 800
    fontSize: "80px"
    lineHeight: 0.96
    letterSpacing: "-0.025em"
  title-s:
    fontFamily: "Bricolage Grotesque"
    fontWeight: 800
    fontSize: "40px"
    lineHeight: 1
    letterSpacing: "-0.015em"
  brand:
    fontFamily: "Bricolage Grotesque"
    fontWeight: 800
    fontSize: "24px"
    lineHeight: 1
    letterSpacing: "-0.01em"
  serif-xl:
    fontFamily: "Instrument Serif"
    fontStyle: italic
    fontWeight: 400
    fontSize: "96px"
    lineHeight: 1
  serif:
    fontFamily: "Instrument Serif"
    fontStyle: italic
    fontWeight: 400
    fontSize: "32px"
    lineHeight: 1.1
  lead:
    fontFamily: "Hanken Grotesk"
    fontWeight: 400
    fontSize: "20px"
    lineHeight: 1.6
  body:
    fontFamily: "Hanken Grotesk"
    fontWeight: 400
    fontSize: "16px"
    lineHeight: 1.6
  nav:
    fontFamily: "Hanken Grotesk"
    fontWeight: 500
    fontSize: "15px"
    lineHeight: 1.4
  label:
    fontFamily: "Hanken Grotesk"
    fontWeight: 600
    fontSize: "12px"
    lineHeight: 1.4
    letterSpacing: "0.08em"
  coordinate:
    fontFamily: "Geist Mono"
    fontWeight: 400
    fontSize: "12px"
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  none: "0px"
  panel: "16px"
  pill: "999px"
spacing:
  gutter-mobile: "20px"
  gutter-desktop: "40px"
  photo-gap: "16px"
  photo-gap-mobile: "8px"
components:
  button-primary:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.nav}"
    rounded: "{rounded.pill}"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.lead}"
    rounded: "{rounded.none}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.nav}"
    rounded: "{rounded.pill}"
  fact-item:
    textColor: "{colors.bone}"
    typography: "{typography.body}"
  navigation:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.nav}"
---

<!-- Direction D · Cuarto oscuro is the only direction (Figma file w3WthJXOQOkFUEW9wKw6Gy, page "D · Cuarto oscuro", D/ paint and text styles). Directions A · Plancha and B · Cianotipia were retired in October 2026 and C · Fusión in November 2026; all three were removed from the file and from this document. Shared: icon set and Borde de emulsión on "Recursos compartidos"; provisional photos and the "Foto de Lina" component on "Fotos provisionales". -->

# Design System: Lina María Nieto Gómez · Fotografía

## Overview

**Creative North Star: "The darkroom"**

The site is a darkroom: a black room where only the photographs give off light. It is one long page where her projects follow one another, each with a large title, an italic second voice, a short centered paragraph, a two-column fact sheet and rows of photographs. Dividers by type of photography (landscape, architecture, people, product, personal projects) set the rhythm, and contact closes the page.

The photograph leads and the interface recedes into black, bone and gray. There are no cards, no glass, no colour gradients and no shadows. Sections are separated by space and by graphite hairlines.

**Key Characteristics:**

- Black ground (`ink`), bone text, ash for the secondary voice, graphite for rules.
- Two typographic voices: Bricolage Grotesque ExtraBold for statements, Instrument Serif italic as the quiet second line under each one.
- Colour comes only from the photographs. Prussian blue lives only in the Cianotipias series; gold is a single active-state touch.
- One signature motion: photos in the Cianotipias series turn from Prussian blue to colour on hover or tap.
- All photographs except Lina's portrait are provisional until her real work arrives.

## Colors

A near-black room with warm paper-white text. Code tokens live in `src/index.css` (`--color-*`), and Figma uses the matching D/ paint styles.

| Token      | Figma style   | HEX     | Role                                                             |
| ---------- | ------------- | ------- | ---------------------------------------------------------------- |
| `ink`      | D/Negro       | #0A0A0B | Page ground everywhere                                           |
| `charcoal` | D/Carbón      | #151517 | Rare surfaces: photo placeholders, the WhatsApp panel on Cotizar |
| `graphite` | D/Grafito     | #2A2A2E | Hairlines, fact sheet rules, field underlines                    |
| `bone`     | D/Hueso       | #F2EFEA | Text, primary button fill, focus ring, logo                      |
| `ash`      | D/Gris        | #A3A3A8 | Second voice, labels, metadata                                   |
| `prussian` | D/Azul prusia | #5B8FC0 | Cianotipias tint only                                            |
| `gold`     | D/Oro         | #C49A4E | Active photo tile (ring and check) only                          |
| `alert`    | —             | #E07A6A | Field errors                                                     |

Polpo mapping: `background` = ink, `background-paper` = charcoal, `foreground` = bone, `border` = graphite, `primary` = bone with ink foreground, `alert` = #E07A6A.

### Named Rules

**The Light Comes From the Photo Rule.** The interface stays black, bone and gray. Any colour on screen comes from a photograph.

**The One Gold Touch Rule.** Gold marks a single active state per block (the chosen service tile). Never use it for text, decoration or large areas.

**The Prussian Series Rule.** Prussian blue belongs to the Cianotipias series and its reveal. It is not a link or UI colour.

## Typography

**Display:** Bricolage Grotesque ExtraBold. **Second voice:** Instrument Serif italic. **Text and controls:** Hanken Grotesk 400/500/600. **Data:** Geist Mono. All self-hosted with Fontsource.

**Character.** A loud, tight grotesque says what the work is; a soft serif italic says it again more quietly. Hanken carries everything practical, and mono is reserved for coordinates.

### Hierarchy

- **Display** (Bricolage 800, 160px desktop, fluid down to 68px, 0.92, -3%): "Portafolio / fotográfico" in the hero. Code: `hero`.
- **Divider** (Bricolage 800, 112px, 0.94, -3%): type-of-photography dividers. Code: `header1`.
- **Project title** (Bricolage 800, 80px, 0.96, -2.5%): each project. Code: `header2`.
- **Title S** (Bricolage 800, 40px, 1, -1.5%): section and page titles. Code: `header3`.
- **Brand** (Bricolage 800, 24px desktop / 20px mobile): "Lina Nieto" next to the logo. Code: `header4` via `t-header4`.
- **Serif XL / Serif** (Instrument Serif italic, 96px / 32px, ash): the second voice under titles. Code: `t-serif-xl`, `t-serif`, class `serif-voice`.
- **Lead** (Hanken 400, 20px, 1.6): project paragraphs and field values. Code: `t-lead`.
- **Body** (Hanken 400, 16px, 1.6): reading text, at most about 65ch.
- **Nav / Button** (Hanken 500–600, 15px, sentence case). Code: `t-label`.
- **Label** (Hanken 600, 12px, +8%, ash, sentence case): fact sheet and field labels. Code: `meta-label`.
- **Coordinate** (Geist Mono 400, 12px): coordinates and measured data only.

### Named Rules

**The Two Voices Rule.** Every major title is followed by its Instrument Serif italic line in ash. Never two grotesque lines stacked, never the serif alone as a heading.

**The Mono Is Measured Rule.** Geist Mono appears only for coordinates and measured data (place, altitude, date).

No eyebrows above titles and no section numbers.

## Layout

Desktop is 1440px with 40px side margins (content width 1360px). Mobile is 390px with 20px margins. Photo rows run full content width with a 16px gap (8px on mobile). Section padding is generous (96 to 160px on desktop), component interiors use 12 to 24px, and label-to-value gaps use 6 to 8px.

Page structure: Hero (Lina in black and white with a fade into ink, "Portafolio / fotográfico") → ¿Quién soy? → dividers by type → Project (centered heading, paragraph, 2-column fact sheet, photo rows) → Contacto → footer.

## Elevation & Depth

Flat. Black ground, graphite hairlines, no shadows, no blur. Depth comes from the photographs alone.

## Shapes

- Photographs are square-cornered, always.
- Buttons, chips and the mobile menu button are pills or circles (999px).
- Fields have no box: only a bottom line.
- The one rounded panel is the WhatsApp column on Cotizar (charcoal, 16px).

## Components

### Logo

The LN monogram: "LN" in a single-line script inside a broken circle, with a viewfinder corner at the top right. It is a single-colour mark (`currentColor`): bone `#F2EFEA` on ink, ink `#0A0A0B` on bone (Figma: D/Logo LN, variants Hueso and Tinta). In the navigation it sits to the left of the name "Lina Nieto" (40px tall on mobile, 44px on desktop, 12px gap); in the footer it appears at 28px before the copyright. Minimum height 24px. Do not recolour, outline, rotate, add effects or place it over busy areas of a photo. Source: `public/logo-ln.svg`; code: `src/components/Logo.tsx`.

### Buttons (D/Botón)

- **Primary:** bone pill with ink label ("Cotizar", "Cotizar un proyecto").
- **Secondary:** transparent pill with a bone outline and bone label.
- States: rest and hover (Figma D/Botón). Focus is a 2px bone outline with a 3px offset.

### Navigation (D/Navegación)

- **Desktop:** logo and name on the left, centered links (Portafolio, Servicios, Sobre mí, Contacto) with the active one in bone and the rest in ash, the primary Cotizar button on the right.
- **Mobile:** logo and name, plus a round outlined menu button. The menu opens full-screen on ink with the links in Bricolage, the Cotizar button and the base coordinates.

### Fact sheet (D/Dato de ficha)

A graphite top rule, a label in `meta-label`, then the value in Hanken 500. Laid out in two columns under each project's paragraph. Code: `FactSheet` / `FactItem`.

### Project heading (D/Encabezado de proyecto)

Centered Bricolage title with its Instrument Serif line below. Code: `DualTitle`, `ProjectHeading`.

### Fields (D/Campo)

Bottom line only: small ash label, large bone value (Lead), graphite underline. Focus thickens the line to 2px bone; error turns it coral (#E07A6A) with a message below. States: rest, focus, error, paragraph. Code: class `line-fields` over Polpo fields.

### Chips (D/Chip)

Pill with inactive and active states. It exists in Figma; the code uses the service tiles instead.

### Service tiles (D/Mosaico de servicio)

Photo tiles in a 2- or 3-column grid for choosing services on Cotizar. The active tile gets a 3px gold ring and a gold check in the corner. Code: `ServiceTilePicker` (react-hook-form).

### Gallery and photo

Rows of photographs at full content width; each row sets its own proportions. Clickable photos open the enlarged view with a gentle 1.5% zoom on hover. Missing files show a charcoal placeholder with the description and "foto provisional". Code: `Gallery`, `Photo`.

### Plate frame

On the enlarged photo, a thin white rule around the image with tick marks and mono coordinate labels, like a map plate. Decorative. Code: `PlateFrame`.

### Footer

Graphite top rule; logo and "© year Lina María Nieto Gómez" on the left, base and coordinates in mono on the right.

### Icons

The shared set ("Recursos compartidos") is drawn at 24px with a 1.5px stroke and square caps: flecha, flecha-izq, cerrar, menú, anterior/siguiente, whatsapp, instagram, correo, ubicación, calendario, check, ampliar. In code they come from `react-icons/lu`.

### Signature motion

**Cianotipias reveal.** Photos in the Cianotipias series sit in Prussian blue (grayscale plus a blue colour blend) and turn to full colour over 700ms ease-out on hover, or on tap on touch screens. Under reduced motion the change is instant.

## Do's and Don'ts

### Do:

- **Do** keep every surface on ink; let the photographs carry the colour.
- **Do** pair each major title with its Instrument Serif second voice.
- **Do** separate sections with space and graphite hairlines.
- **Do** use the D/ styles in Figma and the `src/index.css` tokens in code.
- **Do** mark every generated photo as provisional until Lina's real work replaces it.

### Don't:

- **Don't** add cards, glass panels, shadows or colour gradients.
- **Don't** put eyebrows above titles or number the sections.
- **Don't** use gold for more than one active touch per block, and never for text.
- **Don't** use Prussian blue outside the Cianotipias series.
- **Don't** round the corners of photographs.

## Screens (Figma, page "D · Cuarto oscuro")

- Desktop (1440) and mobile (390): Portafolio, Proyecto (Cordillera, with "Del azul al color" and the next project), Foto ampliada, Servicios (editorial list with rules), Cotizar (bottom-line fields, chips, service tiles, WhatsApp column), Solicitud enviada; on mobile also the Menú overlay.
- Prototype starting points: "Cuarto oscuro · Escritorio" and "Cuarto oscuro · Móvil".
- Components: D/Logo LN, D/Botón, D/Navegación, D/Campo, D/Chip, D/Dato de ficha, D/Encabezado de proyecto, D/Mosaico de servicio.
