/* ===========================
   CUSTOM CURSOR
=========================== */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
const hoverEls = document.querySelectorAll('a, button, input, select, textarea, .project-card, .cert-card, .service-item, .skill-category');
hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('active'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

/* ===========================
   NAVBAR SCROLL EFFECT
=========================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===========================
   HAMBURGER MENU
=========================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

/* ===========================
   REVEAL ON SCROLL
=========================== */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ===========================
   SKILL BAR ANIMATION
=========================== */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width = target.dataset.w + '%';
      setTimeout(() => {
        target.style.width = width;
      }, 200);
      skillObserver.unobserve(target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ===========================
   ACTIVE NAV LINK
=========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + id) {
          link.style.color = 'var(--text)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ===========================
   CONTACT FORM
=========================== */
/* REPLACE ONLY YOUR CONTACT FORM SECTION in script.js */

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');

    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    emailjs.sendForm(
      "__SERVICE_ID__",
      "__TEMPLATE_ID__",
      this
    )
      .then(() => {
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#22c55e';

        formSuccess.classList.add('show');
        contactForm.reset();

        setTimeout(() => {
          btn.textContent = 'Send Message →';
          btn.disabled = false;
          btn.style.opacity = '';
          btn.style.background = '';
          formSuccess.classList.remove('show');
        }, 4000);
      })
      .catch((error) => {
        console.error(error);

        btn.textContent = 'Failed. Try Again';
        btn.disabled = false;
        btn.style.opacity = '';

        setTimeout(() => {
          btn.textContent = 'Send Message →';
        }, 2500);
      });
  });
}

/* ===========================
   SMOOTH SECTION SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===========================
   HERO NUMBER COUNTER
=========================== */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const isDecimal = target.toString().includes('.');
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = isDecimal ? start.toFixed(1) : Math.floor(start) + '+';
  }, 16);
}

const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const rawText = el.textContent;
      if (rawText.includes('.')) {
        const num = parseFloat(rawText);
        el.textContent = '0.0';
        animateCounter(el, num);
      } else {
        const num = parseInt(rawText);
        el.textContent = '0+';
        animateCounter(el, num);
      }
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));

/* ===========================
   TYPING EFFECT (Hero Role)
=========================== */
const roles = ['AI Engineer', 'ML Developer', 'MLOps Engineer', 'Data Scientist', 'Backend Developer'];
let roleIdx = 0;
let charIdx = 0;
let deleting = false;
const roleEl = document.querySelector('.hero-role span:nth-child(2)');

if (roleEl) {
  function typeRole() {
    const current = roles[roleIdx];
    if (deleting) {
      roleEl.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        charIdx = 0;
        setTimeout(typeRole, 400);
        return;
      }
      setTimeout(typeRole, 60);
    } else {
      roleEl.textContent = current.substring(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(typeRole, 2200);
        return;
      }
      setTimeout(typeRole, 90);
    }
  }
  setTimeout(typeRole, 1000);
}

/* ===========================
   PARALLAX BG TEXT
=========================== */
const bgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  if (bgText) {
    const scrolled = window.scrollY;
    bgText.style.transform = `translateY(calc(-50% + ${scrolled * 0.3}px))`;
  }
});

console.log('%c Muhammad Hasnain | AI Engineer ', 'background: #00e5c8; color: #0a0a0f; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 4px;');
console.log('%c mhasnain8694@gmail.com | Open for Freelance ', 'color: #7b5cfa; font-size: 12px;');
