import fs from 'node:fs';
import { createClient } from '@sanity/client';
import { normalizeContent } from './normalize.mjs';
import { websiteContentQuery } from '../../src/sanity/queries.ts';

try { process.loadEnvFile('.env.local'); } catch (e) { if(e.code!=='ENOENT')throw e; }
const config=JSON.parse(fs.readFileSync('sanity.project.json','utf8'));
config.projectId=process.env.SANITY_PROJECT_ID||config.projectId;
config.dataset=process.env.SANITY_DATASET||config.dataset;
const source=process.env.CONTENT_SOURCE||'sanity';
const preview=process.env.CONTENT_PREVIEW==='true';
if(preview&&process.env.GITHUB_ACTIONS)throw Error('Draft preview must never run in production CI.');
if(preview&&!process.env.SANITY_API_READ_TOKEN)throw Error('Preview requires a read token; keep it in .env.local.');
let documents;
if(source==='seed'){
 if(process.env.GITHUB_ACTIONS)throw Error('Production CI requires Sanity content; seed mode is local only.');
 documents=['site-seed','article-seed'].flatMap(name=>JSON.parse(fs.readFileSync(`content/migration/${name}.json`,'utf8')));
 console.log('LOCAL SEED MODE: using the migration snapshot. Sanity edits are not read.');
}else if(source==='sanity'){
 documents=await createClient({...config,apiVersion:'2026-09-01',useCdn:false,perspective:preview?'drafts':'published',token:preview?process.env.SANITY_API_READ_TOKEN:undefined,timeout:30000}).fetch(websiteContentQuery);
}else throw Error('CONTENT_SOURCE must be sanity or seed.');
const normalized=normalizeContent(documents,config);
fs.mkdirSync('src/content/generated',{recursive:true});
// Validate the entire snapshot before replacing files. Failed reads leave the live deployment intact.
for(const [name,value] of Object.entries(normalized))fs.writeFileSync(`src/content/generated/${name}.json`,JSON.stringify(value,null,2)+'\n');
fs.writeFileSync('src/content/generated/status.json',JSON.stringify({source,preview,generatedAt:new Date().toISOString()})+'\n');
console.log(`Prepared ${normalized.services.length} services, ${normalized.locations.length} areas and ${normalized.posts.length} articles from ${source}.`);
