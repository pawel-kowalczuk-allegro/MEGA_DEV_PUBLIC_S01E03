## Problem

For day-first tenants using booking-v3, the form prints MM/DD/YYYY while reading the tenant's day-first order. This contradicts the input instructions and is separate from the shared parser defect. A parser fix alone does not correct this hint.

Affected tenants: alder.physio (de-DE), copper.studio (es-ES), pale.harbour (pt-PT), on the form channel. Example: R-41230 (copper.studio, form) reports 1 June instead of 6 January, despite intake tagging it parser. Align the hint and form interpretation with the tenant locale, and verify the resulting booking and invite.

## Reports covered

**33 unique reports** merged into original ticket #4471 in the 4 October 2026 export. First received 2026-04-17; last received 2026-09-22; 3 tenants.

Counted with the exported uniqueById and groupByCause functions in support-kb/src/lib/kb/causes.ts, resolving tenant locale/form from the tenant directory via Intl.DateTimeFormat date order. All 427 export rows reduce to 412 unique IDs (15 overlap rows). The two cause counts sum to 412; no report belongs to both.

Intake labels within this group: parser: 15; hint: 18. These are not the cause counts.

## Triage and verification

Keep this cause separate from the other date problem. Subject-only merging can combine different causes and split one cause across different subjects. Unknown tenants remain unresolved. The old accepted decision is preserved; the new signed KB page explains the evidence and safer triage.

Run node --experimental-strip-types analyze.mjs from the repository root to reproduce the count. The signed KB source is support-kb/src/routes/kb/incidents/4471-split/+page.svx; rendered output is rendered/kb/incidents/4471-split/index.html. Incoming reports continue after the July merge burst, so these counts are a snapshot, not a live queue count.

## Report IDs

<details><summary>33 unique IDs</summary>

- R-41230
- R-41241
- R-41251
- R-41259
- R-41262
- R-41275
- R-41294
- R-41305
- R-41308
- R-41366
- R-41372
- R-41384
- R-41387
- R-41396
- R-41400
- R-41406
- R-41415
- R-41416
- R-41418
- R-41428
- R-41439
- R-41441
- R-41449
- R-41453
- R-41456
- R-41460
- R-41472
- R-41485
- R-41493
- R-41539
- R-41572
- R-41582
- R-41584

</details>
