# Design Layer System

## Rules

- Never use all caps — not in labels, buttons, headings, or any text element at any size.
- No raw color values outside of foundation — hex and rgb values are only allowed in `foundation.css`. Every semantic token must reference a foundation token or another semantic token, never a raw value.
- To add a new color, add it to foundation first, then reference it from the semantic layer.
- Every group is a layer. Stack order from lowest to highest:

  | Layer | Token group |
  |---|---|
  | 1 — lowest | background |
  | 2 | surface |
  | 3 | surface-hover |
  | 4 — highest | accent |

  Nothing from a higher layer can be used as a background for a lower layer.

---

## Foundation

Raw primitives — the only place hex values are defined. All semantic tokens reference these.

```css
--gray-0:   #ffffff;
--gray-50:  #f5f5f5;
--gray-100: #efefef;
--gray-200: #d9d9d9;
--gray-850: #1e1e1e;
--gray-900: #141414;
--gray-950: #0a0a0a;
```

---

## Background

```css
--background-dark:  var(--gray-950);
--background-light: var(--gray-100);
```

## Surface

```css
--surface-dark:  var(--gray-900);
--surface-light: var(--gray-0);
```

## Surface Hover

```css
--surface-hover-dark:  var(--gray-850);
--surface-hover-light: var(--gray-50);
```

## Foreground

```css
--foreground-dark:       var(--surface-light);
--foreground-muted-dark: var(--surface-hover-light);

--foreground-light:       var(--background-dark);
--foreground-muted-light: var(--surface-hover-dark);

--foreground-revert: var(--surface-light);
```

## Accent

```css
/* Blues */
--accent-blue-400: #60a5fa;
--accent-blue-500: #3b82f6;
--accent-blue-600: #2563eb;

/* Indigos */
--accent-indigo-400: #818cf8;
--accent-indigo-500: #6366f1;
--accent-indigo-600: #4f46e5;

/* Violets */
--accent-violet-400: #a78bfa;
--accent-violet-500: #8b5cf6;
--accent-violet-600: #7c3aed;

/* Purples */
--accent-purple-400: #c084fc;
--accent-purple-500: #a855f7;
--accent-purple-600: #9333ea;

/* Pinks */
--accent-pink-400: #f472b6;
--accent-pink-500: #ec4899;
--accent-pink-600: #db2777;

/* Roses */
--accent-rose-400: #fb7185;
--accent-rose-500: #f43f5e;
--accent-rose-600: #e11d48;

/* Oranges */
--accent-orange-400: #fb923c;
--accent-orange-500: #f97316;
--accent-orange-600: #ea580c;

/* Ambers */
--accent-amber-400: #fbbf24;
--accent-amber-500: #f59e0b;
--accent-amber-600: #d97706;

/* Yellows */
--accent-yellow-400: #facc15;
--accent-yellow-500: #eab308;
--accent-yellow-600: #ca8a04;

/* Limes */
--accent-lime-400: #a3e635;
--accent-lime-500: #84cc16;
--accent-lime-600: #65a30d;

/* Emeralds */
--accent-emerald-400: #34d399;
--accent-emerald-500: #10b981;
--accent-emerald-600: #059669;

/* Teals */
--accent-teal-400: #2dd4bf;
--accent-teal-500: #14b8a6;
--accent-teal-600: #0d9488;

/* Cyans */
--accent-cyan-400: #22d3ee;
--accent-cyan-500: #06b6d4;
--accent-cyan-600: #0891b2;

/* Skies */
--accent-sky-400: #38bdf8;
--accent-sky-500: #0ea5e9;
--accent-sky-600: #0284c7;
```

## Border

```css
--border-width-thin:    0.5px;
--border-width-default: 1px;
--border-width-thick:   2px;

--border-dark:  var(--surface-hover-dark);
--border-light: #d9d9d9;
```

## Spacing

```css
--spacing-1:  4px;
--spacing-2:  8px;
--spacing-3:  12px;
--spacing-4:  16px;
--spacing-5:  20px;
--spacing-6:  24px;
--spacing-8:  32px;
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
--spacing-20: 80px;
--spacing-24: 96px;
```

## Radius

```css
--radius-none: 0px;
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   12px;
--radius-xl:   16px;
--radius-2xl:  24px;
--radius-3xl:  32px;
--radius-full: 9999px;
```

## Text Styles

```css
--font-sans: "SF Pro Text", -apple-system, "Inter", sans-serif;

.text-caption {
  font-family: var(--font-sans);
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.005em;
  font-weight: 400;
}

.text-body {
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  font-weight: 400;
}

.text-body-large {
  font-family: var(--font-sans);
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.014em;
  font-weight: 400;
}

.text-heading {
  font-family: var(--font-sans);
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.02em;
  font-weight: 600;
}

.text-title {
  font-family: var(--font-sans);
  font-size: 36px;
  line-height: 42px;
  letter-spacing: -0.03em;
  font-weight: 700;
}

.text-display {
  font-family: var(--font-sans);
  font-size: 54px;
  line-height: 58px;
  letter-spacing: -0.04em;
  font-weight: 700;
}

/* Weight modifiers */
.font-regular  { font-weight: 400; }
.font-semibold { font-weight: 600; }
.font-bold     { font-weight: 700; }
```

## Icon sizes

Matched to the line-height of each text style so icons align naturally inline with text.

```css
--icon-caption:    16px;  /* text-caption: 12px / 16px */
--icon-body:       20px;  /* text-body: 14px / 20px    */
--icon-body-large: 24px;  /* text-body-large: 18px / 26px */
--icon-heading:    24px;  /* text-heading: 24px / 30px */
--icon-title:      40px;  /* text-title: 36px / 42px   */
--icon-display:    48px;  /* text-display: 54px / 58px */
--icon-stroke:     2px;
```

## Animations

```css
--animation-hover-duration: 150ms;
--animation-hover-curve:    cubic-bezier(0.25, 0, 0, 1);

--animation-scale-duration: 220ms;
--animation-scale-curve:    cubic-bezier(0.34, 1.56, 0.64, 1);

--animation-press-duration: 80ms;
--animation-press-curve:    cubic-bezier(0.4, 0, 1, 1);
```
