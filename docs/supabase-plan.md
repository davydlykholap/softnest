# Future private business records

Status: planned, not connected. The production website does not currently depend on Supabase or any private application database.

## Why it is deferred

The public site is a static GitHub Pages export. Sanity is intentionally limited to public editorial content. Adding an unused database SDK or placeholder connection would increase complexity without solving a current workflow.

Introduce a private backend when lead/job tracking becomes operationally valuable.

## Intended ownership

Sanity will continue to own public website records. A private system will own:

- customer/contact/address details;
- enquiries and their original source/attribution;
- quotes and quote revisions;
- appointments/jobs;
- internal notes/status history;
- completed-job operational records.

A public cleaning result/testimonial is a separate approved publication record. Do not expose the private job record that produced it.

## First useful milestone

Build one enquiry pipeline with statuses such as:

```text
New ? Contacted ? Quoted ? Booked ? Completed / Closed
```

Store the original request, stable service-choice IDs, campaign attribution, timestamps and status history. Service display names/slugs can change later; private records should keep stable identifiers.

## Quote-form migration path

Today the browser submits once to Web3Forms through `src/domain/quote.ts`. The UI/validation/payload layers are already separate from transport.

When the private backend is introduced, replace that transport with **one authoritative server-side intake** that:

1. validates/rate-limits the request;
2. stores the enquiry exactly once;
3. records attribution/source metadata;
4. triggers staff notification;
5. tracks delivery/retry state where useful;
6. returns a clear success/failure response to the existing form UI.

Do not make the browser independently submit to both Web3Forms and Supabase. Dual client submissions can create duplicate leads, inconsistent state or false conversion counts.

## Security requirements before storing customer data

Before launch:

- define staff roles and authentication;
- enforce database row-level permissions;
- keep service/database secrets server-side;
- verify anonymous users cannot enumerate/read records;
- define backup/restore and retention expectations;
- add idempotency for form submissions;
- log meaningful status/audit events without logging unnecessary sensitive data.

The private intake can be hosted separately while the public marketing site remains on GitHub Pages.

## Explicitly not planned yet

Do not add speculative pricing engines, automated scheduling, customer accounts, complex CRM tables or unused Supabase dependencies until a real workflow requires them.
