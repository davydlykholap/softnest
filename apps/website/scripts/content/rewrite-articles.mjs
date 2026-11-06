import fs from "node:fs";

const articleRoot = "content/articles";
const seedPath = "content/migration/article-seed.json";

const block = (style, text, extra = {}) => ({ style, text, ...extra });
const p = (text) => block("normal", text);
const h2 = (text) => block("h2", text);
const h3 = (text) => block("h3", text);
const li = (text) => block("normal", text, { listItem: "bullet" });
const number = (text) => block("normal", text, { listItem: "number" });

const articles = {
  "how-to-remove-stain-from-couch": {
    title: "How to Remove a Stain from a Couch Without Making It Worse",
    excerpt:
      "Learn how to remove a couch stain safely, avoid water rings and fabric damage, and know when to call a professional upholstery cleaner.",
    blocks: [
      p("When something spills on the couch, it is tempting to reach for the nearest cleaner and start scrubbing. That can spread the stain, push it deeper into the cushion, or leave a ring after the fabric dries."),
      p("The safest response is usually simple: remove as much of the spill as you can, check the furniture's care instructions, and use as little moisture as possible. This guide explains what to do, what to avoid, and when a professional upholstery cleaner may be the safer choice."),

      h2("What to Do First When Something Spills on Your Couch"),
      h3("1. Remove solids carefully"),
      p("If the spill contains food, mud, or another solid material, lift it away with a spoon or dull edge. Work gently so you do not press it farther into the upholstery."),
      h3("2. Blot the liquid—do not scrub"),
      p("Press a clean white towel onto the wet area, lift it, and repeat with a dry section of the towel. Blotting helps transfer moisture out of the fabric. Scrubbing can spread the spill and may change the texture of velvet, chenille, and other delicate upholstery."),
      block("image", "blotting-a-couch-spill"),
      h3("3. Check the upholstery cleaning code"),
      p("Look underneath a seat cushion or on the bottom of the furniture for the manufacturer's care label. Common upholstery cleaning codes include:"),
      li("W: A water-based cleaning method may be used."),
      li("S: A water-free solvent cleaning method is indicated."),
      li("WS or SW: Either water-based or solvent-based cleaning may be permitted."),
      li("X: Do not use liquid spot-cleaning products; vacuuming or professional care is usually recommended."),
      p("A W code does not mean the fabric can be soaked or that every water-based cleaner is safe. The label is a starting point, not a complete cleaning plan."),
      block("image", "upholstery-cleaning-care-label"),
      h3("4. Test before treating a visible area"),
      p("If the care instructions allow the product you plan to use, test a small amount in a hidden area. Let it dry completely before checking for colour transfer, fading, browning, water marks, or a change in texture."),
      h3("5. Use as little product and moisture as possible"),
      p("More cleaner does not mean more cleaning. Upholstery has layers beneath the visible fabric, including backing, batting, and foam. Too much liquid can carry the spill into those layers and make it harder to remove."),

      h2("A Safe, Simple Method for a Small Couch Stain"),
      p("If the stain is small, fresh, and on upholstery that permits water-based spot cleaning, follow the product and furniture manufacturer's instructions. A careful process usually looks like this:"),
      number("Blot up as much of the spill as possible with a clean white towel."),
      number("Test the approved cleaning product in a hidden area and allow the test spot to dry."),
      number("Apply a small amount to a towel rather than pouring or spraying it heavily onto the couch."),
      number("Work from the outside edge of the stain toward the centre to limit spreading."),
      number("Blot away loosened soil and moisture with clean sections of the towel."),
      number("Let the area dry fully before deciding whether it needs more treatment."),
      p("This approach is deliberately conservative. If the stain is not improving, repeated applications can add moisture and residue without solving the problem."),

      h2("Common Couch-Stain Cleaning Mistakes"),
      h3("Scrubbing too hard"),
      p("Aggressive rubbing can move contamination into nearby fibres and disturb the fabric's surface. A small spot may become a larger, lighter, darker, or rougher-looking area."),
      h3("Soaking the cushion"),
      p("A stain that begins near the surface can travel into the backing, batting, or foam when too much liquid is added. The top may look clean while the deeper material remains contaminated."),
      h3("Mixing several cleaning products"),
      p("When one product does not work, adding vinegar, peroxide, dish soap, or another stain remover can create an unpredictable mixture. It may also make later professional treatment more difficult. Never mix household cleaners unless their labels clearly say it is safe."),
      h3("Judging the result while the fabric is wet"),
      p("Wet upholstery often looks darker and can hide the outline of a stain. Wait until the area is completely dry before deciding whether the treatment worked."),

      h2("Why Cleaner Alone Does Not Remove a Stain"),
      p("A cleaning solution can loosen oily or sticky contamination, but the loosened material still needs to leave the fabric. Wiping the surface with a towel removes some moisture, yet it may not recover what has moved deeper into the upholstery."),
      p("Professional upholstery cleaning combines the right treatment with controlled rinsing and extraction. An extraction tool delivers a measured amount of solution and immediately recovers moisture, residue, and suspended soil."),
      block("image", "upholstery-extraction-close-up"),
      p("Extraction is not a promise that every stain will disappear. Bleaching, dye loss, and permanent fibre damage are changes to the material itself and cannot always be corrected through cleaning."),

      h2("When to Stop Cleaning a Couch Stain Yourself"),
      p("Stop adding products and consider professional advice if:"),
      li("the care label has an X code, or you cannot identify the fabric;"),
      li("the upholstery contains wool, linen, cotton, rayon, viscose, or another sensitive fibre;"),
      li("the colour transfers to your towel or the fabric begins to fade;"),
      li("the texture changes, a ring appears, or the stained area becomes larger;"),
      li("the spill has reached the cushion foam or has a persistent odour;"),
      li("you have already used several products; or"),
      li("the furniture is valuable and the result is difficult to test safely."),
      p("If you contact a cleaner, explain what caused the stain, when it happened, and which products you used. That information can help them choose a safer treatment."),
      block("image", "controlled-sofa-extraction"),

      h2("How to Prevent Water Rings and Returning Stains"),
      p("Use moisture only where the care instructions permit it, avoid saturating the cushion, and dry the area promptly with good airflow. Do not apply more cleaner simply because the fabric still looks different while wet."),
      p("If a mark disappears and returns after drying, contamination or residue may be moving back to the surface. Our guide to why couch stains come back explains wicking, water rings, and the safest next steps."),
      block("image", "sofa-fabric-after-drying"),

      h2("Professional Couch Stain Removal in Mississauga and the GTA"),
      p("SoftNest Fabric Care provides sofa cleaning, upholstery cleaning, and stain treatment in Mississauga and across the Greater Toronto Area. Send us a photo of the stain and the furniture's care label, if available, and tell us what has already been applied."),
      p("Sometimes a careful home treatment is reasonable. In other cases, the best way to protect the fabric is to stop adding products until the upholstery can be assessed."),

      h2("Frequently Asked Questions"),
      h3("Should I scrub a stain on my couch?"),
      p("No. Blot with a clean white towel instead. Scrubbing can spread the stain and damage or distort the surface of some fabrics."),
      h3("Can I use dish soap on a couch?"),
      p("Only if the furniture and product instructions support that method. Dish soap can leave residue when it is used too heavily or not rinsed out properly."),
      h3("Why did the stain get bigger after I cleaned it?"),
      p("Excess moisture may have spread contamination beyond the original spot or created a water ring. Let the area dry before applying anything else."),
      h3("How long should a couch take to dry?"),
      p("Drying time depends on the fabric, cushion construction, humidity, airflow, and amount of moisture used. Keep the area ventilated and avoid sitting on it until it is completely dry."),
      h3("Can every couch stain be removed?"),
      p("No. Many stains can be improved, but bleaching, dye loss, and permanent fibre damage cannot always be reversed by cleaning."),
      h3("What should I tell a professional cleaner?"),
      p("Share what caused the stain, how old it is, which products were used, and whether the appearance changed after your cleaning attempt."),
    ],
  },

  "why-did-my-couch-stain-come-back-after-cleaning": {
    title: "Why Did My Couch Stain Come Back After Cleaning?",
    excerpt:
      "Learn why couch stains can return after drying, how wicking and detergent residue affect upholstery, and what to do before cleaning the spot again.",
    blocks: [
      p("A couch stain can look completely gone while the fabric is wet, only to reappear several hours later. This often happens because moisture or dissolved contamination remains beneath the surface and travels upward as the upholstery dries."),
      p("Professional cleaners call this movement wicking. However, a returning mark is not always the original stain. Detergent residue, a water ring, browning, or permanent colour damage can look similar, so it is important to understand the cause before treating the area again."),

      h2("Why Couch Stains Reappear After Drying"),
      p("A sofa cushion contains more than the fabric you can see. Beneath the surface there may be backing, batting, foam, and other absorbent materials. If a spill reaches those layers, cleaning only the top may improve the appearance without removing all of the contamination."),
      p("While the fabric is wet, the stain may be difficult to see. As moisture evaporates, dissolved material can move toward the surface and settle there. The final result should therefore be judged only after the upholstery is fully dry."),

      h2("What Is Wicking in Upholstery?"),
      p("Wicking is the movement of moisture through a material. In upholstery, it can carry dissolved soil or residue from deeper layers back into the visible fabric during drying."),
      p("For example, a drink may soak through the face fabric and into the cushion. A home cleaning attempt removes the visible mark but leaves some of the spill below. As the cushion dries, that remaining material moves upward and the stain becomes visible again."),
      p("Wicking is more likely when a cushion is heavily soaked, the contamination has penetrated deeply, or the upholstery dries slowly."),

      h2("Why the Returning Stain May Look Bigger"),
      p("Adding cleaner and water increases the wet area around the original spill. Moisture can spread sideways through the fabric or absorbent layers before it moves back toward the surface. When everything dries, the new mark may cover a wider area than the original stain."),
      p("Circular scrubbing can make this worse by moving contamination beyond the original edge. A visible ring may form where moisture or residue collected as the area dried."),

      h2("Other Reasons a Mark Returns"),
      h3("Cleaning-product residue"),
      p("Detergent left in the fibres can make the area feel stiff, sticky, or different from the surrounding fabric. Residue may also attract soil, causing the cleaned spot to become dirty again more quickly."),
      h3("A water ring"),
      p("A water ring is an outline left by uneven wetting or drying. It may contain moved soil, dissolved material from the upholstery, or cleaning residue. Although it can resemble wicking, the treatment may be different."),
      h3("Cellulosic browning"),
      p("Natural and cellulosic fibres can sometimes develop yellow or brown discoloration after excessive moisture, unsuitable chemistry, or slow drying. This is more common in materials such as cotton, linen, rayon, and viscose."),
      h3("Colour loss or fabric damage"),
      p("If a cleaner affects the dye or fibre, the remaining mark may not be a stain at all. A lighter patch, changed texture, or rough surface can indicate permanent material damage rather than contamination that can be washed away."),

      h2("Does Slow Drying Make Stains More Likely to Return?"),
      p("Slow drying gives moisture more time to move through the cushion and carry dissolved material with it. Heavy saturation, high humidity, poor ventilation, and limited airflow can all extend the drying time."),
      p("Faster drying does not replace proper cleaning, but controlled moisture and good airflow reduce the opportunity for wicking. Professional cleaners may use air movers and additional extraction passes to remove moisture without adding more water."),

      h2("What to Do When a Couch Stain Comes Back"),
      number("Let the upholstery dry completely. A damp area may look darker even when it is clean."),
      number("Do not immediately add another product. More chemistry and moisture can make the cause harder to identify."),
      number("Look at the mark's shape, colour, and texture. Note whether it is larger, lighter, darker, sticky, stiff, or ring-shaped."),
      number("Write down what was spilled and every product used on the area."),
      number("Check the furniture's cleaning code before attempting another treatment."),
      number("Stop if colour transfers to a towel or the fabric changes in texture or appearance."),

      h2("Can You Clean the Returning Stain Again Yourself?"),
      p("A second careful attempt may be reasonable when the care label permits the method, the fabric is a durable synthetic, the original spill was small, and no colour or texture change is present. Test first and avoid soaking the cushion."),
      p("Professional assessment is safer when the stain is large, has reached the foam, keeps returning, has a strong odour, or appears on delicate or valuable upholstery. It is also wise to stop if several products have already been applied."),

      h2("How Professional Upholstery Cleaning Addresses Wicking"),
      p("A professional cleaner first considers the fabric, cushion construction, type of contamination, and previous cleaning attempts. The goal is to loosen the right material without creating unnecessary moisture or damaging the upholstery."),
      p("Controlled rinsing and extraction can recover dissolved soil, cleaning residue, and moisture from below the surface. Additional dry extraction passes and airflow may then help the cushion dry more evenly. Deep contamination can still require more than one treatment, and permanent colour loss cannot be restored through cleaning alone."),

      h2("Couch-Stain Help in Mississauga and the GTA"),
      p("SoftNest Fabric Care cleans sofas and upholstery throughout Mississauga and the Greater Toronto Area. If a stain has returned, send us a clear photo, a photo of the care label, and a list of any products already used. Those details help us assess whether the problem is likely to be wicking, residue, a water mark, or fabric damage."),

      h2("Frequently Asked Questions"),
      h3("Why did my couch stain disappear and then come back?"),
      p("Some contamination may have remained below the surface and moved upward as the cushion dried. This process is commonly called wicking."),
      h3("Why did a ring appear after I cleaned my sofa?"),
      p("Uneven wetting, excess moisture, moved soil, or detergent residue can collect around the edge of the treated area and leave a visible ring."),
      h3("Should I clean the stain again immediately?"),
      p("No. Let the area dry fully and identify any colour or texture change before adding more cleaner or moisture."),
      h3("Why does the cleaned area feel stiff or sticky?"),
      p("Cleaning-product residue may remain in the fibres. Adding more detergent can make the problem worse."),
      h3("Can professional cleaning remove a stain that keeps returning?"),
      p("Professional rinsing and extraction can often improve stains caused by remaining soil or residue. Bleaching, dye loss, and permanent fibre damage may not be removable."),
      h3("How can I help prevent wicking?"),
      p("Avoid soaking the cushion, remove as much contamination and moisture as possible, and provide good airflow while the upholstery dries."),
    ],
  },

  "what-cleaning-solution-can-i-use-on-my-couch": {
    title: "What Cleaning Solution Can I Use on My Couch?",
    excerpt:
      "Choose a couch cleaning solution based on the fabric, cleaning code, and type of stain—and learn which common products require extra care.",
    blocks: [
      p("There is no single cleaning solution that is safe for every couch. The right choice depends on the upholstery fibre, the manufacturer's cleaning code, the type of stain, and whether the product can be removed properly afterward."),
      p("A cleaner that works well on a durable synthetic sectional may damage linen, viscose, wool, velvet, or unstable dyes. Before using any product, start with the couch and the stain—not the claims on the front of the bottle."),

      h2("Start With the Couch's Cleaning Code"),
      p("Look for the manufacturer's care label underneath a cushion or on the bottom of the furniture. Common upholstery cleaning codes include:"),
      li("W: A water-based cleaning method may be used."),
      li("S: A water-free solvent cleaning method is indicated."),
      li("WS or SW: Either water-based or solvent-based cleaning may be permitted."),
      li("X: Liquid cleaning products should not be used; vacuuming or professional care is generally recommended."),
      p("The code describes a general cleaning method. It does not confirm that every product in that category is safe, and it does not tell you how much moisture the cushion can handle."),

      h2("Why the Upholstery Fabric Matters"),
      p("Couches may be upholstered with polyester, nylon, olefin, cotton, linen, wool, rayon, viscose, or a blend of several fibres. Their dyes, backing, weave, and surface texture can also respond differently to moisture, chemistry, and agitation."),
      p("Durable synthetic fabrics are often easier to spot clean than natural or regenerated fibres. Cotton, linen, wool, rayon, viscose, and delicate velvet may be more prone to browning, water marks, colour movement, shrinkage, or texture changes."),
      p("Appearance alone is not enough to identify a safe product. Two beige couches can look similar while requiring completely different cleaning methods."),

      h2("Match the Cleaner to the Type of Stain"),
      p("Coffee, grease, urine, ink, makeup, food, blood, adhesive, and rust are chemically different problems. A product designed for oily soil may not be suitable for a protein-based stain, ink, or mineral discoloration."),
      p("The cleaner must be suitable for both the stain and the upholstery underneath it. If a treatment removes the stain but fades the dye or damages the texture, it has not produced a successful result."),

      h2("Are Common Household Cleaners Safe for Couches?"),
      h3("Dish soap"),
      p("Dish soap can loosen grease, but it is not automatically safe for every upholstery fabric. It is also easy to use too much. Unlike a plate, a sofa cushion cannot be rinsed thoroughly under running water, so detergent may remain in the fibres and attract new soil."),
      h3("Vinegar and baking soda"),
      p("These ingredients are popular in DIY cleaning advice, but natural does not mean universally safe. Vinegar is acidic and baking soda is alkaline. Either product can affect sensitive fibres, dyes, or finishes, and combining them does not create a universal upholstery cleaner."),
      h3("Hydrogen peroxide"),
      p("Peroxide-based products can help with some stains, but they can also lighten upholstery dye. Suitability depends on the fabric, concentration, contact time, and type of stain. A result shown on another couch does not prove the product is safe for yours."),
      h3("Enzyme cleaners"),
      p("Enzyme products can help break down some organic contamination, including certain pet accidents. Check that the product is approved for your upholstery and remember that urine may have reached the batting or foam. Surface spraying may not address deeper contamination or odour."),
      h3("Carpet-cleaning solution"),
      p("Use a carpet cleaner on a sofa only when the product and machine are specifically approved for upholstery and the furniture's care instructions permit that method. Carpet and upholstery can have very different fibres, dyes, backing, and moisture limits."),

      h2("Why Stronger Cleaner Is Not Always Better"),
      p("Cleaning products are designed to work at a particular concentration. Making a solution stronger than the label recommends can increase the risk of residue, colour change, and fibre damage without improving the result."),
      p("If a careful first treatment does not help, the stain may need different chemistry—or the visible mark may be dye loss or permanent damage rather than removable soil. Scrubbing harder and adding stronger products can damage the surrounding fabric."),

      h2("Test Every New Product First"),
      p("Apply a small amount in a hidden area, following the product directions, and let it dry completely. Check the test spot for colour transfer, fading, browning, a water mark, stiffness, or a change in texture."),
      p("A hidden test cannot guarantee that every part of the furniture will react in the same way, but it can reveal an obvious problem before you treat a visible seat or arm."),

      h2("Do Not Mix Couch Cleaning Products"),
      p("Layering different cleaners makes the chemistry less predictable and can create a safety risk. It also leaves a professional cleaner dealing with the original stain plus several unknown residues. If one careful treatment is not working, stop before trying another product."),

      h2("Remember That the Cleaner Must Be Removed"),
      p("Applying a cleaning solution is only part of the process. Once the product loosens contamination, the soil, cleaner, and moisture still need to leave the upholstery."),
      p("Heavy spraying followed by surface wiping can leave detergent and contamination inside the fabric or cushion. Professional upholstery cleaning uses controlled rinsing and extraction to recover those materials rather than allowing them to dry in place."),

      h2("A Simple Checklist Before Cleaning Your Couch"),
      number("Read the furniture's care label and cleaning code."),
      number("Identify the upholstery fibre if possible."),
      number("Consider what caused the stain and how deeply it may have soaked in."),
      number("Confirm that the product is intended for the permitted upholstery-cleaning method."),
      number("Follow the stated dilution and safety directions."),
      number("Test a hidden area and let it dry completely."),
      number("Use as little product and moisture as the task requires."),
      number("Have a safe way to remove loosened soil and cleaner afterward."),

      h2("When to Call a Professional Upholstery Cleaner"),
      p("Professional advice is worth considering when the fabric is delicate or unknown, the furniture has an X code, the stain has reached the foam, several products have already been used, or the treated area is changing colour or texture."),
      p("SoftNest Fabric Care provides couch and upholstery cleaning in Mississauga and throughout the Greater Toronto Area. Send us a photo of the stain and care label, along with the names of any products used, so we can recommend a sensible next step."),

      h2("Frequently Asked Questions"),
      h3("What is the safest cleaner for a fabric couch?"),
      p("No single cleaner is safest for every couch. Follow the manufacturer's care instructions, choose a product intended for that cleaning method, and test it in a hidden area."),
      h3("What does W mean on a couch-cleaning tag?"),
      p("W means a water-based cleaning method may be used. It does not mean every water-based product is safe or that the upholstery should be soaked."),
      h3("Can I use dish soap on my couch?"),
      p("Dish soap is not suitable for every fabric and can leave residue when too much is used. Check the furniture and product instructions before applying it."),
      h3("Is vinegar safe for upholstery?"),
      p("Not for every material. Acidic products and moisture can affect sensitive fibres and dyes, so follow the manufacturer's advice and test first."),
      h3("Can hydrogen peroxide remove couch stains?"),
      p("It can help with certain stains, but it may also lighten the upholstery dye. Do not treat it as a universal stain remover."),
      h3("What if my couch has no cleaning tag?"),
      p("Use extra caution if you cannot identify the fabric or its care instructions. For delicate, expensive, or heavily stained furniture, a professional assessment is safer than experimenting."),
    ],
  },
};

const seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));

function portableBlock(item, index, oldImages) {
  if (item.style === "image") {
    const image = oldImages.find((candidate) =>
      candidate.localPath?.includes(item.text),
    );
    if (!image) throw new Error(`Missing retained image: ${item.text}`);
    return { ...image, _key: `image-${index}` };
  }
  return {
    _type: "block",
    _key: `text-${index}`,
    style: item.style,
    markDefs: [],
    children: [{ _type: "span", _key: "text", text: item.text, marks: [] }],
    ...(item.listItem ? { listItem: item.listItem, level: 1 } : {}),
  };
}

for (const [slug, revision] of Object.entries(articles)) {
  const folder = `${articleRoot}/${slug}`;
  const oldPost = JSON.parse(fs.readFileSync(`${folder}/post.json`, "utf8"));
  const oldImages = oldPost.body.filter((item) => item._type === "image");
  const body = revision.blocks.map((item, index) =>
    portableBlock(item, index, oldImages),
  );
  const post = {
    ...oldPost,
    title: revision.title,
    seoTitle: `${revision.title} | SoftNest`,
    excerpt: revision.excerpt,
    seoDescription: revision.excerpt,
    body,
    ...(oldPost.coverImage
      ? {
          coverImage:
            body.find(
              (item) =>
                item._type === "image" &&
                item.localPath?.includes("controlled-sofa-extraction"),
            ) || oldPost.coverImage,
        }
      : {}),
  };
  fs.writeFileSync(`${folder}/post.json`, `${JSON.stringify(post, null, 2)}\n`);
  const plainText = body
    .filter((item) => item._type === "block")
    .map((item) => item.children.map((child) => child.text).join(""))
    .join("\n\n");
  fs.writeFileSync(`${folder}/article.txt`, `${plainText}\n`);

  const seedIndex = seed.findIndex(
    (item) => item._type === "post" && item.slug?.current === slug,
  );
  if (seedIndex < 0) throw new Error(`Missing article in seed: ${slug}`);
  seed[seedIndex] = post;

  const readme = `# ${revision.title}\n\nEditorial source for the professional, plain-English revision. The original received draft remains preserved in the ignored dated inbox.\n\nURL: /blog/${slug}/\n\n${oldImages.length ? "Five supplied images remain placed in the article body. The cover image is used for the article card only.\n" : "Text-only article; no cover or inline images.\n"}`;
  fs.writeFileSync(`${folder}/README.md`, `${readme}\n`);
}

fs.writeFileSync(seedPath, `${JSON.stringify(seed, null, 2)}\n`);
console.log("Rewrote three articles and synchronized their migration records.");
