function setHeader() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-navigation");

  if (header) {
    const updateHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  if (!toggle || !nav) return;

  const closeMenu = () => {
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = !document.body.classList.contains("nav-open");
    document.body.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function setHeroCarousel() {
  const carousel = document.querySelector("[data-hero-carousel]");
  if (!carousel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const slides = Array.from(carousel.querySelectorAll(".hero-slide"));
  if (slides.length < 2) return;

  let current = 0;

  window.setInterval(() => {
    slides[current].classList.remove("is-active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("is-active");
  }, 1500);
}

function applyFilter(section, filter) {
  const cards = Array.from(section.querySelectorAll(".hotel-card"));
  const emptyState = section.querySelector("[data-empty-state]");
  const tabs = Array.from(section.querySelectorAll(".tab-button"));
  let visibleCount = 0;

  tabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.filter === filter);
    tab.setAttribute("aria-selected", String(tab.dataset.filter === filter));
  });

  cards.forEach((card) => {
    const isVisible = filter === "All" || card.dataset.category === filter;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (emptyState) {
    emptyState.hidden = visibleCount > 0;
  }
}

function setHotelFilters() {
  const sections = Array.from(document.querySelectorAll(".hotels-section"));
  if (!sections.length) return;

  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get("category");

  sections.forEach((section, index) => {
    const initialFilter = index === 0 && initialCategory ? initialCategory : "All";
    applyFilter(section, initialFilter);

    section.addEventListener("click", (event) => {
      const tab = event.target.closest(".tab-button");
      const reset = event.target.closest("[data-filter-reset]");

      if (tab) {
        applyFilter(section, tab.dataset.filter);
      }

      if (reset) {
        applyFilter(section, "All");
      }
    });
  });
}

function setStickyBooking() {
  const sticky = document.querySelector(".sticky-booking");
  const hero = document.querySelector(".hotel-detail-hero");
  if (!sticky || !hero) return;

  const updateSticky = () => {
    const shouldShow = window.innerWidth <= 640 && window.scrollY > hero.offsetHeight - 120;
    sticky.classList.toggle("is-visible", shouldShow);
  };

  updateSticky();
  window.addEventListener("scroll", updateSticky, { passive: true });
  window.addEventListener("resize", updateSticky);
}

document.addEventListener("DOMContentLoaded", () => {
  setHeader();
  setHeroCarousel();
  setHotelFilters();
  setStickyBooking();
});
