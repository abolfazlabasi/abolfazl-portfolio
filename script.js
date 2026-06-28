// ─── TRANSLATIONS ───────────────────────────────────────
const T = {
  en: {
    nav_about:'About', nav_exp:'Experience', nav_skills:'Skills',
    nav_projects:'Projects', nav_contact:'Contact',
    hero_eyebrow:'Hello, I\'m', hero_cv:'Download CV',
    hero_bio:'Computer Engineering student passionate about building clean, purposeful things for the web — from semantic HTML to interactive JavaScript.',
    hero_cta1:'View Projects', hero_cta2:'Get in Touch',
    about_title:'About Me',
    about_p1:'I\'m Abolfazl Abasi, a Computer Engineering student with a growing passion for web development. I enjoy turning ideas into real, working projects using HTML, CSS, JavaScript, and WordPress.',
    about_p2:'I\'m focused on learning modern web practices, writing clean code, and continuously improving my skills through hands-on projects.',
    exp_title:'Experience & Education', exp_sub:'My journey so far',
    exp1_title:'Computer Engineering — B.Sc.', exp1_desc:'Currently studying Computer Engineering, focusing on software development and web technologies.',
    exp2_title:'Freelance Web Developer', exp2_desc:'Building websites and WordPress projects for clients. Working with HTML, CSS, JavaScript and WordPress.',
    exp3_title:'Self-Taught Web Development', exp3_desc:'Completed multiple online courses in HTML, CSS, JavaScript and WordPress development.',
    skills_title:'Skills', skills_sub:'Technologies I work with',
    sk_html:'Semantic markup, accessibility, clean structure',
    sk_css:'Responsive layouts, Flexbox, Grid, animations',
    sk_js:'DOM manipulation, events, modern ES6+',
    sk_wp:'Themes, plugins, customization, CMS setup',
    proj_title:'Projects', proj_sub:'Pulled live from my GitHub',
    proj_loading:'Loading projects from GitHub…',
    contact_title:"Let's Connect",
    contact_sub:"I'm always open to collaborating on interesting projects or just talking about web development. Feel free to reach out.",
  },
  fa: {
    nav_about:'درباره', nav_exp:'تجربه', nav_skills:'مهارت‌ها',
    nav_projects:'پروژه‌ها', nav_contact:'تماس',
    hero_eyebrow:'سلام، من', hero_cv:'دانلود رزومه',
    hero_bio:'دانشجوی مهندسی کامپیوتر با علاقه‌ای فزاینده به توسعه وب — از HTML تا JavaScript.',
    hero_cta1:'مشاهده پروژه‌ها', hero_cta2:'تماس با من',
    about_title:'درباره من',
    about_p1:'ابوالفضل عباسی هستم، دانشجوی مهندسی کامپیوتر با علاقه زیاد به توسعه وب. از ایده‌ها پروژه‌های واقعی می‌سازم با HTML، CSS، JavaScript و WordPress.',
    about_p2:'تمرکزم روی یادگیری روش‌های مدرن وب، نوشتن کد تمیز و بهبود مستمر مهارت‌هام از طریق پروژه‌های عملی هست.',
    exp_title:'تجربه و تحصیلات', exp_sub:'مسیر من تا اینجا',
    exp1_title:'مهندسی کامپیوتر — کارشناسی', exp1_desc:'در حال تحصیل در رشته مهندسی کامپیوتر با تمرکز بر توسعه نرم‌افزار و فناوری‌های وب.',
    exp2_title:'توسعه‌دهنده وب فریلنسر', exp2_desc:'ساخت وب‌سایت و پروژه‌های وردپرسی برای مشتریان. کار با HTML، CSS، JavaScript و WordPress.',
    exp3_title:'یادگیری خودآموز توسعه وب', exp3_desc:'تکمیل چندین دوره آنلاین در HTML، CSS، JavaScript و توسعه وردپرس.',
    skills_title:'مهارت‌ها', skills_sub:'فناوری‌هایی که باهاشون کار می‌کنم',
    sk_html:'مارکاپ معنایی، دسترس‌پذیری، ساختار تمیز',
    sk_css:'طرح‌بندی واکنش‌گرا، Flexbox، Grid، انیمیشن',
    sk_js:'دستکاری DOM، رویدادها، ES6+ مدرن',
    sk_wp:'قالب‌ها، افزونه‌ها، سفارشی‌سازی، راه‌اندازی CMS',
    proj_title:'پروژه‌ها', proj_sub:'مستقیم از GitHub من',
    proj_loading:'در حال بارگذاری پروژه‌ها از GitHub…',
    contact_title:'ارتباط با من',
    contact_sub:'همیشه برای همکاری در پروژه‌های جالب یا صحبت درباره توسعه وب آماده‌ام.',
  }
};

