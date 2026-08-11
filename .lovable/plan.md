# Confirm & fully clean the project font to Roboto only

## Context (verified from code, no changes yet)

The entire production site already renders in Roboto. Confirmed:
- `src/routes/__root.tsx` line 111 loads `Roboto:wght@400;500;700` via Google Fonts (no other family).
- `src/styles.css` lines 47–48 set `--font-display` and `--font-sans` both to `"Roboto", ui-sans-serif, system-ui, sans-serif`.
- `src/styles.css` line 117 applies `font-family: var(--font-sans)` to `html`, so every element inherits Roboto.
- No `Inter`, `Poppins`, `Helvetica Neue`, `Georgia`, `Times`, or serif family is referenced anywhere in `src/`.

Two template leftovers do NOT change the displayed font but are not Roboto-clean:

1. `src/styles.css` line 123 — `font-feature-settings: "cv02", "cv03", "cv04", "cv11"` on `body`. These are Inter-specific OpenType glyph variants; Roboto ignores them. Pure dead config.
2. `src/components/ui/chart.tsx` line 224 — `font-mono` on a numeric chart label. No `--font-mono` is defined in the project, so it falls back to the browser default monospace. Only renders if a chart is actually shown.

Dev-only artifact (left untouched — not user-facing): `src/lib/error-page.ts` line 9 uses `system-ui` for the Lovable dev error overlay.

## Plan

### Step 1 — Remove dead Inter feature settings
In `src/styles.css`, delete the `font-feature-settings: "cv02", "cv03", "cv04", "cv11";` declaration (line 123) from the `body` rule. Roboto has no such variants, so this removes misleading config with zero visual change. Leave the `[dir="rtl"] { font-feature-settings: normal; }` block as-is (it is harmless and explicit).

### Step 2 — Map `--font-mono` to Roboto for chart labels
Add `--font-mono: "Roboto", ui-monospace, monospace;` to the `:root` theme block in `src/styles.css` (next to lines 47–48). This makes the shadcn chart's `font-mono` numeric labels render in Roboto (tabular-friendly), so even the unused chart primitive is brand-compliant if it is ever used. No other component is affected because nothing else uses `font-mono`.

### Verification
- Grep `src/` for `font-feature-settings`, `cv0`, and `font-mono` to confirm only intended references remain.
- Visually confirm the site still renders identically (no layout shift expected).
