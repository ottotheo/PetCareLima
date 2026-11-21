---
name: PetCare Lima
colors:
  surface: '#f5fbf1'
  surface-dim: '#d6dcd2'
  surface-bright: '#f5fbf1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff5ec'
  surface-container: '#eaf0e6'
  surface-container-high: '#e4eae0'
  surface-container-highest: '#dee4db'
  on-surface: '#171d17'
  on-surface-variant: '#40493d'
  inverse-surface: '#2c322c'
  inverse-on-surface: '#edf3e9'
  outline: '#707a6c'
  outline-variant: '#bfcaba'
  surface-tint: '#1b6d24'
  primary: '#0d631b'
  on-primary: '#ffffff'
  primary-container: '#2e7d32'
  on-primary-container: '#cbffc2'
  inverse-primary: '#88d982'
  secondary: '#126d1f'
  on-secondary: '#ffffff'
  secondary-container: '#9ef797'
  on-secondary-container: '#1c7425'
  tertiary: '#734e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#926500'
  on-tertiary-container: '#ffefda'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a3f69c'
  primary-fixed-dim: '#88d982'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005312'
  secondary-fixed: '#9ef797'
  secondary-fixed-dim: '#83da7e'
  on-secondary-fixed: '#002203'
  on-secondary-fixed-variant: '#005311'
  tertiary-fixed: '#ffdeac'
  tertiary-fixed-dim: '#ffba38'
  on-tertiary-fixed: '#281900'
  on-tertiary-fixed-variant: '#604100'
  background: '#f5fbf1'
  on-background: '#171d17'
  surface-variant: '#dee4db'
typography:
  headline-xl:
    fontFamily: Epilogue
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Epilogue
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  price-display:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system establishes a warm, deeply trustworthy, and empathetic mobile-first experience for pet parents and veterinary clinics in Lima, Peru. The visual language balances playfulness and medical rigor: it welcomes users with soft contours and organic greens while guaranteeing clinical clarity for emergency bookings, scheduled appointments, and dietary tracking.

### Core Attributes
- **Caring & Reassuring:** Calming tones and rounded tactile forms reduce anxiety during veterinary visits and health checkups.
- **Accessible & Functional:** High-contrast interactive elements and large touch targets (minimum 48px) support effortless one-handed use on mobile devices in bustling urban environments.
- **Localized Context:** Structured for Lima's pet care ecosystem, utilizing local currency conventions (S/), clear veterinary credentials, and district-level navigation.

### Visual Style
A blend of **Modern Tactile** and **Soft Functional Minimalism**. It relies on crisp white cards, rounded geometry (16px to 24px), gentle ambient green-tinted shadows, and high-contrast typography pairing an organic, friendly headline presence with an ultra-legible body font.

## Colors

The palette delivers a vibrant nature-inspired identity while strictly enforcing WCAG AA and AAA accessibility standards across all interaction states.

### Palette Architecture
- **Primary Action (`#2E7D32`):** Accessible deep green. Used for critical interactive triggers, primary buttons, selected calendar states, and active navigation indicators, achieving a contrast ratio exceeding 4.5:1 against light surfaces.
- **Brand Secondary (`#5CB15A`):** The signature brand green. Used in top application headers, illustrative accents, status badges, and decorative micro-interactions.
- **Accent & Feedback Tertiary (`#FFB300`):** Warm amber used for star ratings, pending appointments, and review badges.
- **Semantic Feedback:**
  - *Success:* `#2E7D32` (Health stable, confirmed booking)
  - *Critical Alert / Food Low:* `#E53935` (Urgent care, low supplies)
  - *Informational:* `#0288D1` (Location tracking, doctor notes)
- **Surfaces & Neutrals:**
  - *Background Canvas:* `#F8FAF7` (Subtle warm off-white preventing screen glare)
  - *Card Surface:* `#FFFFFF` (Pure white containers)
  - *Border Subtle:* `#E5EBE4`
  - *Text Primary:* `#1E241E` (Warm deep charcoal for high-contrast legibility)
  - *Text Secondary:* `#5E675D` (Subdued metadata, distance, timestamps)
  - *Text Inverted:* `#FFFFFF` (On dark green containers)

Monetary values must consistently format with the Peruvian Nuevo Sol symbol followed by an unspaced or non-breaking spaced amount (e.g., `S/ 120.00`).

## Typography

The typography system pairs characterful display headings with a neutral, high-performance interface typeface.

- **Headlines (`Epilogue`):** Delivers a friendly, organic, and welcoming tone for section headers, doctor names, and modal greetings. Provides personality without sacrificing structural clarity.
- **Body & Data (`Inter`):** Handles dense content, medical descriptions, appointment dates, opening hours, and pricing (`S/ 80.00`). Ensures exceptional legibility on compact mobile displays at 390px viewport widths.
- **Hierarchy Rules:** Section titles (e.g., "Nearby Veterinarian", "Choose a Date") use `headline-lg`. Doctor names and primary card anchors use `headline-md`. Numerical counters, reviews, and badges use `label-md` or `label-sm` with tabular numerals enabled where applicable.

