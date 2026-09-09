# Future business records

Supabase is planned, not connected or required by the website build. Introduce it when lead tracking becomes a real workflow.

Sanity owns public editorial records. Supabase will own customers, private contact/address details, enquiries, quotes, appointments, completed jobs and internal notes. A published cleaning case study is separate from the private job that produced it; connect them later with a stable identifier and publish only approved information.

First milestone: an enquiry list with New, Contacted, Quoted, Booked, Completed and Closed statuses. Capture the original enquiry, service-choice IDs and campaign attribution, then let an authorized staff member update its status. Stable IDs must survive service-name and page-address changes.

The form transport is isolated in `src/domain/quote.ts`. Introduce one authoritative server-side intake that stores an enquiry and arranges notifications. Do not make the browser independently submit to two providers, which could lose a record, duplicate a notification or count a lead twice. Plan idempotency, notification retries and delivery status in that intake.

Before collecting records: define staff roles and record access, enforce database row-level permissions, set retention and backup arrangements, and test that anonymous visitors cannot read customer information. Keep secret keys on the backend. This can be a separate service while the public website remains on GitHub Pages.

No speculative pricing, scheduling engine, accounts, database tables or unused Supabase dependencies are added now.
