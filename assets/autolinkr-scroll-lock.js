/**
 * Ref-counted viewport scroll lock (position:fixed + scroll restore).
 * overflow:hidden on body is not enough on iOS; this blocks scroll behind drawers/menus.
 */
(function () {
  'use strict';

  let lockCount = 0;
  let savedScrollY = 0;

  function acquire() {
    if (lockCount === 0) {
      savedScrollY = window.scrollY;
      const body = document.body;
      body.style.position = 'fixed';
      body.style.top = '-' + savedScrollY + 'px';
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
    }
    lockCount += 1;
  }

  function release() {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount !== 0) return;
    const body = document.body;
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.width = '';
    document.documentElement.style.overflow = '';
    window.scrollTo(0, savedScrollY);
  }

  window.AutoLinkrScrollLock = { acquire: acquire, release: release };

  function bindMenuDrawer() {
    var drawer = document.getElementById('MenuDrawer');
    if (!drawer) return;
    drawer.addEventListener('drawer:afterShow', function () {
      acquire();
    });
    drawer.addEventListener('drawer:afterHide', function () {
      release();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindMenuDrawer);
  } else {
    bindMenuDrawer();
  }
})();