## Layout & Spacing

The layout is built for fluid mobile-first ergonomics, anchored to a 4px/8px incremental grid.

### Mobile Screen Geometry (390px Baseline)
- **Outer Canvas Margins:** 16px (`1rem`) on left and right borders to maximize active screen real estate while guarding safe touch margins.
- **Section Rhythm:**
  - `space-xl` (24px) vertical spacing between discrete sections (e.g., between "My Pets" and "Nearby Veterinarian").
  - `space-lg` (16px) vertical gap between stacked veterinary or product cards.
  - `space-md` (12px) internal layout padding for nested child items.
  - `space-sm` (8px) gap between icons and labels, or badge chips.
  - `space-xs` (4px) micro-spacing for star ratings and auxiliary tags.

### Navigation and Sticky Footers
- Fixed bottom navigation bar height: 68px + safe area inset.
- Sticky floating appointment bar padding: 16px horizontal, 12px vertical.
- Touch target enforcement: All standalone interactive elements maintain a bounding box of at least 48px × 48px.

## Elevation & Depth

Visual hierarchy uses soft tonal layers combined with diffused, leaf-tinted drop shadows rather than stark harsh grays.

### Elevation Hierarchy
- **Level 0 (Flat Surface):** Default application background (`#F8FAF7`). No shadow.
- **Level 1 (Card & Content Surface):** White containers (`#FFFFFF`) with a delicate boundary shadow:
  `box-shadow: 0px 4px 16px rgba(46, 125, 50, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.04);`
  Border: `1px solid #EEF3ED`.
- **Level 2 (Interactive Floating & Time Slots):** Active buttons, selected date/time tiles, and hovered items:
  `box-shadow: 0px 8px 24px rgba(46, 125, 50, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.05);`
- **Level 3 (Modals & Bottom Sheets):** Sticky navigation controls, filter drawers:
  `box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.08);`
  Backdrop: Semi-opaque scrim with `backdrop-filter: blur(8px)`.

## Shapes

The shape vocabulary emphasizes friendliness, organic warmth, and tactile safety through generous corner radiuses.

- **Primary Cards & Containers:** Standardized at `20px` corner radius (`16px` minimum for compact sub-cards), delivering a welcoming, cushioned aesthetic.
- **Action Buttons & Inputs:** `14px` to `16px` border radius for buttons and form fields, matching the hand-held contouring of modern mobile devices.
- **Pet Avatars & Badges:** Circular (`9999px` or full pill shape) for pet selection thumbnails, status indicators, and pill tags (e.g., pet breed tags).
- **Time/Date Selector Blocks:** `12px` to `14px` border radius, creating clean tactile push-tiles for schedule selection.

## Components

### Buttons
- **Primary Action Button:** 
  - Height: 48px to 52px. Full width on mobile forms.
  - Background: `#2E7D32`. Text: `#FFFFFF` (`label-lg`).
  - Corner radius: 16px. Elevation: Level 2.
  - Focus/Active State: Scale `0.98`, background `#256628`.
- **Secondary / Ghost Button:**
  - Height: 48px. 
  - Background: `#EBF5EB`. Text: `#2E7D32`. Border: None.
- **Icon Action Buttons (e.g., Add Pet, Cart):**
  - Minimum size: 48px × 48px circle or squircle with 12px padding.

### Cards
- **Veterinarian Card:**
  - Background: `#FFFFFF`. Radius: 20px. Border: 1px solid `#EEF3ED`.
  - Layout: Horizontal layout on 390px mobile screens. 64px rounded avatar/photo on left, doctor details, star ratings (`#FFB300`), distance (`2.5 km`), and pricing (`S/ 100`) on right.
  - Card Footer: Integrated subtitle with next available slot or booking link.
- **Pet Profile Strip:**
  - Horizontal scrolling list. 64px circular pet portraits framed in a solid 3px border matching the brand accent, accompanied by pet name in `label-md`.

### Date & Time Pickers
- **Calendar Month Card:** White elevation-1 container with 20px radius. Current day indicated with an outlined ring; selected booking date filled with `#2E7D32` and white text.
- **Time Slot Chips:** 2-column or 3-column grid of pill tiles (minimum height 44px). Unselected: `#FFFFFF` surface with subtle border `#E5EBE4`. Selected: `#2E7D32` fill with white text.

### Form Inputs & Controls
- **Text Inputs:**
  - Height: 48px. Radius: 12px. Background: `#FFFFFF`. Border: 1.5px solid `#E5EBE4`.
  - Active/Focus: Border `#2E7D32` with a 3px soft outer ring (`rgba(46, 125, 50, 0.15)`).
- **Checkboxes & Radios:** 22px × 22px with 6px border radius on checkboxes and circular on radios. Active fill `#2E7D32` with clear white glyph.

### Navigation Bars
- **Header:** Brand green (`#5CB15A`) banner featuring status bar integration, user greeting, and quick profile trigger.
- **Bottom Tab Bar:** 
  - Height: 68px. Background: `#FFFFFF` or translucent `#5CB15A` with active icon highlighted in high-contrast inverted white badge. Label size: `label-sm`.