let currentLang = localStorage.getItem('aa_lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('aa_lang', lang);
  document.documentElement.setAttribute('data-lang', lang);
  document.getElementById('langToggle').textContent = lang === 'en' ? 'FA' : 'EN';
  const dict = T[lang];
  document.querySelectorAll('[data-i]').forEach(el => {
    const key = el.dataset.i;
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  // Update typewriter roles
  roles = lang === 'fa'
    ? ['دانشجوی مهندسی کامپیوتر','توسعه‌دهنده وب','یادگیرنده JavaScript','علاقه‌مند HTML و CSS']
    : ['Computer Engineering Student','Web Developer','HTML & CSS Enthusiast','JavaScript Learner'];
}

// ─── TYPEWRITER ─────────────────────────────────────────
let roles = ['Computer Engineering Student','Web Developer','HTML & CSS Enthusiast','JavaScript Learner'];
let roleIdx = 0, charIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const current = roles[roleIdx];
  if (deleting) {
    tw.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx+1) % roles.length; setTimeout(type, 400); return; }
    setTimeout(type, 40);
  } else {
    tw.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; setTimeout(type, 1800); return; }
    setTimeout(type, 75);
  }
}
if (tw) type();

// ─── THEME ──────────────────────────────────────────────
let currentTheme = localStorage.getItem('aa_theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

document.getElementById('themeToggle').addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('aa_theme', currentTheme);
});

// ─── LANGUAGE TOGGLE ────────────────────────────────────
document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(currentLang === 'en' ? 'fa' : 'en');
});
applyLang(currentLang);

// ─── NAV SCROLL ─────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('backTop').classList.toggle('show', window.scrollY > 400);
}, { passive: true });

// ─── BACK TO TOP ────────────────────────────────────────
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── MOBILE MENU ────────────────────────────────────────
const toggle = document.getElementById('navToggle');
const navLinksList = document.querySelector('.nav-links');
let menuOpen = false;
toggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navLinksList.classList.toggle('mobile-open', menuOpen);
});
navLinksList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => { menuOpen = false; navLinksList.classList.remove('mobile-open'); });
});

// ─── SCROLL REVEAL ──────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
    setTimeout(() => {
      el.classList.add('visible');
      // Animate skill bars
      el.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
    }, delay);
    revealObserver.unobserve(el);
  });
}, { threshold: 0.1 });

function observeCards() {
  document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
    if (!el.classList.contains('visible')) revealObserver.observe(el);
  });
}
observeCards();

// ─── ACTIVE NAV ─────────────────────────────────────────
document.querySelectorAll('section[id]').forEach(s => {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.35 }).observe(s);
});

// ─── GITHUB PROJECTS ────────────────────────────────────
const GITHUB_USER = 'abolfazlabasi';
const CACHE_KEY   = 'gh_repos_v3';
const CACHE_TTL   = 24 * 60 * 60 * 1000;
const PINNED      = ['abolfazl-portfolio'];

