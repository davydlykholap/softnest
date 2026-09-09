// One-time migration capture. Run only against the original source, before refactoring.
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const evaluate = (source) => {
  const exports = {};
  vm.runInNewContext(ts.transpile(source, { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }), { exports });
  return exports;
};
if(fs.existsSync('content/migration/site-seed.json')) throw Error('Migration already captured. Do not regenerate from migrated code.');
const read = (path) => fs.readFileSync(path, 'utf8');
const services = evaluate(read('src/data/services.ts')).services;
const locationsModule = evaluate(read('src/data/locations.ts'));
const site = evaluate(read('src/lib/site.ts')).siteConfig;
const faqs = evaluate(read('src/data/homeFaqs.ts')).homeFaqs;
const extract = (path, names) => {
  const source = read(path);
  const tree = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const selected = [];
  for (const statement of tree.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (names.includes(declaration.name.getText(tree))) selected.push(`export const ${declaration.name.getText(tree)} = ${declaration.initializer.getText(tree)};`);
    }
  }
  return evaluate(selected.join('\n'));
};
const home = extract('src/components/HomeSections.tsx', ['galleryResults', 'homeReviews']);
const hero = extract('src/components/HomeHero.tsx', ['googleReviews']);
const local = extract('src/components/MississaugaPage.tsx', ['quickBenefits','services','resultExamples','processSteps','localAdvantages','mississaugaFaqs']);
const about = extract('src/app/about/page.tsx', ['principles']);
const docs = [];
const ref = (id) => ({ _type: 'reference', _ref: id });
docs.push({ _id: 'siteSettings', _type: 'siteSettings', ...site,
  googleProfileUrl: site.sameAs[0], instagramUrl: site.sameAs[1], facebookUrl: site.sameAs[2],
  quoteLabel: 'Request a free quote', reviewScore: '5.0', region: 'Greater Toronto Area',
  defaultTitle: 'Upholstery & Carpet Cleaning Across the GTA | SoftNest',
  defaultDescription: 'Professional upholstery, sofa, carpet and area rug cleaning across the Greater Toronto Area and Hamilton.' });
services.forEach((service, order) => docs.push({ _id: `service-${service.slug}`, _type: 'service', ...service,
  slug: { _type:'slug', current: service.slug }, order, pageEnabled: true, showInNavigation: service.slug !== 'upholstery-cleaning',
  relatedServices: service.relatedServices.map(slug => ref(`service-${slug}`)) }));
locationsModule.locations.forEach((location, order) => docs.push({ _id: `location-${location.slug}`, _type: 'location', ...location,
  slug: { _type:'slug', current: location.slug }, order, status:'active', pageEnabled:true, indexInSearch:true, showInFooter:true,
  image: `/img/locations/${location.slug}.webp`, imageAlt: `Homes and neighbourhoods in ${location.name}`,
  availableServices: ['sofa-cleaning','sectional-furniture-cleaning','carpet-area-rug-cleaning','pet-stain-odour-removal'].map(slug=>ref(`service-${slug}`)),
  nearbyLocations: locationsModule.nearbyLocationSlugs[location.slug].map(slug => ref(`location-${slug}`)),
  ...(location.slug === 'mississauga' ? { expanded: true, expandedContent: local } : {}) }));
faqs.forEach((faq, order) => docs.push({ _id:`faq-home-${order+1}`, _type:'faq', ...faq, order, onHomepage:true }));
home.homeReviews.forEach((review, order) => docs.push({ _id:`testimonial-home-${order+1}`, _type:'testimonial', ...review, order,
  featured:true, publicationStatus:'approved', source:'Google', sourceUrl:site.sameAs[0] }));
home.galleryResults.forEach((project, order) => docs.push({ _id:`cleaning-project-home-${order+1}`, _type:'cleaningProject', ...project,
  title: `${project.category} — ${project.service}`, order, featured:true, publicationStatus:'approved' }));
const quotes = evaluate(read('src/data/quote.ts')).quoteServiceOptions;
const quoteRelations = [['sofa-cleaning'],['sectional-furniture-cleaning'],['leather-upholstery-cleaning'],['dining-chair-cleaning'],['mattress-cleaning'],['carpet-area-rug-cleaning'],['armchair-cleaning','upholstery-cleaning']];
quotes.forEach((label, order)=> docs.push({_id:`quote-category-${order+1}`,_type:'quoteCategory',label,order,enabled:true,services:quoteRelations[order].map(slug=>ref(`service-${slug}`))}));
docs.push({_id:'page-content-home',_type:'pageContent',title:'Homepage',key:'home',heroReviews:hero.googleReviews,
  featuredServices:['sofa-cleaning','pet-stain-odour-removal','sectional-furniture-cleaning','carpet-area-rug-cleaning'].map(slug=>ref(`service-${slug}`)),copy:[]});
docs.push({_id:'page-content-about',_type:'pageContent',title:'About SoftNest',key:'about',principles:about.principles,copy:[]});
fs.mkdirSync('content/migration',{recursive:true});
fs.writeFileSync('content/migration/site-seed.json',JSON.stringify(docs,null,2)+'\n');
console.log(`Captured ${docs.length} content records.`);
