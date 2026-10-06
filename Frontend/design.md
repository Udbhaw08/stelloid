# Stelloid — Design System

> Canonical reference for all visual decisions. Every color, size, and component pattern must adhere to this document.

---

## Color Palette

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--stelloid-dark` | Charcoal Night | `#202027` | Body text, headings, dark UI elements |
| `--stelloid-muted` | Stone Grey | `#62626d` | Secondary text, captions, subdued labels |
| `--stelloid-purple` | Dusty Pink | `#B76E79` | Primary brand accent, CTAs, highlights, badges, icons |
| `--stelloid-line` | Soft Pearl | `#E8B4B8` | Borders, dividers, subtle accents, globe rings |
| `--stelloid-soft` | Cream | `#F7E7CE` | Section backgrounds, card fills, warm surfaces |
| `--stelloid-white` | Pure White | `#FFFFFF` | Page background, card backgrounds, nav |

### Quick Reference

```
Pure White  #FFFFFF  ─────────────────────── Page / cards / nav
Cream       #F7E7CE  ─────────────────────── Section BG (e.g. System Architecture)
Soft Pearl  #E8B4B8  ─────────────────────── Borders / dividers / subtle glow
Dusty Pink  #B76E79  ─────────────────────── Primary accent (buttons, badges, icons)
Stone Grey  #62626d  ─────────────────────── Secondary / muted text
Charcoal    #202027  ─────────────────────── Headings / body text
```

### Rules

- **Never** use raw `#14122b`, `#252244`, `#6d4bf5`, `#7a5cf5`, `#3b6cff` or any purple/navy shades. They belong to the old palette.
- **Always** reference palette colors via CSS variables (`var(--stelloid-dark)`, etc.) in App.css.
- For one-off inline styles in JSX components, use the hex values directly (e.g. `#B76E79`, `#E8B4B8`).
- The **only** dark colour for text is `#202027` (Charcoal Night). Never use near-black navies.

---

## Typography

| Role | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Body | Inter / Segoe UI | 400 | 17px | Line-height 1.48 |
| Section heading | Inter | 500 | clamp(2.8rem, 4vw, 3.7rem) | Letter-spacing -0.05em |
| Hero title | Inter | 500 | clamp(3rem, 4.4vw, 5.2rem) | Letter-spacing -0.07em |
| Italic accent | Georgia / Times New Roman | 500 italic | inherited | Used for hero/section sub-lines |
| Badge / label | Inter | 500 | 12px | Uppercase, letter-spacing 0.04-0.08em |
| Micro copy | Inter | 400 | 12px | Muted stone grey |

---

## Spacing

| Token | Value | Usage |
|---|---|---|
| `section-spacing` | `padding: 104px 0` | Default section vertical rhythm |
| System Architecture section | `padding: 56px 0 72px` | Tighter, to avoid excessive top gap |
| Container width | `min(1400px, calc(100% - 96px))` | All main sections |
| Section gap (heading row) | `gap: 120px` | Side-by-side heading + intro |
| Loop title margin-top | `24px` | Space between badge and h2 |

---

## Component Patterns

### Section Badge

```jsx
<div className="section-badge">
  <span className="badge-dot" />
  <span>Label Text</span>
</div>
```

- Background: White (#ffffff) on cream sections; transparent on white sections
- Dot colour: #B76E79 (Dusty Pink)
- Text colour: #B76E79 (Dusty Pink)

### Section Title with Italic Accent

```jsx
<h2 className="section-title">
  First line<br />
  <span className="italic-accent" style={{ color: '#B76E79' }}>italic accent line</span>
</h2>
```

### Primary Button

- Background: `var(--stelloid-dark)` -- #202027
- Border: same as background
- Hover: #2e2e38
- Text: white

### Accent / Nav Button

- Background: `var(--stelloid-purple)` -- #B76E79
- Border: `var(--stelloid-purple)`
- Text: white

---

## Section Backgrounds

| Section | Background |
|---|---|
| Hero | `linear-gradient(180deg, #F7E7CE 0%, #ffffff 100%)` |
| System Architecture | `#F7E7CE` (Cream) |
| Light sections | `#ffffff` (Pure White) |
| Commerce Stack Strip | `linear-gradient(180deg, #100f1a, #0c0b14)` (intentional dark strip) |
| Borders | `var(--stelloid-line)` -- #E8B4B8 |

---

## Globe / 3D Visual

All Three.js colours in HeroGlobe3D.jsx must use only the palette:

| Element | Color |
|---|---|
| Point cloud particle 1 | #B76E79 (Dusty Pink) |
| Point cloud particle 2 | #E8B4B8 (Soft Pearl) |
| Ring lines | 0xB76E79 |
| Source node lines | 0xE8B4B8 |
| Ambient dots | 0xE8B4B8 |
| Node-to-node lines | 0xB76E79 |
| SVG link paths (dashed) | #B76E79 |
| Orb gradient | radial-gradient(circle, #fff 0%, #F7E7CE 35%, #E8B4B8 72%, #B76E79 100%) |
| Orb text | #4a2c31 (dark rose -- warm dark for readability on orb) |
| Orb small text | #B76E79 |

---

## System Architecture Section

- **Badge label**: System Architecture
- **Heading**: How Stelloid documentation
- **Italic accent**: system works
- **Section padding**: `56px 0 72px` (NOT the default 104px) -- prevents excessive top gap
- **Background**: #F7E7CE (Cream)
- **Workflow nodes**: White cards, #B76E79 active border, Dusty Pink icons

---

## Do's and Don'ts

### Do
- Use CSS variables (`var(--stelloid-dark)`, etc.) in App.css
- Use the 4-color palette for all new UI additions
- Keep section backgrounds alternating White / Cream for visual rhythm
- Use #B76E79 for any interactive or highlighted element

### Don't
- Introduce new purple/blue/navy shades
- Use #14122b, #252244, #6d4bf5, #7a5cf5 or similar
- Mix font families outside of Inter/Georgia
- Add padding-top > 80px to sections that don't need it
