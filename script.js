(() => {
  const data = window.PORTFOLIO;
  const P = data.projects;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reflow = (el) => void el.offsetWidth;
  const SPEED = 1200;

  let current = 0;
  let busy = false;
  let mode = "home";

  const fontCSS = (data.fonts || []).map((f) =>
    `@font-face{font-family:"${f.name}";src:url("${f.file}");font-display:swap;}`).join("");
  document.head.insertAdjacentHTML("beforeend", `<style>${fontCSS}</style>`);
  const focus = (p) => (p.coverFocus ? `object-position:${esc(p.coverFocus)};` : "");
  const TALL = "(max-aspect-ratio: 4/5)";
  const cardOf = (p) => p.card || p.cover;
  const cardStyle = (p) => (p.card ? "" : focus(p));
  const coverPic = (p, alt, extra = "") =>
    `<picture>${p.card ? `<source media="${TALL}" srcset="${esc(p.card)}">` : ""}<img style="${focus(p)}" src="${esc(p.cover)}" alt="${alt}" ${extra}></picture>`;
  const titleFont = (p) => (p.titleFont ? `font-family:"${esc(p.titleFont)}", var(--font-display);` : "");

  const arc = data.archive;
  const arcCount = arc ? arc.groups.reduce((n, g) => n + g.images.length, 0) : 0;
  const S = P.slice();
  if (arc && arc.cover) S.push({
    title: arc.title || "Archive", isArchive: true, year: "",
    category: arc.category || `Unedited frames, extras & school work · ${arcCount} photos`,
    cover: arc.cover, card: arc.card,
  });

  $("[data-name]").textContent = data.name;
  $("[data-role]").textContent = data.role;
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

  function fadeImages(root) {
    $$("img", root).forEach((img) => {
      img.classList.add("fade");
      const done = () => requestAnimationFrame(() => img.classList.add("is-loaded"));
      if (img.complete && img.naturalWidth) done();
      else img.addEventListener("load", done, { once: true });
    });
  }

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

  function setInstant(i) {
    document.body.classList.add("is-snapping");
    slides.forEach((s) => s.classList.remove("is-active", "is-leaving", "from-left"));
    slides[i].classList.add("is-active");
    reflow(slides[i]);
    document.body.classList.remove("is-snapping");
    if (i !== current) { current = i; setCaption(i, false); }
  }

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

  let tx = 0, ty = 0;
  $(".stage").addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  $(".stage").addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) goTo(current + (dx < 0 ? 1 : -1));
    else if (dy < -60) enterIndex();
  });

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

  function layoutGallery(gal) {
    const figs = $$("figure", gal);
    const apply = () => {
      let run = [];
      const flush = () => { if (run.length % 2) run[run.length - 1].classList.add("solo"); run = []; };
      figs.forEach((f) => {
        f.classList.remove("wide", "solo");
        const im = $("img", f);
        if (f.dataset.wide || (im.naturalWidth && im.naturalWidth > im.naturalHeight * 1.05)) { flush(); f.classList.add("wide"); }
        else run.push(f);
      });
      flush();
    };
    figs.forEach((f) => { const im = $("img", f); if (!im.complete) im.addEventListener("load", apply, { once: true }); });
    apply();
  }

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


  const BOOKS = (window.PORTFOLIO && window.PORTFOLIO.books) || {};
  const bookName = (p) => String(p.title).split("—").pop().trim();
  function bookSpreads(b) {
    return b.spreads.map((n) => {
      const src = b.dir + n + ".jpg";
      if (n === "front") return { n, label: "Front cover", l: null, r: { src, pos: "full" } };
      if (n === "back") return { n, label: "Back cover", l: { src, pos: "full" }, r: null };
      const a = +n + (b.renumber || 0);
      return { n, a, label: `Pages ${a}–${a + 1}`, l: { src, pos: "left" }, r: { src, pos: "right" }, link: (b.links || {})[n] };
    });
  }
  function spreadFor(spreads, page) {
    const i = spreads.findIndex((s) => s.a === page || s.a + 1 === page);
    return i < 0 ? 0 : i;
  }
  function renderBooks(p) {
    if (!p.books) return "";
    const look = bookName(p);
    return `<section class="project__section books">
      <header class="section__head reveal"><h3>Process books</h3><p>TURMOIL · Final Year Collection</p></header>
      ${Object.entries(p.books).filter(([id]) => BOOKS[id]).map(([id, [f0, t0]]) => { const k = BOOKS[id].renumber || 0, from = f0 + k, to = t0 + k; return `
        <div class="book reveal" data-book="${esc(id)}" data-from="${from}">
          <div class="book__head">
            <h4>${esc(BOOKS[id].title)}</h4>
            ${BOOKS[id].tag ? `<span class="book__tag">${esc(BOOKS[id].tag)}</span>` : ""}
            <p class="book__note">${esc((BOOKS[id].note || "{look} appears on pages {from}–{to}").replace("{look}", look).replace("{from}", from).replace("{to}", to))}</p>
            <button class="book__jump" type="button">Skip to ${esc(look)} <span>→</span></button>
          </div>
          <div class="book__stage">
            <div class="book__spread"><div class="book__half book__l"></div><div class="book__half book__r"></div></div>
            <button class="book__nav book__prev" type="button" aria-label="Previous pages">←</button>
            <button class="book__nav book__next" type="button" aria-label="Next pages">→</button>
          </div>
          <div class="book__foot"><span class="book__label"></span><span class="book__count"></span></div>
        </div>`; }).join("")}
    </section>`;
  }
  function paintHalf(el, h) {
    el.classList.toggle("is-empty", !h);
    el.style.backgroundImage = h && h.src ? `url("${h.src}")` : "";
    el.dataset.pos = h ? h.pos : "";
  }
  const preloaded = new Set();
  function preload(src) { if (src && !preloaded.has(src)) { preloaded.add(src); const im = new Image(); im.src = src; } }
  function wireBooks(root) {
    $$(".book", root).forEach((el) => {
      const b = BOOKS[el.dataset.book];
      const spreads = bookSpreads(b);
      const pages = [];
      spreads.forEach((s, si) => { if (s.l) pages.push({ h: s.l, si, side: "l" }); if (s.r) pages.push({ h: s.r, si, side: "r" }); });
      const mq = matchMedia("(max-width: 720px)");
      const single = () => false;
      const stage = $(".book__stage", el), spread = $(".book__spread", el);
      const L = $(".book__l", el), R = $(".book__r", el);
      let si = 0, pi = 0, busy = false, started = false;
      const linkFor = (s) => s.link ? `<a class="book__link" href="${esc(s.link.url)}" target="_blank" rel="noopener" style="left:${s.link.x}%;top:${s.link.y}%">${esc(s.link.label)}</a>` : "";
      function paint() {
        $$(".book__link", spread).forEach((a) => a.remove());
        el.classList.toggle("is-single", single());
        if (single()) {
          const pg = pages[pi], s = spreads[pg.si];
          paintHalf(L, null); paintHalf(R, pg.h);
          const pageNo = s.n === "front" ? "Front cover" : s.n === "back" ? "Back cover" : `Page ${pg.side === "l" ? s.a : s.a + 1}`;
          $(".book__label", el).textContent = pageNo;
          $(".book__count", el).textContent = `${pi + 1} / ${pages.length}`;
          if (s.link && pg.side === "r") R.insertAdjacentHTML("beforeend", linkFor({ link: { ...s.link, x: (s.link.x - 50) * 2 } }));
          si = pg.si;
          [pages[pi - 1], pages[pi + 1]].forEach((q) => q && preload(q.h.src));
        } else {
          const s = spreads[si];
          paintHalf(L, s.l); paintHalf(R, s.r);
          $(".book__label", el).textContent = s.label;
          $(".book__count", el).textContent = `${si + 1} / ${spreads.length}`;
          if (s.link) spread.insertAdjacentHTML("beforeend", linkFor(s));
          [spreads[si - 1], spreads[si + 1]].forEach((q) => q && preload((q.l || q.r).src || (q.r && q.r.src)));
        }
        $(".book__prev", el).disabled = single() ? pi === 0 : si === 0;
        $(".book__next", el).disabled = single() ? pi === pages.length - 1 : si === spreads.length - 1;
      }
      function turn(dir) {
        if (busy) return;
        if (single()) {
          const ni = pi + dir; if (ni < 0 || ni >= pages.length) return;
          busy = true;
          spread.classList.add(dir > 0 ? "slide-out-l" : "slide-out-r");
          setTimeout(() => {
            pi = ni; paint();
            spread.classList.remove("slide-out-l", "slide-out-r");
            spread.classList.add(dir > 0 ? "slide-in-r" : "slide-in-l");
            requestAnimationFrame(() => requestAnimationFrame(() => { spread.classList.remove("slide-in-r", "slide-in-l"); }));
            setTimeout(() => (busy = false), 260);
          }, 180);
          return;
        }
        const ni = si + dir; if (ni < 0 || ni >= spreads.length) return;
        const cur = spreads[si], nxt = spreads[ni];
        busy = true;
        $$(".book__link", spread).forEach((a) => a.remove());
        const leaf = document.createElement("div");
        leaf.className = "book__leaf " + (dir > 0 ? "is-next" : "is-prev");
        leaf.innerHTML = `<div class="book__face book__front"></div><div class="book__face book__back"></div>`;
        const [front, back] = leaf.children;
        if (dir > 0) { paintHalf(front, cur.r); paintHalf(back, nxt.l); paintHalf(R, nxt.r); }
        else { paintHalf(front, cur.l); paintHalf(back, nxt.r); paintHalf(L, nxt.l); }
        spread.appendChild(leaf);
        leaf.getBoundingClientRect();
        requestAnimationFrame(() => leaf.classList.add("is-turning"));
        const done = () => { si = ni; paint(); leaf.remove(); busy = false; };
        leaf.addEventListener("transitionend", done, { once: true });
        setTimeout(() => leaf.isConnected && done(), 1100);
      }
      function jumpTo(page) {
        if (single()) { const t = spreadFor(spreads, page); pi = Math.max(0, pages.findIndex((q) => q.si === t && (spreads[t].a === page ? q.side === "l" : q.side === "r"))); }
        else si = spreadFor(spreads, page);
        spread.classList.add("is-fading");
        setTimeout(() => { paint(); spread.classList.remove("is-fading"); }, 200);
      }
      $(".book__prev", el).onclick = () => turn(-1);
      $(".book__next", el).onclick = () => turn(1);
      $(".book__jump", el).onclick = () => jumpTo(+el.dataset.from);
      spread.addEventListener("click", (e) => {
        if (e.target.closest(".book__link")) return;
        const r = spread.getBoundingClientRect();
        turn(e.clientX - r.left < r.width / 2 ? -1 : 1);
      });
      let sx = null;
      stage.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
      stage.addEventListener("touchend", (e) => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 40) turn(dx < 0 ? 1 : -1); });
      stage.tabIndex = 0;
      stage.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") { e.stopPropagation(); turn(1); } if (e.key === "ArrowLeft") { e.stopPropagation(); turn(-1); } });
      mq.addEventListener("change", () => { if (single()) pi = Math.max(0, pages.findIndex((q) => q.si === si)); paint(); });
      const io = new IntersectionObserver((es) => { if (es.some((x) => x.isIntersecting) && !started) { started = true; paint(); io.disconnect(); } }, { rootMargin: "600px" });
      io.observe(el);
    });
  }

  const withIG = (v) => esc(v).replace(/([^,()\s—·][^,()—·]*?)\s*\(@([\w.]+)\)/g, (m, name, h) =>
    `<a class="ig" href="https://www.instagram.com/${h}/" target="_blank" rel="noopener" title="@${h} on Instagram">${name.trim()}</a>`);

  function renderProject(i) {
    const p = P[i];
    const n = (i + 1) % P.length;
    const details = Object.entries(p.details || {}).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${withIG(v)}</dd>`).join("");
    const sections = p.sections || (p.gallery ? [{ title: "", images: p.gallery }] : []);
    const gallery = sections.map((sec, si) => `
      <section class="project__section">
        <header class="section__head reveal"><h3>${esc(sec.title || "")}</h3>${sec.credit ? `<p>${withIG(sec.credit)}</p>` : ""}</header>
        ${sec.models ? renderModels(sec.models) : `<div class="project__gallery">${(sec.images || []).map((it, k) => [typeof it === "string" ? it : it.src, typeof it === "object" && it.wide]).map(([src, wide], k) =>
          `<figure class="reveal"${wide ? ' data-wide="1"' : ""}><img src="${esc(src)}" alt="${esc(p.title)} — ${esc(sec.title || "")}" loading="lazy" decoding="async" data-sec="${si}" data-k="${k}"></figure>`).join("")}</div>`}
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
          ${p.collection ? `<p class="project__lede${/[\u3400-\u9fff]/.test(p.collection) ? " is-cjk" : ""}"${/[\u3400-\u9fff]/.test(p.collection) ? ' lang="zh"' : ""}>${esc(p.collection)}${p.collectionTranslation ? ` <span class="project__lede-en">${esc(p.collectionTranslation)}</span>` : ""}</p>` : ""}
          <p class="project__summary">${esc(p.summary)}</p>
          ${p.note ? `<p class="project__note">${esc(p.note)}</p>` : ""}
          <dl class="project__details">${details}</dl>
          ${(p.links || []).map((l) => `<a class="project__link" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} <span>↗</span></a>`).join("")}
        </div>
      </section>
      ${gallery}
      ${renderBooks(p)}
      ${more}
      <a class="project__next reveal" href="#project-${n + 1}">
        <span><small>Next project</small><strong style='${titleFont(P[n])}'>${esc(P[n].title)}</strong></span>
        <span class="next__img"><img style="${cardStyle(P[n])}" src="${esc(cardOf(P[n]))}" alt=""></span>
      </a>`;
    fadeImages(inner);
    $$(".project__gallery", inner).forEach(layoutGallery);
    wireModels(inner);
    wireBooks(inner);
    inner.onclick = (e) => {
      const im = e.target.closest("img[data-sec]");
      if (im) openLightbox(sections[im.dataset.sec].images.map((it) => (typeof it === "string" ? it : it.src)), +im.dataset.k);
    };
    watchReveals(projectPanel);
  }

  function renderAbout() {
    const a = data.about;
    const services = a.services.map((s) => `<li>${esc(s)}</li>`).join("");
    const contact = data.contact.map((c) =>
      `<li><a href="${esc(c.link)}" target="_blank" rel="noopener">${esc(c.label)} <span>${esc(c.value)}</span></a></li>`).join("");
    $(".about__inner").innerHTML = `
      <div class="about__top${a.photo ? " has-photo" : ""}">
        <h2 class="about__headline reveal">${esc(a.headline)}</h2>
        ${a.photo ? `<figure class="about__photo reveal"><img src="${esc(a.photo)}" alt="${esc(data.name)}" decoding="async"></figure>` : ""}
      </div>
      <div class="about__grid">
        <div class="reveal"><p class="about__label">About</p>${a.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}
          ${a.focus ? `<p class="about__label" style="margin-top:28px">Currently focused on</p><p>${esc(a.focus)}</p>` : ""}
          <p class="about__label" style="margin-top:28px">Based in</p><p>${esc(data.location)}</p></div>
        <div class="reveal"><p class="about__label">What I do</p><ul class="about__list">${services}</ul></div>
        <div class="reveal"><p class="about__label">Contact</p><ul class="about__list">${contact}</ul></div>
      </div>
      ${(a.awards || []).length ? `
      <section class="about__awards reveal">
        <p class="about__label">Recognition</p>
        <ul class="awards">${a.awards.map((w) => `<li><strong>${esc(w.title)}${w.translation ? ` <small class="awards__tr">${esc(w.translation)}</small>` : ""}</strong><span>${esc(w.detail)}</span><em>${esc(w.year)}</em></li>`).join("")}</ul>
        ${a.awards.some((w) => w.certificate) ? `<button type="button" class="awards__btn">View certificates <span>(${a.awards.filter((w) => w.certificate).length})</span></button>` : ""}
      </section>` : ""}
      ${(a.experience || []).length ? `
      <section class="about__awards reveal">
        <p class="about__label">Experience</p>
        <ul class="awards">${a.experience.map((w) => `<li><strong>${esc(w.title)}</strong><span>${esc(w.detail)}</span><em>${esc(w.year)}</em></li>`).join("")}</ul>
      </section>` : ""}`;
    const certBtn = $(".awards__btn", aboutPanel);
    if (certBtn) certBtn.addEventListener("click", () => openLightbox(a.awards.filter((w) => w.certificate).map((w) => w.certificate), 0));
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

  function route() {
    const h = location.hash.slice(1);
    const m = h.match(/^project-(\d+)$/);
    if (m && P[m[1] - 1]) {
      const i = m[1] - 1;
      if (projectPanel.classList.contains("is-open")) {
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
    slides[current].classList.add("is-active");
    setCaption(current, false);
    route();
    setTimeout(() => P.slice(0, 4).forEach((p) => ((p.sections && p.sections[0].images) || p.gallery || []).forEach((src) => { new Image().src = src; })), 1500);
  }
})();
