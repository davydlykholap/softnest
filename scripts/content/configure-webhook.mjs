import fs from 'node:fs';
import { createClient } from '@sanity/client';
try { process.loadEnvFile('.env.local'); } catch(e) { if(e.code!=='ENOENT')throw e; }
const config=JSON.parse(fs.readFileSync('sanity.project.json','utf8'));
if(!process.env.SANITY_API_WRITE_TOKEN||!process.env.GITHUB_WORKFLOW_TOKEN)throw Error('Set SANITY_API_WRITE_TOKEN and GITHUB_WORKFLOW_TOKEN in .env.local. The GitHub token needs Actions: write for davydlykholap/softnest.');
const client=createClient({...config,apiVersion:'2026-09-01',useCdn:false,token:process.env.SANITY_API_WRITE_TOKEN});
const endpoint=`/hooks/projects/${config.projectId}`;
const name='SoftNest published content → GitHub Pages';
const hooks=await client.request({uri:endpoint});
const existing=hooks.find(h=>h.name===name);
const body={name,type:'document',url:'https://api.github.com/repos/davydlykholap/softnest/actions/workflows/deploy-pages.yml/dispatches',dataset:config.dataset,
  isDisabledByUser:false,apiVersion:'2026-09-01',includeDrafts:false,includeAllVersions:false,rule:{on:['create','update','delete'],filter:'!(_id in path("drafts.**")) && !(_id in path("versions.**")) && _type in ["siteSettings","service","location","faq","testimonial","cleaningProject","quoteCategory","pageContent","post","author","category"]',projection:'{"ref": "main"}'},
  httpMethod:'POST',headers:{Authorization:`Bearer ${process.env.GITHUB_WORKFLOW_TOKEN}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'},
  description:'Rebuild the published website after approved content changes. Draft edits do not deploy.'};
try {await client.request({uri:existing?`${endpoint}/${existing.id}`:endpoint,method:existing?'PATCH':'POST',body});console.log('Sanity publishing webhook configured. GitHub Actions shows deployment success or failure.');}
catch(e){console.error(`Webhook setup failed (status ${e.statusCode||'unknown'}). Check project-management access and token scopes.`);process.exitCode=1;}
