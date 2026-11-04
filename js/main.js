/* =====================================================================
   حملة شبر أخضر — main.js (unique layouts per section)
   ===================================================================== */

(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ICONS = {
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    drop: '<svg viewBox="0 0 24 24"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>',
    soil: '<svg viewBox="0 0 24 24"><path d="M3 18h18M5 14c2-1 4-1 6 0s4 1 6 0M12 14V8M12 8c-2 0-3-2-3-4 2 0 3 1 3 4zM12 8c2 0 3-2 3-4-2 0-3 1-3 4z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24"><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z"/><path d="M5 19c3-4 6-7 10-10"/></svg>',
    scissors: '<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12"/></svg>',
    light: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2"/></svg>',
    water: '<svg viewBox="0 0 24 24"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.6-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.4-9 9-9 9z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4V14h2.8v8h3.3z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.3 1.7 3.8 4 4v3.1c-1.5 0-2.8-.4-4-1.2v6.3a5.6 5.6 0 1 1-4.8-5.5v3.2a2.5 2.5 0 1 0 1.7 2.3V3h3.1z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2c-.2-1.5-1-2.4-2.5-2.6C17.6 5.3 12 5.3 12 5.3s-5.6 0-7.5.3C3 5.8 2.2 6.7 2 8.2 1.8 9.6 1.8 12 1.8 12s0 2.4.2 3.8c.2 1.5 1 2.4 2.5 2.6 1.9.3 7.5.3 7.5.3s5.6 0 7.5-.3c1.5-.2 2.3-1.1 2.5-2.6.2-1.4.2-3.8.2-3.8s0-2.4-.2-3.8zM10 15V9l5.2 3L10 15z"/></svg>',
  };
  const icon = (name) => ICONS[name] || "";

  const fmtDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("ar-EG-u-nu-latn", { day: "numeric", month: "long", year: "numeric" });
  };
  const fmtNum = (n) => new Intl.NumberFormat("ar-EG-u-nu-latn").format(n);
  const difficultyLabel = (n) => ({ 1: "سهل جدًا", 2: "سهل", 3: "متوسط" }[n] || "سهل");
  const difficultyClass = (n) => (n === 1 ? "pill--lime" : n === 2 ? "pill--yellow" : "pill--soft");

  function renderHero() {
    $("#hero-desc").textContent = SITE.description;
    $("#footer-desc").textContent = SITE.description;
    $("#year").textContent = new Date().getFullYear();

    const video = $("#ad-video");
    const stage = $("#video-card");
    const play = $("#video-play");
    video.poster = VIDEO.poster;
    video.src = VIDEO.src;
    video.setAttribute("aria-label", VIDEO.title);
    $("#video-duration").textContent = VIDEO.duration;
    $("#video-note").textContent = VIDEO.note;

    play.addEventListener("click", () => {
      stage.classList.add("is-playing");
      video.controls = true;
      video.play().catch(() => {});
    });
    video.addEventListener("ended", () => {
      stage.classList.remove("is-playing");
      video.controls = false;
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => entries.forEach((e) => !e.isIntersecting && !video.paused && video.pause()),
        { threshold: 0.2 }
      ).observe(video);
    }
  }

  function renderStats() {
    $("#stats-grid").innerHTML = STATS.map(
      (s) => `
      <div class="ribbon__item">
        <div class="ribbon__value">${esc(s.value)}</div>
        <div class="ribbon__label">${esc(s.label)}</div>
        <p class="ribbon__note">${esc(s.note)}</p>
      </div>`
    ).join("");
  }

  let activePlatform = "all";

  function updatePhonePreview(list) {
    const phone = $("#phone-preview");
    if (!phone) return;
    const first = list[0] || POSTS[0];
    phone.innerHTML = first
      ? `<img src="${esc(first.image)}" alt="" loading="lazy" />`
      : "";
  }

  function renderFilters() {
    const platforms = ["all", ...new Set(POSTS.map((p) => p.platform))];
    $("#post-filters").innerHTML = platforms
      .map(
        (p) =>
          `<button class="filter" data-platform="${p}" aria-pressed="${p === activePlatform}">${esc(PLATFORM_LABELS[p] || p)}</button>`
      )
      .join("");
    $("#post-filters").addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      activePlatform = btn.dataset.platform;
      document.querySelectorAll(".filter").forEach((b) => b.setAttribute("aria-pressed", b === btn));
      renderPosts();
    });
  }

  function renderPosts() {
    const list = activePlatform === "all" ? POSTS : POSTS.filter((p) => p.platform === activePlatform);
    const grid = $("#posts-grid");
    updatePhonePreview(list);
    if (!list.length) {
      grid.innerHTML = `<p class="feed__empty">مفيش بوستات على المنصة دي لسه.</p>`;
      return;
    }
    grid.innerHTML = list
      .map(
        (p, i) => `
      <article class="post-row reveal" style="--delay:${(i % 4) * 0.05}s">
        <div class="post-row__media">
          <img src="${esc(p.image)}" alt="" loading="lazy" width="400" height="400" />
          <span class="post-row__platform">${icon(p.platform)} ${esc(PLATFORM_LABELS[p.platform] || p.platform)}</span>
        </div>
        <div class="post-row__body">
          <p class="post-row__caption">${esc(p.caption)}</p>
          <div class="post-row__meta">
            <span>${icon("calendar")} <time datetime="${esc(p.date)}">${fmtDate(p.date)}</time></span>
            <span>${icon("heart")} ${fmtNum(p.likes)}</span>
          </div>
        </div>
      </article>`
      )
      .join("");
    observeReveals(grid);
  }

  function renderBasics() {
    $("#basics-grid").innerHTML = CARE_BASICS.map(
      (b, i) => `
      <li class="timeline__step reveal" style="--delay:${i * 0.06}s">
        <div class="timeline__node" aria-hidden="true">${i + 1}</div>
        <div class="timeline__card">
          <div class="timeline__icon" aria-hidden="true">${icon(b.icon)}</div>
          <div>
            <h4>${esc(b.title)}</h4>
            <p>${esc(b.text)}</p>
          </div>
        </div>
      </li>`
    ).join("");
  }

  function renderPlants() {
    const rail = $("#plants-grid");
    rail.innerHTML = PLANTS.map(
      (p) => `
      <article class="plant-panel">
        <div class="plant-panel__media">
          <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" width="800" height="640" />
          <span class="pill ${difficultyClass(p.difficulty)} plant-panel__diff">${difficultyLabel(p.difficulty)}</span>
        </div>
        <div class="plant-panel__body">
          <div class="plant-panel__title">
            <h4>${esc(p.name)}</h4>
            <small>${esc(p.latin)}</small>
          </div>
          <ul class="plant-panel__specs">
            <li>${icon("light")}<div><b>الإضاءة</b><span>${esc(p.light)}</span></div></li>
            <li>${icon("water")}<div><b>الري</b><span>${esc(p.water)}</span></div></li>
          </ul>
          <p class="plant-panel__benefit">${esc(p.benefit)}</p>
          <p class="plant-panel__tip">${esc(p.tip)}</p>
        </div>
      </article>`
    ).join("");

    const scrollBy = () => Math.min(rail.clientWidth * 0.85, 360);
    $("#plants-prev").addEventListener("click", () => rail.scrollBy({ left: scrollBy(), behavior: "smooth" }));
    $("#plants-next").addEventListener("click", () => rail.scrollBy({ left: -scrollBy(), behavior: "smooth" }));
  }

  function renderArticles() {
    const [featured, ...rest] = ARTICLES;
    const stack = rest
      .map(
        (a) => `
      <article class="mag-item reveal">
        <div class="mag-item__media">
          <img src="${esc(a.image)}" alt="" loading="lazy" width="240" height="240" />
        </div>
        <div class="mag-item__body">
          <span class="pill pill--soft">${esc(a.category)}${a.source === "pdf" ? " · من ملف الحملة" : ""}</span>
          <h4>${esc(a.title)}</h4>
          <p>${esc(a.excerpt)}</p>
          <div class="mag-item__meta">${fmtDate(a.date)} · ${esc(a.readTime)}</div>
        </div>
      </article>`
      )
      .join("");

    $("#articles-grid").innerHTML = `
      <article class="mag-feature reveal">
        <div class="mag-feature__media">
          <img src="${esc(featured.image)}" alt="" loading="lazy" width="1200" height="900" />
        </div>
        <div class="mag-feature__body">
          <span class="pill pill--yellow">${esc(featured.category)}${featured.source === "pdf" ? " · من ملف الحملة" : ""}</span>
          <h3>${esc(featured.title)}</h3>
          <p>${esc(featured.excerpt)}</p>
          <div class="mag-feature__meta">
            <span>${fmtDate(featured.date)} · ${esc(featured.readTime)}</span>
            <a href="#articles" class="mag-feature__link" aria-label="اقرأ المقال: ${esc(featured.title)}">اقرأ المقال ←</a>
          </div>
        </div>
      </article>
      <div class="mag-stack">${stack}</div>`;
  }

  function renderFooter() {
    $("#footer-goals").innerHTML = GOALS.map((g) => `<li>${esc(g)}</li>`).join("");
    $("#footer-social").innerHTML = SOCIAL.map(
      (s) => `<li><a href="${esc(s.url)}" aria-label="${esc(s.name)}" title="${esc(s.name)}">${icon(s.icon)}</a></li>`
    ).join("");
  }

  function initNav() {
    const nav = $("#nav");
    const toggle = $("#nav-toggle");
    const links = $("#nav-links");

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
    });
    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = ["ad", "posts", "care", "articles"].map((id) => document.getElementById(id)).filter(Boolean);
    const anchors = [...links.querySelectorAll("a")];
    if ("IntersectionObserver" in window) {
      const secObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              anchors.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
            }
          });
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      sections.forEach((s) => secObs.observe(s));
    }
  }

  let _revealObs;
  function observeReveals(root = document) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = root.querySelectorAll(".reveal:not(.is-visible)");
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    _revealObs =
      _revealObs ||
      new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    els.forEach((el) => _revealObs.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderHero();
    renderStats();
    renderFilters();
    renderPosts();
    renderBasics();
    renderPlants();
    renderArticles();
    renderFooter();
    initNav();
    observeReveals();
  });
})();
