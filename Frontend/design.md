# Stelloid — Design System

> Canonical reference for all visual decisions. Every color, size, and component pattern adheres to the official Stelloid design.

---

## Color Palette

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--stelloid-purple` | Stelloid Indigo / Purple | `#6145E7` | Primary brand accent, CTAs, highlights, badges, active icons, links |
| `--stelloid-dark` | Charcoal Night | `#202027` | Headings, body text, dark UI elements, logo mark |
| `--stelloid-muted` | Stone Grey | `#62626D` | Secondary text, captions, subdued labels, metadata |
| `--stelloid-line` | Subtle Line | `#E7E6EC` | Borders, dividers, table borders, card outlines |
| `--stelloid-soft` | Lavender Soft | `#F4F1FF` | Tinted section backgrounds, pill fills, badge backgrounds |
| `--stelloid-soft-2` | Cool Off-White | `#F8F8FA` | Secondary containers, table header fills, hover states |
| `--stelloid-white` | Pure White | `#FFFFFF` | Page background, card backgrounds, navigation |
| `--stelloid-green` | Forest Green | `#326147` | Success badges, positive metrics, complete states |
| `--stelloid-green-soft` | Mint Soft | `#EDF7EF` | Success indicator backgrounds |
| `--stelloid-orange-soft` | Peach Soft | `#FFF0E7` | Warning badges, pending reviews, awaiting exports |
| Notice Accent | Volt Lime | `#DBF69D` | Trust callout card ("Recommendations in. No autonomous changes out.") |

### Quick Reference

```
Pure White       #FFFFFF  ─────────────────────── Page / cards / nav
Lavender Soft    #F4F1FF  ─────────────────────── Soft section / badge background
Cool Off-White   #F8F8FA  ─────────────────────── Secondary surface / subtle cards
Subtle Line      #E7E6EC  ─────────────────────── Borders / dividers
Stelloid Purple  #6145E7  ─────────────────────── Primary accent (buttons, badges, icons, highlights)
Stone Grey       #62626D  ─────────────────────── Secondary / muted text
Charcoal Night   #202027  ─────────────────────── Headings / body text
Forest Green     #326147  ─────────────────────── Positive metrics & completed status
Mint Soft        #EDF7EF  ─────────────────────── Green badge fills
Peach Soft       #FFF0E7  ─────────────────────── Warning / pending badge fills
Volt Lime        #DBF69D  ─────────────────────── Trust callout highlight
```

### Rules

- **Always** reference palette colors via CSS variables (`var(--stelloid-purple)`, `var(--stelloid-dark)`, etc.) in `App.css`.
- For one-off inline styles in JSX components, use the CSS variables or official hex values (e.g. `#6145E7`, `#202027`).
- Text contrast must adhere to standard accessibility guidelines (minimum 4.5:1 for body copy).

---

## Typography

| Role | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Body | Outfit / Inter / Segoe UI | 400 | 17px | Line-height 1.48 |
| Section heading | Outfit / Inter | 500 | clamp(2.8rem, 4vw, 3.7rem) | Letter-spacing -0.05em |
| Hero title | Outfit / Inter | 500 | clamp(3rem, 4.4vw, 5.2rem) | Letter-spacing -0.07em |
| Italic accent | Georgia / Times New Roman | 500 italic | inherited | Used for hero/section sub-lines (`color: #6145E7`) |
| Badge / label | Outfit / Inter | 500 | 12px | Uppercase, letter-spacing 0.04-0.08em |
| Micro copy | Outfit / Inter | 400 | 12px | Muted stone grey (`#62626D`) |

---

## Component Patterns

### Section Badge

```jsx
<div className="section-badge">
  <span className="badge-dot" style={{ background: '#6145E7' }} />
  <span style={{ color: '#6145E7' }}>Label Text</span>
</div>
```

- Background: White (`#FFFFFF`) or transparent
- Dot colour: `#6145E7` (Stelloid Purple)
- Text colour: `#6145E7` (Stelloid Purple)

### Section Title with Italic Accent

```jsx
<h2 className="section-title">
  First line<br />
  <span className="italic-accent" style={{ color: '#6145E7' }}>italic accent line</span>
</h2>
```

### Primary Button

- Background: `var(--stelloid-purple)` -- `#6145E7`
- Border: `var(--stelloid-purple)`
- Hover: `#4e33d4`
- Text: `#FFFFFF`

### Secondary / Outline Button

- Background: `#FFFFFF`
- Border: `var(--stelloid-line)` -- `#E7E6EC`
- Text: `var(--stelloid-dark)` -- `#202027`
