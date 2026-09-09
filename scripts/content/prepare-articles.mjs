import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const incoming = 'content/inbox/2026-09-07';
const original = fs.readFileSync(`${incoming}/Article 2.txt`, 'utf8').replace(/\r\n/g,'\n');
const parts = original.split(/SEO Title:\s*/).filter(Boolean);
const titles = ['How to Remove a Stain from a Couch Without Making It Worse','Why Did My Couch Stain Come Back After Cleaning?'];
const imagePlacements = [
  {file:'SAP_02.png',name:'blotting-a-couch-spill',before:'2. Check the Upholstery Cleaning Code',alt:'A hand gently blotting a spill on a light sofa with a white towel.',caption:'Blot gently with a clean white towel instead of rubbing the spill into surrounding fibres.'},
  {file:'SAP_01.png',name:'upholstery-cleaning-care-label',before:'3. Test Before Treating a Visible Area',alt:'An upholstery care label showing W, S, WS and X cleaning codes.',caption:'Check the furniture manufacturer’s care instructions before choosing a cleaning method.'},
  {file:'SAP_0.png',name:'upholstery-extraction-close-up',before:'Why Blotting With a Towel Has Limits',alt:'Close view of moisture and foam being recovered through a transparent upholstery extraction tool.',caption:'Extraction recovers moisture and suspended soil through the cleaning tool.'},
  {file:'SAP_03.png',name:'controlled-sofa-extraction',before:'What If You Already Tried Cleaning It Yourself?',alt:'An upholstery extraction tool being used across a light-coloured sofa cushion.',caption:'Professional cleaning combines an appropriate treatment with controlled rinsing and moisture recovery.'},
  {file:'SAP_04.png',name:'sofa-fabric-after-drying',before:'Need Help With a Couch Stain in Mississauga or the GTA?',alt:'Close view of the seat cushion and woven fabric of a light-coloured sofa.',caption:'Assess the fabric once it is completely dry, including any changes in colour or texture.'},
];
const docs=[];
for (const [order,title] of titles.entries()) {
  const part=parts.find(p=>p.startsWith(`${title} | SoftNest`));
  if(!part) throw Error(`Missing article ${title}`);
  const slug=part.match(/URL:\s*\/([^/]+)\//)?.[1];
  const description=part.match(/Meta Description:\s*([^\n]+)/)?.[1];
  const start=part.indexOf(title,part.indexOf('Meta Description:'));
  const rawBody=part.slice(start+title.length).trim();
  const blocks=[];
  let faq=false;
  const paragraphs=rawBody.split(/\n\s*\n/).flatMap(p=>p.startsWith('Frequently Asked Questions\n')?['Frequently Asked Questions',p.slice('Frequently Asked Questions\n'.length)]:[p]);
  const heading = (p) => p.length < 110 && !/[.;:,!…]$/.test(p) && !/^“|^That |^The stain |^Then |^You |^Now |^It |^And |^Sometimes |^Why did it come back\?|^What stronger cleaner|^How to Remove a Stain from a Couch Without Making It Worse$|^What Cleaning Solution Can I Use/.test(p) && /^(?:\d\. |What |Why |How |When |Can |Is |The (?:Part|Cushion|Most|Simple)|Applying |Scrubbing |Too Much |Repeated |Appropriate |Controlled |Professional Extraction|Additional Extraction|Fabric Inspection|Agitation |Thorough |Drying Assistance|Frequently |Need Help)/.test(p);
  const images=[];
  for (const paragraph of paragraphs) {
    const p=paragraph.trim(); if(!p)continue;
    if(order===0){
      const placement=imagePlacements.find(x=>x.before===p);
      if(placement){
        const localPath=`/images/blog/${slug}/${placement.name}.webp`;
        const target=path.join('public',localPath);
        fs.mkdirSync(path.dirname(target),{recursive:true});
        await sharp(`${incoming}/images/${placement.file}`).resize({width:1440,withoutEnlargement:true}).webp({quality:86}).toFile(target);
        const meta=await sharp(target).metadata();
        const block={_type:'image',_key:`image-${images.length+1}`,localPath,alt:placement.alt,caption:placement.caption,width:meta.width,height:meta.height};
        blocks.push(block);images.push({...placement,localPath});
      }
    }
    if(p==='Frequently Asked Questions')faq=true;
    const text=p.replace(/\n/g,' ');
    const style=heading(p)?(/^\d\. |^(Appropriate |Controlled |Professional Extraction|Additional Extraction|Fabric Inspection|Agitation |Thorough |Drying Assistance)/.test(p)?'h3':'h2'):(faq&&p.endsWith('?')?'h3':'normal');
    const lines=p.split('\n');
    const isList=style==='normal'&&lines.length>1&&!/condition,$/.test(lines[0]);
    for(const value of isList?lines:[text]) blocks.push({_type:'block',_key:`text-${blocks.length}`,style,markDefs:[],children:[{_type:'span',_key:'text',text:value,marks:[]}],...(isList?{listItem:'bullet',level:1}:{})});
  }
  if(order===0&&images.length!==5)throw Error('Not all images placed');
  const doc={_id:`post-${slug}`,_type:'post',title,seoTitle:`${title} | SoftNest`,slug:{_type:'slug',current:slug},excerpt:description,seoDescription:description,publishedAt:'2026-09-07T12:00:00Z',author:{_type:'reference',_ref:'author-softnest'},categories:[{_type:'reference',_ref:'category-fabric-care'}],relatedServices:[{_type:'reference',_ref:'service-sofa-cleaning'},{_type:'reference',_ref:'service-upholstery-cleaning'}],body:blocks,order, ...(order===0?{coverImage:blocks.find(b=>b._type==='image'&&b.localPath.includes('controlled-sofa'))}:{}),showCover:false};
  const folder=`content/articles/${slug}`;fs.mkdirSync(folder,{recursive:true});
  fs.writeFileSync(`${folder}/article.txt`,rawBody+'\n');
  fs.writeFileSync(`${folder}/post.json`,JSON.stringify(doc,null,2)+'\n');
  fs.writeFileSync(`${folder}/README.md`,`# ${title}\n\nSource: Article 2.txt in the dated inbox. Complete article body preserved; metadata moved to fields, paragraphs/headings formatted. No substantive rewrite. The companion ZIP draft is an earlier variation and is retained in the inbox.\n\nURL: /blog/${slug}/\n\n${order===0?'Five supplied images placed in the body. Cover image used for the article card only.':'Text-only article; no cover or inline images.'}\n\n${images.map(i=>`- ${i.file}: before “${i.before}”.`).join('\n')}\n`);
  // Verify all source prose survived the conversion, independently of formatting.
  const normalized=s=>s.replace(/\s+/g,' ').trim();
  const rendered=blocks.filter(b=>b._type==='block').map(b=>b.children.map(s=>s.text).join('')).join(' ');
  if(normalized(rawBody)!==normalized(rendered))throw Error(`Article text changed: ${slug}`);
  docs.push(doc);
}
docs.push({_id:'author-softnest',_type:'author',name:'SoftNest Fabric Care'},{_id:'category-fabric-care',_type:'category',title:'Fabric care'});
fs.writeFileSync('content/migration/article-seed.json',JSON.stringify(docs,null,2)+'\n');
console.log('Prepared two complete articles; verified source text preservation and five inline images.');
