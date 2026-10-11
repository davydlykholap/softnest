import type { LocationFaq } from "@/content/locations";

// Approved Oakville editorial copy lives outside generated Sanity snapshots so
// production content:sync cannot replace it during deployment.
export const oakvillePage = {
  metaTitle: "Upholstery & Carpet Cleaning Oakville | Sofa & Rug | SoftNest",
  metaDescription: "Professional upholstery, sofa, carpet & area rug cleaning in Oakville, ON. Fabric-safe methods, free photo estimates, one final price with tax included. Call (416) 727-0287.",
  heroDescription: "Deep cleaning for sofas, upholstery, carpets and area rugs in Oakville homes, townhouses and condos — fabric-safe chemistry, commercial-grade extraction, and one final price quoted from your photos.",
  introduction: "SoftNest Fabric Care cleans sofas, upholstery, carpets and area rugs across Oakville, Ontario. We start every job by identifying your fabric on site — linen-look weaves, bouclé, microfibre, synthetics — and match the chemistry to the material, not the other way around. Then: hot-water extraction, individual stain treatment, deodorizing and sanitizing, finished with air movers for fast drying. Send us photos and get one final price — tax included, no surprises.",
  services: [
    {
      title: "Sofas",
      slug: "sofa-cleaning",
      description: "Our main work. Loveseats, 3-seat and 4-seat sofas, sectionals with chaise — we price by the number of seats, so send a photo and get an exact quote. Every sofa gets on-site fabric identification, chemistry matched to the material, individual stain treatment and an acid-rinse finish.",
    },
    {
      title: "Carpets",
      slug: "carpet-area-rug-cleaning",
      description: "Wall-to-wall carpet cleaning for bedrooms, living rooms, hallways and stairs. Hot-water extraction pulls out the deep dirt, dust and allergens that vacuuming leaves behind. Drying passes and air movers get you back on your floors the same day.",
    },
    {
      title: "Area rugs",
      slug: "carpet-area-rug-cleaning",
      description: "Deep cleaning for area rugs of all sizes. We assess fibre, backing and colour stability first, then choose the right method. Send a photo — we'll confirm the approach and your final price.",
    },
  ],
  more: "Armchairs, dining chairs, mattresses, pet stain & odor treatment, and fabric protection that keeps your sofa or carpet cleaner longer. Combine several items in one visit.",
  advantages: [
    {
      title: "We read the fabric first.",
      description: "Upholstery gets identified on site and cleaned with chemistry matched to it — including the linen-look weaves and delicate materials common in Oakville homes.",
    },
    {
      title: "Straight talk on stains.",
      description: "We tell you before we start what looks treatable and where wear or fibre damage will stay — no fairy tales.",
    },
    {
      title: "One photo, one price.",
      description: "Send photos, get a final quote with tax included. The number doesn't move on the day.",
    },
    {
      title: "One trip, everything done.",
      description: "Sofas, carpets, rugs, chairs and mattresses in a single appointment.",
    },
  ],
  faqs: [
    {
      question: "How do I get a quote?",
      answer: "Send photos of what you want cleaned. You'll get a free, exact quote — one final price, tax included, no extra fees.",
    },
    {
      question: "Do you work in Oakville townhouses and condos?",
      answer: "Yes — much of our Oakville work is in townhouses and condos. Tell us about parking and building access upfront and we'll arrive prepared.",
    },
    {
      question: "How long until it's dry?",
      answer: "Most sofas and carpets are dry to the touch within a few hours. We finish with drying passes, run air movers, and leave you simple after-care guidance.",
    },
    {
      question: "Can you get pet stains and odor out?",
      answer: "Yes. We treat the contamination deep where the odor lives — not a surface spray. Old urine spots get an enzyme treatment with proper dwell time before extraction.",
    },
    {
      question: "What is fabric protection?",
      answer: "An invisible treatment applied after cleaning: spills bead up on the surface instead of soaking into the fibres. Five minutes while we're there — ideal for homes with kids or pets. Ask about it when you book.",
    },
    {
      question: "Which parts of Oakville do you cover?",
      answer: "All of it. Send your postal code and we'll confirm your appointment.",
    },
  ] satisfies LocationFaq[],
  neighbourhoods: ["Old Oakville", "Bronte", "Glen Abbey", "Clearview", "River Oaks", "West Oak Trails", "Palermo", "Joshua Creek"],
  coverage: "Sofa, carpet, rug and upholstery cleaning throughout Oakville — houses, townhouses, condos and apartments.",
  coverageClosing: "Somewhere else in Oakville? You're still in our area — send your postal code and we'll confirm.",
  ctaTitle: "Ready for a cleaner home?",
  ctaDescription: "Send a photo for a free quote — one final price, tax included.",
};
