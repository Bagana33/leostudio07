# LEO STUDIO

An editorial LEO STUDIO website rebuilt around the live AOI reference's section sequence, proportions, black/white backgrounds and scrolling behavior. Mongolian is the default language; English is available from the header and footer.

## Preview and edit

Run `npm start`, then open http://127.0.0.1:4197. No dependencies are required. `npm run check` checks the application syntax.

- `dist/index.html`: classic page, bilingual copy and dialog structure.
- `dist/exp/index.html`: direct Experience entry point; keep synchronized with index.html.
- `dist/style.css`: layouts, brand treatment, responsive sizes and motion.
- `dist/pieces.js`: the five Traces of light clothing and object concepts.
- `dist/app.js`: modes, scrolling scenes, interactive canvas, filters, search, local saved selections and dialogs.
- `dist/assets/`: all runtime images, locally hosted. Photographic images are encoded as JPEG for delivery; logo transparency is preserved.
- `.openai/hosting.json`: the existing private Site identity; preserve it.

## Classic page sequence

1. Pinned split-image hero: four images per panel slide horizontally in opposite directions every 3.5 seconds; the stationary central identity gives way to editorial copy at 30% scroll progress.
2. Horizontal product row with category filters and drag/arrow navigation.
3. Black three-image editorial, large left image and two smaller right images.
4. White asymmetric story, narrow left copy, large landscape and staggered lower images.
5. Expanding category images; stacked bands on mobile.
6. Pinned full-screen craft scene with centered quotation.
7. White 1 of 1 story and compact horizontal studies.
8. Long black studio story: sticky left copy alongside six scrolling images.
9. Black floating-image collage around centered copy.
10. White gifting story and wide image.
11. Full-screen image gallery, filters and thumbnail selection.
12. Centered discovery form, using real study search.
13. Black three-column footer with oversized supplied wordmark.

## Experience

`/exp/` is a separate, viewport-filling, continuous image canvas. Drag, wheel-scroll or use arrow keys; select photographs or studies; filter categories; change the color theme; zoom with the on-screen controls or + / - keys. Touch dragging and pinch handling are implemented. Browser back/forward restores the corresponding mode. Reduced-motion settings suppress autoplay and inertial motion.

## Content boundaries

The supplied LEO STUDIO logo and brand palette remain unchanged. The current “Traces of light / Гэрлийн ул мөр” campaign has five concept designs: a dress, shirt, coat, scarf and tote. The clothing/object filters, search, saved selections and Experience canvas use the same current records. The collection has its own local saved-selection key; the previous collection's browser data is left intact.

All nine campaign photographs were generated with built-in imagegen for this visual concept: three fashion portraits, two product still lifes, two craft scenes, one textile macro and one packaging scene. Image credits and design detail dialogs explicitly identify these as AI-generated concepts, not photographs of manufactured inventory or actual production. The craft scene is editorial imagery, not a technical instruction diagram. There are no invented prices, availability, material certifications, business contacts or sales routes. Full-resolution PNGs and the generation prompt manifest are preserved in this checkout at `output/v4-campaign/`.

All editorial copy is newly written in Mongolian and English. Runtime images use optimized local JPEGs; no remote image services are required. The final form searches the designs. AOI's brand, photography, text and implementation code are not included.

Original supplied files and synced project `sources/` remain unchanged.

## Research and verification

The live reference at https://aoiofficial.com/ and its /exp mode were inspected section by section on 2026-09-29, including desktop/mobile layouts and interaction behavior. Cyanotype process reference: https://www.vam.ac.uk/articles/photographic-processes.

Browser verification covered 1280px desktop and 390px mobile, all 13 section bounds, no horizontal page overflow, local image loads, pinned hero copy, sticky studio copy, modal navigation, save/remove, filtering, desktop strip dragging, bilingual search, mobile menu, direct /exp/ loading, canvas dragging, keyboard activation after dragging, zoom, filtering and classic/Experience transitions. No JavaScript errors were observed. Native touch pinch was not device-tested. Verification screenshots are in the tracked `qa/` directory.

## Hero motion correction — 2026-09-29

Re-observed the live AOI hero on desktop and mobile. Replaced the crossfade with synchronized, fully opaque horizontal tracks (leftward on the left, rightward on the right), a 1.7-second decelerating transition and a seamless four-frame loop. Both original and duplicate first frames share their crop. Initial darkening is limited to 160px edge gradients; the 40% full overlay appears with the quote at the 30% scroll threshold. The mark remains stationary during image changes. Full image panels link to their category; those links are disabled during the quote. Mobile stacks the two tracks and places the upper category label at top-right. Pause freezes an in-progress transition; reduced motion disables autoplay. Other sections and the existing private audience are retained.

## Campaign refresh — 2026-09-29

Replaced every photographic placement with the nine-image navy/ivory botanical campaign and updated 41 bilingual editorial text blocks, five design descriptions, metadata, image credits and content categories. Retained the AOI-aligned section order, opposite-direction opaque hero sliders, fixed identity, scrolling quotes and all existing interactive modes. Adjusted portrait crop positions and main paragraph sizing for the new content.

Campaign validation covered 1280×720 desktop and 390×844 mobile: loaded image references, portrait crops, long Mongolian text, English captions, 3 clothing / 2 object filters, exact scarf search, mobile hero quote and 49-image Experience canvas. No page overflow or browser console errors were observed. Checks also verified that both route documents are identical and syntax is valid.

## GitHub export

This folder is the complete buildless Sites version, alongside the existing React application at the repository root. It was exported from published Site version 4, source commit `018f2ea718b4dd4b082a3cf5ae2d310659e8a7c8`.

From the repository root:

```sh
cd sites/leo-studio
npm start
```

Open http://127.0.0.1:4197/. No package installation or API keys are required for this version.

The export includes all runtime assets, nine full-resolution campaign PNGs and their generation records (`output/v4-campaign/`), bilingual copy source (`output/v4-copy.json`), and desktop/mobile QA captures (`qa/`). Duplicate delivery ZIP/tar archives, local caches and Git internals are excluded.
