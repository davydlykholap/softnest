// Explicit local-only preview mode. Production always reads the published CMS.
import { spawnSync } from 'node:child_process';
const task=process.argv[2]||'dev';
if(!['dev','build','check'].includes(task))throw Error('Use content:seed -- dev, build or check');
const result=spawnSync(process.platform==='win32'?'npm.cmd':'npm',['run',task],{stdio:'inherit',shell:process.platform==='win32',env:{...process.env,CONTENT_SOURCE:'seed'}});
process.exitCode=result.status??1;
