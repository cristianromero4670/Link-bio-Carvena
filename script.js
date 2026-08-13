const buttons = document.querySelectorAll('#menu-nav button');
const sections = document.querySelectorAll('.category');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    // scrollIntoView respeta scroll-margin-top del CSS, así que calcula
    // solo el offset correcto automáticamente (incluye el ajuste para
    // la barra sticky en móvil). El bug real era falta de espacio de
    // scroll al final de la página, ya resuelto en styles.css.
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const setActive = (id) => {
  buttons.forEach(b => b.classList.toggle('active', b.dataset.target === id));
  const activeBtn = document.querySelector(`#menu-nav button[data-target="${id}"]`);
  if (activeBtn && window.innerWidth <= 820) {
    activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActive(entry.target.id);
  });
}, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

sections.forEach(s => observer.observe(s));
