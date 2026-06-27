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
if (tw) type();


// ─── NAV SCROLL ────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


// ─── MOBILE MENU ───────────────────────────────────────
const toggle = document.getElementById('navToggle');
const navLinksList = document.querySelector('.nav-links');
let menuOpen = false;

toggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navLinksList.classList.toggle('mobile-open', menuOpen);
});

navLinksList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menuOpen = false;
    navLinksList.classList.remove('mobile-open');
  });
});


// ─── SCROLL REVEAL ─────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
    setTimeout(() => el.classList.add('visible'), delay);
    revealObserver.unobserve(el);
  });
}, { threshold: 0.1 });

function observeCards() {
  document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    if (!el.classList.contains('visible')) revealObserver.observe(el);
  });
}
observeCards();


// ─── ACTIVE NAV ────────────────────────────────────────
const allSections = document.querySelectorAll('section[id]');
const navAnchors  = document.querySelectorAll('.nav-links a');

new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 }).observe && allSections.forEach(s => {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 }).observe(s);
});


// ─── GITHUB PROJECTS ───────────────────────────────────
const GITHUB_USER = 'abolfazlabasi';
const CACHE_KEY   = 'gh_repos_v2';
const CACHE_TTL   = 24 * 60 * 60 * 1000;
const PINNED      = ['abolfazl-portfolio'];

function langColor(lang) {
  const map = {
    'HTML':'#e34c26','CSS':'#563d7c','JavaScript':'#f1e05a',
    'TypeScript':'#2b7489','Python':'#3572A5','PHP':'#4F5D95',
    'Vue':'#41b883','C++':'#f34b7d','C':'#555555','Java':'#b07219',
  };
  return map[lang] || '#7A7A7A';
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr);
  const d = Math.floor(diff / 86400000);
  if (d === 0) return 'today';
  if (d === 1) return 'yesterday';
  if (d < 30) return `${d} days ago`;
  const m = Math.floor(d / 30);
  if (m < 12) return `${m} month${m > 1 ? 's' : ''} ago`;
  const y = Math.floor(m / 12);
  return `${y} year${y > 1 ? 's' : ''} ago`;
}

function buildCard(repo, index) {
  const isPinned = PINNED.includes(repo.name);
  const name     = repo.name.replace(/-/g, ' ').replace(/_/g, ' ');
  const desc     = repo.description || 'No description provided.';
  const lang     = repo.language || '';
  const stars    = repo.stargazers_count || 0;
  const forks    = repo.forks_count || 0;
  const updated  = timeAgo(repo.updated_at);

  return `
  <article class="project-card${isPinned ? ' featured' : ''}" data-delay="${index * 60}">
    ${isPinned ? '<div class="project-badge">Featured</div>' : ''}
    <h3 class="project-title">${name}</h3>
    <p class="project-desc">${desc}</p>
    <div class="project-meta">
      ${lang ? `<span class="repo-lang">
        <span class="lang-dot" style="background:${langColor(lang)}"></span>${lang}
      </span>` : ''}
      ${stars > 0 ? `<span class="repo-stat">★ ${stars}</span>` : ''}
      ${forks > 0 ? `<span class="repo-stat">⑂ ${forks}</span>` : ''}
      <span class="repo-date">Updated ${updated}</span>
    </div>
    <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link">
      View on GitHub →
    </a>
  </article>`;
}

function renderRepos(repos) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = repos.filter(r => !r.fork && !r.archived);

  filtered.sort((a, b) => {
    const ap = PINNED.includes(a.name) ? 1 : 0;
    const bp = PINNED.includes(b.name) ? 1 : 0;
    if (ap !== bp) return bp - ap;
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="projects-error"><p>No public repositories found.</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map((r, i) => buildCard(r, i)).join('');
  observeCards();
}

function showFallback() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = `
    <div class="projects-error">
      <p>Couldn't load projects right now.<br>
      <small>GitHub API may be rate-limited. Try again in a few minutes.</small></p>
      <a href="https://github.com/${GITHUB_USER}?tab=repositories"
         target="_blank" rel="noopener"
         class="btn btn-ghost"
         style="margin-top:20px;display:inline-block;">
        View All Repos on GitHub →
      </a>
    </div>`;
}

async function loadRepos() {
  // 1. Try cache first
  try {
    const raw = sessionStorage.getItem(CACHE_KEY) || localStorage.getItem(CACHE_KEY);
    if (raw) {
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts < CACHE_TTL) {
        renderRepos(data);
        return;
      }
    }
  } catch (_) {}

  // 2. Fetch from GitHub
  const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated&type=public`;

  try {
    const res = await fetch(url, {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
    });

    if (res.status === 403) {
      // Rate limited — show fallback
      showFallback();
      return;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    // Cache it
    const payload = JSON.stringify({ data, ts: Date.now() });
    try { localStorage.setItem(CACHE_KEY, payload); } catch (_) {}
    try { sessionStorage.setItem(CACHE_KEY, payload); } catch (_) {}

    renderRepos(data);

  } catch (err) {
    console.warn('GitHub API failed:', err.message);
    showFallback();
  }
}

loadRepos();
