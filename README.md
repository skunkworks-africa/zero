# ZERO by Skunkworks

An expanded public website for **zero.skunkworks.africa**, built from the original ZERO launch preview and the official Skunkworks Design System. Forty static pages provide public knowledge, services, research, transparent pricing and accessible local interactions.

## Run and validate

Use Node 22 or later.

```sh
npm ci --ignore-scripts
npm run build
npm run check
npm run test:unit
npx playwright install chromium
npm test
npm start
```

The local site is served at `http://127.0.0.1:4173`. Local Windows tests use installed Microsoft Edge; CI uses Playwright Chromium. The browser suite checks all routes with axe, all routes at 320/390/768/1440 pixels in both themes, key dark/mobile states, keyboard navigation, reduced motion, no-JavaScript behaviour, assessment/estimator maths, explicit context choice and local-only enquiry downloads.

## Source map

- `src/content.mjs`: page content, hierarchy, services, prices and synthetic examples.
- `src/model.mjs`: assessment rules, plan estimation and allowed contact topics.
- `scripts/build.mjs`: static HTML, sitemap, manifests and hosting configuration.
- `public/assets/`: local CSS, JavaScript, official brand tokens and pictograms.
- `scripts/security.mjs`: shared security response headers.
- `tests/`: model and browser checks.
- `docs/`: deployment notes, provenance and submission activation requirements.

`dist/` is the deployable website. It is generated, excluded from Git and uploaded as a CI artifact. No build-time secrets, API keys, remote fonts or runtime third-party dependencies are required. `vercel.json` and the generated `staticwebapp.config.json` supply matching host security headers. Vercel deployment requires a commercially suitable plan.

## Honest availability

This is a **public preview**. The Safety Capital score is illustrative and self-reported, not an accredited measure or proof of security. Evidence Passports are synthetic and unsigned. Prices are proposed AUD figures from the launch brief, excluding applicable GST; no availability or contract is implied.

Enquiries are **local downloadable briefs**, not submissions. Visitors can explicitly include assessment, pricing or originating-page context. No optional analytics, cookies, browser storage, evidence uploads, email sends or CRM writes occur. All personal data remains in page memory until cleared or reloaded; a file deliberately downloaded by a visitor remains on their device.

Console, verification and API pages clearly identify future product concepts. No real sign-in, evidence collection, certification, subscription, monitoring or independent assurance is represented as active.

## Deployment

The target changed from the original Australian host to `zero.skunkworks.africa` on 28 November 2026. The existing repository `CNAME` is preserved. Do not publish the commercial site through GitHub Pages merely because its DNS is already configured there. Use the approved Azure hosting route and complete the checks in `docs/DEPLOYMENT.md`.

The preview intentionally ships `noindex` and a disallow-all robots file. Remove these only after the operator, privacy notice, commercial claims and production availability have been reviewed.

## Rights and attribution

The repository's existing MIT licence is retained. Skunkworks brand artwork and brand names remain their owner's property; the software licence does not grant separate trademark rights. Official brand files are copied without alteration and their pinned source is recorded in `docs/PROVENANCE.md`. Wikipedia is linked as inspiration, without reproducing its article text or implying endorsement.
