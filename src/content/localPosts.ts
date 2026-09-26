type BlockStyle = "normal" | "h2" | "h3";

function textBlock(key: string, text: string, style: BlockStyle = "normal") {
  return {
    _key: key,
    _type: "block",
    children: [
      {
        _key: `${key}-text`,
        _type: "span",
        marks: [],
        text,
      },
    ],
    markDefs: [],
    style,
  };
}

function richTextBlock(
  key: string,
  segments: { text: string; marks?: string[] }[],
  style: BlockStyle = "normal",
) {
  return {
    _key: key,
    _type: "block",
    children: segments.map((segment, index) => ({
      _key: `${key}-text-${index}`,
      _type: "span",
      marks: segment.marks ?? [],
      text: segment.text,
    })),
    markDefs: [],
    style,
  };
}

const mississaugaServiceLink = {
  _key: "mississauga-service-link",
  _type: "block",
  children: [
    {
      _key: "mississauga-service-prefix",
      _type: "span",
      marks: [],
      text: "For more information about our local service, visit our ",
    },
    {
      _key: "mississauga-service-anchor",
      _type: "span",
      marks: ["mississauga-page"],
      text: "Sofa & Upholstery Cleaning in Mississauga",
    },
    {
      _key: "mississauga-service-suffix",
      _type: "span",
      marks: [],
      text: " page.",
    },
  ],
  markDefs: [
    {
      _key: "mississauga-page",
      _type: "link",
      href: "/location/mississauga/",
    },
  ],
  style: "normal",
};

