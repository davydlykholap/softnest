import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const dist = path.join(root, 'dist');

export function verifyStaticBuild(directory = dist) {
  const resolved = realpathSync(directory);
  if (resolved !== realpathSync(dist)) throw new Error('Only the SF0 dist directory can be packaged.');
  for (const name of ['index.html', '.htaccess', 'assets/softnest.webp']) {
    if (!existsSync(path.join(directory, name))) throw new Error(`Missing static build file: ${name}`);
  }
  const index = readFileSync(path.join(directory, 'index.html'), 'utf8');
  const assets = [...index.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match => match[1]);
  if (!assets.some(asset => asset.endsWith('.js'))) throw new Error('Missing compiled JavaScript entry.');
  for (const asset of assets) {
    if (/^(?:https?:)?\/\//.test(asset)) throw new Error('The upload must serve its application assets locally.');
    const target = path.resolve(directory, asset.replace(/^\//, ''));
    if (!target.startsWith(directory + path.sep) || !existsSync(target)) throw new Error(`Unresolved build asset: ${asset}`);
  }
  const files = [];
  function walk(current) {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isSymbolicLink()) throw new Error('Do not package linked files.');
      if (entry.isDirectory()) walk(full);
      else files.push(path.relative(directory, full).split(path.sep).join('/'));
    }
  }
  walk(directory);
  if (files.some(file => /(?:^|\/)(?:\.openai|server|worker|node_modules)(?:\/|$)/.test(file))) throw new Error('Unexpected runtime or deployment metadata in static output.');
  for (const file of files.filter(file => /\.(?:html|js|css)$/.test(file))) {
    if (/custom-domains\.chatgpt\.site|openai-site-verification|appgprj_|afloatmoose2\.chatgpt\.site/i.test(readFileSync(path.join(directory, file), 'utf8'))) throw new Error(`Superseded hosting configuration found in ${file}`);
  }
  return { files, bytes: files.reduce((sum, file) => sum + statSync(path.join(directory, file)).size, 0) };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = verifyStaticBuild();
  console.log(`Verified ${result.files.length} static files for sf0.softnestcare.ca.`);
}
