document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll if available
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 2. Real-Time Spotlight Mouse Coordinates on Cards
  const cards = document.querySelectorAll('.spotlight-card');
  document.addEventListener('mousemove', (e) => {
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 3. Interactive Hero Canvas (Fluid Particle Constellation)
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 22), 65);
    let mouse = { x: width / 2, y: height / 2, radius: 150 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.4 + 0.1
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse proximity reaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let alpha = p.baseAlpha;

        if (dist < mouse.radius) {
          alpha = p.baseAlpha + (1 - dist / mouse.radius) * 0.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 211, 153, ${alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d2x = p.x - p2.x;
          const d2y = p.y - p2.y;
          const d2 = Math.sqrt(d2x * d2x + d2y * d2y);

          if (d2 < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - d2 / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }
    animate();
  }

  // 4. Command Palette (Ctrl+K / Cmd+K)
  const cmdBackdrop = document.getElementById('cmd-palette-modal');
  const cmdInput = document.getElementById('cmd-palette-input');
  const cmdTrigger = document.getElementById('cmd-palette-btn');

  function openCmd() {
    if (!cmdBackdrop) return;
    cmdBackdrop.classList.add('active');
    setTimeout(() => cmdInput && cmdInput.focus(), 50);
  }

  function closeCmd() {
    if (!cmdBackdrop) return;
    cmdBackdrop.classList.remove('active');
    if (cmdInput) cmdInput.value = '';
  }

  if (cmdTrigger) {
    cmdTrigger.addEventListener('click', openCmd);
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdBackdrop && cmdBackdrop.classList.contains('active')) {
        closeCmd();
      } else {
        openCmd();
      }
    }
    if (e.key === 'Escape' && cmdBackdrop && cmdBackdrop.classList.contains('active')) {
      closeCmd();
    }
  });

  if (cmdBackdrop) {
    cmdBackdrop.addEventListener('click', (e) => {
      if (e.target === cmdBackdrop) closeCmd();
    });
  }

  // Filter in Command Palette
  if (cmdInput) {
    const items = document.querySelectorAll('.cmd-item');
    cmdInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase();
      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(val) ? 'flex' : 'none';
      });
    });
  }
});
