const fs = require("fs");
const vm = require("vm");

const requiredFiles = [
  "index.html",
  "data.js",
  "app.js",
  "hotel.js",
  "styles.css",
  "favicon/favicon.ico"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

for (const file of ["data.js", "app.js", "hotel.js"]) {
  new vm.Script(fs.readFileSync(file, "utf8"), { filename: file });
}

const html = fs.readFileSync("index.html", "utf8");
const expectedText = [
  "Discover Characterful Hotels Across the UK",
  "Explore Our Hotels",
  "Why Book With H&H Hotels?",
  "Book Your Stay"
];

for (const text of expectedText) {
  if (!html.includes(text)) {
    throw new Error(`Homepage is missing expected text: ${text}`);
  }
}

console.log("Static build check passed.");
