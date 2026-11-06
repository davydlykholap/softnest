# Google connection setup

SF0 currently saves provider account/property identifiers on the current device through Integrations → Set up connection. This is setup information, not an OAuth connection. Reports remain sample data or imported CSV data. No passwords, OAuth client secrets, or provider tokens belong in the public frontend or browser storage.

## Providers

| Provider | Identifier | Intended reports |
| --- | --- | --- |
| Google Analytics 4 | Numeric property ID | Sessions, acquisition, pages, quote events |
| Search Console | Domain or URL-prefix property | Queries, impressions, clicks, search position |
| Business Profile | Location resource ID | Profile activity and discovery |
| Google Ads | Customer ID | Campaign costs and conversion reporting |

## Live connection implementation plan

1. SF0 now uses a local authentication server; do not provision additional hosting without a new decision. Add provider connections to that local server. The old GitHub Pages snapshot cannot run it. See AUTH.md.
2. Create/configure a Google Cloud project, enable the relevant provider APIs, and configure the OAuth consent screen and web application client. Register the backend's exact callback URL. Business Profile and Ads also require their provider API access prerequisites.
3. Add authenticated connection endpoints on that backend. Start authorization for the selected provider, validate OAuth state, exchange the returned authorization code server-side, and store refresh tokens securely on the server. Use an authenticated session and restrict frontend requests to SF0's origin. Never return refresh tokens or client secrets to the frontend.
4. List the authorized user's available properties/accounts and let them choose one. Verify permissions and access before marking it connected; an ID saved by the current setup form is only a starting value.
5. Add scheduled provider syncs and normalized report endpoints. Define report freshness, timezone, attribution, and conversion-event mappings. Business Profile activity does not supply geo-grid ranking scans; that needs a separate provider.
6. Connect frontend reports to these endpoints. Show per-provider status, last successful sync, authorization errors, and a disconnect/revoke action. Keep sample and measured reports clearly distinguished.

Required external setup: backend destination, Google Cloud project/OAuth client, provider account access, and an authenticated token-storage service. No live connection can be completed solely by changing the static Pages build.

Primary reference: [Google OAuth for web server applications](https://developers.google.com/identity/protocols/oauth2/web-server).
