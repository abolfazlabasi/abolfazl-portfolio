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

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth < 768) navLinks.style.display = 'none';
  });
});


// ─── SCROLL REVEAL ─────────────────────────────────────
const observerOpts = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
    setTimeout(() => el.classList.add('visible'), delay);
    observer.unobserve(el);
  });
}, observerOpts);

function observeCards() {
  document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    observer.observe(el);
  });
}
observeCards();


// ─── ACTIVE NAV ────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id
          ? 'var(--text)' : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));


// ─── GITHUB PROJECTS (with 24h cache) ──────────────────
const GITHUB_USER = 'abolfazlabasi';
const CACHE_KEY   = 'gh_repos_cache';
const CACHE_TTL   = 24 * 60 * 60 * 1000; // 24 hours in ms

// Repos to always pin at top (your portfolio)
const PINNED = ['abolfazl-portfolio'];

// Repos to hide (forks, irrelevant, etc.)
const HIDDEN = [];

function langColor(lang) {
  const map = {
    'HTML': '#e34c26', 'CSS': '#563d7c', 'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489', 'Python': '#3572A5', 'PHP': '#4F5D95',
    'Vue': '#41b883', 'React': '#61dafb', 'C++': '#f34b7d',
    'C': '#555555', 'Java': '#b07219', 'Ruby': '#701516',
  };
  return map[lang] || '#7A7A7A';
}

function renderRepos(repos) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  // Sort: pinned first, then by stars desc, then updated
  repos.sort((a, b) => {
    const aPin = PINNED.includes(a.name) ? 1 : 0;
    const bPin = PINNED.includes(b.name) ? 1 : 0;
    if (aPin !== bPin) return bPin - aPin;
    if (b.stargazers_count !== a.stargazers_count)
      return b.stargazers_count - a.stargazers_count;
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  grid.innerHTML = repos.map((repo, i) => {
    const isPinned = PINNED.includes(repo.name);
    const desc = repo.description || 'No description provided.';
    const lang = repo.language || '';
    const stars = repo.stargazers_count;
    const forks = repo.forks_count;
    const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });

    return `
    <article class="project-card${isPinned ? ' featured' : ''}" data-delay="${i * 60}">
      ${isPinned ? '<div class="project-badge">Featured</div>' : ''}
      <h3 class="project-title">${repo.name.replace(/-/g, ' ')}</h3>
      <p class="project-desc">${desc}</p>
      <div class="project-meta">
        ${lang ? `<span class="repo-lang"><span class="lang-dot" style="background:${langColor(lang)}"></span>${lang}</span>` : ''}
        ${stars > 0 ? `<span class="repo-stat">★ ${stars}</span>` : ''}
        ${forks > 0 ? `<span class="repo-stat">⑂ ${forks}</span>` : ''}
        <span class="repo-stat repo-date">Updated ${updatedDate}</span>
      </div>
      <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link">
        View on GitHub →
      </a>
    </article>`;
  }).join('');

  // Re-observe new cards for scroll reveal
  observeCards();
}

function showError() {
  const grid = document.getElementById('projects-grid');
  if (grid) grid.innerHTML = `
    <div class="projects-error">
      <p>Couldn't load projects right now.</p>
      <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener" class="btn btn-ghost" style="margin-top:16px;display:inline-block;">
        View GitHub Profile →
      </a>
    </div>`;
}

async function loadGitHubRepos() {
  // Check cache
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        renderRepos(data);
        return;
      }
    }
  } catch (_) {}

  // Fetch from GitHub API
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { headers: { 'Accept': 'application/vnd.github.v3+json' } }
    );
    if (!res.ok) throw new Error('GitHub API error');

    const all = await res.json();
    const repos = all.filter(r =>
      !r.fork &&
      !r.archived &&
      !HIDDEN.includes(r.name) &&
      r.name !== `${GITHUB_USER}.github.io`
    );

    // Save to cache
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: repos,
        timestamp: Date.now()
      }));
    } catch (_) {}

    renderRepos(repos);
  } catch (err) {
    console.error('GitHub fetch failed:', err);
    showError();
  }
}

loadGitHubRepos();
