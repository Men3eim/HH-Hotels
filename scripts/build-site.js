const fs = require("fs");
const path = require("path");
const { hotels, categories } = require("../data/hotels.js");

const SITE_URL = "https://www.hh-hotels.com";
const ROOT = path.resolve(__dirname, "..");
const FALLBACK_IMAGE = "Logo/Logo.jpeg";
const PHONE_DISPLAY = "020 8152 9133";
const PHONE_TEL = "+442081529133";
const ASSET_VERSION = "20260701a";

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(path.join(ROOT, filePath)), { recursive: true });
}

function write(filePath, content) {
  ensureDir(filePath);
  fs.writeFileSync(path.join(ROOT, filePath), content);
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(value = "") {
  return escapeHtml(value)
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function encodeAsset(assetPath = "") {
  return `/${assetPath.split("/").map((segment) => encodeURIComponent(segment)).join("/")}`;
}

function fullAssetUrl(assetPath = "") {
  return `${SITE_URL}${encodeAsset(assetPath)}`;
}

function hotelUrl(hotel) {
  return `/hotels/${hotel.slug}/`;
}

function legacyHotelFile(hotel) {
  return `hotels/${hotel.slug}.html`;
}

function cleanHotelFile(hotel) {
  return `hotels/${hotel.slug}/index.html`;
}

function bookingButton(hotel, label = "Book Now", className = "btn btn-primary") {
  if (!hotel.bookingUrl) {
    return `<a class="${className}" href="${hotelUrl(hotel)}">${escapeHtml(label === "Book Now" ? "View Hotel" : label)}</a>`;
  }

  const ariaLabel = label === "Book Now" ? ` aria-label="Book ${escapeAttr(hotel.name)} on Booking.com"` : "";

  return `<a class="${className}" href="${escapeAttr(hotel.bookingUrl)}" target="_blank" rel="noopener"${ariaLabel}>${escapeHtml(label)}</a>`;
}

function viewButton(hotel, label = "View Hotel", className = "btn btn-secondary") {
  return `<a class="${className}" href="${hotelUrl(hotel)}">${escapeHtml(label)}</a>`;
}

function sectionTitle({ kicker, title, lede, align = "" }) {
  return `
    <div class="section-title-group ${align ? `section-title-group--${align}` : ""}">
      ${kicker ? `<p class="kicker">${escapeHtml(kicker)}</p>` : ""}
      <h2>${escapeHtml(title)}</h2>
      ${lede ? `<p>${escapeHtml(lede)}</p>` : ""}
    </div>
  `;
}

function header(active = "") {
  const navItems = [
    ["Hotels", "/hotels/", "hotels"],
    ["About", "/about/", "about"],
    ["Careers", "/careers/", "careers"],
    ["Contact", "/contact/", "contact"]
  ];

  return `
    <header class="site-header" data-header>
      <a class="brand" href="/" aria-label="H&H Hotels home">
        <img src="/Logo/Logo.jpeg" alt="H&H Hotels logo" width="132" height="78">
        <span>H&H Hotels</span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-navigation">
        <span></span>
        <span></span>
      </button>
      <nav id="primary-navigation" class="main-nav" aria-label="Primary navigation">
        ${navItems.map(([label, href, key]) => `<a href="${href}"${active === key ? ` aria-current="page"` : ""}>${label}</a>`).join("")}
      </nav>
      <a class="header-booking btn btn-primary" href="/hotels/">Book Now</a>
    </header>
  `;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <img src="/Logo/Logo.jpeg" alt="H&H Hotels logo" width="132" height="78">
          <p>H&H Hotels brings together welcoming stays across memorable UK destinations, from coastal towns to city visits and country-town escapes.</p>
        </div>
        <div>
          <h2>Hotels</h2>
          <div class="footer-links footer-links--columns">
            ${hotels.map((hotel) => `<a href="${hotelUrl(hotel)}">${escapeHtml(hotel.name)}</a>`).join("")}
          </div>
        </div>
        <div>
          <h2>Pages</h2>
          <div class="footer-links">
            <a href="/hotels/">Explore Hotels</a>
            <a href="/about/">About</a>
            <a href="/careers/">Careers</a>
            <a href="/contact/">Contact</a>
          </div>
        </div>
        <div>
          <h2>Contact</h2>
          <div class="footer-links">
            <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a>
            <a href="mailto:hr@hh-hotels.co.uk">hr@hh-hotels.co.uk</a>
            <a href="/contact/">Guest enquiries</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} H&H Hotels</span>
        <span><a href="/contact/">Contact</a> <a href="/careers/">Careers</a> <a href="/hotels/">Book a stay</a></span>
      </div>
    </footer>
  `;
}

function layout({ title, description, active, path: pagePath, body, ogImage, jsonLd, preloadImage }) {
  const canonical = `${SITE_URL}${pagePath}`;
  const image = ogImage || fullAssetUrl(FALLBACK_IMAGE);
  const preload = preloadImage ? `<link rel="preload" as="image" href="${escapeAttr(encodeAsset(preloadImage))}" fetchpriority="high">` : "";
  const schema = jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeAttr(description)}">
    <link rel="canonical" href="${escapeAttr(canonical)}">
    <meta property="og:title" content="${escapeAttr(title)}">
    <meta property="og:description" content="${escapeAttr(description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${escapeAttr(canonical)}">
    <meta property="og:image" content="${escapeAttr(image)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="theme-color" content="#1E3A36">
    <link rel="icon" href="/favicon/favicon.ico" sizes="any">
    <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="manifest" href="/favicon/site.webmanifest">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
    ${preload}
    <link rel="stylesheet" href="/styles.css?v=${ASSET_VERSION}">
    ${schema}
  </head>
  <body>
    ${header(active)}
    ${body}
    ${footer()}
    <script src="/assets/js/site.js?v=${ASSET_VERSION}" defer></script>
  </body>
</html>
`;
}

function heroSlides() {
  const heroHotels = [
    hotels.find((hotel) => hotel.slug === "valley-of-rocks-hotel"),
    hotels.find((hotel) => hotel.slug === "beresford-hotel"),
    hotels.find((hotel) => hotel.slug === "amsterdam-hotel"),
    hotels.find((hotel) => hotel.slug === "green-gables-hotel"),
    hotels.find((hotel) => hotel.slug === "limes-hotel")
  ].filter(Boolean);

  return heroHotels.map((hotel, index) => `
    <img class="hero-slide${index === 0 ? " is-active" : ""}" src="${escapeAttr(encodeAsset(hotel.mainImage))}" alt="${escapeAttr(`${hotel.name} hospitality image`)}" decoding="async" ${index === 0 ? `fetchpriority="high"` : `loading="lazy"`}>
  `).join("");
}

function categoryTabs() {
  return `
    <div class="category-tabs" role="tablist" aria-label="Filter hotels by stay type">
      <button class="tab-button is-active" type="button" data-filter="All">All</button>
      ${categories.map((category) => `<button class="tab-button" type="button" data-filter="${escapeAttr(category)}">${escapeHtml(category)}</button>`).join("")}
    </div>
  `;
}

function hotelCard(hotel) {
  const amenities = hotel.amenities.slice(0, 3);

  return `
    <article class="hotel-card" data-category="${escapeAttr(hotel.category)}">
      <a class="hotel-card__image" href="${hotelUrl(hotel)}" aria-label="View ${escapeAttr(hotel.name)}">
        <img src="${escapeAttr(encodeAsset(hotel.mainImage))}" alt="${escapeAttr(`${hotel.name} in ${hotel.location}`)}" loading="lazy" decoding="async">
        <span>${escapeHtml(hotel.category)}</span>
      </a>
      <div class="hotel-card__body">
        <p class="hotel-location">${escapeHtml(hotel.location)}</p>
        <h3>${escapeHtml(hotel.name)}</h3>
        <p>${escapeHtml(hotel.shortDescription)}</p>
        <ul class="mini-amenities">
          ${amenities.map((amenity) => `<li>${escapeHtml(amenity)}</li>`).join("")}
        </ul>
        <div class="card-actions">
          ${viewButton(hotel)}
          ${bookingButton(hotel)}
        </div>
      </div>
    </article>
  `;
}

function hotelGrid(items = hotels) {
  return `
    <div class="hotel-grid" data-hotel-grid>
      ${items.map(hotelCard).join("")}
    </div>
    ${emptyState()}
  `;
}

function emptyState() {
  return `
    <div class="empty-state" data-empty-state hidden>
      <h3>No hotels match this filter yet.</h3>
      <p>Try another stay type to continue exploring the H&H Hotels collection.</p>
      <button class="btn btn-secondary" type="button" data-filter-reset>Show all hotels</button>
    </div>
  `;
}

function featuredHotel(hotel) {
  return `
    <section class="section featured-section" id="featured">
      <div class="featured-hotel">
        <div class="featured-hotel__media">
          <img src="${escapeAttr(encodeAsset(hotel.mainImage))}" alt="${escapeAttr(`${hotel.name} exterior and surroundings`)}" loading="lazy" decoding="async">
        </div>
        <div class="featured-hotel__content">
          <p class="kicker">Featured hotel</p>
          <h2>${escapeHtml(hotel.name)}</h2>
          <p class="hotel-location">${escapeHtml(hotel.location)}</p>
          <p>${escapeHtml(hotel.shortDescription)}</p>
          <ul class="feature-list">
            ${hotel.amenities.slice(0, 4).map((amenity) => `<li>${escapeHtml(amenity)}</li>`).join("")}
          </ul>
          <div class="section-actions">
            ${viewButton(hotel)}
            ${bookingButton(hotel)}
          </div>
        </div>
      </div>
    </section>
  `;
}

function categoryCard({ title, category, text, image, href }) {
  return `
    <article class="category-card">
      <img src="${escapeAttr(encodeAsset(image))}" alt="${escapeAttr(title)}" loading="lazy" decoding="async">
      <div>
        <span>${escapeHtml(category)}</span>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(text)}</p>
        <a href="${href}" class="text-link">Explore ${escapeHtml(category)}</a>
      </div>
    </article>
  `;
}

function whyBookSection() {
  const values = [
    ["Memorable UK Locations", "Coastal, city and country-town hotels across the UK."],
    ["Simple Booking Journey", "Explore each hotel and continue directly to booking."],
    ["Characterful Properties", "Hotels with local charm and individual personality."],
    ["Helpful Stay Information", "Clear location, amenities and booking details before you reserve."],
    ["Guest-Focused Experience", "Designed to help guests choose the right stay with confidence."]
  ];

  return `
    <section class="section why-section">
      ${sectionTitle({
        kicker: "Why book with H&H Hotels?",
        title: "A collection built around easy, confident stays.",
        lede: "Compare destinations, explore hotel details and continue to trusted booking partners when you are ready."
      })}
      <div class="trust-grid">
        ${values.map(([title, text], index) => trustCard(title, text, index)).join("")}
      </div>
    </section>
  `;
}

function trustCard(title, text, index) {
  return `
    <article class="trust-card">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(text)}</p>
    </article>
  `;
}

function guestConfidenceSection() {
  const points = ["Clear hotel information", "Direct booking links", "Helpful location details", "Mobile-friendly browsing"];

  return `
    <section class="section confidence-section">
      <div>
        <p class="kicker">Guest confidence</p>
        <h2>Everything you need before you book.</h2>
        <p>We make it simple to explore each hotel, check the location, view stay details and continue to trusted booking partners.</p>
      </div>
      <div class="confidence-points">
        ${points.map((point) => `<div><span></span>${escapeHtml(point)}</div>`).join("")}
      </div>
    </section>
  `;
}

function aboutPreview() {
  return `
    <section class="section split-section">
      <div>
        <p class="kicker">About H&H Hotels</p>
        <h2>A warm UK hotel collection with local character.</h2>
      </div>
      <div>
        <p>H&H Hotels brings together a collection of welcoming hotels across memorable UK destinations, from coastal towns to city stays and country-town escapes.</p>
        <a class="btn btn-secondary" href="/about/">About H&H Hotels</a>
      </div>
    </section>
  `;
}

function careersPreview() {
  return `
    <section class="section careers-preview">
      <div>
        <p class="kicker">Careers</p>
        <h2>Work with us.</h2>
        <p>Join our hotel teams across the UK and be part of a growing hospitality collection.</p>
      </div>
      <a class="btn btn-primary" href="/careers/">View Careers</a>
    </section>
  `;
}

function bookingPath() {
  const steps = [
    ["01", "Choose your setting", "Browse coastal, city and country-town hotels."],
    ["02", "View the hotel", "Open photos, amenities, location notes and stay details."],
    ["03", "Continue to booking", "Use the hotel booking link when you are ready to reserve."]
  ];

  return `
    <section class="booking-path" aria-label="Booking journey">
      ${steps.map(([number, title, text]) => `
        <div>
          <span>${number}</span>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(text)}</p>
        </div>
      `).join("")}
    </section>
  `;
}

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "H&H Hotels",
    url: SITE_URL,
    logo: fullAssetUrl(FALLBACK_IMAGE),
    description: "A collection of coastal, city and country-town hotels across the UK.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE_TEL,
      contactType: "customer service",
      email: "hr@hh-hotels.co.uk"
    }
  };
}

