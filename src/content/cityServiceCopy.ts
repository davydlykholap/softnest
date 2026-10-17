import "server-only";

// Reviewed plain-language versions of known CMS phrases. If an editor changes a
// source phrase, render the new CMS text until its wording has been reviewed too.
const customerWording = new Map<string, string>([
  ["Fabric-appropriate deep cleaning for frequently used upholstered furniture, with stain treatment, extraction and professional drying included.", "Deep cleaning for upholstered furniture, with stain treatment and drying support. We check the fabric and choose a suitable cleaning method before starting."],
  ["Careful cleaning for suitable leather furniture, followed by a moisturizing conditioning treatment and protective solution to support the finish and everyday care.", "Cleaning and conditioning for suitable leather furniture, with a protective treatment. We check the leather and its condition before starting."],
  ["Detailed cleaning for large sectionals, loveseats, recliners, ottomans and other upholstered furniture.", "Cleaning for large sectionals, loveseats, recliners and ottomans. We check the fabric and confirm which sections and cushions are included."],
  ["Professional extraction for wall-to-wall carpet, high-traffic areas and suitable area rugs after fibre and backing assessment.", "Cleaning for wall-to-wall carpet, busy walkways and suitable area rugs. We check the material and backing before choosing how to clean."],
  ["Professional mattress surface cleaning for everyday buildup, suitable spots, light odours and general freshening.", "Mattress surface cleaning for everyday dirt, suitable stains and light odours. We check the material and condition and explain what results to expect."],
  ["Fabric-appropriate cleaning for armchairs, recliners and accent seating, including high-contact areas and suitable cushions.", "Cleaning for armchairs, recliners and accent chairs, including well-used arms, seats and suitable cushions. We check the fabric and take care around moving parts."],
  ["Focused cleaning for carpeted stairs, landings and hallways where traffic lanes and edge soil build up quickly.", "Cleaning for carpeted stairs, landings and hallways, with attention to busy walkways and dirt along the edges. We confirm the step count and areas included."],
  ["Targeted treatment for pet accidents, visible staining and odour sources in suitable upholstery and carpet.", "Treatment for pet stains and odours in suitable furniture and carpet. We check the affected areas and explain where deeper damage may limit the result."],
  ["Pre-inspection and fabric assessment", "Checking the fabric and condition"],
  ["Commercial-grade cleaning equipment", "Professional cleaning equipment"],
  ["Standard spot and stain treatment", "Treatment of ordinary spots and stains"],
  ["Fabric and condition inspection", "Checking the fabric and condition"],
  ["Standard pre-treatment and spot treatment", "Preparing the fabric and treating ordinary spots"],
  ["Deep cleaning and extraction", "Deep cleaning and removal of loosened dirt and moisture"],
  ["Leather type and condition assessment", "Checking the leather type and condition"],
  ["Controlled surface cleaning", "Careful surface cleaning"],
  ["Leather-appropriate cleaning products", "Products suited to the leather"],
  ["Moisturizing and conditioning treatment", "Leather conditioning treatment"],
  ["Accurate section and cushion count", "Confirming the sections and cushions included"],
  ["Fabric-specific pre-inspection", "Checking the fabric before cleaning"],
  ["Standard stain treatment", "Treatment of ordinary stains"],
  ["Fibre and condition assessment", "Checking the material and condition"],
  ["Pre-vacuuming where required", "Vacuuming first where needed"],
  ["Standard spot treatment", "Treatment of ordinary spots"],
  ["Professional hot-water extraction where suitable", "Hot-water cleaning that removes loosened dirt and moisture, where suitable"],
  ["Surface inspection", "Checking the surface and condition"],
  ["Fabric-safe pre-treatment", "Preparing the fabric with a suitable cleaning product"],
  ["Controlled-moisture cleaning", "Cleaning with carefully controlled moisture"],
  ["Chair-by-chair inspection", "Checking each chair before cleaning"],
  ["Fabric suitability check", "Checking whether the fabric can be cleaned"],
  ["Cleaning of quoted upholstered areas", "Cleaning the upholstered areas in your quote"],
  ["Fabric and mechanism inspection", "Checking the fabric and moving parts"],
  ["Cleaning of accessible quoted surfaces", "Cleaning the reachable surfaces in your quote"],
  ["Step and landing count review", "Confirming the number of steps and landings"],
  ["Pre-inspection", "Checking the carpet before cleaning"],
  ["Affected-area inspection", "Checking the affected areas"],
  ["Contamination-depth discussion", "Discussing how deeply the pet accident may have soaked in"],
  ["Suitable targeted pre-treatment", "Applying a suitable treatment to the affected spots"],
  ["Cleaning and extraction", "Cleaning and removal of loosened dirt and moisture"],
]);

export function customerServiceText(text: string) {
  return customerWording.get(text) ?? text;
}
