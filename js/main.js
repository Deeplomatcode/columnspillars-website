/**
 * Columns & Pillars Tech | columnsnpillars.co.uk
 * Main JavaScript — all site behaviour
 * Pure ES6+ Vanilla JS, no external libraries
 */

(function () {
  'use strict';

  /* ============================================================
     1. NAV SCROLL STATE
     ============================================================ */
  function initNavScroll() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    function onScroll() {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     2. MOBILE NAV TOGGLE
     ============================================================ */
  function initMobileNav() {
    var nav = document.querySelector('.nav');
    var toggle = document.querySelector('.nav-mobile-toggle');
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
      if (nav.classList.contains('mobile-open')) { closeNav(); } else { openNav(); }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('mobile-open') && !nav.contains(e.target)) { closeNav(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('mobile-open')) {
        closeNav();
        toggle.focus();
      }
    });
  }

  /* ============================================================
     3. SCROLL ANIMATIONS (IntersectionObserver)
     ============================================================ */
  function initScrollAnimations() {
    var elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     4. ACTIVE NAV LINK
     ============================================================ */
  function initActiveNavLink() {
    var links = document.querySelectorAll('.nav-link');
    if (!links.length) return;
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';
    links.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var linkPage = href.split('/').pop();
      if (
        linkPage === page ||
        ((page === '' || page === 'index.html') && (linkPage === 'index.html' || linkPage === ''))
      ) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ============================================================
     5. STATS COUNTER ANIMATION
     ============================================================ */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var isDecimal = target % 1 !== 0;
    var duration = 1800;
    var startTime = performance.now();

    function tick(now) {
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = easeOutCubic(progress);
      var current = target * eased;
      var display = isDecimal ? current.toFixed(1) : Math.floor(current).toString();
      el.textContent = prefix + display + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = prefix + (isDecimal ? target.toFixed(1) : target) + suffix;
      }
    }
    requestAnimationFrame(tick);
  }

  function initStatsCounter() {
    var strip = document.querySelector('.stats-strip');
    if (!strip) return;
    var counters = strip.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }

    var hasRun = false;
    var observer = new IntersectionObserver(function (entries) {
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
     ============================================================ */
  function showFieldError(field, message) {
    clearFieldError(field);
    var error = document.createElement('span');
    error.className = 'field-error';
    error.setAttribute('role', 'alert');
    error.style.cssText = 'display:block;font-size:0.75rem;color:#DC3545;margin-top:4px;';
    error.textContent = message;
    field.parentNode.appendChild(error);
    field.setAttribute('aria-invalid', 'true');
  }

  function clearFieldError(field) {
    var existing = field.parentNode.querySelector('.field-error');
    if (existing) existing.remove();
    field.removeAttribute('aria-invalid');
  }

  function initContactForm() {
    var form = document.querySelector('.contact-form');
    if (!form) return;
    var endpoint = form.getAttribute('data-endpoint') || '';
    var submitBtn = form.querySelector('[type="submit"]');
    var successEl = form.closest('section') ? form.closest('section').querySelector('.form-success') : null;
    var errorEl = form.querySelector('.form-error');
    var announce = document.getElementById('form-announce');
    var requiredFields = ['first_name', 'last_name', 'email', 'interest'];

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      requiredFields.forEach(function (name) {
        var field = form.querySelector('[name="' + name + '"]');
        if (field) clearFieldError(field);
      });
      if (errorEl) errorEl.hidden = true;

      var valid = true;
      requiredFields.forEach(function (name) {
        var field = form.querySelector('[name="' + name + '"]');
        if (!field) return;
        if (!field.value.trim()) { showFieldError(field, 'This field is required.'); valid = false; }
      });

      var emailField = form.querySelector('[name="email"]');
      if (emailField && emailField.value.trim()) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
          showFieldError(emailField, 'Please enter a valid email address.');
          valid = false;
        }
      }

      if (!valid) return;
      if (!endpoint) {
        console.warn('Contact form: data-endpoint is not set. Submission skipped.');
        return;
      }

      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

      try {
        var response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          form.hidden = true;
          if (successEl) successEl.hidden = false;
          if (announce) announce.textContent = "Your message has been sent. We'll be in touch shortly.";
        } else {
          throw new Error('Server responded with ' + response.status);
        }
      } catch (err) {
        if (errorEl) errorEl.hidden = false;
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send message'; }
      }
    });
  }

  /* ============================================================
     7. URL PARAMETER PREFILL
     ============================================================ */
  function initUrlParamPrefill() {
    var select = document.getElementById('interest');
    if (!select) return;
    var params = new URLSearchParams(window.location.search);
    var interest = params.get('interest');
    if (!interest) return;
    var option = select.querySelector('option[value="' + interest + '"]');
    if (option) select.value = interest;
  }

  /* ============================================================
     8. SMOOTH SCROLL
     ============================================================ */
  function initSmoothScroll() {
    var NAV_HEIGHT = 72;
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;
      var target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  /* ============================================================
     9. GALLERY LIGHTBOX
     ============================================================ */
  function initLightbox() {
    var overlay = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var closeBtn = document.getElementById('lightbox-close');
    if (!overlay || !lightboxImg) return;

    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    }

    document.querySelectorAll('.gallery-item').forEach(function (item) {
      var img = item.querySelector('img');
      if (!img) return;
      item.addEventListener('click', function () { openLightbox(img.src, img.alt); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(img.src, img.alt); }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeLightbox();
    });
  }

  /* ============================================================
     INIT
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
    initLightbox();
  });

}());