function homePage() {
  const featured = hotels.find((hotel) => hotel.slug === "valley-of-rocks-hotel") || hotels[0];
  const limes = hotels.find((hotel) => hotel.slug === "limes-hotel") || featured;
  const city = hotels.find((hotel) => hotel.category === "City") || featured;
  const coastal = featured;

  const body = `
    <main>
      <section class="home-hero" data-hero-carousel>
        <div class="hero-media">${heroSlides()}</div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <p class="kicker">H&H Hotels Collection</p>
          <h1>Discover Characterful Hotels Across the UK</h1>
          <p>From coastal escapes to city stays, H&H Hotels brings together welcoming properties in memorable locations.</p>
          <div class="hero-actions">
            <a class="btn btn-light" href="#hotels">Explore Hotels</a>
            <a class="btn btn-primary" href="/hotels/">Book Your Stay</a>
          </div>
          <div class="hero-stats" aria-label="Collection highlights">
            ${hotels.length === 12 ? `<div><strong>12 UK Hotels</strong><span>Across the collection</span></div>` : ""}
            <div><strong>Coastal, City &amp; Country Stays</strong><span>Choose your perfect setting</span></div>
            <div><strong>Easy Booking Links</strong><span>Continue to trusted partners</span></div>
          </div>
        </div>
      </section>
      ${bookingPath()}
      ${featuredHotel(featured)}
      <section class="section hotels-section" id="hotels">
        <div class="section-header-row">
          ${sectionTitle({
            kicker: "Explore our hotels",
            title: "Find the right H&H stay for your trip.",
            lede: "Browse the full collection, filter by stay style, then open each hotel for photos, amenities and booking options."
          })}
          <a class="btn btn-secondary section-header-action" href="/hotels/">View all hotels</a>
        </div>
        ${categoryTabs()}
        ${hotelGrid(hotels)}
      </section>
      <section class="section">
        ${sectionTitle({
          kicker: "Choose your stay",
          title: "Three ways to travel with H&H Hotels.",
          lede: "Whether you want sea air, city access or a calmer country-town base, the collection is designed around practical, welcoming stays."
        })}
        <div class="category-grid">
          ${categoryCard({
            title: "Coastal Escapes",
            category: "Coastal",
            text: "Sea air, promenade walks and classic UK seaside stays.",
            image: coastal.mainImage,
            href: "/hotels/?category=Coastal"
          })}
          ${categoryCard({
            title: "City Stays",
            category: "City",
            text: "Comfortable bases for work trips, events and easy urban exploring.",
            image: city.mainImage,
            href: "/hotels/?category=City"
          })}
          ${categoryCard({
            title: "Country-Town Hotels",
            category: "Country Town",
            text: "Quieter stays with access to local towns, routes and countryside.",
            image: limes.mainImage,
            href: "/hotels/?category=Country%20Town"
          })}
        </div>
      </section>
      ${whyBookSection()}
      ${guestConfidenceSection()}
      ${aboutPreview()}
      ${careersPreview()}
    </main>
  `;

  return layout({
    title: "H&H Hotels | Characterful Hotels Across the UK",
    description: "Explore H&H Hotels, a collection of coastal, city and country-town hotels across the UK.",
    active: "",
    path: "/",
    body,
    ogImage: fullAssetUrl(featured.mainImage),
    preloadImage: featured.mainImage,
    jsonLd: organizationSchema()
  });
}

