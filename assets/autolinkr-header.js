/**
 * autolinkr-header.js
 * AutoLinkr Sticky Nav — Dropdown + Mega Menu, Mobile Menu, Scroll Behavior, Keyboard Nav
 * Phase B — Mega Menu Edition
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────── */
  const SCROLL_THRESHOLD  = 20;
  const DROPDOWN_DELAY    = 120;
  const CLOSE_KEYS        = ['Escape'];

  /* ─────────────────────────────────────────────
     DOM REFERENCES
  ───────────────────────────────────────────── */
  const header        = document.querySelector('.al-header');
  const body          = document.body;

  // Both regular dropdowns AND mega menu items
  const allNavItems   = document.querySelectorAll('.al-nav__item--has-dropdown, .al-nav__item--has-mega');
  const triggers      = document.querySelectorAll('.al-nav__trigger');
  const backdrop      = document.getElementById('ALMegaBackdrop');

  if (!header) return;

  /* ─────────────────────────────────────────────
     SCROLL BEHAVIOR
  ───────────────────────────────────────────── */
  let lastScrollY = window.scrollY;
  let ticking = false;

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  }

  function updateScrollState() {
    if (lastScrollY > SCROLL_THRESHOLD) {
      header.classList.add('al-header--scrolled');
    } else {
      header.classList.remove('al-header--scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateScrollState();

  /* ─────────────────────────────────────────────
     DROPDOWN / MEGA OPEN & CLOSE
     Works for both .al-nav__item--has-dropdown
     and .al-nav__item--has-mega via shared .is-open
  ───────────────────────────────────────────── */
  let closeTimers = new Map();

  function openNavItem(navItem) {
    // Close all other items first
    allNavItems.forEach(item => {
      if (item !== navItem) closeNavItem(item, true);
    });

    // Find the panel — either .al-dropdown or .al-mega-wrap
    const panel   = navItem.querySelector('.al-dropdown, .al-mega-wrap');
    const trigger = navItem.querySelector('.al-nav__trigger');

    if (!panel) return;

    navItem.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');

    // Show backdrop for mega menus
    if (navItem.classList.contains('al-nav__item--has-mega') && backdrop) {
      backdrop.classList.add('is-visible');
    }

    // Cancel any pending close
    if (closeTimers.has(navItem)) {
      clearTimeout(closeTimers.get(navItem));
      closeTimers.delete(navItem);
    }
  }

  function closeNavItem(navItem, immediate) {
    const panel   = navItem.querySelector('.al-dropdown, .al-mega-wrap');
    const trigger = navItem.querySelector('.al-nav__trigger');
    if (!panel) return;

    const run = () => {
      navItem.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      closeTimers.delete(navItem);
      // Hide backdrop if no mega items are open
      const anyMegaOpen = Array.from(
        document.querySelectorAll('.al-nav__item--has-mega.is-open')
      ).length > 0;
      if (!anyMegaOpen && backdrop) {
        backdrop.classList.remove('is-visible');
      }
    };

    if (immediate) {
      run();
    } else {
      const t = setTimeout(run, DROPDOWN_DELAY);
      closeTimers.set(navItem, t);
    }
  }

  function toggleNavItem(navItem) {
    if (navItem.classList.contains('is-open')) {
      closeNavItem(navItem, true);
    } else {
      openNavItem(navItem);
    }
  }

  function closeAll(immediate) {
    allNavItems.forEach(item => closeNavItem(item, immediate));
  }

  /* ─── Hover (desktop ≥1024px) ─── */
  allNavItems.forEach(item => {
    const panel = item.querySelector('.al-dropdown, .al-mega-wrap');
    if (!panel) return;

    item.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1024) openNavItem(item);
    });

    item.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 1024) closeNavItem(item, false);
    });

    panel.addEventListener('mouseenter', () => {
      if (closeTimers.has(item)) {
        clearTimeout(closeTimers.get(item));
        closeTimers.delete(item);
      }
    });

    panel.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 1024) closeNavItem(item, false);
    });
  });

  /* ─── Click (touch + keyboard) ─── */
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const navItem = trigger.closest('.al-nav__item');
      if (navItem) toggleNavItem(navItem);
    });
  });

  /* ─── Click outside ─── */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.al-nav__item') && !e.target.closest('.al-mega')) {
      closeAll(true);
    }
  });

  /* ─── Backdrop click ─── */
  if (backdrop) {
    backdrop.addEventListener('click', () => closeAll(true));
  }

  /* ─────────────────────────────────────────────
     KEYBOARD NAVIGATION
  ───────────────────────────────────────────── */
  header.addEventListener('keydown', (e) => {
    if (CLOSE_KEYS.includes(e.key)) {
      allNavItems.forEach(item => {
        if (item.classList.contains('is-open')) {
          closeNavItem(item, true);
          const trigger = item.querySelector('.al-nav__trigger');
          if (trigger) trigger.focus();
        }
      });
      closeMobileMenu();
    }

    if (e.key === 'ArrowDown') {
      const trigger = e.target.closest('.al-nav__trigger');
      if (trigger) {
        e.preventDefault();
        const navItem = trigger.closest('.al-nav__item');
        openNavItem(navItem);
        const firstLink = navItem.querySelector('.al-dropdown a, .al-dropdown button, .al-mega-wrap a, .al-mega-wrap button');
        if (firstLink) firstLink.focus();
      }
    }
  });

  /* ─────────────────────────────────────────────
     MOBILE MENU
  ───────────────────────────────────────────── */
  const mobileMenu    = document.getElementById('al-mobile-menu');
  const menuOverlay   = document.getElementById('ALMenuOverlay');
  const menuClose     = document.getElementById('ALMenuClose');
  const hamburger     = document.getElementById('ALHamburger');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger && hamburger.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
    const firstItem = mobileMenu.querySelector('a, button');
    if (firstItem) setTimeout(() => firstItem.focus(), 50);
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
    document.querySelectorAll('.al-mob-group').forEach(g => {
      g.classList.remove('is-open');
      const btn = g.querySelector('.al-mob-group__trigger');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      const list = g.querySelector('.al-mob-group__list');
      if (list) list.classList.remove('is-open');
    });
  }

  hamburger && hamburger.addEventListener('click', () => {
    mobileMenu && mobileMenu.classList.contains('is-open')
      ? closeMobileMenu()
      : openMobileMenu();
  });

  menuOverlay && menuOverlay.addEventListener('click', closeMobileMenu);
  menuClose   && menuClose.addEventListener('click', closeMobileMenu);

  /* Mobile accordion groups */
  document.querySelectorAll('.al-mob-group__trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.al-mob-group');
      if (!group) return;
      const isOpen = group.classList.contains('is-open');
      // Collapse all
      document.querySelectorAll('.al-mob-group').forEach(g => {
        g.classList.remove('is-open');
        const b = g.querySelector('.al-mob-group__trigger');
        if (b) b.setAttribute('aria-expanded', 'false');
        const l = g.querySelector('.al-mob-group__list');
        if (l) l.classList.remove('is-open');
      });
      // Toggle current
      if (!isOpen) {
        group.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        const list = group.querySelector('.al-mob-group__list');
        if (list) list.classList.add('is-open');
      }
    });
  });

  /* ─────────────────────────────────────────────
     FOCUS TRAP — mobile menu
  ───────────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (!mobileMenu || !mobileMenu.classList.contains('is-open')) return;
    if (e.key !== 'Tab') return;
    const focusable = Array.from(
      mobileMenu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter(el => !el.closest('[hidden]'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  /* ─────────────────────────────────────────────
     RESIZE
  ───────────────────────────────────────────── */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 1024) {
        closeMobileMenu();
        closeAll(true);
      }
    }, 150);
  });

  /* ─────────────────────────────────────────────
     ANNOUNCEMENT BAR — dismiss
  ───────────────────────────────────────────── */
  const announcementDismiss = document.querySelector('.al-announcement__dismiss');
  const announcementBar     = document.querySelector('.al-announcement');

  if (announcementDismiss && announcementBar) {
    announcementDismiss.addEventListener('click', () => {
      announcementBar.style.height = announcementBar.offsetHeight + 'px';
      requestAnimationFrame(() => {
        announcementBar.style.transition = 'height 0.3s ease, opacity 0.3s ease';
        announcementBar.style.height  = '0';
        announcementBar.style.opacity = '0';
        announcementBar.style.overflow = 'hidden';
      });
      try { sessionStorage.setItem('al_announcement_dismissed', '1'); } catch(e) {}
    });
    try {
      if (sessionStorage.getItem('al_announcement_dismissed') === '1') {
        announcementBar.style.display = 'none';
      }
    } catch(e) {}
  }

  /* ─────────────────────────────────────────────
     CART BADGE UPDATE
  ───────────────────────────────────────────── */
  document.addEventListener('cart:updated', (e) => {
    const badge = document.querySelector('.al-cart-count');
    if (!badge) return;
    const count = e.detail && e.detail.cartCount !== undefined ? e.detail.cartCount : 0;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });

})();
