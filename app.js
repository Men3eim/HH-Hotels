const basePath = document.body.dataset.base || "";

const categoryMeta = {
  Coastal: {
    title: "Coastal Escapes",
    description: "Sea air, promenade walks and classic UK seaside stays.",
    imageHotelSlug: "valley-of-rocks-hotel"
  },
  City: {
    title: "City Stays",
    description: "Practical bases for work trips, events and easy urban exploring.",
    imageHotelSlug: "amsterdam-hotel"
  },
  "Country Town": {
    title: "Country-Town Hotels",
    description: "Quieter stays with access to local towns, routes and countryside.",
    imageHotelSlug: "limes-hotel"
  }
};

const trustItems = [
  {
    title: "Memorable UK locations",
    text: "Choose from coastal towns, city neighbourhoods and calmer country-town settings."
  },
  {
    title: "Comfortable stays",
    text: "Simple, welcoming hotels with practical rooms and clear information before you book."
  },
  {
    title: "Friendly hospitality",
    text: "Properties with local character and teams focused on making every stay feel easy."
  },
  {
    title: "Easy booking",
    text: "Each hotel page connects you directly to the Booking.com reservation path."
  },
  {
    title: "Trusted collection",
    text: "One place to browse H&H Hotels, compare stays and continue with confidence."
  }
];

// Replace these placeholder review/rating entries when live Google, Booking.com,
// or Tripadvisor review data is available for each property.
const testimonials = [
  {
    quote: "A welcoming stay in a great location. Easy to compare hotels and book the one that suited our trip.",
    author: "Guest review placeholder",
    source: "Booking.com rating placeholder"
  },
  {
    quote: "The hotel photos and location details made it simple to choose a seaside break.",
    author: "Guest review placeholder",
    source: "Google rating placeholder"
  },
  {
    quote: "Helpful team, comfortable room and a straightforward booking journey.",
    author: "Guest review placeholder",
    source: "Tripadvisor rating placeholder"
  }
];

function asset(path) {
  return `${basePath}${path}`;
}

function hotelUrl(slug) {
  return `${basePath}hotels/${slug}.html`;
}

function getHotelCategory(hotel) {
  if (hotel.category) return hotel.category;

  const text = `${hotel.type} ${hotel.location}`.toLowerCase();
  if (text.includes("london")) return "City";
  if (text.includes("country") || text.includes("market rasen")) return "Country Town";
  return "Coastal";
}

function getHotelBySlug(slug) {
  return hotels.find((hotel) => hotel.slug === slug);
}

function CTAButton({ href, label, variant = "primary", external = false }) {
  const target = external ? ` target="_blank" rel="noopener"` : "";
  return `<a class="btn btn-${variant}" href="${href}"${target}>${label}</a>`;
}

function SectionTitle({ kicker, title, lede = "" }) {
  return `
    <div class="section-heading">
      <p class="section-kicker">${kicker}</p>
      <h2 class="section-title">${title}</h2>
      ${lede ? `<p class="section-lede">${lede}</p>` : ""}
    </div>
  `;
}

function HotelCard(hotel) {
  const category = getHotelCategory(hotel);
  return `
    <article class="hotel-card reveal" data-category="${category}">
      <div class="hotel-card-image">
        <img src="${asset(hotel.images[0])}" alt="${hotel.name}" loading="lazy">
        <span class="hotel-tag">${category}</span>
      </div>
      <div class="hotel-card-content">
        <div class="hotel-card-meta">${hotel.location}</div>
        <h3>${hotel.name}</h3>
        <p>${hotel.summary}</p>
        <div class="card-actions">
          ${CTAButton({ href: hotelUrl(hotel.slug), label: "View Hotel", variant: "secondary" })}
          ${CTAButton({ href: hotel.bookingUrl, label: "Book Now", variant: "primary", external: true })}
        </div>
      </div>
    </article>
  `;
}

function CategoryCard(category) {
  const meta = categoryMeta[category];
  const imageHotel = getHotelBySlug(meta.imageHotelSlug) || hotels[0];
  return `
    <article class="category-card reveal" data-category-card="${category}">
      <img src="${asset(imageHotel.images[0])}" alt="${meta.title}" loading="lazy">
      <div>
        <span>${category}</span>
        <h3>${meta.title}</h3>
        <p>${meta.description}</p>
        <button class="text-link category-filter" type="button" data-filter="${category}">Explore ${category}</button>
      </div>
    </article>
  `;
}

function TrustCard(item, index) {
  return `
    <article class="trust-card reveal">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `;
}

function TestimonialCard(item) {
  return `
    <article class="testimonial-card reveal">
      <div class="rating-stars" aria-label="Rating placeholder">★★★★★</div>
      <p>“${item.quote}”</p>
      <strong>${item.author}</strong>
      <span>${item.source}</span>
    </article>
  `;
}

