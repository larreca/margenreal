# Yeppo Academy learning UX — 19 October 2026

## Visual scope
Five approved surfaces: student home, catalog, chapter overview, lesson reader, learning profile.
Source visual truth: `docs/ux/approved-concept.png` (1448 × 1086 concept board).
Implementation: browser-rendered local Next.js application, desktop viewport 1363 × 926 CSS pixels, and same-origin isolated 390 × 844 mobile viewport (375 px content width after scrollbar).
Implementation screenshots: captured in the browser tool transcript during this session; these captures were not exported to local image files. They include home, catalog, chapter, profile, mobile home, mobile lesson and both image-viewer modes.

## Comparison
Typography: Georgia editorial headings, Arial UI/body; 16 px teaching text, 13–14 px supporting labels. Plum text/actions, warm white surfaces, blush highlights. No generated decorative icons or fabricated product packaging.
Layout: split editorial home hero; primary resume action; slim progress indicators; numbered chapters grouped by existing thematic routes; chapter lesson list and resource column; persistent desktop outline and collapsible mobile outline. Five-screen board is a visual direction, not a claim of pixel-identical mock content: the implementation uses all ten existing routes and real chapter titles/content.
Images: existing approved Chapter 4–6 originals preserved, no raster editing. Real photo used for home, locally cached from the same licensed source already used for Chapter 11. Educational figures use contain sizing; photo covers use intentional cover cropping. Image dialog supports native-size detail, scrolling and focus return.

## Comparison history / fixes
- P2: the first mobile reader placed back navigation and chapter number on the same line. Changed the back link and chapter label to block layout; rechecked mobile reader.
- P2: fitting an infographic into a mobile dialog did not provide additional detail. Added original-size viewing and horizontal scroll, then opened, enlarged and closed the Chapter 6.1 original in the mobile browser. Focus returned to the trigger.
- P2: mobile home placed progress too low. Reduced photo/copy height and placed the progress summary first in the mobile progress section.
- P2: initial unrelated fashion portrait did not match the approved skincare context. Replaced it with a real skincare photograph used by Chapter 11.

## Interaction evidence
- Catalog: case/accent-insensitive text search filters the fifty chapters; `hidratantes` returns Chapter 11.
- Open chapter → first lesson; confirm reading → next lesson. The sidebar changes from 0/8 to 1/8 (13%).
- Selecting lesson three without confirming does not increase 1/8 progress.
- Favorites and a lesson note persisted through reload and appeared under profile. Note text: “Recordar: preguntar por textura y tolerancia antes de recomendar.”
- Home resumes the last opened lesson and displays fractional overall progress; weekly goal counts confirmed lessons, not navigation.
- Mobile outline expands/collapses. Original Chapter 6 PNG opens in a dialog, toggles to original size and closes with focus restored. Document content width equals viewport content width (375 px), no horizontal page overflow.
- Download control initiates an HTML study guide assembled from the full current chapter, enhanced visuals and sources. Automated browser download-event verification timed out; actual downloaded-file inspection remains unverified.
- Eight Node tests cover browsing vs confirmation, valid lesson identity, evaluation gating, complete chapters, Chilean weekly boundary, inherited progress and accent-insensitive searching.
- Production build passed. API changes validate session, chapter access, module identity, note size and favorite type. Signed write serialization avoids overlapping mutations within a reader.

## Console review
Observed an initial development hot-reload/router initialization error before switching the preview to Webpack. Later hydration warning identifies browser-extension-injected `data-oai-browser-agent-*` attributes on `<html>`, not app content. Added Next's documented smooth-scroll root marker. No observed runtime exception blocked the tested core interactions.

## Separate infrastructure blocker
The published application's `/api/health` reports database=false, auth=false, setupToken=false. Existing Neon project `yeppo-b2b-academy` has the expected schema but zero users, saved progress or published chapters. Vercel environment inspection is denied with 403 (`projectEnvVars`). No credentials, accounts or environment settings were created or changed. Cross-device/account persistence and final certificate issuance therefore are not activated or integration-verified. The open course explicitly identifies browser-only persistence; its local quiz state cannot issue a server certificate.

## Result
Visual and core open-course interaction review: passed, with the captured evidence and export limitation above.
Account persistence / deployment configuration: blocked by missing Vercel environment permission.
Residual P3: further editorial refinements in older per-chapter content, beyond the shared interface, can be iterated separately.

final result: passed
