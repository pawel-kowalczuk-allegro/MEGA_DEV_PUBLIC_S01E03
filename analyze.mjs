import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { groupByCause, uniqueById, readAs } from './support-kb/src/lib/kb/causes.ts';

const data = new URL('./support-kb/src/lib/data/', import.meta.url);
const reports = JSON.parse(fs.readFileSync(new URL('reports-4471.json', data)));
const notes = JSON.parse(fs.readFileSync(new URL('desk-notes.json', data)));
const tenants = new Map(fs.readdirSync(new URL('tenants/', data)).map((file) => {
  const tenant = JSON.parse(fs.readFileSync(new URL(`tenants/${file}`, data)));
  return [tenant.handle, tenant];
}));
const unique = uniqueById(reports).filter((report) => report.mergedInto === 4471);
const groups = groupByCause(unique, (report) => tenants.get(report.tenant));
const result = {
  rawRows: reports.length,
  uniqueReports: unique.length,
  duplicateRows: reports.length - unique.length,
  groups: groups.map((group) => ({
    ...group,
    count: group.reports.length,
    oneDayMove: readAs(group, notes.oneDayMove),
    ids: group.reports.map((report) => report.id),
    reports: undefined,
  })),
  weeks: Object.entries(unique.reduce((weeks, report) => {
    const monday = new Date(report.receivedAt.slice(0, 10));
    monday.setUTCDate(monday.getUTCDate() - (monday.getUTCDay() + 6) % 7);
    const key = monday.toISOString().slice(0, 10);
    weeks[key] = (weeks[key] ?? 0) + 1;
    return weeks;
  }, {})),
};
fs.writeFileSync(fileURLToPath(new URL('./analysis.json', import.meta.url)), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ ...result, groups: result.groups.map(({ ids, ...group }) => group) }, null, 2));
