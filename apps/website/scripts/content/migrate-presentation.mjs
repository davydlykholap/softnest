// One-time, deterministic extraction of existing presentation copy for the CMS import.
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const seedPath='content/migration/site-seed.json';
const docs=JSON.parse(fs.readFileSync(seedPath,'utf8'));
const extractDeclaration=(source,name)=>{
 const tree=ts.createSourceFile('source.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);let found;
 const visit=n=>{if(ts.isVariableDeclaration(n)&&n.name.getText(tree)===name)found=n;ts.forEachChild(n,visit)};visit(tree);
 if(!found)return undefined;
 const exports={};vm.runInNewContext(ts.transpile(`export const value=${found.initializer.getText(tree)}`,{module:ts.ModuleKind.CommonJS}),{exports});
 return {value:exports.value,node:found,tree};
};
const heroPath='src/components/HomeHero.tsx';
let hero=fs.readFileSync(heroPath,'utf8');
const reviews=extractDeclaration(hero,'googleReviews');
if(reviews){
 docs.find(d=>d._id==='page-content-home').heroReviews=reviews.value;
 hero=hero.slice(0,reviews.node.initializer.getStart(reviews.tree))+'homeContent.heroReviews'+hero.slice(reviews.node.initializer.end);
 hero='import { homeContent } from "@/content/pages";\n'+hero;fs.writeFileSync(heroPath,hero);
}
const stripDeclaration=(file,name,replacement)=>{
 let source=fs.readFileSync(file,'utf8');const tree=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 for(const statement of tree.statements)if(ts.isVariableStatement(statement)&&statement.declarationList.declarations.some(d=>d.name.getText(tree)===name)){
  source=source.slice(0,statement.getStart(tree))+replacement+source.slice(statement.end);break;
 }fs.writeFileSync(file,source);
};
stripDeclaration('src/components/HomeSections.tsx','galleryResults','const galleryResults = getProjects();');
stripDeclaration('src/components/HomeSections.tsx','homeReviews','const homeReviews = getTestimonials();');
stripDeclaration('src/components/HomeSections.tsx','homeServices','const homeServices = homeContent.featuredServices.map(getService).filter((service): service is NonNullable<ReturnType<typeof getService>> => Boolean(service));');
let home=fs.readFileSync('src/components/HomeSections.tsx','utf8');
fs.writeFileSync('src/components/HomeSections.tsx','import { homeContent, getProjects, getTestimonials } from "@/content/pages";\n'+home);
stripDeclaration('src/app/about/page.tsx','principles','const principles = aboutContent.principles;');
fs.writeFileSync('src/app/about/page.tsx','import { aboutContent } from "@/content/pages";\n'+fs.readFileSync('src/app/about/page.tsx','utf8'));
const expanded='src/components/MississaugaPage.tsx';
for(const name of ['quickBenefits','services','resultExamples','processSteps','localAdvantages','mississaugaFaqs'])stripDeclaration(expanded,name,'');
let local=fs.readFileSync(expanded,'utf8').replace('export default function MississaugaPage','export default function ExpandedLocationPage');
local=local.replace('  const serviceSchema = {','  const { quickBenefits, services, resultExamples, processSteps, localAdvantages, mississaugaFaqs } = location.expandedContent!;\n  const serviceSchema = {');
fs.writeFileSync(expanded,local);
const decode=s=>s.replace(/&amp;/g,'&').replace(/&apos;|&#39;/g,"'").replace(/&quot;/g,'"').replace(/&nbsp;/g,' ').replace(/&gt;/g,'>').replace(/&lt;/g,'<');
for(const [file,id] of [['src/components/HomeHero.tsx','home'],['src/components/HomeSections.tsx','home'],['src/app/about/page.tsx','about'],[expanded,'expanded']]){
 let source=fs.readFileSync(file,'utf8');const tree=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const doc=id==='expanded'?docs.find(d=>d._id==='location-mississauga').expandedContent:docs.find(d=>d._id===`page-content-${id}`);
 doc.copy??=[];const edits=[];const accessor=id==='expanded'?'location.expandedContent!.copy':`${id}Content.copy`;
 const visit=n=>{
  if(ts.isJsxText(n)&&/[A-Za-z]/.test(n.text)){
   const meaningful=n.text.replace(/\s+/g,' ').trim();
   if(meaningful.length<3)return;
   const key=`${file.includes('Hero')?'hero':file.includes('Sections')?'sections':'page'}-${doc.copy.length+1}`;
   const text=decode(meaningful);doc.copy.push({key,label:text.slice(0,90),text});
   const leading=/^\s/.test(n.text)?' ':'';const trailing=/\s$/.test(n.text)?' ':'';
   edits.push({start:n.getStart(tree),end:n.end,value:`{${JSON.stringify(leading)} + pageText(${accessor}, ${JSON.stringify(key)}) + ${JSON.stringify(trailing)}}`});
  }ts.forEachChild(n,visit);
 };visit(tree);
 for(const edit of edits.sort((a,b)=>b.start-a.start))source=source.slice(0,edit.start)+edit.value+source.slice(edit.end);
 source='import { pageText } from "@/content/pages";\n'+source;
 fs.writeFileSync(file,source);
}
fs.writeFileSync(seedPath,JSON.stringify(docs,null,2)+'\n');
console.log('Extracted page copy and reusable content; original visual layout retained.');
