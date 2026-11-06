import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { zipSync } from 'fflate';
import { root, dist, verifyStaticBuild } from './verify-static-build.mjs';

const { files } = verifyStaticBuild();
const archiveFiles = Object.fromEntries(files.map(file => [file, readFileSync(path.join(dist, file))]));
const output = path.join(root, 'artifacts', 'sf0-static.zip');
mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(output, zipSync(archiveFiles, { level: 6 }));
console.log(`Static release ready: ${output}`);
console.log('Frontend assets only. SF0 requires its authentication server; static Pages publication is blocked.');
