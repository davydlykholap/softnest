import { test } from 'node:test';
import assert from 'node:assert/strict';
import { allocate, getSampleRows, totals, parseChannelCSV, percent, csvCell } from '../src/data.js';

test('daily apportionment preserves the full report and filtered-period additivity', () => {
  assert.deepEqual(totals(getSampleRows('2026-10-05', '2026-11-01')), { sessions: 2840, starts: 138, quotes: 46, users: 2413 });
  for (const total of [0, 1, 4, 138, 1984, 2840]) assert.equal(allocate(total, [1, 3, 2, 8, 5]).reduce((a, b) => a + b, 0), total);
  const first = totals(getSampleRows('2026-10-05', '2026-10-18'));
  const second = totals(getSampleRows('2026-10-19', '2026-11-01'));
  assert.equal(first.sessions + second.sessions, 2840);
  assert.equal(first.quotes + second.quotes, 46);
  assert.equal(percent(0, 0), '0%');
});

test('imports quoted channel names, BOM and CRLF without losing numeric totals', () => {
  const rows = parseChannelCSV('\uFEFFchannel,sessions,starts,quotes,users\r\n"Search, organic",1000,50,15,800\r\n"A ""quoted"" channel",40,4,1,30\r\n');
  assert.equal(rows[0].channel, 'Search, organic');
  assert.equal(rows[1].channel, 'A "quoted" channel');
  assert.equal(totals(rows).quotes, 16);
});

test('rejects ambiguous, duplicate and invalid conversion imports', () => {
  for (const csv of [
    'channel,sessions,starts,quotes\nSearch,10,2,3',
    'channel,sessions,starts,quotes\nSearch,10,11,2',
    'channel,sessions,starts,quotes\nSearch,-1,0,0',
    'channel,sessions,starts,quotes\nSearch,1.5,0,0',
    'channel,sessions,starts,quotes\nSearch,10,2,1\nsearch,20,3,1',
    'channel,sessions,starts,quotes,users\nSearch,10,2,1,11',
    'channel,sessions,starts,quotes\nSearch,1,2',
    'channel,sessions,starts,quotes\n"Search,1,2,3',
    'channel,sessions,sessions,quotes\nSearch,10,2,1',
  ]) assert.throws(() => parseChannelCSV(csv));
});

test('CSV exports quote text and neutralize spreadsheet formulas', () => {
  assert.equal(csvCell('A "name", B'), '"A ""name"", B"');
  assert.equal(csvCell('=HYPERLINK("x")').startsWith('"\''), true);
});