function pageHero({ kicker, title, text, image }) {
  return `
    <section class="page-hero">
      <img src="${escapeAttr(encodeAsset(image))}" alt="" fetchpriority="high" decoding="async">
      <div class="page-hero__overlay"></div>
      <div class="page-hero__content">
        ${kicker ? `<p class="kicker">${escapeHtml(kicker)}</p>` : ""}
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(text)}</p>
      </div>
    </section>
  `;
}

function hotelsPage() {
  const hero = hotels.find((hotel) => hotel.slug === "beresford-hotel") || hotels[0];
  const body = `
    <main>
      ${pageHero({
        kicker: "Explore H&H Hotels",
        title: "Coastal, city and country-town stays across the UK.",
        text: "Choose a hotel, view the stay details and continue directly to the booking link when you are ready.",
        image: hero.mainImage
      })}
      <section class="section hotels-section">
        <div class="section-header-row">
          ${sectionTitle({
            kicker: "Hotel collection",
            title: "Browse all H&H Hotels.",
            lede: "Use the filters to narrow the collection by the type of stay you have in mind."
          })}
        </div>
        ${categoryTabs()}
        ${hotelGrid(hotels)}
      </section>
      ${whyBookSection()}
    </main>
  `;

  return layout({
    title: "Explore H&H Hotels | Coastal, City & Country-Town Hotels",
    description: "Browse H&H Hotels across coastal, city and country-town UK destinations.",
    active: "hotels",
    path: "/hotels/",
    body,
    ogImage: fullAssetUrl(hero.mainImage),
    preloadImage: hero.mainImage
  });
}

