(() => {
  const root = document.querySelector('.simple-carousel');
  if (!root) return;

  const zoomFactor = Number(root.dataset.zoom || 2.2);
  const stages = root.querySelectorAll('.zoom-stage');

  // Enable only on mouse-like pointers (avoid weirdness on touch)
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function setZoom(stage, on) {
    stage.classList.toggle('is-zoomed', on);
    stage.style.setProperty('--zoom', on ? zoomFactor : 1);
    if (!on) {
      stage.style.setProperty('--bgx', '50%');
      stage.style.setProperty('--bgy', '50%');
    }
  }

  stages.forEach(stage => {
    // Initialize defaults
    stage.style.setProperty('--zoom', 1);
    stage.style.setProperty('--bgx', '50%');
    stage.style.setProperty('--bgy', '50%');

    if (!canHover) return;

    stage.addEventListener('mouseenter', () => setZoom(stage, true));
    stage.addEventListener('mouseleave', () => setZoom(stage, false));

    stage.addEventListener('mousemove', (e) => {
      const r = stage.getBoundingClientRect();

      // Mouse position as percentage inside the element
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;

      // Clamp so it never goes out of bounds
      const cx = Math.max(0, Math.min(100, x));
      const cy = Math.max(0, Math.min(100, y));

      stage.style.setProperty('--bgx', cx.toFixed(2) + '%');
      stage.style.setProperty('--bgy', cy.toFixed(2) + '%');
    }, { passive: true });
  });
})();