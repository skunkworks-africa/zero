# Deployment handoff

Target: `https://zero.skunkworks.africa/`
Source: `https://github.com/skunkworks-africa/zero`
Requested hosting: existing Azure account (selected by the user on 28 November 2026).

## Verified initial state

- Repository exists with admin/push access, and originally contained only README, MIT licence and CNAME.
- DNS: `zero.skunkworks.africa` CNAME points to `skunkworks-africa.github.io`.
- Authoritative domain servers: `ns1`–`ns4.bdm.microsoftonline.com`.
- Existing GitHub Pages uses `main` at `/`, HTTPS enforced, certificate approved. Domain protection state was reported unverified; certificate approval is not proof of DNS-management access.
- Both saved Azure subscription reads failed with `AADSTS50173` (revoked grant). A fresh device-code login was initiated after user selection.
- Connected Vercel team reported `plan_not_supported`, requiring Pro/Enterprise for a paid feature; a commercially suitable plan was not established. No upgrade or purchase was made.
- The original `zero.skunkworksau.com` domain has no record and is no longer the target.

## Deployment procedure

1. Complete Azure authentication and inspect current subscriptions, permissions and existing hosting. Prefer an approved existing commercial host; do not silently upgrade a paid plan.
2. Build and validate: `npm ci --ignore-scripts`, `npm run build`, `npm run check`, `npm run test:unit`, then `npm test`.
3. Publish **only `dist/`** to the approved Azure Static Web App. Apply its generated security configuration. Never publish the source tree, historical preview, tests or secrets as the website.
4. Verify all routes, HTTPS, content types, 404 behaviour and security headers on the Azure hostname. Confirm no intake endpoint or analytics requests are active.
5. Obtain the Azure-provided domain-verification record. Add it through the authoritative DNS management account, validate ownership, and replace only the `zero` CNAME with the verified Azure hostname. Keep a record of the prior CNAME for rollback.
6. Wait for DNS and certificate issuance, then repeat route, interaction and header checks at `https://zero.skunkworks.africa`.
7. Configure repeatable deployment from the tested repository commit using scoped credentials or a platform-supported identity. Never print deployment tokens or commit them.

The existing CNAME file is retained for history and migration clarity. No GitHub Pages deployment workflow is included. GitHub documents restrictions on sites primarily facilitating commercial transactions: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits.

Microsoft hosting guidance: https://learn.microsoft.com/en-us/azure/static-web-apps/plans and https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain-external.

## Release boundaries

- Local lead brief only; activation requires `SUBMISSION-ACTIVATION.md`.
- `noindex` remains intentional during public preview.
- No live customer evidence, authentication, monitoring or payment capabilities.
- Roll back application changes by redeploying the previous approved build. DNS rollback restores `zero` to its recorded prior CNAME only if that prior hosting is still available and appropriate; do not delete other domain records.

Append the actual deployed commit, resource, hostname, DNS changes and verification results after deployment. An Azure default hostname alone is not completion of the requested custom-domain launch.
