import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { unzipSync } from 'fflate';
import { root, dist, verifyStaticBuild } from '../scripts/verify-static-build.mjs';

test('build is a self-contained static site with local entry assets', () => {
  const { files } = verifyStaticBuild();
  assert.ok(files.includes('index.html'));
  assert.ok(files.includes('.htaccess'));
  assert.ok(files.some(file => file.endsWith('.js')));
  assert.ok(!files.some(file => file.startsWith('client/') || file.startsWith('server/') || file.startsWith('.openai/')));
});

test('static upload does not introduce route rewrites or assume account protection', () => {
  const apache = readFileSync(path.join(dist, '.htaccess'), 'utf8');
  assert.match(apache, /Options -Indexes/);
  assert.match(apache, /DirectoryIndex index\.html/);
  assert.doesNotMatch(apache, /^\s*(?:RewriteRule|AuthUserFile|AuthType)\s/m);
});

test('upload archive contains root files and no source code or hosting credentials', { skip: !existsSync(path.join(root, 'artifacts', 'sf0-static.zip')) }, () => {
  const zipped = unzipSync(readFileSync(path.join(root, 'artifacts', 'sf0-static.zip')));
  const files = Object.keys(zipped);
  assert.deepEqual(files.toSorted(), verifyStaticBuild().files.toSorted());
  assert.deepEqual(Buffer.from(zipped['index.html']), readFileSync(path.join(dist, 'index.html')));
  assert.ok(files.every(file => !file.startsWith('dist/') && !file.startsWith('src/') && !file.includes('..')));
});
