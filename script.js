const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => observer.observe(item));

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".slider-dots button");
let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  if (!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
}

function startSlider() {
  if (!slides.length) return;
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(currentSlide + 1), 4200);
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.slide));
    startSlider();
  });
});
showSlide(0);
startSlider();

const sections = document.querySelectorAll("section[id], footer[id]");
const navLinks = document.querySelectorAll(".nav-menu a[href^='#']");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute("id");
    navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
  });
}, { rootMargin: "-45% 0px -45% 0px" });
sections.forEach((section) => sectionObserver.observe(section));
