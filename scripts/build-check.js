const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { hotels } = require("../data/hotels.js");

const root = path.resolve(__dirname, "..");

const requiredFiles = [
  "index.html",
  "hotels/index.html",
  "about/index.html",
  "careers/index.html",
  "contact/index.html",
  "data/hotels.js",
  "assets/js/site.js",
  "styles.css",
  "favicon/favicon.ico",
  "sitemap.xml",
  "robots.txt"
];

for (const hotel of hotels) {
  requiredFiles.push(`hotels/${hotel.slug}/index.html`);
  requiredFiles.push(`hotels/${hotel.slug}.html`);
}

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

for (const file of ["data/hotels.js", "assets/js/site.js", "scripts/build-site.js"]) {
  new vm.Script(fs.readFileSync(path.join(root, file), "utf8"), { filename: file });
}

const htmlFiles = [
  "index.html",
  "hotels/index.html",
  "about/index.html",
  "careers/index.html",
  "contact/index.html",
  ...hotels.flatMap((hotel) => [`hotels/${hotel.slug}/index.html`, `hotels/${hotel.slug}.html`])
];

const bannedVisibleCopy = [
  ["place", "holder"].join(""),
  ["ratings", " shown here"].join(""),
  ["average", " guest rating"].join(""),
  ["UK", " locations map"].join(""),
  ["add", " a live map"].join(""),
  ["managed", " with group-level ambition"].join(""),
  ["corporate", ", clean and image-led"].join("")
];

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  for (const banned of bannedVisibleCopy) {
    if (html.toLowerCase().includes(banned.toLowerCase())) {
      throw new Error(`${file} contains banned visible copy: ${banned}`);
    }
  }
}

const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
const expectedHomepageText = [
  "Discover Characterful Hotels Across the UK",
  "From coastal escapes to city stays, H&H Hotels brings together welcoming properties in memorable locations.",
  "Explore our hotels",
  "Why book with H&amp;H Hotels?",
  "Guest confidence"
];

for (const text of expectedHomepageText) {
  if (!homepage.includes(text)) {
    throw new Error(`Homepage is missing expected text: ${text}`);
  }
}

const homepageCardCount = (homepage.match(/class="hotel-card"/g) || []).length;
if (homepageCardCount < hotels.length) {
  throw new Error(`Homepage only contains ${homepageCardCount} hotel cards.`);
}

console.log("Static build check passed.");
