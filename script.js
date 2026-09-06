const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");
const dialog = document.querySelector("[data-lightbox-dialog]");
const dialogImage = document.querySelector("[data-lightbox-image]");
const closeButton = document.querySelector("[data-lightbox-close]");

const onScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.getAttribute("data-lightbox");
    const img = button.querySelector("img");
    dialogImage.src = src;
    dialogImage.alt = img ? img.alt : "";
    dialog.showModal();
  });
});

closeButton.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

const slider = document.querySelector("[data-hero-slider]");
if (slider) {
  const slides = [...slider.querySelectorAll("[data-slide]")];
  const dotsWrap = slider.querySelector("[data-hero-dots]");
  const prevBtn = slider.querySelector("[data-hero-prev]");
  const nextBtn = slider.querySelector("[data-hero-next]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "hero-dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", `Zdjęcie ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = [...dotsWrap.querySelectorAll(".hero-dot")];

  const goTo = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    restart();
  };

  const restart = () => {
    clearInterval(timer);
    if (!reduceMotion) {
      timer = setInterval(() => goTo(index + 1), 3500);
    }
  };

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", restart);

  restart();
}
