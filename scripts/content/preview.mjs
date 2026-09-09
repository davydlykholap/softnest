import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { createClient } from '@sanity/client';
try { process.loadEnvFile('.env.local'); } catch(e) { if(e.code!=='ENOENT')throw e; }
const token=process.env.SANITY_API_READ_TOKEN||process.env.SANITY_API_WRITE_TOKEN;
if(!token)throw Error('Local draft preview needs a Sanity read token in .env.local.');
if(process.env.GITHUB_ACTIONS)throw Error('Draft preview is local only.');
const env={...process.env,CONTENT_SOURCE:'sanity',CONTENT_PREVIEW:'true',SANITY_API_READ_TOKEN:token};
const sync=()=>new Promise((resolve,reject)=>{const child=spawn(process.execPath,['scripts/content/sync.mjs'],{stdio:'inherit',env});child.on('exit',code=>code===0?resolve():reject(Error('Preview validation failed; fix draft content and save again.')))});
await sync();
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname','127.0.0.1'],{stdio:'inherit',env});
const config=JSON.parse(fs.readFileSync('sanity.project.json','utf8'));
config.projectId=process.env.SANITY_PROJECT_ID||config.projectId;
config.dataset=process.env.SANITY_DATASET||config.dataset;
const client=createClient({...config,apiVersion:'2026-09-01',useCdn:false,token});
let timer;let syncing=false;let pending=false;
async function refresh(){if(syncing){pending=true;return}syncing=true;try{await sync()}catch(e){console.error(e.message)}finally{syncing=false;if(pending){pending=false;void refresh()}}}
const listener=client.listen('*[_type in ["siteSettings","service","location","faq","testimonial","cleaningProject","quoteCategory","pageContent","post","author","category"]]',{}, {includeResult:false,visibility:'query'}).subscribe({next:()=>{clearTimeout(timer);timer=setTimeout(refresh,900)},error:()=>console.error('Preview connection lost. Restart npm run preview to reconnect.')});
const stop=()=>{clearTimeout(timer);listener.unsubscribe();server.kill();};process.on('SIGINT',stop);process.on('SIGTERM',stop);server.on('exit',()=>{listener.unsubscribe();process.exit()});
