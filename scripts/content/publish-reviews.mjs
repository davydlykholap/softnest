import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

try {
  process.loadEnvFile(".env.local");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const apply = process.argv.includes("--apply");
const config = JSON.parse(fs.readFileSync("sanity.project.json", "utf8"));
const client = createClient({
  ...config,
  projectId: process.env.SANITY_PROJECT_ID || config.projectId,
  dataset: process.env.SANITY_DATASET || config.dataset,
  apiVersion: "2026-09-01",
  useCdn: false,
  perspective: "raw",
  token: process.env.SANITY_API_WRITE_TOKEN,
});

if (!client.config().token) {
  throw new Error("SANITY_API_WRITE_TOKEN is required to publish reviews.");
}

const googleProfileUrl = "https://maps.app.goo.gl/XHFbygUj49Suv9F48";
const reference = (id) => ({ _type: "reference", _ref: id });
const review = ({ id, name, text, order, locationPageFeatured = false, services = [], locations = [] }) => ({
  _id: `testimonial-google-${id}`,
  _type: "testimonial",
  name,
  text,
  rating: 5,
  order,
  featured: false,
  locationPageFeatured,
  publicationStatus: "approved",
  source: "Google",
  sourceUrl: googleProfileUrl,
  services: services.map(reference),
  locations: locations.map(reference),
});

const reviews = [
  review({
    id: "davyd",
    name: "Davyd",
    text: "The cleaning went smoothly and they did an amazing job cleaning a few of our loveseats and kitchen chairs at our home here in Mississauga. The chairs had accumulated some tough food spills and everyday dirt over time, but the team got all the stains right out. The price was very fair and the results look brand new. Highly recommend their upholstery cleaning service!",
    order: 7,
    locationPageFeatured: true,
    services: ["service-sofa-cleaning", "service-dining-chair-cleaning"],
    locations: ["location-mississauga"],
  }),
  review({
    id: "andrii-franchuk",
    name: "Andrii Франчук",
    text: "Really happy with the service. We had our sectional cleaned and it looks so much better now. There were a few stains we thought might not come out, but they did a great job. They were friendly, careful, and didn’t rush the work. Everything smelled fresh afterward and the sofa dried pretty quickly too. Would definitely recommend SoftNest Fabric Care if you need sofa cleaning in Mississauga.",
    order: 8,
    locationPageFeatured: true,
    services: ["service-sectional-furniture-cleaning"],
    locations: ["location-mississauga"],
  }),
  review({
    id: "volo-l",
    name: "Volo L",
    text: "One of the best services in Mississauga! They cleaned two of my sofas for $168, and they turned out way better than I expected. They got all the stains out. Very happy with the results and would definitely recommend them! Special thanks to Andrey for doing such a great job!",
    order: 9,
    locationPageFeatured: true,
    services: ["service-sofa-cleaning"],
    locations: ["location-mississauga"],
  }),
  review({
    id: "karen-jan",
    name: "Karen Jan",
    text: "If you have upholstered furniture that has seen better days, do yourself a favor and call Soft Nest Fabric Care immediately. I recently had them out to clean my sectional sofa, and the experience was exceptional from start to finish. They kept their word on punctuality down to the exact minute. They lifted years of everyday life right out of the fabric, leaving the sectional looking refreshed, vibrant, and incredibly clean without any harsh chemical smells. Professional, courteous, and undeniably skilled—Soft Nest Fabric Care has earned a customer for life!",
    order: 10,
    locationPageFeatured: true,
    services: ["service-sectional-furniture-cleaning"],
  }),
  review({
    id: "ivan-lykholap",
    name: "Ivan Lykholap",
    text: "Very good service, cleaned my most disgusting sofa that looks amazing.",
    order: 11,
    services: ["service-sofa-cleaning"],
  }),
  review({
    id: "hong-phuc-mai",
    name: "Hong Phuc Mai",
    text: "Very good service.",
    order: 12,
  }),
  review({
    id: "kathleen-costello",
    name: "Kathleen Costello",
    text: "I had a great experience having my couch cleaned today. Very professional and polite guys did a thorough cleaning. They were very careful to place their equipment on their own blankets and change into indoor shoes. No mess whatsoever. They also made sure everything was put back the way it was in the room when they were done. I was very impressed!",
    order: 13,
    locationPageFeatured: true,
    services: ["service-sofa-cleaning"],
  }),
  review({
    id: "john-wood",
    name: "John Wood",
    text: "Highly recommended! They did a fantastic job of cleaning my sofa. Very professional, good communication, great price.",
    order: 14,
    services: ["service-sofa-cleaning"],
  }),
  review({
    id: "laura-la-monica",
    name: "Laura La Monica",
    text: "They did such an amazing job with our couch that had so many toddler stains and our 10 yr old mattress looks brand new!",
    order: 15,
    services: ["service-sofa-cleaning", "service-mattress-cleaning"],
  }),
  review({
    id: "utsav-kohli",
    name: "Utsav Kohli",
    text: "I had a great experience with SoftNest Fabric Care. Andrew was professional, punctual, and did an excellent job cleaning our sofas and staircase carpet. The difference before and after the cleaning was amazing, and everything looked fresh and spotless. They took their time, paid attention to detail, and provided excellent customer service throughout the process. I highly recommend SoftNest Fabric Care to anyone looking for reliable and high-quality upholstery and carpet cleaning services.",
    order: 16,
    locationPageFeatured: true,
    services: ["service-sofa-cleaning", "service-stairs-hallways-cleaning"],
  }),
  review({
    id: "nicky-chaitu-curtis",
    name: "Nicky Chaitu-Curtis",
    text: "The team was able to accommodate my request to change the time, kept me informed and updated and did an awesome job.",
    order: 17,
  }),
  review({
    id: "natalia",
    name: "Natalia",
    text: "My sofa needed a good cleaning and they did an amazing job. Friendly, on time, and easy to deal with. Definitely recommend.",
    order: 18,
    services: ["service-sofa-cleaning"],
  }),
];

const ids = reviews.map((item) => item._id);
const existing = await client.fetch("*[_id in $ids]", { ids });
if (existing.length) {
  throw new Error(
    `Review IDs already exist; no changes made: ${existing.map((item) => item._id).join(", ")}`,
  );
}

if (!apply) {
  console.log(
    `Review check passed. ${reviews.length} approved Google review records would be created. No data was changed.`,
  );
  process.exit(0);
}

const backupDir = "content/backups";
fs.mkdirSync(backupDir, { recursive: true });
const backupPath = path.join(
  backupDir,
  `sanity-before-review-import-${new Date().toISOString().replace(/[:.]/g, "-")}.json`,
);
fs.writeFileSync(backupPath, `${JSON.stringify(existing, null, 2)}\n`);

let transaction = client.transaction();
for (const item of reviews) transaction = transaction.create(item);
await transaction.commit();
console.log(
  `Published ${reviews.length} approved Google review records. Backup: ${backupPath}`,
);
