# Validation — 28 November 2026

- Build: 40 static pages and two synthetic JSON manifests.
- Static checks: 1,989 internal links/assets, local anchors, unique IDs, exactly one h1 per page and privacy guard checks passed.
- Four model tests passed: incomplete/invalid assessment rejection, uncertainty/scoring, pricing totals and bounded contact context.
- Forty page-level axe checks passed for WCAG 2 A/AA, 2.1 AA and 2.2 AA rules.
- Every route passed horizontal-reflow checks at 320, 390, 768 and 1440 CSS pixels in light and dark themes (320 combinations).
- Eight representative pages passed dark/mobile accessibility checks.
- Interactive assessment, consent-controlled context, pricing, email/consent validation, escaped local brief rendering, downloads/clearing, search, filters and the learning challenge passed.
- No-JavaScript reading/navigation and disabled enquiry submission passed.
- Response headers, rejection of write requests, genuine 404 and synthetic manifest boundaries passed.
- Keyboard navigation, skip link, focus return and reduced motion passed in a targeted rerun after an unrelated Edge browser-process closure. Initial full run: 48 passed, one browser-start interruption; rerun: one passed.
- npm reported zero known vulnerabilities at install; production dependency audit found zero vulnerabilities. There are no runtime npm dependencies.
- Desktop and mobile homepage screenshots were inspected for spacing, hierarchy and clipping.

Local browser: Microsoft Edge via Playwright (Chromium engine). CI is configured to run separately on Playwright Chromium/Linux. A manual screen-reader pairing, Safari/Firefox rendering and live-host/DNS checks are not established by these local results. Automated scans are not WCAG conformance certification.
