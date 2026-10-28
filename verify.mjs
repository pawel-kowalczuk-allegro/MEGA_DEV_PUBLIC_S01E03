import assert from 'node:assert/strict';
import fs from 'node:fs';
import { dayFirst, causeOf, sameCause } from './src/lib/kb/causes.ts';
import { deskRef } from './src/lib/kb/desk-ref.ts';

const analysis = JSON.parse(fs.readFileSync(new URL('./analysis.json', import.meta.url)));
assert.equal(analysis.rawRows, 427);
assert.equal(analysis.uniqueReports, 412);
assert.equal(analysis.duplicateRows, 15);
assert.deepEqual(analysis.groups.map((g) => [g.cause, g.count, g.oneDayMove]), [
  ['parser', 379, 5], ['hint', 33, 0],
]);
assert.equal(new Set(analysis.groups.flatMap((g) => g.ids)).size, 412);
assert.equal(dayFirst('de-DE'), true);
assert.equal(dayFirst('en-US'), false);
const v3 = { handle: 'test', name: 'Test', locale: 'de-DE', form: 'booking-v3' };
assert.equal(causeOf({ channel: 'form' }, v3), 'hint');
assert.equal(causeOf({ channel: 'app' }, v3), 'parser');
assert.equal(sameCause({ channel: 'email' }, undefined, { channel: 'email' }, undefined), false);

const source = fs.readFileSync(new URL('./src/routes/kb/incidents/4471-split/+page.svx', import.meta.url), 'utf8');
const signature = source.match(/^signature: '(.*)'$/m)[1];
const html = fs.readFileSync(new URL('./rendered/kb/incidents/4471-split/index.html', import.meta.url), 'utf8');
for (const text of ['379', '33', '412', '5 reports read as a one-day move',
  'different causes — keep apart', 'reports received and merged into #4471, per week',
  'booking-v3 form retired', 'fix(dates): parse dd/mm for eu locales', deskRef(signature)]) {
  assert.ok(html.includes(text), `Rendered evidence missing: ${text}`);
}
assert.ok(!html.includes('no desk ref:'));
assert.ok(fs.readFileSync(new URL('./rendered/kb/index.html', import.meta.url), 'utf8').includes('/kb/incidents/4471-split'));
console.log('PASS: unique counts, classification, unresolved tenant, rendered evidence, signature and KB index.');
