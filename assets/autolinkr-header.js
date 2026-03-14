/**
 * autolinkr-header.js
 * AutoLinkr Sticky Nav — Dropdown, Mobile Menu, Scroll Behavior, Keyboard Nav
 * Phase A — ConceptThemePerplexity
 */

(function () {
  'use strict';

  /* ─── Selectors ─────────────────────────────────────────────── */
  const header       = document.getElementById('ALHeader');
  const hamburger    = document.getElementById('ALHamburger');
  const mobileMenu   = document.getElementById('al-mobile-menu');
  const menuOverlay  = document.getElementById('ALMenuOverlay');
  const menuClose    = document.getElementById('ALMenuClose');
  const dropTriggers = header ? header.querySelectorAll('.al-nav__trigger') : [];
  const mobTriggers  = document.querySelectorAll('.al-mob-group__trigger');

  /* ─── Scroll: add .is-scrolled ──────────────────────────────── */
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load
  }

  /* ─── Desktop Dropdown ──────────────────────────────────────── */
  function closeAllDropdowns(except) {
    dropTriggers.forEach(btn => {
      if (btn === except) return;
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', 'false');
      if (panel) panel.classList.remove('is-open');
    });
  }

  dropTriggers.forEach(btn => {
    const panelId = btn.getAttribute('aria-controls');
    const panel   = document.getElementById(panelId);
    if (!panel) return;

    /* Click toggle */
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      closeAllDropdowns(btn);
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.classList.toggle('is-open', !isOpen);
    });

    /* Hover open on desktop */
    const navItem = btn.closest('.al-nav__item');
    if (navItem) {
      navItem.addEventListener('mouseenter', () => {
        if (window.innerWidth < 1025) return;
        closeAllDropdowns(btn);
        btn.setAttribute('aria-expanded', 'true');
        panel.classList.add('is-open');
      });
      navItem.addEventListener('mouseleave', () => {
        if (window.innerWidth < 1025) return;
        btn.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-open');
      });
    }

    /* Keyboard: Escape closes */
    panel.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        btn.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-open');
        btn.focus();
      }
    });
  });

  /* Close dropdowns on outside click */
  document.addEventListener('click', e => {
    if (!header) return;
    if (!header.contains(e.target)) {
      closeAllDropdowns();
    }
  });

  /* Close dropdowns on Escape from anywhere */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllDropdowns();
  });

  /* ─── Mobile Menu ───────────────────────────────────────────── */
  function openMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Focus first link in panel
    const firstLink = mobileMenu.querySelector('a, button');
    if (firstLink) setTimeout(() => firstLink.focus(), 300);
  }

  function closeMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  if (hamburger)  hamburger.addEventListener('click', openMobileMenu);
  if (menuClose)  menuClose.addEventListener('click', closeMobileMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMobileMenu);

  /* Trap focus inside mobile menu */
  if (mobileMenu) {
    mobileMenu.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(
        mobileMenu.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')
      ).filter(el => !el.closest('[aria-hidden="true"]'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
    /* Escape closes */
    mobileMenu.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  /* ─── Mobile Accordion Groups ───────────────────────────────── */
  mobTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen  = btn.getAttribute('aria-expanded') === 'true';
      const list    = btn.nextElementSibling; // .al-mob-group__list
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (list) list.setAttribute('aria-hidden', String(isOpen));
    });
  });

})();
