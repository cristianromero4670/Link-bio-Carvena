/* CARVENA — enlaces centralizados para facilitar futuros cambios. */
const LINKS = {
  menu: "assets/menu-carvena.pdf",
  reservation: "https://wa.me/523334401647",

  /* Google Maps / reseñas */
  mapsLocation: "https://g.page/r/Ce-PgtqSCWNdEAE/review",
  mapsReview: "https://g.page/r/Ce-PgtqSCWNdEAE/review",

  /* Redes sociales */
  tiktok: "https://www.tiktok.com/@carvena_horno?_r=1&_t=ZS-9A5b5WzXrRX",
  facebook: "https://www.facebook.com/share/19Kzio41ys/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/carvena_horno?stkn=MW83YnByMWtqeTQ5bA%3D%3D&utm_source=qr"
};

document.querySelectorAll("[data-link]").forEach((link) => {
  const key = link.dataset.link;
  const url = LINKS[key];

  if (!url) return;

  link.href = url;

  if (url.startsWith("#REEMPLAZAR")) {
    link.addEventListener("click", (event) => event.preventDefault());
    link.setAttribute(
      "aria-label",
      `${link.textContent.trim()} — enlace pendiente de configurar`
    );
  }
});

requestAnimationFrame(() => {
  document.body.classList.add("is-ready");
});


/* Carrusel de la sección de reseñas */
const carousel = document.querySelector(".carousel");

if (carousel) {
  const slides = [...carousel.querySelectorAll(".carousel__slide")];
  const dots = [...carousel.querySelectorAll(".carousel__dot")];
  const previousButton = carousel.querySelector(".carousel__control--prev");
  const nextButton = carousel.querySelector(".carousel__control--next");
  let currentSlide = 0;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentSlide);
    });

    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === currentSlide;
      dot.classList.toggle("is-active", active);
      dot.toggleAttribute("aria-current", active);
    });
  };

  previousButton.addEventListener("click", () => showSlide(currentSlide - 1));
  nextButton.addEventListener("click", () => showSlide(currentSlide + 1));

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  let touchStartX = 0;

  carousel.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  carousel.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) < 45) return;
    showSlide(currentSlide + (distance < 0 ? 1 : -1));
  }, { passive: true });
}
