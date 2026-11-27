# Secure submission activation contract

Current mode: **disabled**. The UI creates a local text file after review. There is no lead endpoint and no simulated submission-success message. CSP blocks network connections and form actions; submit buttons start disabled without JavaScript. Do not replace this with a bare public email webhook or expose a CRM token in the browser.

Before activation, confirm the responsible legal entity, privacy contact, approved Azure region, authorised CRM/inbox, access roles, retention/deletion schedule and operational owner. Define how contact and deletion requests are handled. Update the public privacy notice to match actual processing and verify the destination with a synthetic test record.

Minimum future schema:

- Contact email, bounded and validated; name optional.
- Topic and next-step enums from the site's permitted list.
- Required consent to process this enquiry, notice version and server timestamp.
- Optional source page / assessment / pricing context, each included only by explicit choice.
- Separate, optional, unchecked marketing consent only if a real subscription process exists.
- No arbitrary evidence payload, attachments, credentials, source code, security logs or unrestricted free-text vulnerability content.

Server requirements: HTTPS, server-side schema and size validation, content-type checks, same-origin policy, rate/abuse limits, managed identity or secret-store credentials, least-privilege delivery, idempotency/deduplication, no personal data in application logs, controlled staff access and retention enforcement. Never accept an arbitrary destination URL or trust a browser-selected tenant. Return a receipt only after durable acceptance by the approved inbox/queue; distinguish rejection, transient failure and successful receipt. Retain entered fields on errors and permit retry without duplicate sends.

Acceptance tests: missing/revoked consent, unknown fields, oversized body, invalid email, cross-origin request, rate limit, unavailable destination, duplicate request, stored-context consent, access-control checks, log inspection and deletion. Verify a synthetic record at the real destination, then delete it and confirm deletion. Only then enable the submission UI and relax CSP `connect-src` to the same-origin endpoint.

Customer evidence belongs in a separately authenticated, tenant-authorised workflow. A lead form is not an evidence vault.
