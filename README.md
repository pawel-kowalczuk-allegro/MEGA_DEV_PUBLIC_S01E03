# S01E03 — what it shows

Investigation of support ticket #4471 from the MEGA.dev course's fictional support desk.
The supplied knowledge-base export is preserved under `support-kb/`; the added page
and local build configuration make its executable evidence readable.

## Filed problems

| Problem | Unique reports | GitHub issue |
| --- | ---: | --- |
| Shared parser reads month first for day-first tenants | 379 | [#1](https://github.com/pawel-kowalczuk-allegro/MEGA_DEV_PUBLIC_S01E03/issues/1) |
| Booking-v3 hint says month first but the form reads day first | 33 | [#2](https://github.com/pawel-kowalczuk-allegro/MEGA_DEV_PUBLIC_S01E03/issues/2) |
| Total | 412 | |

The 427 raw export rows include 15 repeated rows. Counts use unique report IDs and the
exported cause classifier with the tenant locale/form directory, not browser locale or
intake tags. Five desk-note reports describe one-day/time anomalies; the classifier puts
them under parser. This caveat remains visible rather than inventing a third cause.

## Deliverables

- Signed KB source: [`support-kb/src/routes/kb/incidents/4471-split/+page.svx`](support-kb/src/routes/kb/incidents/4471-split/+page.svx).
- Rendered KB page: [`rendered/kb/incidents/4471-split/index.html`](rendered/kb/incidents/4471-split/index.html).
- Full rendered KB and its CSS/JavaScript assets: [`rendered/`](rendered/).
- Reproducible counts, date ranges, intake-label discrepancies and report IDs: [`analysis.json`](analysis.json).
- Exact issue bodies: [`tickets/`](tickets/).

The rendered page includes the computed cause table, weekly received/merged timeline,
interactive deduplication examples, and a desk reference generated from its signature.
The original accepted decision and all original export files are unchanged.
All report counts describe the 4 October 2026 export, not the live queue.

## Engineering outcome

After the first submission, the Challenge page displayed a new engineering update:
original #4471 closed on 5 October. Parser is **fixed** (`fix(dates): parse dd/mm for eu
locales`), while hint is **won't fix** (`booking-v3 form retired`). Issue 1 is closed as
completed; issue 2 is closed as not planned. Both issue histories record the evidence.
The signed KB page includes the distinct outcomes. Closing both as completed was an
earlier error, corrected after refreshing the Challenge page.

## Reproduce

Node.js 22.22 or a compatible version is required. From the repository root:

```sh
node --experimental-strip-types analyze.mjs
node prepare-issues.mjs
cd support-kb
npm ci
npm run build
```

Serve the static site from the repository root:

```sh
python3 -m http.server 8763 --bind 127.0.0.1 --directory rendered
```

Open `http://127.0.0.1:8763/kb/incidents/4471-split/`.
This is a local-only preview; no GitHub Pages deployment is configured.
Run the evidence checks from the repository root:

```sh
node --experimental-strip-types verify.mjs
```

## Build dependency note

The initial `npm audit` reports six low-severity findings in development dependencies.
This project publishes static output, not a SvelteKit application server. No forced major
upgrade was applied as part of this investigation. Review the dependency audit before
reusing this build setup for a deployed application.
