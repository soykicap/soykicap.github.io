/* Site behaviour. You shouldn't need to edit this file —
   all text and images live in content.js. */
(() => {
  const data = window.PORTFOLIO;
  const P = data.projects;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reflow = (el) => void el.offsetWidth;
  const SPEED = 1200; // keep in step with --speed in style.css

  let current = 0;
  let busy = false;
  let mode = "home"; // "home" | "index"

  /* ---------- custom title fonts ---------- */
  const fontCSS = (data.fonts || []).map((f) =>
    `@font-face{font-family:"${f.name}";src:url("${f.file}");font-display:swap;}`).join("");
  document.head.insertAdjacentHTML("beforeend", `<style>${fontCSS}</style>`);
  const focus = (p) => (p.coverFocus ? `object-position:${esc(p.coverFocus)};` : "");
  // tall screens (phones held upright) show each project's single "card" photo instead of the wide cover
  const TALL = "(max-aspect-ratio: 4/5)";
  const cardOf = (p) => p.card || p.cover;
  const cardStyle = (p) => (p.card ? "" : focus(p));
  const coverPic = (p, alt, extra = "") =>
    `<picture>${p.card ? `<source media="${TALL}" srcset="${esc(p.card)}">` : ""}<img style="${focus(p)}" src="${esc(p.cover)}" alt="${alt}" ${extra}></picture>`;
  const titleFont = (p) => (p.titleFont ? `font-family:"${esc(p.titleFont)}", var(--font-display);` : "");

  /* ---------- slides = projects, plus the archive as the last slide ---------- */
  const arc = data.archive;
  const arcCount = arc ? arc.groups.reduce((n, g) => n + g.images.length, 0) : 0;
  const S = P.slice();
  if (arc && arc.cover) S.push({
    title: arc.title || "Archive", isArchive: true, year: "",
    category: arc.category || `Unedited frames, extras & school work · ${arcCount} photos`,
    cover: arc.cover, card: arc.card,
  });

  /* ---------- build the page from content.js ---------- */
  $("[data-name]").textContent = data.name;
  $("[data-role]").textContent = data.role;
  document.title = `${data.name} — ${data.role}`;
  $("[data-total]").textContent = pad(S.length);

  const slidesEl = $(".stage__slides");
  const thumbsEl = $(".stage__thumbs");
  const track = $(".index__track");

  S.forEach((p, i) => {
    slidesEl.insertAdjacentHTML("beforeend",
      `<div class="slide">
         <div class="slide__inner">${coverPic(p, `${esc(p.title)} — ${esc(p.category)}`, 'decoding="async"')}</div>
         <div class="slide__shade"></div>
         <div class="slide__curtain slide__curtain--l"></div><div class="slide__curtain slide__curtain--r"></div>
       </div>`);
    thumbsEl.insertAdjacentHTML("beforeend",
      `<button type="button" aria-label="Show ${esc(p.title)}"><img style="${cardStyle(p)}" src="${esc(cardOf(p))}" alt="" decoding="async"></button>`);
    track.insertAdjacentHTML("beforeend",
      `<button type="button" class="card">
         <div class="card__img"><img style="${cardStyle(p)}" src="${esc(cardOf(p))}" alt="" decoding="async"></div>
         <div class="card__cap"><span class="card__num">${pad(i + 1)}</span>
           <span><span class="card__title" style='${titleFont(p)}'>${esc(p.title)}</span><span class="card__cat">${esc(p.category)}</span></span></div>
       </button>`);
  });

  const slides = $$(".slide");
  const thumbs = $$(".stage__thumbs button");
  const cards = $$(".card");
  const titleEl = $(".stage__title");
  const metaEl = $(".stage__meta");
  const viewBtn = $(".stage__view");

  // images inside a container fade in when ready
  function fadeImages(root) {
    $$("img", root).forEach((img) => {
      img.classList.add("fade");
      const done = () => requestAnimationFrame(() => img.classList.add("is-loaded"));
      if (img.complete && img.naturalWidth) done();
      else img.addEventListener("load", done, { once: true });
    });
  }

  /* ---------- caption: old title slides up and out, new one rises in ---------- */
  let captionTimer;
  function setCaption(i, animateOut = true) {
    clearTimeout(captionTimer);
    const p = S[i];
    $("[data-current]").textContent = pad(i + 1);
    thumbs.forEach((t, k) => t.classList.toggle("is-active", k === i));
    const swap = () => {
      $("[data-cat]").textContent = p.category;
      $("[data-year]").textContent = p.year;
      metaEl.classList.remove("is-out");
      titleEl.classList.remove("is-in", "is-out");
      titleEl.style.cssText = titleFont(p);
      $("button", titleEl).innerHTML = p.title.split(" ")
        .map((w, k) => `<span class="mask"><span class="word" style="--w:${k}">${esc(w)}</span></span>`).join(" ");
      viewBtn.textContent = p.isArchive ? "View archive" : "View project";
      viewBtn.classList.remove("is-in", "is-out");
      viewBtn.style.setProperty("--vd", `${0.35 + p.title.split(" ").length * 0.08}s`);
      reflow(titleEl);
      titleEl.classList.add("is-in");
      viewBtn.classList.add("is-in");
    };
    if (animateOut && titleEl.classList.contains("is-in")) {
      titleEl.classList.add("is-out");
      metaEl.classList.add("is-out");
      viewBtn.classList.add("is-out");
      captionTimer = setTimeout(swap, 420);
    } else swap();
  }

  /* ---------- slide change ---------- */
  function goTo(i, dir = i > current ? 1 : -1) {
    i = (i + S.length) % S.length;
    if (i === current || busy || mode !== "home") return;
    busy = true;
    const prev = slides[current];
    const next = slides[i];
    slides.forEach((s) => { if (s !== prev) s.classList.remove("is-leaving"); });
    prev.style.setProperty("--drift", dir > 0 ? "-18%" : "18%");
    prev.classList.remove("is-active");
    prev.classList.add("is-leaving");
    next.classList.remove("is-active", "is-leaving");
    next.classList.toggle("from-left", dir < 0);
    reflow(next);
    next.classList.add("is-active");
    current = i;
    setCaption(i);
    setTimeout(() => { busy = false; }, SPEED * 0.75);
    setTimeout(() => { if (!prev.classList.contains("is-active")) prev.classList.remove("is-leaving"); }, SPEED + 50);
  }

  // jump without animation (used when leaving the index)
  function setInstant(i) {
    document.body.classList.add("is-snapping");
    slides.forEach((s) => s.classList.remove("is-active", "is-leaving", "from-left"));
    slides[i].classList.add("is-active");
    reflow(slides[i]);
    document.body.classList.remove("is-snapping");
    if (i !== current) { current = i; setCaption(i, false); }
  }

  /* ---------- index mode (cards row) ---------- */
  // work out how to shrink the full-screen image so it lands exactly on a card
  function cardFit(card, lift = 0) {
    const r = $(".card__img", card).getBoundingClientRect();
    const k = r.height / innerHeight;
    const side = Math.max(0, (innerWidth - r.width / k) / 2);
    const x = r.left + r.width / 2 - (innerWidth * k) / 2;
    const y = r.top - lift;
    const s = document.body.style;
    s.setProperty("--card-transform", `translate3d(${x}px, ${y}px, 0) scale(${k})`);
    s.setProperty("--side", `${side + 1}px`);
  }

  let targetX = 0, animating = false;
  function centreOn(i) {
    const c = cards[i];
    track.scrollLeft = c.offsetLeft + c.offsetWidth / 2 - track.clientWidth / 2;
    targetX = track.scrollLeft;
  }

  function enterIndex() {
    if (mode === "index" || busy) return;
    mode = "index";
    busy = true;
    centreOn(current);
    cards.forEach((c, k) => {
      c.classList.toggle("is-origin", k === current);
      c.style.setProperty("--d", Math.abs(k - current));
    });
    cardFit(cards[current], 60);
    document.body.classList.add("is-index");
    setTimeout(() => { busy = false; }, SPEED);
  }

  function exitIndex() {
    if (mode !== "index" || busy) return;
    // return to whichever card is nearest the middle of the screen
    const mid = innerWidth / 2;
    let best = 0, bestD = Infinity;
    cards.forEach((c, k) => {
      const r = c.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestD) { bestD = d; best = k; }
    });
    document.body.classList.add("is-snapping");
    cardFit(cards[best]);
    setInstant(best);
    mode = "home";
    busy = true;
    requestAnimationFrame(() => document.body.classList.remove("is-index"));
    setTimeout(() => { busy = false; }, SPEED);
  }

  // smooth horizontal scrolling with the mouse wheel
  function glide() {
    const d = targetX - track.scrollLeft;
    if (Math.abs(d) < 0.5) { animating = false; return; }
    track.scrollLeft += d * 0.1;
    requestAnimationFrame(glide);
  }
  track.addEventListener("scroll", () => { if (!animating) targetX = track.scrollLeft; }, { passive: true });

  let upPull = 0;
  addEventListener("wheel", (e) => {
    if ($(".panel.is-open") || lbOpen()) return;
    e.preventDefault();
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (mode === "home") {
      if (e.deltaY > 20) enterIndex();
      else if (Math.abs(e.deltaX) > 30 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) goTo(current + Math.sign(e.deltaX));
      return;
    }
    if (busy) return;
    const max = track.scrollWidth - track.clientWidth;
    if (delta < 0 && track.scrollLeft <= 1) {
      upPull += -delta;
      if (upPull > 160) { upPull = 0; exitIndex(); }
      return;
    }
    upPull = 0;
    targetX = Math.max(0, Math.min(max, targetX + delta));
    if (!animating) { animating = true; requestAnimationFrame(glide); }
  }, { passive: false });

  /* ---------- touch: swipe sideways for next/prev, up for index ---------- */
  let tx = 0, ty = 0;
  $(".stage").addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  $(".stage").addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) goTo(current + (dx < 0 ? 1 : -1));
    else if (dy < -60) enterIndex();
  });

  /* ---------- project + about panels ---------- */
  const projectPanel = $(".project");
  const aboutPanel = $(".about");
  const archivePanel = $(".archive");
  let io;

  function watchReveals(panel) {
    io && io.disconnect();
    io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { root: panel, threshold: 0.12 });
    $$(".reveal", panel).forEach((el) => io.observe(el));
  }

  // landscape shots go full width, portrait shots sit in pairs; a leftover portrait is centred
  function layoutGallery(gal) {
    const figs = $$("figure", gal);
    const apply = () => {
      let run = [];
      const flush = () => { if (run.length % 2) run[run.length - 1].classList.add("solo"); run = []; };
      figs.forEach((f) => {
        f.classList.remove("wide", "solo");
        const im = $("img", f);
        if (im.naturalWidth && im.naturalWidth > im.naturalHeight) { flush(); f.classList.add("wide"); }
        else run.push(f);
      });
      flush();
    };
    figs.forEach((f) => { const im = $("img", f); if (!im.complete) im.addEventListener("load", apply, { once: true }); });
    apply();
  }

  /* ---------- 3D models (loaded only when a project has them) ---------- */
  const MV_SRC = "https://cdn.jsdelivr.net/npm/@google/model-viewer@4.4.0/dist/model-viewer.min.js";
  function ensureModelViewer() {
    if (window.customElements && customElements.get("model-viewer")) return;
    if (document.querySelector("script[data-mv]")) return;
    const sc = document.createElement("script");
    sc.type = "module"; sc.src = MV_SRC; sc.dataset.mv = "1";
    document.head.appendChild(sc);
  }
  function renderModels(models) {
    return `<div class="models">${models.map((m) => `
      <figure class="model reveal">
        <div class="model__stage">
          <model-viewer data-src="${esc(m.src)}" alt="${esc(m.name)}" camera-controls disable-zoom touch-action="pan-y"
            auto-rotate auto-rotate-delay="1500" rotation-per-second="14deg" interaction-prompt="none"
            camera-orbit="${esc(m.orbit || "30deg 70deg auto")}" environment-image="legacy" exposure="0.75" tone-mapping="agx"
            shadow-intensity="1.5" shadow-softness="0.9" loading="lazy" reveal="auto"
            ar ar-modes="webxr scene-viewer quick-look" ar-scale="fixed"
            data-color="${esc(m.color || "#e8e3da")}" data-rough="${m.roughness ?? 0.55}" data-metal="${m.metalness ?? 0}">
            <button slot="ar-button" class="model__ar">View in your space</button>
            <div slot="progress-bar"></div>
          </model-viewer>
          <div class="model__tools">
            <button type="button" data-zoom="1" aria-label="Zoom in">+</button>
            <button type="button" data-zoom="-1" aria-label="Zoom out">−</button>
            <button type="button" data-reset aria-label="Reset view">↺</button>
          </div>
          <p class="model__hint">Drag to rotate</p>
        </div>
        <figcaption>
          <h4>${esc(m.name)}</h4>
          ${m.caption ? `<p>${esc(m.caption)}</p>` : ""}
          ${m.size ? `<span>${esc(m.size)}</span>` : ""}
        </figcaption>
      </figure>`).join("")}</div>`;
  }
  // Use the .glb file directly; if the host can't serve it (e.g. a preview), fall back to a packed copy in models/<name>.glb.js
  async function resolveModel(src) {
    try { const r = await fetch(src, { method: "HEAD" }); if (r.ok) return src; } catch (e) {}
    const key = src;
    if (!(window.__MODELS && window.__MODELS[key])) {
      await new Promise((res) => { const sc = document.createElement("script"); sc.src = src + ".js"; sc.onload = sc.onerror = res; document.head.appendChild(sc); });
    }
    const b64 = window.__MODELS && window.__MODELS[key];
    if (!b64) return src;
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    return URL.createObjectURL(new Blob([bytes], { type: "model/gltf-binary" }));
  }
  function wireModels(root) {
    const mvs = $$("model-viewer", root);
    if (!mvs.length) return;
    ensureModelViewer();
    // only fetch a model once it's close to the screen
    const near = new IntersectionObserver((entries) => entries.forEach(async (en) => {
      if (!en.isIntersecting) return;
      near.unobserve(en.target);
      en.target.src = await resolveModel(en.target.dataset.src);
    }), { root: projectPanel, rootMargin: "400px 0px" });
    mvs.forEach((mv) => near.observe(mv));
    mvs.forEach((mv) => {
      mv.addEventListener("load", () => {
        const hex = mv.dataset.color.replace("#", "");
        const rgb = [0, 2, 4].map((k) => parseInt(hex.slice(k, k + 2), 16) / 255);
        (mv.model ? mv.model.materials : []).forEach((mat) => {
          const pbr = mat.pbrMetallicRoughness;
          pbr.setBaseColorFactor([...rgb, 1]);
          pbr.setRoughnessFactor(+mv.dataset.rough);
          pbr.setMetallicFactor(+mv.dataset.metal);
        });
        mv.closest(".model").classList.add("is-ready");
      });
      const fig = mv.closest(".model");
      ["pointerdown", "touchstart"].forEach((ev) => mv.addEventListener(ev, () => fig.classList.add("is-touched"), { once: true, passive: true }));
      $$("[data-zoom]", fig).forEach((b) => b.addEventListener("click", () => {
        if (mv.zoom) mv.zoom(+b.dataset.zoom * 6);
      }));
      $("[data-reset]", fig).addEventListener("click", () => {
        mv.cameraOrbit = mv.getAttribute("camera-orbit"); mv.fieldOfView = "auto"; mv.cameraTarget = "auto auto auto";
      });
    });
  }

  function renderProject(i) {
    const p = P[i];
    const n = (i + 1) % P.length;
    const details = Object.entries(p.details || {}).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
    const sections = p.sections || (p.gallery ? [{ title: "", images: p.gallery }] : []);
    const gallery = sections.map((sec, si) => `
      <section class="project__section">
        <header class="section__head reveal"><h3>${esc(sec.title || "")}</h3>${sec.credit ? `<p>${esc(sec.credit)}</p>` : ""}</header>
        ${sec.models ? renderModels(sec.models) : `<div class="project__gallery">${(sec.images || []).map((src, k) =>
          `<figure class="reveal"><img src="${esc(src)}" alt="${esc(p.title)} — ${esc(sec.title || "")}" loading="lazy" decoding="async" data-sec="${si}" data-k="${k}"></figure>`).join("")}</div>`}
      </section>`).join("");
    const more = p.archiveGroup && arc
      ? `<a class="project__more reveal" href="#archive-${esc(p.archiveGroup)}">More unedited shots of this look in the archive <span>→</span></a>` : "";
    const inner = $(".project__inner");
    inner.innerHTML = `
      <div class="project__hero">${coverPic(p, esc(p.title))}</div>
      <section class="project__intro">
        <div class="reveal">
          <p class="project__eyebrow">${pad(i + 1)} · ${esc(p.category)} · ${esc(p.year)}</p>
          <h2 class="project__title" style='${titleFont(p)}'>${esc(p.title)}</h2>
        </div>
        <div class="reveal">
          <p class="project__summary">${esc(p.summary)}</p>
          <dl class="project__details">${details}</dl>
          ${(p.links || []).map((l) => `<a class="project__link" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} <span>↗</span></a>`).join("")}
        </div>
      </section>
      ${gallery}
      ${more}
      <a class="project__next reveal" href="#project-${n + 1}">
        <span><small>Next project</small><strong style='${titleFont(P[n])}'>${esc(P[n].title)}</strong></span>
        <span class="next__img"><img style="${cardStyle(P[n])}" src="${esc(cardOf(P[n]))}" alt=""></span>
      </a>`;
    fadeImages(inner);
    $$(".project__gallery", inner).forEach(layoutGallery);
    wireModels(inner);
    inner.onclick = (e) => {
      const im = e.target.closest("img[data-sec]");
      if (im) openLightbox(sections[im.dataset.sec].images, +im.dataset.k);
    };
    watchReveals(projectPanel);
  }

  function renderAbout() {
    const a = data.about;
    const services = a.services.map((s) => `<li>${esc(s)}</li>`).join("");
    const contact = data.contact.map((c) =>
      `<li><a href="${esc(c.link)}" target="_blank" rel="noopener">${esc(c.label)} <span>${esc(c.value)}</span></a></li>`).join("");
    $(".about__inner").innerHTML = `
      <h2 class="about__headline reveal">${esc(a.headline)}</h2>
      <div class="about__grid">
        <div class="reveal"><p class="about__label">About</p>${a.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}
          <p class="about__label" style="margin-top:28px">Based in</p><p>${esc(data.location)}</p></div>
        <div class="reveal"><p class="about__label">What I do</p><ul class="about__list">${services}</ul></div>
        <div class="reveal"><p class="about__label">Contact</p><ul class="about__list">${contact}</ul></div>
      </div>`;
    watchReveals(aboutPanel);
  }

  function renderArchive(filter) {
    const a = arc;
    const all = a.groups.flatMap((g) => g.images.map((src) => ({ src, g: g.group })));
    const chip = (g) => `<button type="button" data-f="${esc(g.group)}">${esc(g.name)} <span>${g.images.length}</span></button>`;
    const sections = [...new Set(a.groups.map((g) => g.section || ""))];
    const chips = `<div class="filter-group"><button type="button" data-f="all">All <span>${all.length}</span></button></div>` +
      sections.map((sec) => `<div class="filter-group">${sec ? `<span class="filter-group__label">${esc(sec)}</span>` : ""}${a.groups.filter((g) => (g.section || "") === sec).map(chip).join("")}</div>`).join("");
    const inner = $(".archive__inner");
    inner.innerHTML = `
      <header class="archive__head">
        <h2 class="archive__title reveal">${esc(a.title)}</h2>
        <div class="reveal"><p class="archive__intro">${esc(a.intro)}</p><p class="archive__credit"></p></div>
      </header>
      <div class="archive__filters reveal">${chips}</div>
      <div class="archive__grid">${all.map((it, k) =>
        `<figure data-g="${esc(it.g)}"><img src="${esc(it.src)}" alt="" loading="lazy" decoding="async" data-k="${k}"></figure>`).join("")}</div>`;
    fadeImages(inner);
    const setFilter = (f) => {
      $$(".archive__filters button", inner).forEach((b) => b.classList.toggle("is-active", b.dataset.f === f));
      $$(".archive__grid figure", inner).forEach((fig) => fig.classList.toggle("is-hidden", f !== "all" && fig.dataset.g !== f));
      const credits = f === "all" ? [] : [...new Set(a.groups.filter((g) => g.group === f).map((g) => g.credit || a.credit).filter(Boolean))];
      $(".archive__credit", inner).innerHTML = credits.map(esc).join("<br>");
    };
    setFilter(a.groups.some((g) => g.group === filter) ? filter : "all");
    inner.onclick = (e) => {
      const b = e.target.closest("[data-f]");
      if (b) { setFilter(b.dataset.f); return; }
      const im = e.target.closest(".archive__grid img");
      if (im) {
        const vis = $$(".archive__grid figure:not(.is-hidden) img", inner);
        openLightbox(vis.map((x) => x.getAttribute("src")), vis.indexOf(im));
      }
    };
    watchReveals(archivePanel);
  }

  /* ---------- full-screen photo viewer ---------- */
  const lb = $(".lightbox"), lbImg = $(".lightbox__img"), lbCount = $(".lightbox__count");
  let lbList = [], lbI = 0, lbToken = 0;
  function showLb(i) {
    lbI = (i + lbList.length) % lbList.length;
    const src = lbList[lbI], token = ++lbToken, t0 = performance.now();
    lbImg.classList.remove("is-loaded");
    lbCount.textContent = `${pad(lbI + 1)} / ${pad(lbList.length)}`;
    const pre = new Image();
    pre.onload = pre.onerror = () => setTimeout(() => {
      if (token !== lbToken) return;
      lbImg.src = src;
      requestAnimationFrame(() => lbImg.classList.add("is-loaded"));
    }, Math.max(0, 250 - (performance.now() - t0)));
    pre.src = src;
    // warm up the neighbours
    [lbI + 1, lbI - 1].forEach((k) => { new Image().src = lbList[(k + lbList.length) % lbList.length]; });
  }
  function openLightbox(list, i) {
    lbList = list;
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    showLb(i);
  }
  function closeLightbox() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
  }
  const lbOpen = () => lb.classList.contains("is-open");
  $(".lightbox__nav--prev").addEventListener("click", (e) => { e.stopPropagation(); showLb(lbI - 1); });
  $(".lightbox__nav--next").addEventListener("click", (e) => { e.stopPropagation(); showLb(lbI + 1); });
  $(".lightbox__close").addEventListener("click", closeLightbox);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  let lx = 0;
  lb.addEventListener("touchstart", (e) => { lx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - lx;
    if (Math.abs(dx) > 50) showLb(lbI + (dx < 0 ? 1 : -1));
  });

  function openPanel(panel) {
    [projectPanel, aboutPanel, archivePanel].forEach((p) => {
      const on = p === panel;
      p.classList.toggle("is-open", on);
      p.setAttribute("aria-hidden", on ? "false" : "true");
    });
    const key = panel === aboutPanel ? "about" : panel === archivePanel ? "archive" : "home";
    $$(".header__nav a").forEach((a) => a.classList.toggle("is-active", a.dataset.go === key));
  }

  /* ---------- simple page routing with #about / #project-2 ---------- */
  function route() {
    const h = location.hash.slice(1);
    const m = h.match(/^project-(\d+)$/);
    if (m && P[m[1] - 1]) {
      const i = m[1] - 1;
      if (projectPanel.classList.contains("is-open")) {
        // already on a project page: fade out, swap, fade in
        const inner = $(".project__inner");
        inner.style.opacity = "0";
        setTimeout(() => {
          renderProject(i);
          projectPanel.scrollTop = 0;
          inner.style.opacity = "1";
        }, 400);
      } else {
        renderProject(i);
        projectPanel.scrollTop = 0;
      }
      if (mode === "home" && i !== current) setInstant(i);
      openPanel(projectPanel);
    } else if (arc && /^archive(-[a-z0-9]+)?$/.test(h)) {
      renderArchive(h.split("-")[1] || "all");
      archivePanel.scrollTop = 0;
      openPanel(archivePanel);
    } else if (h === "about") {
      renderAbout();
      aboutPanel.scrollTop = 0;
      openPanel(aboutPanel);
    } else {
      openPanel(null);
    }
  }
  addEventListener("hashchange", route);

  const openProject = (i) => { location.hash = S[i] && S[i].isArchive ? "archive" : `project-${i + 1}`; };
  const goHome = () => { if (location.hash) location.hash = ""; else openPanel(null); };

  /* ---------- clicks + keys ---------- */
  $(".stage__arrow--prev").addEventListener("click", () => goTo(current - 1, -1));
  $(".stage__arrow--next").addEventListener("click", () => goTo(current + 1, 1));
  thumbs.forEach((t, k) => t.addEventListener("click", () => goTo(k)));
  cards.forEach((c, k) => c.addEventListener("click", () => {
    if (k !== current) setInstant(k);
    openProject(k);
  }));
  $$("[data-open-current]").forEach((b) => b.addEventListener("click", () => openProject(current)));
  $$("[data-index-toggle]").forEach((b) => b.addEventListener("click", () => (mode === "index" ? exitIndex() : enterIndex())));
  $$("[data-close]").forEach((b) => b.addEventListener("click", goHome));
  $$("[data-go]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    if (a.dataset.go === "about" || a.dataset.go === "archive") location.hash = a.dataset.go;
    else { goHome(); exitIndex(); }
  }));

  addEventListener("keydown", (e) => {
    if (lbOpen()) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showLb(lbI + 1);
      if (e.key === "ArrowLeft") showLb(lbI - 1);
      return;
    }
    const panelOpen = $(".panel.is-open");
    if (e.key === "Escape") { panelOpen ? goHome() : exitIndex(); return; }
    if (panelOpen) return;
    if (mode === "home") {
      if (e.key === "ArrowRight") goTo(current + 1, 1);
      if (e.key === "ArrowLeft") goTo(current - 1, -1);
      if (e.key === "ArrowDown") enterIndex();
      if (e.key === "Enter" && e.target === document.body) openProject(current);
    } else {
      if (e.key === "ArrowUp") exitIndex();
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        targetX += (e.key === "ArrowRight" ? 1 : -1) * cards[0].offsetWidth;
        if (!animating) { animating = true; requestAnimationFrame(glide); }
      }
    }
  });

  /* ---------- loader: count up while every cover image loads + decodes ---------- */
  const countEl = $(".loader__count");
  let loaded = 0, shown = 0;
  const tallScreen = matchMedia(TALL).matches;
  const covers = S.map((p) => (tallScreen ? cardOf(p) : p.cover));
  covers.forEach((src) => {
    const im = new Image();
    im.src = src;
    (im.decode ? im.decode() : Promise.resolve()).catch(() => {}).finally(() => { loaded++; });
  });
  (data.fonts || []).forEach((f) => { try { document.fonts.load(`40px "${f.name}"`); } catch (e) {} });
  const started = performance.now();
  (function tick() {
    const goal = Math.min(100, (loaded / covers.length) * 100, ((performance.now() - started) / 700) * 100);
    shown += (goal - shown) * 0.18;
    countEl.textContent = Math.round(shown);
    if (shown > 99.5 || performance.now() - started > 8000) {
      countEl.textContent = "100";
      setTimeout(start, 150);
      return;
    }
    requestAnimationFrame(tick);
  })();

  function start() {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
    slides[current].classList.add("is-active"); // first image wipes in
    setCaption(current, false);
    route();
    // quietly load gallery images in the background so project pages open instantly
    setTimeout(() => P.slice(0, 4).forEach((p) => ((p.sections && p.sections[0].images) || p.gallery || []).forEach((src) => { new Image().src = src; })), 1500);
  }
})();
