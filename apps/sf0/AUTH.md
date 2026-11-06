# SF0 sign-in — local runtime

SF0 now runs an Express server with Auth.js Google sign-in. No new hosting account or service is required for local use. GitHub stores the code; existing GitHub Pages deployments are separate public hosting snapshots.

## Access

Only the three addresses in `server/auth.mjs` are allowed. Google must return a verified email. Session cookies are encrypted, HttpOnly, SameSite=Lax, and expire after eight hours. HTTPS deployments use secure cookies. Every private request rechecks session validity and membership. Sign-out requires Auth.js's CSRF-protected POST.

The allowlist is server-only. It is never a public signup list or a browser setting. This sign-in grants identity access only (`openid email profile`); it does not grant access to Analytics, Ads, or other Google services.

## Activate Google sign-in

1. In [Google Cloud Console](https://console.cloud.google.com/), select or create a SoftNest project. This registers a Google OAuth application; it does not host SF0.
2. Configure Google Auth Platform branding, audience, and a web application OAuth client. While in Testing, add the same three addresses as test users. Request only basic identity permissions.
3. Register this exact redirect URI: `http://127.0.0.1:4173/auth/callback/google`.
4. Copy `apps/sf0/.env.example` to ignored `apps/sf0/.env.local`. Set `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` from that web client, and generate `AUTH_SECRET` using the command in the example. Do not paste secrets in chat, put them in `VITE_` variables, or commit them.
5. Restart `npm run dev:sf0` from the workspace root and open `http://127.0.0.1:4173/signin`. Use one of the invited Google accounts. No credentials means a locked sign-in page, not demo access.

Auth.js handles OAuth validation, PKCE/state, encrypted sessions, and CSRF protection. Its Express adapter is currently experimental; the installed versions are pinned and covered by integration tests. See [Express integration](https://authjs.dev/reference/express) and [Google web-server authorization](https://developers.google.com/identity/protocols/oauth2/web-server).

## Hosting and publication

- The local server protects only its own origin. It does **not** retroactively protect `sf0.softnestcare.ca` or Studio.
- Studio keeps its existing Sanity authentication. These SF0 account rules do not change Sanity project membership.
- Static SF0 publishing through `tools/deploy-pages.mjs` is blocked. `dist/` and the ZIP contain frontend assets, not the authentication server. Do not upload them as an authenticated application.
- The frontend also requires an authenticated session endpoint before loading the workspace. This guards against accidental unprotected static publication, but real authorization is enforced by the server.
- The already-published SF0 snapshot remains publicly accessible until separately removed or replaced. No publication, deletion, DNS, or hosting changes were made by this implementation.
- If remote access is needed later, choose a protected runtime, configure an HTTPS origin, register its Google callback URI, and set the server-only environment variables. GitHub Pages alone cannot run this server. Preserve the separate compiled repositories until a deployment change is explicitly planned.

## Commands

`npm run dev:sf0` starts the local authenticated server with Vite behind the access checks. `npm run check:sf0` builds and tests the app. `npm run start --workspace @softnest/sf0` serves a built app with authentication and requires complete HTTPS configuration. Neither startup command provides an authentication bypass.
