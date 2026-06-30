const basePath = document.body.dataset.base || "";
const slug = document.body.dataset.hotelSlug;
const hotel = getHotelBySlug(slug);

function asset(path) {
  return `${basePath}${path}`;
}

function page(path) {
  return `${basePath}${path}`;
}

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
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
    { threshold: 0.16 }
  );

  reveals.forEach((node) => observer.observe(node));
}

function renderFooterHotels() {
  const footerLinks = document.querySelector("#footer-hotel-links");
  if (!footerLinks) return;

  footerLinks.innerHTML = hotels
    .map((item) => `<a href="${page(`hotels/${item.slug}.html`)}">${item.name}</a>`)
    .join("");
}

function renderHotelPage() {
  if (!hotel) {
    document.body.innerHTML = "<main class='section'><h1>Hotel not found</h1><p>Please return to the H&H Hotels homepage.</p></main>";
    return;
  }

  document.title = `${hotel.name} | H&H Hotels`;
  const heroImage = document.querySelector("#hotel-hero-image");
  if (heroImage) {
    heroImage.src = asset(hotel.images[0]);
    heroImage.alt = hotel.name;
  }

  setText("#hotel-location", hotel.location);
  setText("#hotel-title", hotel.name);
  setText("#hotel-summary", hotel.summary);
  setText("#hotel-description", hotel.longDescription);
  setText("#hotel-type", hotel.type);
  setText("#hotel-folder", hotel.folder);

  const bookingLinks = document.querySelectorAll("[data-booking-link]");
  bookingLinks.forEach((link) => {
    link.href = hotel.bookingUrl;
  });

  const highlights = document.querySelector("#hotel-highlights");
  if (highlights) {
    highlights.innerHTML = hotel.highlights.map((item) => `<li>${item}</li>`).join("");
  }

  const gallery = document.querySelector("#hotel-gallery");
  if (gallery) {
    gallery.innerHTML = hotel.images
      .map((image, index) => `
        <figure class="reveal">
          <img src="${asset(image)}" alt="${hotel.name} image ${index + 1}" loading="lazy">
        </figure>
      `)
      .join("");
  }

  const related = document.querySelector("#related-hotels");
  if (related) {
    related.innerHTML = hotels
      .filter((item) => item.slug !== hotel.slug)
      .slice(0, 3)
      .map((item) => `
        <a class="mini-card reveal" href="${page(`hotels/${item.slug}.html`)}">
          <img src="${asset(item.images[0])}" alt="${item.name}" loading="lazy">
          <div>
            <p class="section-kicker">${item.location}</p>
            <h3>${item.name}</h3>
            <p>${item.type}</p>
          </div>
        </a>
      `)
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderHotelPage();
  renderFooterHotels();
  setHeaderBehavior();
  setRevealAnimations();
});
