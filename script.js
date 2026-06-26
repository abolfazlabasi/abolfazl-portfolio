// ─── TYPEWRITER ────────────────────────────────────────
const roles = [
  'Computer Engineering Student',
  'Web Developer',
  'HTML & CSS Enthusiast',
  'JavaScript Learner',
];
let roleIdx = 0, charIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const current = roles[roleIdx];
  if (deleting) {
    tw.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 40);
  } else {
    tw.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
    setTimeout(type, 75);
  }
}
type();


// ─── NAV SCROLL EFFECT ─────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


// ─── MOBILE MENU ───────────────────────────────────────
const toggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '64px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'var(--bg)';
  navLinks.style.padding = '16px 24px 24px';
  navLinks.style.gap = '18px';
  navLinks.style.borderBottom = '1px solid var(--border)';
  if (open) navLinks.style.display = 'none';
});

// close on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth < 768) navLinks.style.display = 'none';
  });
});


// ─── SCROLL REVEAL ─────────────────────────────────────
const observerOpts = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
    setTimeout(() => el.classList.add('visible'), delay);
    observer.unobserve(el);
  });
}, observerOpts);

document.querySelectorAll('.skill-card, .project-card').forEach(el => {
  observer.observe(el);
});


// ─── SMOOTH ACTIVE NAV ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));
