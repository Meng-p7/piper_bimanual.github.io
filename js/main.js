/* =========================================
   Piper Bimanual Towel — Interactions
   v3 (2026-09-02 晚)
   ========================================= */

(function () {
  'use strict';

  // ---------- SCROLL PROGRESS ----------
  const bar = document.getElementById('scrollBar');
  if (bar) {
    const updateBar = () => {
      const h = document.documentElement;
      const ratio = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      bar.style.width = (ratio * 100).toFixed(2) + '%';
    };
    document.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  }

  // ---------- MOBILE NAV ----------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav__menu');
  const closeMobileMenu = () => {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.style.display = '';
  };
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.classList.toggle('is-active', open);
      navMenu.style.display = open ? 'flex' : '';
    });
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => { closeMobileMenu(); });
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 820) closeMobileMenu();
    });
  }

  // ---------- REVEAL ON SCROLL ----------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // ---------- TIMELINE SCROLL-LINKED HIGHLIGHT ----------
  const tnodes = document.querySelectorAll('#timeline .tnode');
  if ('IntersectionObserver' in window && tnodes.length) {
    const tio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('in-view');
      });
    }, { threshold: 0.4 });
    tnodes.forEach((n) => tio.observe(n));
  } else {
    tnodes.forEach((n) => n.classList.add('in-view'));
  }

  // ---------- BUTTON RIPPLE ----------
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
      ripple.style.width = ripple.style.height = size + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // ---------- TOUCH HOVER DISABLE ----------
  const isTouch = matchMedia('(hover: none)').matches;
  if (isTouch) {
    document.querySelectorAll('.node, .chip, .tnode, .hil-step, .color-card, .result-video, .note-card')
      .forEach(el => el.style.cursor = 'default');
  }

  // ---------- ARCH SPOTLIGHT ----------
  const arch = document.querySelector('.arch');
  if (arch && !isTouch) {
    arch.addEventListener('mousemove', (e) => {
      const nodes = arch.querySelectorAll('.node');
      const r = arch.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      nodes.forEach((n) => {
        const rr = n.getBoundingClientRect();
        const nx = (rr.left + rr.width / 2 - r.left) / r.width;
        const ny = (rr.top + rr.height / 2 - r.top) / r.height;
        const d = Math.hypot(nx - x, ny - y);
        const opacity = Math.max(0, 1 - d * 2.4);
        n.style.boxShadow = opacity > 0
          ? `0 10px 30px rgba(109,40,217,${(opacity * 0.18).toFixed(3)})`
          : '';
      });
    });
    arch.addEventListener('mouseleave', () => {
      arch.querySelectorAll('.node').forEach((n) => n.style.boxShadow = '');
    });
  }

  // ---------- MEDIA MANIFEST (auto-fill + graceful fallback) ----------
  // 媒体路径集中在 js/media.js，这里负责把路径填进页面。
  // 中文页在 /zh-cn/ 下，需要 ../assets/ 前缀；英文页用 assets/。
  (function initMedia() {
    const M = window.PIPER_MEDIA;
    if (!M) return;

    const isZh = location.pathname.indexOf('/zh-cn/') !== -1;
    const base = isZh ? '../assets/' : 'assets/';

    // 切换「真图 ↔ TODO 占位块」
    const showImage = (container, img, ok) => {
      const fb = container.querySelector('[data-media-fallback]');
      if (ok) {
        img.hidden = false;
        if (fb) fb.hidden = true;
        container.classList.add('has-media');
      } else {
        img.hidden = true;
        if (fb) fb.hidden = false;
        container.classList.remove('has-media');
      }
    };

    const hideImg = (img) => { img.style.display = 'none'; };

    document.querySelectorAll('[data-media]').forEach((el) => {
      const key = el.getAttribute('data-media');
      const entry = M[key];
      if (!entry || !entry.file) return;
      const url = base + entry.file;

      /* --- <video data-media="..."> --- */
      if (el.tagName === 'VIDEO') {
        if (entry.poster) el.poster = base + entry.poster;
        let src = el.querySelector('source');
        if (!src) {
          src = document.createElement('source');
          src.type = 'video/mp4';
          el.appendChild(src);
        }
        src.src = url;
        try { el.load(); } catch (e) { /* ignore */ }
        return;
      }

      /* --- <img data-media="..."> --- */
      if (el.tagName === 'IMG') {
        if (entry.label) el.alt = entry.label;
        el.addEventListener('load',  () => { el.style.display = ''; });
        el.addEventListener('error', () => hideImg(el));
        el.src = url;
        return;
      }

      /* --- 容器：[data-media] 里含 [data-media-img] --- */
      const img = el.querySelector('[data-media-img]');
      if (img) {
        if (entry.label) img.alt = entry.label;
        img.addEventListener('load',  () => showImage(el, img, true));
        img.addEventListener('error', () => showImage(el, img, false));
        img.src = url;
      }
    });
  })();

  // ---------- LOG READY ----------
  document.documentElement.classList.add('is-ready');
})();
