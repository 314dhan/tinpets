/* ── Page Load Orchestration ── */
function initPageLoad() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add('loaded');
    });
  });
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Navbar scroll class ── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ── Cursor Paw Trail (hero only) ── */
function initCursorTrail() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero = document.getElementById('hero');
  if (!hero) return;

  const PAW_SVG = `<svg viewBox="0 0 100 85" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="62" rx="22" ry="18"/>
    <ellipse cx="22" cy="40" rx="11" ry="13"/>
    <ellipse cx="78" cy="40" rx="11" ry="13"/>
    <ellipse cx="36" cy="26" rx="10" ry="12"/>
    <ellipse cx="64" cy="26" rx="10" ry="12"/>
  </svg>`;

  const pool = [];
  const MAX = 8;

  function createPaw(x, y) {
    const el = document.createElement('div');
    el.className = 'cursor-paw';
    el.innerHTML = PAW_SVG;
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    document.body.appendChild(el);

    requestAnimationFrame(() => el.classList.add('active'));

    const timer = setTimeout(() => {
      el.classList.add('fading');
      el.classList.remove('active');
      setTimeout(() => el.remove(), 600);
    }, 300);

    pool.push({ el, timer });
    if (pool.length > MAX) {
      const oldest = pool.shift();
      clearTimeout(oldest.timer);
      oldest.el.remove();
    }
  }

  let lastX = 0, lastY = 0, lastTime = 0;

  hero.addEventListener('mousemove', (e) => {
    const now = Date.now();
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 28 && now - lastTime > 60) {
      createPaw(e.clientX, e.clientY);
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    }
  });
}

/* ── Pricing Card 3D Tilt ── */
function initPricingTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    });
  });
}

/* ── Button Ripple ── */
function initButtonRipple() {
  document.querySelectorAll('.btn-primary, .btn-outline-light, .btn-light').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top  - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initPageLoad();
  initScrollReveal();
  initNavbar();
  initCursorTrail();
  initPricingTilt();
  initButtonRipple();
});