function amenityList(hotel) {
  return `
    <div class="amenity-grid">
      ${hotel.amenities.map((amenity) => `
        <article class="amenity-card">
          <span></span>
          <h3>${escapeHtml(amenity)}</h3>
        </article>
      `).join("")}
    </div>
  `;
}

function hotelGallery(hotel) {
  return `
    <div class="hotel-gallery">
      ${hotel.gallery.slice(0, 6).map((image, index) => `
        <figure>
          <img src="${escapeAttr(encodeAsset(image))}" alt="${escapeAttr(`${hotel.name} gallery image ${index + 1}`)}" loading="lazy" decoding="async">
        </figure>
      `).join("")}
    </div>
  `;
}

function similarHotels(hotel) {
  const sameCategory = hotels.filter((item) => item.slug !== hotel.slug && item.category === hotel.category);
  const fallback = hotels.filter((item) => item.slug !== hotel.slug);
  const items = (sameCategory.length ? sameCategory : fallback).slice(0, 3);

  return `
    <section class="section">
      ${sectionTitle({
        kicker: "Similar hotels",
        title: `More ${hotel.category.toLowerCase()} stays to explore.`,
        lede: "Continue browsing the collection and compare the stay that feels right for your trip."
      })}
      ${hotelGrid(items)}
    </section>
  `;
}

