/**
 * autolinkr-product.js
 * AutoLinkr Product Page — Gallery, Variant Selector, ATC, Sticky Bar, FAQ
 * Phase C — ConceptThemePerplexity
 *
 * Extracted from inline scripts in autolinkr-product-hero.liquid
 * and autolinkr-product-features.liquid for caching + performance.
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     GALLERY — thumbnail click → swap main image
  ───────────────────────────────────────────── */
  function initGallery() {
    var thumbs = document.querySelectorAll('.al-pdp-gallery__thumb');
    var slides = document.querySelectorAll('.al-pdp-gallery__slide');
    if (!thumbs.length) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var mediaId = thumb.getAttribute('data-media-id');
        thumbs.forEach(function (t) {
          t.classList.remove('is-active');
          t.setAttribute('aria-pressed', 'false');
        });
        slides.forEach(function (s) { s.classList.remove('is-active'); });
        thumb.classList.add('is-active');
        thumb.setAttribute('aria-pressed', 'true');
        var target = document.querySelector(
          '.al-pdp-gallery__slide[data-media-id="' + mediaId + '"]'
        );
        if (target) target.classList.add('is-active');
      });
    });

    // Keyboard: arrow left/right to navigate thumbnails
    thumbs.forEach(function (thumb, idx) {
      thumb.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' && thumbs[idx + 1]) {
          thumbs[idx + 1].click();
          thumbs[idx + 1].focus();
        }
        if (e.key === 'ArrowLeft' && thumbs[idx - 1]) {
          thumbs[idx - 1].click();
          thumbs[idx - 1].focus();
        }
      });
    });
  }

  /* ─────────────────────────────────────────────
     VARIANT SELECTOR
  ───────────────────────────────────────────── */
  function initVariantSelector() {
    var optionBtns = document.querySelectorAll('.al-pdp-info__option-btn');
    if (!optionBtns.length) return;

    optionBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.classList.contains('is-sold-out')) return;
        var optionIndex = btn.getAttribute('data-option-index');
        var value       = btn.getAttribute('data-option-value');
        var variantId   = btn.getAttribute('data-variant-id');

        // Update selected state in this option group
        document.querySelectorAll(
          '.al-pdp-info__option-btn[data-option-index="' + optionIndex + '"]'
        ).forEach(function (b) {
          b.classList.remove('is-selected');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-selected');
        btn.setAttribute('aria-pressed', 'true');

        // Update visible label
        var label = document.querySelector(
          '[data-option-selected="' + optionIndex + '"]'
        );
        if (label) label.textContent = value;

        // Update variant ID in the form
        var variantInput = document.querySelector('[data-variant-id]');
        if (variantInput && variantId) variantInput.value = variantId;

        // Update price display by fetching variant JSON
        if (variantId) updatePrice(variantId);
      });
    });
  }

  function updatePrice(variantId) {
    // Fetch variant data from Shopify AJAX API
    var handle = document.querySelector('[data-product-id]')
      ? window.location.pathname.split('/').pop()
      : null;
    if (!handle) return;

    fetch('/products/' + handle + '.js')
      .then(function (r) { return r.json(); })
      .then(function (product) {
        var variant = product.variants.find(function (v) {
          return String(v.id) === String(variantId);
        });
        if (!variant) return;

        var priceEl   = document.querySelector('[data-price]');
        var compareEl = document.querySelector('[data-compare-price]');
        var atcPrice  = document.querySelector('[data-atc-price]');
        var stickyPrice = document.querySelector('[data-sticky-price]');
        var atcBtn    = document.querySelector('[data-add-to-cart]');

        if (priceEl) priceEl.textContent = formatMoney(variant.price);
        if (stickyPrice) stickyPrice.textContent = formatMoney(variant.price);
        if (atcPrice) atcPrice.textContent = '— ' + formatMoney(variant.price);

        if (compareEl) {
          if (variant.compare_at_price > variant.price) {
            compareEl.textContent = formatMoney(variant.compare_at_price);
            compareEl.style.display = '';
          } else {
            compareEl.style.display = 'none';
          }
        }

        if (atcBtn) {
          if (variant.available) {
            atcBtn.disabled = false;
            atcBtn.classList.remove('al-pdp-atc--sold-out');
            var label = atcBtn.querySelector('[data-atc-label]');
            if (label) label.textContent = 'Add to Cart';
          } else {
            atcBtn.disabled = true;
            atcBtn.classList.add('al-pdp-atc--sold-out');
            var label = atcBtn.querySelector('[data-atc-label]');
            if (label) label.textContent = 'Sold Out';
            var atcPriceEl = atcBtn.querySelector('[data-atc-price]');
            if (atcPriceEl) atcPriceEl.textContent = '';
          }
        }
      })
      .catch(function () {});
  }

  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2).replace(/\.00$/, '');
  }

  /* ─────────────────────────────────────────────
     ADD TO CART — AJAX + loading state
  ───────────────────────────────────────────── */
  function initATC() {
    var form = document.getElementById('al-pdp-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn     = form.querySelector('[data-add-to-cart]');
      var spinner = btn ? btn.querySelector('.al-pdp-atc__spinner') : null;
      var label   = btn ? btn.querySelector('[data-atc-label]') : null;
      var price   = btn ? btn.querySelector('[data-atc-price]') : null;
      var variantId = form.querySelector('[data-variant-id]').value;

      if (!variantId) return;
      if (btn) btn.classList.add('is-loading');
      if (spinner) spinner.classList.remove('al-hidden');

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify({ id: variantId, quantity: 1 })
      })
        .then(function (r) { return r.json(); })
        .then(function (item) {
          // Update cart count badge
          return fetch('/cart.js');
        })
        .then(function (r) { return r.json(); })
        .then(function (cart) {
          // Fire cart:updated event for header badge + Rebuy
          document.dispatchEvent(new CustomEvent('cart:updated', {
            detail: { cartCount: cart.item_count, cart: cart }
          }));
          // Reset button to success state briefly
          if (btn) btn.classList.remove('is-loading');
          if (spinner) spinner.classList.add('al-hidden');
          if (label) {
            label.textContent = 'Added ✓';
            setTimeout(function () { label.textContent = 'Add to Cart'; }, 2000);
          }
          // Open cart drawer (Concept theme fires this event)
          document.dispatchEvent(new CustomEvent('theme:cart:open'));
        })
        .catch(function () {
          if (btn) btn.classList.remove('is-loading');
          if (spinner) spinner.classList.add('al-hidden');
          if (label) label.textContent = 'Try Again';
          setTimeout(function () { if (label) label.textContent = 'Add to Cart'; }, 2500);
        });
    });
  }

  /* ─────────────────────────────────────────────
     STICKY ATC BAR — IntersectionObserver
  ───────────────────────────────────────────── */
  function initStickyATC() {
    var hero   = document.getElementById('al-pdp-hero');
    var sticky = document.getElementById('al-sticky-atc');
    if (!hero || !sticky) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          sticky.classList.add('is-visible');
          sticky.setAttribute('aria-hidden', 'false');
        } else {
          sticky.classList.remove('is-visible');
          sticky.setAttribute('aria-hidden', 'true');
        }
      });
    }, { threshold: 0, rootMargin: '-120px 0px 0px 0px' });

    observer.observe(hero);

    // Sticky ATC click → trigger main form submit
    var stickyBtn = sticky.querySelector('[data-sticky-atc]');
    if (stickyBtn) {
      stickyBtn.addEventListener('click', function () {
        var mainForm = document.getElementById('al-pdp-form');
        if (mainForm) mainForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      });
    }
  }

  /* ─────────────────────────────────────────────
     FAQ ACCORDION
  ───────────────────────────────────────────── */
  function initFAQ() {
    var items = document.querySelectorAll('.al-faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var trigger = item.querySelector('.al-faq-item__trigger');
      if (!trigger) return;
      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        items.forEach(function (i) {
          i.classList.remove('is-open');
          var t = i.querySelector('.al-faq-item__trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          // Smooth scroll body so the answer is visible
          var body = item.querySelector('.al-faq-item__body');
          if (body) {
            setTimeout(function () {
              body.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 50);
          }
        }
      });
      // Keyboard: Enter/Space
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });
    });
  }

  /* ─────────────────────────────────────────────
     INIT — run after DOM ready
  ───────────────────────────────────────────── */
  function init() {
    initGallery();
    initVariantSelector();
    initATC();
    initStickyATC();
    initFAQ();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