function langColor(lang) {
  const map = { 'HTML':'#e34c26','CSS':'#563d7c','JavaScript':'#f1e05a','TypeScript':'#2b7489','Python':'#3572A5','PHP':'#4F5D95','Vue':'#41b883','C++':'#f34b7d','C':'#555555','Java':'#b07219' };
  return map[lang] || '#7A7A7A';
}
function timeAgo(dateStr) {
  const d = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (d === 0) return 'today';
  if (d === 1) return 'yesterday';
  if (d < 30) return `${d} days ago`;
  const m = Math.floor(d/30);
  if (m < 12) return `${m} month${m>1?'s':''} ago`;
  const y = Math.floor(m/12);
  return `${y} year${y>1?'s':''} ago`;
}

function buildCard(repo, index) {
  const isPinned = PINNED.includes(repo.name);
  const name     = repo.name.replace(/[-_]/g, ' ');
  const desc     = repo.description || 'No description provided.';
  const lang     = repo.language || '';
  const stars    = repo.stargazers_count || 0;
  const forks    = repo.forks_count || 0;
  const updated  = timeAgo(repo.updated_at);
  const thumb    = repo.homepage
    ? `<img src="https://api.microlink.io/?url=${encodeURIComponent(repo.homepage)}&screenshot=true&meta=false&embed=screenshot.url" class="project-thumb" alt="${name} preview" onerror="this.parentElement.innerHTML=\`<div class='project-thumb-placeholder'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1'><rect x='3' y='3' width='18' height='18' rx='2'/><circle cx='8.5' cy='8.5' r='1.5'/><polyline points='21 15 16 10 5 21'/></svg></div>\`" />`
    : `<div class="project-thumb-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>`;

  return `
  <article class="project-card${isPinned?' featured':''}" data-delay="${index*60}">
    ${thumb}
    <div class="project-body">
      ${isPinned?'<div class="project-badge">Featured</div>':''}
      <h3 class="project-title">${name}</h3>
      <p class="project-desc">${desc}</p>
      <div class="project-meta">
        ${lang?`<span class="repo-lang"><span class="lang-dot" style="background:${langColor(lang)}"></span>${lang}</span>`:''}
        ${stars>0?`<span class="repo-stat">★ ${stars}</span>`:''}
        ${forks>0?`<span class="repo-stat">⑂ ${forks}</span>`:''}
        <span class="repo-date">Updated ${updated}</span>
      </div>
      <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link">View on GitHub →</a>
      ${repo.homepage?`<a href="${repo.homepage}" target="_blank" rel="noopener" class="project-link" style="margin-top:6px">Visit Site →</a>`:''}
    </div>
  </article>`;
}

function renderRepos(repos) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  const filtered = repos.filter(r => !r.fork && !r.archived);
  filtered.sort((a,b) => {
    const ap = PINNED.includes(a.name)?1:0, bp = PINNED.includes(b.name)?1:0;
    if (ap!==bp) return bp-ap;
    return new Date(b.updated_at)-new Date(a.updated_at);
  });
  if (!filtered.length) { grid.innerHTML=`<div class="projects-error"><p>No public repositories found.</p></div>`; return; }
  grid.innerHTML = filtered.map((r,i) => buildCard(r,i)).join('');
  observeCards();
}

function showFallback() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = `<div class="projects-error"><p>Couldn't load projects right now.<br><small>Try refreshing in a few minutes.</small></p><a href="https://github.com/${GITHUB_USER}?tab=repositories" target="_blank" rel="noopener" class="btn btn-ghost" style="margin-top:20px">View on GitHub →</a></div>`;
}

async function loadRepos() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY) || localStorage.getItem(CACHE_KEY);
    if (raw) { const {data,ts}=JSON.parse(raw); if (Date.now()-ts<CACHE_TTL) { renderRepos(data); return; } }
  } catch(_) {}
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated&type=public`, { headers: {'Accept':'application/vnd.github.v3+json'} });
    if (res.status===403) { showFallback(); return; }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const payload = JSON.stringify({data, ts:Date.now()});
    try { localStorage.setItem(CACHE_KEY, payload); } catch(_) {}
    try { sessionStorage.setItem(CACHE_KEY, payload); } catch(_) {}
    renderRepos(data);
  } catch(err) { console.warn('GitHub fetch failed:', err.message); showFallback(); }
}
loadRepos();