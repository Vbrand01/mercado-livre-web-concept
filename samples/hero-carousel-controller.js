/**
 * Hero carousel — manual control pattern (excerpt).
 * Autoplay is intentionally omitted; navigation is user-driven only.
 */
(function initHeroCarousel(root) {
  const slides = [...root.querySelectorAll("[data-hero-slide]")];
  const dotsHost = root.querySelector("[data-hero-dots]");
  if (!slides.length || !dotsHost) return;

  let index = 0;

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsHost.appendChild(dot);
    return dot;
  });

  function goTo(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.hidden = i !== index);
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  }

  root.querySelector("[data-hero-prev]")?.addEventListener("click", () => goTo(index - 1));
  root.querySelector("[data-hero-next]")?.addEventListener("click", () => goTo(index + 1));

  goTo(0);
})(document.querySelector("[data-hero-root]"));
