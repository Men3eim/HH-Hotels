const basePath = document.body.dataset.base || "";

function asset(path) {
  return `${basePath}${path}`;
}

function hotelUrl(slug) {
  return `${basePath}hotels/${slug}.html`;
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

function renderPortfolio() {
  const grid = document.querySelector("#hotel-grid");
  if (!grid) return;

  grid.innerHTML = hotels
    .map((hotel) => {
      const cover = asset(hotel.images[0]);
      return `
        <article class="hotel-card reveal">
          <img src="${cover}" alt="${hotel.name}" loading="lazy">
          <div class="hotel-card-content">
            <div class="hotel-card-meta">${hotel.location} / ${hotel.type}</div>
            <h3>${hotel.name}</h3>
            <p>${hotel.summary}</p>
            <div class="card-actions">
              <a class="btn btn-light" href="${hotelUrl(hotel.slug)}">View hotel</a>
              <a class="btn btn-outline-light" href="${hotel.bookingUrl}" target="_blank" rel="noopener">Book with us</a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
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

function renderFeaturedImage() {
  const image = document.querySelector("#feature-image");
  if (!image) return;
  image.src = asset(hotels[6].images[0]);
  image.alt = hotels[6].name;
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedHeroImage();
  renderFeaturedImage();
  renderPortfolio();
  renderFooterHotels();
  setHeaderBehavior();
  setRevealAnimations();
});
