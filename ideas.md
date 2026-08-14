# Rasyine Deco — Visual Direction

## Three initial directions

### Theme Name: Atelier Quiet Luxury
Very Brief Intro: A warm editorial world built around tactile materials, restored silhouettes, and the calm confidence of a private design atelier.
Probability: 0.07

### Theme Name: Crafted Mediterranean Modern
Very Brief Intro: Sun-washed architecture, expressive earth pigments, and contemporary forms create a welcoming design language rooted in craft.
Probability: 0.04

### Theme Name: Material Study
Very Brief Intro: A gallery-like interface treats leather, wood, thread, and fabric as the protagonists, with precise layouts and museum-label restraint.
Probability: 0.02

## Chosen approach: Atelier Quiet Luxury

### Design Movement
Contemporary editorial interior design with references to quiet luxury, modernist furniture, and North African craft ateliers.

### Core Principles
1. **Material before decoration:** every visual decision should make leather, wood, thread, boucle, and plaster feel tangible.
2. **Editorial asymmetry:** the page should feel composed like a design magazine spread rather than a centered template.
3. **Warm restraint:** use a small, ownable palette with generous breathing room and no decorative noise.
4. **Craft as proof:** interactions should reveal process, transformation, and precision instead of relying on generic marketing claims.

### Color Philosophy
The palette moves from warm ivory to espresso, with burnt terracotta and muted brass as signals of human touch. Ivory creates calm space, brown carries permanence, terracotta introduces a crafted warmth, and brass marks important actions without looking flashy.

### Layout Paradigm
Use a split editorial hero, offset image crops, vertical labels, and irregular section rhythms. Content should alternate between anchored text blocks and image-led moments, with a persistent sense of a printed spread unfolding down the page.

### Signature Elements
1. A slim vertical **ATELIER / RASYINE DECO** label system.
2. Fine brass rule lines and stitch-like dotted dividers.
3. Image cards with restrained corner cuts and tactile hover zooms.

### Interaction Philosophy
Interactions should feel like handling a crafted object: short, deliberate, and tactile. Buttons compress slightly, images reveal detail on hover, language changes preserve the page position, and the process gallery uses a calm step-by-step reveal.

### Animation
Use subtle opacity and transform entrances under 300ms with an editorial stagger. Image hover states should scale only the image, never the layout. Avoid looping motion except for a very slow ambient grain or marquee. Respect reduced-motion preferences.

### Typography System
Use **DM Sans** for navigation, utility labels, and body copy, paired with **Cormorant Garamond** for large editorial headlines and section statements. Headlines should be large, tight, and sentence-case; labels should be uppercase with generous tracking; Arabic should use **Noto Kufi Arabic** for interface clarity and **Noto Naskh Arabic** for expressive display moments.

### Brand Essence
Rasyine Deco is a transformation atelier for people who want heirloom furniture and automotive interiors to feel personal, precise, and alive again. Personality: **tactile, discerning, quietly bold**.

### Brand Voice
Headlines should be concise and sensory. CTAs should invite a considered conversation rather than push a sale. Microcopy should sound observant, assured, and specific.

Example lines:
- “A second life, shaped around you.”
- “Bring us the piece with a story.”

### Wordmark & Logo
The wordmark should pair a high-contrast editorial serif with a compact sans-serif descriptor. The symbol is a continuous brass line inspired by a curved upholstery stitch, a chair silhouette, and a Moroccan arch.

### Signature Brand Color
**Burnt Terracotta — #B65A3A.** It is warm, ownable, and visibly connected to handwork, aged leather, and sunlit plaster.

## Visual verification notes

The public landing page and Design Studio successfully express the chosen quiet-luxury atelier direction. The atelier order-management area must retain this same vocabulary, so generic navigation labels are replaced with branded operational language. Real workshop photographs remain deliberately documentary, but are colour-treated and captioned as proof of craft rather than used as generic decoration. The stitch/arch symbol is repeated in headers, the concept canvas, and brand touchpoints to keep the mark visible throughout the product.

Mobile verification confirms that the landing page, the new contact form and the Design Studio maintain a clear single-column reading order without horizontal overflow. Arabic support is implemented through the locale selector, `lang` and `dir` updates, logical CSS layout properties, Arabic typefaces and mirrored directional affordances in the public and Studio flows.

The AI Furniture Lab was verified on desktop and mobile. It keeps a clear single-column mobile flow while preserving its deliberately non-catalogue structure: a dark object stage, asymmetric model rail, material and mood controls, design code and direct paths to the Design Studio or WhatsApp. The modern furniture gallery on the landing page successfully extends the editorial atmosphere without diminishing the documentary workshop section.

The final Lab iteration adds a side-by-side comparison surface, six selectable furniture archetypes, and explicit material, mood, palette and room controls. Its generated brief is handed to the Design Studio as a prefilled creative direction, while a completed Studio request offers a WhatsApp share path that includes the brief plus the available reference and concept URLs. The second generation batch is wired through persistent asset URLs and will replace its reserved visual placeholders automatically when generation completes.

Arabic validation confirmed public Home, the AI Furniture Lab and the Design Studio render with Arabic content and correct right-to-left composition. Directional arrows and model rail affordances are mirrored. The Atelier route is owner-protected and its loading skeleton was observed in the non-owner screenshot context; this does not affect the public Arabic flows.

The authenticated Arabic Atelier view was subsequently verified after stabilization. Its sidebar now moves to the right edge, the control icon and resize boundary follow the RTL direction, and the order desk, request states and inbox retain a clear right-aligned reading order.

## Style Decisions

- The hero must prioritize the generated living-room image with dark espresso text on the light negative-space side.
- Arabic is a first-class layout, not a translated afterthought; use `dir="rtl"` and mirror navigation/order where it improves comprehension.
- No invented reviews, ratings, or testimonials will appear on the page.
- Contact actions remain clear and human: request a consultation, share a piece, or start a conversation.
