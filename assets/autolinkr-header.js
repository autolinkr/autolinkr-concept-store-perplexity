/**
 * autolinkr-header.js
 * AutoLinkr Sticky Nav — Dropdown, Mobile Menu, Scroll Behavior, Keyboard Nav
 * Phase A — ConceptThemePerplexity
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────── */
  const SCROLL_THRESHOLD  = 20;       // px before header gets scrolled class
  const DROPDOWN_DELAY    = 120;      // ms delay before closing dropdown on mouse leave
  const FOCUS_TRAP_KEYS   = ['Tab'];
  const CLOSE_KEYS        = ['Escape'];

  /* ─────────────────────────────────────────────
     DOM REFERENCES
  ───────────────────────────────────────────── */
  const header       = document.querySelector('.al-header');
  const navItems     = document.querySelectorAll('.al-nav__item');
  const dropdowns    = document.querySelectorAll('.al-dropdown');
  const triggers     = document.querySelectorAll('.al-nav__trigger');
  const mobileToggle = document.querySelector('.al-mobile-toggle');
  const mobileMenu   = document.querySelector('.al-mobile-menu');
  const mobileOverlay= document.querySelector('.al-mobile-overlay');
  const mobileBack   = document.querySelectorAll('.al-mobile-back');
  const mobileItems  = document.querySelectorAll('.al-mobile-nav__item');
  const body         = document.body;

  if (!header) return; // Guard: bail if header not present on page

  /* ─────────────────────────────────────────────
     SCROLL BEHAVIOR — add .is-scrolled class
  ───────────────────────────────────────────── */
  let lastScrollY   = window.scrollY;
  let ticking       = false;

  function onScroll () {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  }

  function updateScrollState () {
    if (lastScrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateScrollState(); // Run once on load

  /* ─────────────────────────────────────────────
     DROPDOWN — hover (desktop) + click (touch/keyboard)
  ───────────────────────────────────────────── */
  let closeTimers = new Map();

  function openDropdown (navItem) {
    // Close all other dropdowns first
    navItems.forEach(item => {
      if (item !== navItem) closeDropdown(item, true);
    });
    const dropdown = navItem.querySelector('.al-dropdown');
    const trigger  = navItem.querySelector('.al-nav__trigger');
    if (!dropdown) return;
    navItem.classList.add('is-open');
    dropdown.setAttribute('aria-hidden', 'false');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    // Clear any pending close timer
    if (closeTimers.has(navItem)) {
      clearTimeout(closeTimers.get(navItem));
      closeTimers.delete(navItem);
    }
  }

  function closeDropdown (navItem, immediate) {
    const dropdown = navItem.querySelector('.al-dropdown');
    const trigger  = navItem.querySelector('.al-nav__trigger');
    if (!dropdown) return;
    const run = () => {
      navItem.classList.remove('is-open');
      dropdown.setAttribute('aria-hidden', 'true');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      closeTimers.delete(navItem);
    };
    if (immediate) {
      run();
    } else {
      const t = setTimeout(run, DROPDOWN_DELAY);
      closeTimers.set(navItem, t);
    }
  }

  function toggleDropdown (navItem) {
    if (navItem.classList.contains('is-open')) {
      closeDropdown(navItem, true);
    } else {
      openDropdown(navItem);
    }
  }

  // Attach hover listeners (desktop)
  navItems.forEach(item => {
    const dropdown = item.querySelector('.al-dropdown');
    if (!dropdown) return;

    item.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1024) openDropdown(item);
    });

    item.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 1024) closeDropdown(item, false);
    });

    // Prevent close when hovering the dropdown itself
    dropdown.addEventListener('mouseenter', () => {
      if (closeTimers.has(item)) {
        clearTimeout(closeTimers.get(item));
        closeTimers.delete(item);
      }
    });

    dropdown.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 1024) closeDropdown(item, false);
    });
  });

  // Attach click listeners on triggers (touch + keyboard users)
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const navItem = trigger.closest('.al-nav__item');
      if (navItem) toggleDropdown(navItem);
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.al-nav__item')) {
      navItems.forEach(item => closeDropdown(item, true));
    }
  });

  /* ─────────────────────────────────────────────
     KEYBOARD NAVIGATION
  ───────────────────────────────────────────── */
  header.addEventListener('keydown', (e) => {
    // Escape closes open dropdown
    if (CLOSE_KEYS.includes(e.key)) {
      navItems.forEach(item => {
        if (item.classList.contains('is-open')) {
          closeDropdown(item, true);
          const trigger = item.querySelector('.al-nav__trigger');
          if (trigger) trigger.focus();
        }
      });
      // Also close mobile menu
      closeMobileMenu();
    }

    // Arrow Down opens dropdown when trigger is focused
    if (e.key === 'ArrowDown') {
      const trigger = e.target.closest('.al-nav__trigger');
      if (trigger) {
        e.preventDefault();
        const navItem = trigger.closest('.al-nav__item');
        openDropdown(navItem);
        // Focus first focusable item in dropdown
        const firstLink = navItem.querySelector('.al-dropdown a, .al-dropdown button');
        if (firstLink) firstLink.focus();
      }
    }
  });

  /* ─────────────────────────────────────────────
     MOBILE MENU
  ───────────────────────────────────────────── */
  function openMobileMenu () {
    mobileMenu.classList.add('is-open');
    mobileOverlay && mobileOverlay.classList.add('is-visible');
    mobileToggle && mobileToggle.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
    // Focus first item in mobile menu
    const firstItem = mobileMenu.querySelector('a, button');
    if (firstItem) setTimeout(() => firstItem.focus(), 50);
  }

  function closeMobileMenu () {
    mobileMenu && mobileMenu.classList.remove('is-open');
    mobileOverlay && mobileOverlay.classList.remove('is-visible');
    mobileToggle && mobileToggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
    // Close any open mobile sub-menus
    mobileItems.forEach(item => item.classList.remove('is-expanded'));
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Mobile accordion sub-menus
  mobileItems.forEach(item => {
    const subTrigger = item.querySelector('.al-mobile-nav__toggle');
    if (!subTrigger) return;
    subTrigger.addEventListener('click', () => {
      const isExpanded = item.classList.contains('is-expanded');
      // Collapse all other items
      mobileItems.forEach(i => i.classList.remove('is-expanded'));
      if (!isExpanded) item.classList.add('is-expanded');
    });
  });

  // Mobile back buttons (nested sub-menu navigation)
  mobileBack.forEach(btn => {
    btn.addEventListener('click', () => {
      const subPanel = btn.closest('.al-mobile-sub');
      if (subPanel) subPanel.classList.remove('is-active');
    });
  });

  /* ─────────────────────────────────────────────
     FOCUS TRAP — mobile menu only
  ───────────────────────────────────────────── */
  function trapFocus (e) {
    if (!mobileMenu || !mobileMenu.classList.contains('is-open')) return;
    if (!FOCUS_TRAP_KEYS.includes(e.key)) return;
    const focusable = Array.from(
      mobileMenu.querySelectorAll('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])')
    ).filter(el => !el.closest('[hidden]'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  document.addEventListener('keydown', trapFocus);

  /* ─────────────────────────────────────────────
     RESIZE — close mobile menu when breakpoint crossed
  ───────────────────────────────────────────── */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 1024) {
        closeMobileMenu();
        navItems.forEach(item => closeDropdown(item, true));
      }
    }, 150);
  });

  /* ─────────────────────────────────────────────
     MOBILE BOTTOM DOCK — active state
  ───────────────────────────────────────────── */
  const dockLinks = document.querySelectorAll('.al-dock__link');
  const currentPath = window.location.pathname;

  dockLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    // Exact match for root, prefix match for others
    const isActive = (href === '/' && currentPath === '/') ||
                     (href !== '/' && currentPath.startsWith(href));
    if (isActive) link.classList.add('is-active');
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
    // Restore dismissed state
    try {
      if (sessionStorage.getItem('al_announcement_dismissed') === '1') {
        announcementBar.style.display = 'none';
      }
    } catch(e) {}
  }

  /* ─────────────────────────────────────────────
     CART ICON — badge update via Shopify section rendering
     (Rebuy/Shopify AJAX cart will trigger this event)
  ───────────────────────────────────────────── */
  document.addEventListener('cart:updated', (e) => {
    const badge = document.querySelector('.al-cart-count');
    if (!badge) return;
    const count = e.detail && e.detail.cartCount !== undefined
      ? e.detail.cartCount
      : 0;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });

})();