function FeaturedHotelCard(hotel) {
  const amenities = ["Characterful location", "Guest-focused stay", "Easy booking"];
  return `
    <article class="featured-hotel-card reveal">
      <div class="featured-hotel-media">
        <img src="${asset(hotel.images[0])}" alt="${hotel.name}">
      </div>
      <div class="featured-hotel-copy">
        ${SectionTitle({
          kicker: "Featured hotel",
          title: hotel.name,
          lede: `${hotel.location} / ${getHotelCategory(hotel)}`
        })}
        <p>${hotel.longDescription}</p>
        <ul class="amenity-list">
          ${amenities.map((amenity) => `<li>${amenity}</li>`).join("")}
        </ul>
        <div class="section-actions">
          ${CTAButton({ href: hotelUrl(hotel.slug), label: "View Hotel", variant: "secondary" })}
          ${CTAButton({ href: hotel.bookingUrl, label: "Book Now", variant: "primary", external: true })}
        </div>
      </div>
    </article>
  `;
}

function setHeaderBehavior() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
}

function setRevealAnimations() {
  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((node) => observer.observe(node));
}

function renderPortfolio(filter = "All Hotels") {
  const grid = document.querySelector("#hotel-grid");
  if (!grid) return;

  const filteredHotels = filter === "All Hotels"
    ? hotels
    : hotels.filter((hotel) => getHotelCategory(hotel) === filter);

  grid.innerHTML = filteredHotels.map(HotelCard).join("");
  setRevealAnimations();
}

function setHotelFilters() {
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.dataset.filter || "All Hotels";
      tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
      renderPortfolio(filter);
      document.querySelector("#hotels")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll(".category-filter").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "All Hotels";
      const tab = [...tabs].find((item) => item.dataset.filter === filter);
      tab?.click();
    });
  });
}

function renderFooterHotels() {
  const footerLinks = document.querySelector("#footer-hotel-links");
  if (!footerLinks) return;

  footerLinks.innerHTML = hotels
    .map((hotel) => `<a href="${hotelUrl(hotel.slug)}">${hotel.name}</a>`)
    .join("");
}

function renderFeaturedHeroImage() {
  const slideA = document.querySelector("#hero-image-a");
  const slideB = document.querySelector("#hero-image-b");
  const name = document.querySelector("#hero-current-name");
  const location = document.querySelector("#hero-current-location");
  const progress = document.querySelector("#hero-progress-bar");
  if (!slideA || !slideB) return;

  const heroHotels = hotels.filter((hotel) => hotel.images.length > 0).slice(0, 8);
  let currentIndex = 0;
  let activeSlide = slideA;
  let idleSlide = slideB;

  function updateSpotlight(hotel) {
    if (name) name.textContent = hotel.name;
    if (location) location.textContent = hotel.location;
  }

  function restartProgress() {
    if (!progress) return;
    progress.style.animation = "none";
    progress.offsetHeight;
    progress.style.animation = "";
  }

  function showHotel(index, isInitial = false) {
    const hotel = heroHotels[index];
    const image = asset(hotel.images[0]);

    idleSlide.src = image;
    idleSlide.alt = hotel.name;
    updateSpotlight(hotel);
    restartProgress();

    if (isInitial) {
      activeSlide.src = image;
      activeSlide.alt = hotel.name;
      return;
    }

    requestAnimationFrame(() => {
      idleSlide.classList.add("is-active");
      activeSlide.classList.remove("is-active");
      [activeSlide, idleSlide] = [idleSlide, activeSlide];
    });
  }

  showHotel(currentIndex, true);

  window.setInterval(() => {
    currentIndex = (currentIndex + 1) % heroHotels.length;
    showHotel(currentIndex);
  }, 1500);
}

function renderHomepageSections() {
  const featured = document.querySelector("#featured-hotel");
  if (featured) featured.innerHTML = FeaturedHotelCard(getHotelBySlug("valley-of-rocks-hotel") || hotels[0]);

  const categoryGrid = document.querySelector("#category-grid");
  if (categoryGrid) categoryGrid.innerHTML = Object.keys(categoryMeta).map(CategoryCard).join("");

  const trustGrid = document.querySelector("#trust-grid");
  if (trustGrid) trustGrid.innerHTML = trustItems.map(TrustCard).join("");

  const testimonialGrid = document.querySelector("#testimonial-grid");
  if (testimonialGrid) testimonialGrid.innerHTML = testimonials.map(TestimonialCard).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedHeroImage();
  renderHomepageSections();
  renderPortfolio();
  renderFooterHotels();
  setHotelFilters();
  setHeaderBehavior();
  setRevealAnimations();
});
