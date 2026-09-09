import fs from 'node:fs';
import ts from 'typescript';
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${dir}/${e.name}`):[`${dir}/${e.name}`]);
const exact={
 'tel:+14167270287':'siteConfig.phoneHref','(416) 727-0287':'siteConfig.displayPhone','+1-416-727-0287':'siteConfig.phone',
 'mailto:softnest.upholstery@outlook.com':'siteConfig.emailHref','softnest.upholstery@outlook.com':'siteConfig.email',
 'https://maps.app.goo.gl/XHFbygUj49Suv9F48':'siteConfig.googleProfileUrl','https://www.instagram.com/softnestfabriccare/':'siteConfig.instagramUrl',
 'https://www.facebook.com/profile.php?id=61590622653207':'siteConfig.facebookUrl','Request a free quote':'siteConfig.quoteLabel',
 'SoftNest Fabric Care':'siteConfig.name',
};
for(const path of walk('src').filter(p=>/\.(tsx?|css)$/.test(p)&&!p.includes('/generated/')&&!p.includes('/lib/site.ts')&&!p.endsWith('.css'))){
 let source=fs.readFileSync(path,'utf8');const tree=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,path.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);const edits=[];
 const visit=n=>{
  if(ts.isStringLiteral(n)&&!ts.isImportDeclaration(n.parent)&&!ts.isLiteralTypeNode(n.parent)){
   let replacement=exact[n.text];
   if(!replacement&&n.text.startsWith('https://softnestcare.ca'))replacement=`siteConfig.url + ${JSON.stringify(n.text.slice('https://softnestcare.ca'.length))}`;
   if(!replacement&&n.text.includes('(416) 727-0287'))replacement=n.text.split('(416) 727-0287').map(JSON.stringify).join(' + siteConfig.displayPhone + ');
   if(replacement)edits.push({start:n.getStart(tree),end:n.end,value:ts.isJsxAttribute(n.parent)?`{${replacement}}`:replacement});
  }else if(ts.isJsxText(n)){
   let value=n.text;
   for(const [literal,expression] of Object.entries(exact))value=value.split(literal).join(`{${expression}}`);
   if(value!==n.text)edits.push({start:n.getStart(tree),end:n.end,value});
  }else if(ts.isTemplateHead(n)||ts.isNoSubstitutionTemplateLiteral(n)){
   const raw=n.getText(tree);if(raw.includes('https://softnestcare.ca'))edits.push({start:n.getStart(tree),end:n.end,value:raw.replace('https://softnestcare.ca','${siteConfig.url}')});
  }ts.forEachChild(n,visit);
 };visit(tree);
 for(const e of edits.sort((a,b)=>b.start-a.start))source=source.slice(0,e.start)+e.value+source.slice(e.end);
 if(edits.length&&!/import[^;]*\bsiteConfig\b[^;]*from\s*["']@\/lib\/site["']/.test(source))source=source.replace(/^("use client";\s*)?/,`$1import { siteConfig } from "@/lib/site";\n`);
 if(source.includes('dangerouslySetInnerHTML')){
  source=source.replace(/__html: JSON.stringify\(/g,'__html: jsonLd(');
  if(source.includes('__html: jsonLd(')&&!source.includes('import { jsonLd }'))source=source.replace(/^("use client";\s*)?/,`$1import { jsonLd } from "@/seo/structuredData";\n`);
 }
 fs.writeFileSync(path,source);
}
