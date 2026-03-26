document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.content-card');
  if (!card) return;

  card.animate(
    [
      { opacity: 0, transform: 'translateY(14px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    {
      duration: 550,
      easing: 'ease-out',
      fill: 'both',
    },
  );
});