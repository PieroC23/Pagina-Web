// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── MOBILE MENU ───
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── EVIDENCE LIGHTBOX ───
const evidenceLightbox = document.getElementById('evidenceLightbox');
const lightboxImage = evidenceLightbox.querySelector('.lightbox-image');
document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const image = trigger.querySelector('img');
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    evidenceLightbox.showModal();
  });
});
evidenceLightbox.querySelector('.lightbox-close').addEventListener('click', () => {
  evidenceLightbox.close();
});
evidenceLightbox.addEventListener('click', event => {
  if (event.target === evidenceLightbox) evidenceLightbox.close();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && evidenceLightbox.open) evidenceLightbox.close();
});

// ─── ACTIVE NAV LINK ───
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });
sections.forEach(s => observer.observe(s));

// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll('.subsection, .chapter-header, .evidence-card, .chapter-card, .voz-card, .stk-card, .kpi-card, .risk-card, .team-card, .bullet-card, .reading-card');
revealEls.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -80px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── LIKERT TABS ───
const tabs = document.querySelectorAll('.likert-tab');
const contents = document.querySelectorAll('.likert-content');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.target);
    if (target) target.classList.add('active');
  });
});

// ─── SMOOTH SCROLL ANCHOR ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const id = this.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      const offset = 70;
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// ─── LIKERT BARS ANIMATE ON VISIBLE ───
const likertBars = document.querySelectorAll('.likert-bar');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Bars already have width set via inline style, just animate them
      entry.target.style.transition = 'width 1s ease 0.2s';
      barObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -40px 0px' });
// Store original widths and set to 0 initially
likertBars.forEach(bar => {
  const originalWidth = bar.style.width;
  bar.setAttribute('data-width', originalWidth);
  bar.style.width = '0%';
  barObserver.observe(bar);
});

// When bars become visible, animate them
const barRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetWidth = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100);
      barRevealObserver.unobserve(bar);
    }
  });
}, { rootMargin: '0px 0px -40px 0px' });
likertBars.forEach(bar => barRevealObserver.observe(bar));