function hotelSchema(hotel) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    description: hotel.shortDescription,
    image: hotel.gallery.slice(0, 6).map(fullAssetUrl),
    url: `${SITE_URL}${hotelUrl(hotel)}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: hotel.location,
      addressCountry: "GB"
    },
    makesOffer: hotel.bookingUrl ? {
      "@type": "Offer",
      url: hotel.bookingUrl
    } : undefined
  };
}

function hotelDetailPage(hotel) {
  const body = `
    <main>
      <section class="hotel-detail-hero">
        <img src="${escapeAttr(encodeAsset(hotel.mainImage))}" alt="${escapeAttr(`${hotel.name} in ${hotel.location}`)}" fetchpriority="high" decoding="async">
        <div class="hotel-detail-hero__overlay"></div>
        <div class="hotel-detail-hero__content">
          <a class="breadcrumb" href="/hotels/">All hotels</a>
          <span class="category-pill">${escapeHtml(hotel.category)}</span>
          <h1>${escapeHtml(hotel.name)}</h1>
          <p class="hotel-location">${escapeHtml(hotel.location)}</p>
          <p>${escapeHtml(hotel.shortDescription)}</p>
          ${bookingButton(hotel, "Book Now", "btn btn-light")}
        </div>
      </section>
      <section class="section detail-overview">
        <div>
          <p class="kicker">Overview</p>
          <h2>About the stay</h2>
          <p>${escapeHtml(hotel.fullDescription)}</p>
        </div>
        <aside class="detail-panel">
          <h2>Key highlights</h2>
          <ul class="feature-list">
            ${hotel.amenities.map((amenity) => `<li>${escapeHtml(amenity)}</li>`).join("")}
          </ul>
          ${bookingButton(hotel)}
        </aside>
      </section>
      <section class="section">
        ${sectionTitle({
          kicker: "Gallery",
          title: `A closer look at ${hotel.name}.`,
          lede: "Browse hotel imagery to get a feel for the stay before continuing to booking."
        })}
        ${hotelGallery(hotel)}
      </section>
      <section class="section">
        ${sectionTitle({
          kicker: "Amenities",
          title: "Helpful stay highlights.",
          lede: "Practical details to help you choose the right stay."
        })}
        ${amenityList(hotel)}
      </section>
      <section class="section location-section">
        <div>
          <p class="kicker">Location</p>
          <h2>${escapeHtml(hotel.location)}</h2>
          ${hotel.locationText && hotel.locationText !== hotel.location ? `<p>${escapeHtml(hotel.locationText)}</p>` : `<p>Find ${escapeHtml(hotel.name)} in ${escapeHtml(hotel.location)} and use the map link for directions.</p>`}
        </div>
        <a class="btn btn-secondary" href="${escapeAttr(hotel.mapUrl)}" target="_blank" rel="noopener">Open in Google Maps</a>
      </section>
      <section class="section booking-cta">
        <div>
          <p class="kicker">Booking</p>
          <h2>Ready to book your stay?</h2>
          <p>Continue to the booking partner page for availability, room options and reservation details.</p>
        </div>
        ${bookingButton(hotel)}
      </section>
      ${similarHotels(hotel)}
    </main>
    ${hotel.bookingUrl ? `<a class="sticky-booking" href="${escapeAttr(hotel.bookingUrl)}" target="_blank" rel="noopener">Book Now</a>` : ""}
  `;

  return layout({
    title: `${hotel.name}, ${hotel.location} | H&H Hotels`,
    description: `Discover ${hotel.name} in ${hotel.location}. View stay details, amenities, location information and booking options.`,
    active: "hotels",
    path: hotelUrl(hotel),
    body,
    ogImage: fullAssetUrl(hotel.mainImage),
    jsonLd: hotelSchema(hotel),
    preloadImage: hotel.mainImage
  });
}

function aboutPage() {
  const hero = hotels.find((hotel) => hotel.slug === "green-gables-hotel") || hotels[0];
  const body = `
    <main>
      ${pageHero({
        kicker: "About H&H Hotels",
        title: "Welcoming hotels in memorable UK destinations.",
        text: "A growing collection shaped around simple booking, useful stay information and characterful places to spend the night.",
        image: hero.mainImage
      })}
      <section class="section split-section">
        <div>
          <p class="kicker">Our story</p>
          <h2>Hospitality with a local sense of place.</h2>
        </div>
        <div>
          <p>H&H Hotels brings together hotels across coastal towns, London neighbourhoods and quieter country-town settings. Each property has its own atmosphere, while the website gives guests a clear way to browse, compare and continue to booking.</p>
          <p>Our focus is straightforward: help guests understand each hotel, choose the location that suits their trip and move to reservation details without friction.</p>
          <a class="btn btn-primary" href="/hotels/">Explore Hotels</a>
        </div>
      </section>
      <section class="section">
        ${sectionTitle({
          kicker: "Hospitality values",
          title: "Warm, clear and guest-focused.",
          lede: "The collection is built around useful information, welcoming service and destinations that give each stay a sense of place."
        })}
        <div class="trust-grid trust-grid--four">
          ${[
            ["Local character", "Properties that feel connected to their destination."],
            ["Helpful details", "Clear hotel, location and booking information."],
            ["Welcoming teams", "Hospitality built around guests and everyday comfort."],
            ["Easy exploring", "One collection to browse before choosing your stay."]
          ].map(([title, text], index) => trustCard(title, text, index)).join("")}
        </div>
      </section>
      <section class="section collection-overview">
        <div>
          <strong>${hotels.length}</strong>
          <span>UK hotels</span>
        </div>
        <div>
          <strong>${categories.length}</strong>
          <span>Stay styles</span>
        </div>
        <div>
          <strong>Direct</strong>
          <span>Booking partner links</span>
        </div>
      </section>
      ${careersPreview()}
    </main>
  `;

  return layout({
    title: "About H&H Hotels | UK Hotel Collection",
    description: "Learn about H&H Hotels, a collection of welcoming hotels across coastal, city and country-town UK destinations.",
    active: "about",
    path: "/about/",
    body,
    ogImage: fullAssetUrl(hero.mainImage),
    preloadImage: hero.mainImage
  });
}

function careersPage() {
  const hero = hotels.find((hotel) => hotel.slug === "amsterdam-hotel") || hotels[0];
  const body = `
    <main>
      ${pageHero({
        kicker: "Careers",
        title: "Build your hospitality career with H&H Hotels.",
        text: "Join hotel teams across the UK and help create welcoming stays for guests in memorable destinations.",
        image: hero.mainImage
      })}
      <section class="section split-section">
        <div>
          <p class="kicker">Work with us</p>
          <h2>Hotel roles with real guest impact.</h2>
        </div>
        <div>
          <p>Our teams support the everyday details that shape a stay: warm welcomes, comfortable rooms, helpful local knowledge and smooth guest service.</p>
          <p>If you are interested in joining H&H Hotels, contact HR with your CV and the location or type of role you are looking for.</p>
          <a class="btn btn-primary" href="mailto:hr@hh-hotels.co.uk">Contact HR</a>
        </div>
      </section>
      <section class="section">
        ${sectionTitle({
          kicker: "Opportunities",
          title: "Teams across the hotel journey.",
          lede: "Roles vary by hotel, but these are the areas where hospitality careers commonly grow."
        })}
        <div class="trust-grid trust-grid--four">
          ${[
            ["Front of house", "Guest welcomes, reception support and day-to-day service."],
            ["Housekeeping", "Comfortable rooms, care standards and attention to detail."],
            ["Operations", "Supporting smooth hotel routines and practical guest needs."],
            ["Hotel leadership", "Team coordination, service quality and local hotel performance."]
          ].map(([title, text], index) => trustCard(title, text, index)).join("")}
        </div>
      </section>
      <section class="section contact-panel">
        <div>
          <p class="kicker">HR contact</p>
          <h2>Send your enquiry to our HR team.</h2>
          <p>Email your CV and preferred hotel location, or call if you need to speak to the team.</p>
        </div>
        <div class="contact-links">
          <a href="mailto:hr@hh-hotels.co.uk">hr@hh-hotels.co.uk</a>
          <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a>
          <a class="btn btn-primary" href="mailto:hr@hh-hotels.co.uk">Email HR</a>
        </div>
      </section>
    </main>
  `;

  return layout({
    title: "Careers at H&H Hotels | Work With Us",
    description: "Explore hospitality careers with H&H Hotels and contact HR about opportunities across the UK hotel collection.",
    active: "careers",
    path: "/careers/",
    body,
    ogImage: fullAssetUrl(hero.mainImage),
    preloadImage: hero.mainImage
  });
}

function contactPage() {
  const hero = hotels.find((hotel) => hotel.slug === "marine-parade-hotel") || hotels[0];
  const body = `
    <main>
      ${pageHero({
        kicker: "Contact H&H Hotels",
        title: "How can we help with your stay?",
        text: "For reservations, start with the hotel page and continue to its booking partner. For general questions, use the contact details below.",
        image: hero.mainImage
      })}
      <section class="section contact-grid">
        <article class="contact-card">
          <p class="kicker">Guest enquiries</p>
          <h2>General support</h2>
          <p>For questions about browsing the collection or choosing a hotel, call the H&H Hotels team.</p>
          <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a>
        </article>
        <article class="contact-card">
          <p class="kicker">Reservations</p>
          <h2>Booking support</h2>
          <p>Each hotel page includes a Book Now button that opens the hotel booking partner page for availability and reservation details.</p>
          <a href="/hotels/">Explore Hotels</a>
        </article>
        <article class="contact-card">
          <p class="kicker">Careers and HR</p>
          <h2>Work with us</h2>
          <p>For career enquiries, send your CV and preferred hotel location to the HR team.</p>
          <a href="mailto:hr@hh-hotels.co.uk">hr@hh-hotels.co.uk</a>
        </article>
      </section>
      <section class="section split-section">
        <div>
          <p class="kicker">Hotel-specific questions</p>
          <h2>Find the hotel first.</h2>
        </div>
        <div>
          <p>If your question is about a particular hotel, open that hotel page for location, stay details and the correct booking path.</p>
          <a class="btn btn-primary" href="/hotels/">Explore Hotels</a>
        </div>
      </section>
    </main>
  `;

  return layout({
    title: "Contact H&H Hotels | Guest Enquiries and Reservations",
    description: "Contact H&H Hotels for guest enquiries, booking support and careers information across the UK hotel collection.",
    active: "contact",
    path: "/contact/",
    body,
    ogImage: fullAssetUrl(hero.mainImage),
    preloadImage: hero.mainImage
  });
}

function sitemap() {
  const pages = [
    "/",
    "/hotels/",
    ...hotels.map(hotelUrl),
    "/about/",
    "/careers/",
    "/contact/"
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${SITE_URL}${page}</loc></url>`).join("\n")}
</urlset>
`;
}

function robots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function generate() {
  write("index.html", homePage());
  write("hotels/index.html", hotelsPage());
  write("about/index.html", aboutPage());
  write("careers/index.html", careersPage());
  write("contact/index.html", contactPage());
  write("sitemap.xml", sitemap());
  write("robots.txt", robots());

  hotels.forEach((hotel) => {
    const html = hotelDetailPage(hotel);
    write(cleanHotelFile(hotel), html);
    write(legacyHotelFile(hotel), html);
  });

  console.log(`Generated ${hotels.length} hotel pages and supporting routes.`);
}

generate();