export const localPosts = [
  {
    _id: "post-upholstery-cleaning-prices-toronto",
    _type: "post",
    author: "SoftNest Fabric Care",
    body: [
      textBlock(
        "pricing-1",
        "If you’re comparing upholstery cleaning prices in Toronto or the GTA, you may get very different quotes for the same sofa.",
      ),
      textBlock(
        "pricing-2",
        "That doesn’t mean the cheapest company will do a worse job. And paying more doesn’t automatically mean you’ll get better cleaning.",
      ),
      richTextBlock("pricing-3", [
        { text: "The important thing is to understand " },
        {
          text: "what you’re actually getting for the price.",
          marks: ["strong"],
        },
      ]),
      textBlock(
        "pricing-4",
        "Before choosing an upholstery cleaner, ask these five questions.",
      ),
      textBlock("pricing-5", "1. What exactly is included in the price?", "h2"),
      textBlock("pricing-6", "Start with the simplest question."),
      textBlock(
        "pricing-7",
        "Does the quote include stain treatment? Deodorizing? Sanitizing? Removable cushions? If the cushions can be flipped, are both sides cleaned?",
      ),
      textBlock(
        "pricing-8",
        "Different companies package their services differently, so two similar prices may not include the same work.",
      ),
      textBlock(
        "pricing-9",
        "Ask what is included before you book rather than finding out once the cleaning has already started.",
      ),
      textBlock("pricing-10", "2. How thorough will the cleaning be?", "h2"),
      textBlock("pricing-11", "This is probably the most important question."),
      textBlock(
        "pricing-12",
        "Ask whether the entire accessible upholstered area will be cleaned — not only the seats.",
      ),
      textBlock(
        "pricing-13",
        "That can include the cushions, armrests, sides, front, back and upholstered frame, depending on the design of the sofa.",
      ),
      textBlock("pricing-14", "Also ask what happens if one area needs more work."),
      textBlock(
        "pricing-15",
        "Armrests, headrests and favourite sitting areas can be much dirtier than the rest of the furniture. If an armrest still needs attention after the first cleaning, will they go over it again? If another section needs an extra pass, is that simply part of the job?",
      ),
      textBlock(
        "pricing-16",
        "You’re not asking how many times every part will be cleaned.",
      ),
      textBlock(
        "pricing-17",
        "You’re trying to understand whether the cleaner is focused on the result or simply completing one quick pass and moving on.",
      ),
      textBlock(
        "pricing-18",
        "3. What happens if a stain or dirty area needs more attention?",
        "h2",
      ),
      textBlock(
        "pricing-19",
        "Not every stain comes out on the first attempt, and some marks may be permanent discoloration rather than removable soil.",
      ),
      textBlock("pricing-20", "That’s normal."),
      textBlock(
        "pricing-21",
        "What’s worth asking is whether the cleaner will inspect the furniture after cleaning and re-treat areas that can reasonably be improved.",
      ),
      textBlock(
        "pricing-22",
        "A good service doesn’t mean promising that every stain will disappear. It means making a reasonable effort to get the best result possible before the job is finished.",
      ),
      textBlock("pricing-23", "4. How do you protect my home while you work?", "h2"),
      textBlock(
        "pricing-24",
        "Upholstery cleaning also means bringing equipment, hoses and cleaning products into your home.",
      ),
      textBlock(
        "pricing-25",
        "Ask how flooring is protected where necessary and how hoses and equipment are handled around walls, corners and furniture.",
      ),
      textBlock(
        "pricing-26",
        "These are small details, but they can tell you a lot about how carefully a company works.",
      ),
      textBlock(
        "pricing-27",
        "Good upholstery cleaning isn’t only about leaving the sofa clean. It’s also about taking care of the home around it.",
      ),
      textBlock(
        "pricing-28",
        "5. Is this the final price, and what could cost extra?",
        "h2",
      ),
      textBlock(
        "pricing-29",
        "Before booking, ask whether the quote is the final price based on the photos and information you provided.",
      ),
      textBlock(
        "pricing-30",
        "Some situations may genuinely require additional treatment. Pet urine, unusual contamination or certain specialty stains are good examples.",
      ),
      textBlock(
        "pricing-31",
        "There’s nothing wrong with charging separately for additional work.",
      ),
      richTextBlock("pricing-32", [
        { text: "The important thing is knowing " },
        {
          text: "what is included, what could cost extra and whether you’ll be told before any additional work is done.",
          marks: ["strong"],
        },
      ]),
      textBlock("pricing-33", "Compare the Service, Not Just the Price", "h2"),
      textBlock(
        "pricing-34",
        "When comparing couch or upholstery cleaning prices in Toronto, don’t assume that cheaper means worse or that more expensive automatically means better.",
      ),
      textBlock(
        "pricing-35",
        "Instead, compare what each company is actually offering.",
      ),
      richTextBlock("pricing-36", [
        {
          text: "What is included? How thoroughly will the furniture be cleaned? Will problem areas get extra attention? How will your home be protected? And is the quoted price really the final price?",
          marks: ["strong"],
        },
      ]),
      textBlock(
        "pricing-37",
        "Once you know those answers, comparing prices becomes much easier.",
      ),
      textBlock(
        "pricing-38",
        "At SoftNest Fabric Care, we provide our pricing in advance based on the furniture and information you send us. If you’d like a quote, send us the number of seats and, if possible, a photo of the furniture. We can take a look and let you know the price before you book.",
      ),
    ],
    categories: ["Upholstery care", "Pricing"],
    coverImage: {
      localPath: "/images/blog/upholstery-cleaning-prices-toronto.webp",
      width: 1672,
      height: 941,
      alt: "Professional upholstery cleaning technician using an extraction tool on a light-coloured sectional sofa",
    },
    excerpt:
      "Compare upholstery cleaning prices in Toronto by checking what is included, how thoroughly the furniture is cleaned and what may cost extra.",
    order: 9,
    publishedAt: "2026-09-25T12:00:00Z",
    relatedServices: [
      "upholstery-cleaning",
      "sofa-cleaning",
      "sectional-furniture-cleaning",
    ],
    seoDescription:
      "Compare upholstery cleaning prices in Toronto with five practical questions about inclusions, stain treatment, home protection and extra costs.",
    seoTitle: "Upholstery Cleaning Prices in Toronto: 5 Questions to Ask",
    showCover: true,
    slug: "upholstery-cleaning-prices-toronto",
    title: "Upholstery Cleaning Prices in Toronto: 5 Questions to Ask Before Booking",
  },
  {
    _id: "post-how-to-know-when-your-sofa-needs-professional-cleaning",
    _type: "post",
    author: "SoftNest Fabric Care",
    body: [
      textBlock(
        "sofa-signs-1",
        "A sofa can look clean at first glance while still holding dust, body oils, food residue, pet hair and dirt deep inside the upholstery.",
      ),
      textBlock(
        "sofa-signs-2",
        "Because sofas are used every day, changes usually happen gradually. You may not notice how much the fabric has changed until you compare a high-use seat or armrest with an area that is rarely touched.",
      ),
      textBlock(
        "sofa-signs-3",
        "Here are a few signs that it may be time to have your sofa professionally cleaned.",
      ),
      textBlock(
        "sofa-signs-4",
        "1. The Fabric Looks Darker in High-Use Areas",
        "h2",
      ),
      textBlock(
        "sofa-signs-5",
        "Seats, armrests and the front edge of a sofa usually collect the most dirt.",
      ),
      textBlock(
        "sofa-signs-6",
        "Over time, these areas can become noticeably darker than the rest of the furniture. Regular vacuuming can remove loose debris, but it usually cannot remove the soil and oils that have worked their way into the upholstery.",
      ),
      textBlock(
        "sofa-signs-7",
        "A professional deep cleaning can help remove this buildup and restore a cleaner, more even appearance.",
      ),
      textBlock(
        "sofa-signs-8",
        "2. There Are Visible Spots or Stains",
        "h2",
      ),
      textBlock(
        "sofa-signs-9",
        "Coffee, food, drinks, children and pets can all leave marks on upholstered furniture.",
      ),
      textBlock(
        "sofa-signs-10",
        "The sooner a stain is treated correctly, the better the chances of improving it. Using random household cleaning products can sometimes make the problem harder to correct later, especially on delicate fabrics.",
      ),
      textBlock(
        "sofa-signs-11",
        "If you are unsure what caused a stain, it is usually safer to have the fabric inspected before applying strong cleaning products.",
      ),
      textBlock(
        "sofa-signs-12",
        "3. The Sofa Has Developed an Odour",
        "h2",
      ),
      textBlock(
        "sofa-signs-13",
        "Fabric furniture can absorb odours from everyday use, pets, cooking and spills.",
      ),
      textBlock(
        "sofa-signs-14",
        "If the sofa still smells after vacuuming and airing out the room, the source of the odour may be deeper in the upholstery or cushion.",
      ),
      textBlock(
        "sofa-signs-15",
        "Professional upholstery cleaning uses extraction to remove contamination and cleaning solution from the fabric rather than simply covering the smell with fragrance.",
      ),
      textBlock("sofa-signs-16", "4. You Have Pets", "h2"),
      textBlock("sofa-signs-17", "Pet hair is only the part you can see."),
      textBlock(
        "sofa-signs-18",
        "Furniture in homes with cats or dogs may also collect oils, dirt and odours over time. Pet accidents can sometimes travel below the surface material into the padding, which may require more specialized treatment than standard surface cleaning.",
      ),
      textBlock(
        "sofa-signs-19",
        "5. The Sofa Hasn't Been Deep Cleaned in a Long Time",
        "h2",
      ),
      textBlock(
        "sofa-signs-20",
        "Even furniture without major stains benefits from occasional professional cleaning.",
      ),
      textBlock(
        "sofa-signs-21",
        "Regular deep cleaning helps remove the gradual buildup that normal household maintenance cannot always reach.",
      ),
      textBlock(
        "sofa-signs-22",
        "How frequently a sofa should be cleaned depends on how much it is used, the colour and type of fabric, whether there are pets or children in the home, and other household conditions.",
      ),
      textBlock(
        "sofa-signs-23",
        "Professional Sofa Cleaning in Mississauga",
        "h2",
      ),
      textBlock(
        "sofa-signs-24",
        "If your furniture is showing any of these signs, a professional cleaning may be worth considering.",
      ),
      {
        ...textBlock(
          "sofa-signs-25",
          "SoftNest Fabric Care provides professional sofa cleaning in Mississauga for sofas, couches, sectionals, loveseats, armchairs and other upholstered furniture.",
        ),
        children: [
          {
            _key: "sofa-signs-25-prefix",
            _type: "span",
            marks: [],
            text: "SoftNest Fabric Care provides ",
          },
          {
            _key: "sofa-signs-25-strong",
            _type: "span",
            marks: ["strong"],
            text: "professional sofa cleaning in Mississauga",
          },
          {
            _key: "sofa-signs-25-suffix",
            _type: "span",
            marks: [],
            text: " for sofas, couches, sectionals, loveseats, armchairs and other upholstered furniture.",
          },
        ],
      },
      textBlock(
        "sofa-signs-26",
        "Our cleaning process includes treatment of problem areas where needed, deep extraction cleaning, rinsing, deodorizing and sanitizing. We also use air movers during the cleaning process to help the furniture begin drying.",
      ),
      mississaugaServiceLink,
      textBlock("sofa-signs-28", "Need Upholstery Cleaning?", "h2"),
      textBlock(
        "sofa-signs-29",
        "Every piece of furniture is different, so the easiest way to get an accurate quote is to send us a photo of the furniture along with the number of seats.",
      ),
      textBlock(
        "sofa-signs-30",
        "SoftNest Fabric Care provides professional upholstery and fabric cleaning throughout Mississauga and surrounding areas of the GTA.",
      ),
    ],
    categories: ["Upholstery care", "Sofa cleaning"],
    excerpt:
      "Learn the signs that a sofa needs professional cleaning, including darkened fabric, visible stains, odours, pet buildup and embedded soil.",
    order: 8,
    publishedAt: "2026-09-18T12:00:00Z",
    relatedServices: ["sofa-cleaning", "upholstery-cleaning"],
    seoDescription:
      "Learn when a sofa needs professional cleaning, including signs such as darkened fabric, stains, odours, pet buildup and embedded soil.",
    seoTitle:
      "How to Know When Your Sofa Needs Professional Cleaning | SoftNest",
    showCover: false,
    slug: "how-to-know-when-your-sofa-needs-professional-cleaning",
    title: "How to Know When Your Sofa Needs Professional Cleaning",
  },
] as const;
