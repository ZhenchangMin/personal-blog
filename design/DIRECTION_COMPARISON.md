# Frontend Direction Comparison

## A — Field Journal / 生活手记

**Character:** intimate, temporal, lived-in.

Strengths:
- strongest match for “a diary, but more deliberate than a diary”;
- dates, moments, photos, projects can coexist without looking like a portfolio;
- the time seam can become a recognizable site-wide device;
- encourages small entries rather than only polished essays.

Risks:
- paper texture + serif can become cliché if accent colors and decorations become too warm/cute;
- the pinned `Now` note should remain a single signature detail, not spread into a whole sticky-note UI.

Best use: primary site shell.

## B — Editorial / 个人刊物

**Character:** confident, authored, publication-like.

Strengths:
- strongest first-screen visual impact;
- excellent for long essays, yearly reviews, themed collections;
- makes writing feel important without using portfolio clichés.

Risks:
- too much “publication pressure” for ordinary moments;
- rigid issue/grid language may make spontaneous entries feel out of place;
- can become a fashion/editorial template if overused.

Best use: monthly review, yearly review, special essay landing pages.

## C — Quiet Garden / 安静花园

**Character:** calm, unfinished, exploratory.

Strengths:
- best content model for incomplete thoughts;
- “seed / growing / essay” reduces friction to publish;
- content maturity becomes meaningful navigation rather than decorative tags;
- very suitable for research/learning notes alongside life writing.

Risks:
- if pushed too far, the garden metaphor can feel borrowed from the digital-garden community;
- green palette alone is not enough to establish a personal identity.

Best use: content-state model and notes system.

# Current recommendation

Build the final identity as:

**A's visual shell + C's content maturity model + B's editorial treatment for special long-form pages.**

This produces one coherent site instead of three separate aesthetics:

- Home / Moments / Now: A
- Notes maturity states: C
- Monthly / Yearly review and selected essays: restrained B treatment

# Signature element

Keep one memorable element: **the time seam**.

It appears subtly in:
- homepage Moments;
- archive chronology;
- article margin metadata;
- monthly pages.

Do not add many competing signatures. Photos and typography should remain content, not decoration.

# Production QA fixed for later

Before turning the chosen prototype into the real site:
- skip-to-content link;
- visible focus for every interactive element;
- `scroll-margin-top` for anchors;
- intentional touch feedback;
- real images with explicit dimensions + lazy loading below fold;
- dates generated from content metadata rather than manually typed;
- reduced-motion path;
- 390px / 768px / 1440px viewport QA;
- test long Chinese titles and long English/code tokens;
- final contrast audit after fonts and accent colors are locked.
