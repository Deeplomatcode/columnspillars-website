/**
 * Columns & Pillars Tech | columnsnpillars.co.uk
 * Main JavaScript — all site behaviour
 * Pure ES6+ Vanilla JS, no external libraries
 */

(function () {
  'use strict';

  /* ============================================================
     1. NAV SCROLL STATE
     Add class 'scrolled' to .nav when window.scrollY > 20
     Remove when back at top
     ============================================================ */

  /**
   * Initialises scroll-based nav shadow state.
   */
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load in case page is already scrolled
  }

  /* ============================================================
     2. MOBILE NAV TOGGLE
     Toggle 'mobile-open' on .nav, manage aria, body scroll lock
     ============================================================ */

  /**
   * Initialises mobile navigation toggle behaviour.
   */
  function initMobileNav() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav-mobile-toggle');
    if (!nav || !toggle) return;

    function openNav() {
      nav.classList.add('mobile-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      nav.classList.remove('mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      if (nav.classList.contains('mobile-open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('mobile-open') && !nav.contains(e.target)) {
        closeNav();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('mobile-open')) {
        closeNav();
        toggle.focus();
      }
    });
  }

  /* ============================================================
     3. SCROLL ANIMATIONS (IntersectionObserver)
     Observe [data-animate] elements, add 'visible' once in view
     ============================================================ */

  /**
   * Initialises scroll-triggered fade-up animations.
   */
  function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: show all immediately
      elements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     4. ACTIVE NAV LINK
     Match current page pathname to .nav-link href
     ============================================================ */

  /**
   * Marks the current page's nav link as active.
   */
  function initActiveNavLink() {
    const links = document.querySelectorAll('.nav-link');
    if (!links.length) return;

    const path = window.location.pathname;
    // Normalise: get the filename portion
    const page = path.split('/').pop() || 'index.html';

    links.forEach(function (link) {
      const href = link.getAttribute('href') || '';
      const linkPage = href.split('/').pop();

      if (
        linkPage === page ||
        (page === '' || page === 'index.html') && (linkPage === 'index.html' || linkPage === '')
      ) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ============================================================
     5. STATS COUNTER ANIMATION
     Animate [data-count-to] numbers when .stats-strip enters view
     ============================================================ */

  /**
   * Eases out cubic — progress from 0 to 1.
   * @param {number} t - Linear progress 0–1
   * @returns {number} Eased progress
   */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /**
   * Animates a single counter element.
   * @param {HTMLElement} el - Element with data-count-to attribute
   */
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-count-to'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const isDecimal = target % 1 !== 0;
    const duration = 1800;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = target * eased;
      const display = isDecimal ? current.toFixed(1) : Math.floor(current).toString();
      el.textContent = prefix + display + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = prefix + (isDecimal ? target.toFixed(1) : target) + suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  /**
   * Initialises stats counter animation triggered by IntersectionObserver.
   */
  function initStatsCounter() {
    const strip = document.querySelector('.stats-strip');
    if (!strip) return;

    const counters = strip.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }

    let hasRun = false;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !hasRun) {
          hasRun = true;
          counters.forEach(animateCounter);
          observer.unobserve(strip);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(strip);
  }

  /* ============================================================
     6. CONTACT FORM HANDLER
     Validates, posts JSON to data-endpoint, handles states
     ============================================================ */

  /**
   * Shows an inline error message below a form field.
   * @param {HTMLElement} field - The input/select element
   * @param {string} message - Error message text
   */
  function showFieldError(field, message) {
    clearFieldError(field);
    const error = document.createElement('span');
    error.className = 'field-error';
    error.setAttribute('role', 'alert');
    error.style.cssText = 'display:block;font-size:0.75rem;color:#DC3545;margin-top:4px;';
    error.textContent = message;
    field.parentNode.appendChild(error);
    field.setAttribute('aria-invalid', 'true');
  }

  /**
   * Clears inline error for a field.
   * @param {HTMLElement} field
   */
  function clearFieldError(field) {
    const existing = field.parentNode.querySelector('.field-error');
    if (existing) existing.remove();
    field.removeAttribute('aria-invalid');
  }

  /**
   * Initialises contact form validation and async submission.
   */
  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const endpoint = form.getAttribute('data-endpoint') || '';
    const submitBtn = form.querySelector('[type="submit"]');
    const successEl = form.closest('section')
      ? form.closest('section').querySelector('.form-success')
      : null;
    const errorEl = form.querySelector('.form-error');
    const announce = document.getElementById('form-announce');

    const requiredFields = ['first_name', 'last_name', 'email', 'interest'];

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Clear previous errors
      requiredFields.forEach(function (name) {
        const field = form.querySelector('[name="' + name + '"]');
        if (field) clearFieldError(field);
      });
      if (errorEl) errorEl.hidden = true;

      // Validate required fields
      let valid = true;
      requiredFields.forEach(function (name) {
        const field = form.querySelector('[name="' + name + '"]');
        if (!field) return;
        if (!field.value.trim()) {
          showFieldError(field, 'This field is required.');
          valid = false;
        }
      });

      // Basic email format check
      const emailField = form.querySelector('[name="email"]');
      if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
          showFieldError(emailField, 'Please enter a valid email address.');
          valid = false;
        }
      }

      if (!valid) return;

      // No endpoint configured — warn silently
      if (!endpoint) {
        console.warn('Contact form: data-endpoint is not set. Submission skipped.');
        return;
      }

      // Collect form data
      const data = {};
      new FormData(form).forEach(function (value, key) {
        data[key] = value;
      });

      // Submit
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          form.hidden = true;
          if (successEl) successEl.hidden = false;
          if (announce) {
            announce.textContent = 'Your message has been sent. We\'ll be in touch shortly.';
          }
        } else {
          throw new Error('Server responded with ' + response.status);
        }
      } catch (err) {
        if (errorEl) errorEl.hidden = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send message';
        }
      }
    });
  }

  /* ============================================================
     7. URL PARAMETER → DROPDOWN PRE-FILL
     Read ?interest= and pre-select #interest dropdown
     ============================================================ */

  /**
   * Pre-fills the interest dropdown from URL query string.
   */
  function initUrlParamPrefill() {
    const select = document.getElementById('interest');
    if (!select) return;

    const params = new URLSearchParams(window.location.search);
    const interest = params.get('interest');
    if (!interest) return;

    const option = select.querySelector('option[value="' + interest + '"]');
    if (option) select.value = interest;
  }

  /* ============================================================
     8. SMOOTH SCROLL
     Offset by nav height (72px) for links starting with "#"
     ============================================================ */

  /**
   * Initialises smooth scroll with nav offset for anchor links.
   */
  function initSmoothScroll() {
    const NAV_HEIGHT = 72;

    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  /* ============================================================
     INIT — run all modules on DOMContentLoaded
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initNavScroll();
    initMobileNav();
    initScrollAnimations();
    initActiveNavLink();
    initStatsCounter();
    initContactForm();
    initUrlParamPrefill();
    initSmoothScroll();
  });

}());
