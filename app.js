/* Renders the site from projects.js. You normally don't need to edit this file. */
(() => {
  const P = window.PROJECTS;

  const S = window.SITE;
  const app = document.getElementById("app");
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const imgSrc = (p, f) => (/[./]/.test(f) ? f : `assets/${p.slug}/${f}.webp`);
  // images: ["01", "Caption"] or ["01", "Caption", "phone"] for a phone screenshot. Phone screens are listed first.
  const images = (p) => {
    const all = (p.images || []).map((i) => (Array.isArray(i) ? { src: imgSrc(p, i[0]), caption: i[1] || "", phone: i[2] === "phone" || i[2] === "device", framed: i[2] === "device" } : { ...i, src: imgSrc(p, i.src) }));
    return [...all.filter((i) => i.phone), ...all.filter((i) => !i.phone)];
  };

  const wa = (msg = "Hi Chirag, I saw your portfolio and I'd like to discuss a project.") =>
    S.whatsapp ? `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}` : "";

  const ICON = {
    wa: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.2-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.5.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.5 13.5 0 0 0 5.2 4.6c3 1.2 3 .8 3.6.8a3 3 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3M12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8m8.4-18.2A11.8 11.8 0 0 0 1.8 17.8L.1 24l6.4-1.7A11.8 11.8 0 0 0 24 12a11.7 11.7 0 0 0-3.5-8.4"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm-1 1 9 7 9-7"/></svg>`,
    upwork: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.6 13.3c-1 0-2-.4-2.8-1.1l.2-1v-.1c.2-1 .8-2.7 2.6-2.7a2.4 2.4 0 0 1 0 4.9m0-7.3a4.9 4.9 0 0 0-5 3.8c-.8-1.2-1.4-2.6-1.8-3.8H9.4v5.1a2.2 2.2 0 1 1-4.4 0V6H2.6v5.1a4.6 4.6 0 0 0 9.2 0v-.8c.4.9 1 1.8 1.6 2.6l-1.4 6.7h2.4l1-4.9a5.8 5.8 0 0 0 3.2 1 4.9 4.9 0 0 0 0-9.7"/></svg>`,
    gh: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5"/></svg>`,
    star: `<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="m10 1.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z"/></svg>`,
    check: `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 8.5l2.5 2.5L12 5.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  };

  // Reading progress bar
  const bar = document.createElement("div"); bar.className = "progress"; document.body.appendChild(bar);
  const onScroll = () => { const h = document.documentElement; bar.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`; };
  window.addEventListener("scroll", onScroll, { passive: true });

  document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = S.name));
  document.getElementById("year").textContent = new Date().getFullYear();

  // Floating WhatsApp button
  if (!S.whatsapp && S.upwork) {
    const f = document.createElement("a");
    f.className = "wa-float up-float"; f.href = S.upwork; f.target = "_blank"; f.rel = "noopener";
    f.setAttribute("aria-label", "Message me on Upwork");
    f.innerHTML = `${ICON.upwork}<span>Message me on Upwork</span>`;
    document.body.appendChild(f);
  }
  if (S.whatsapp) {
    const f = document.createElement("a");
    f.className = "wa-float"; f.href = wa(); f.target = "_blank"; f.rel = "noopener";
    f.setAttribute("aria-label", "Chat on WhatsApp");
    f.innerHTML = `${ICON.wa}<span>Chat on WhatsApp</span>`;
    document.body.appendChild(f);
  }
  // Footer contact links
  document.getElementById("footer-links").innerHTML = [
    S.email && `<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`,
    S.whatsapp && `<a href="${wa()}" target="_blank" rel="noopener">WhatsApp ${esc(S.whatsappDisplay || "")}</a>`,
    S.phone && `<a href="tel:${esc(S.phone)}">Call ${esc(S.whatsappDisplay || S.phone)}</a>`,
    S.github && `<a href="${esc(S.github)}" target="_blank" rel="noopener">GitHub</a>`,
    S.upwork && `<a href="${esc(S.upwork)}" target="_blank" rel="noopener">Upwork profile</a>`,
    S.linkedin && `<a href="${esc(S.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`,
  ].filter(Boolean).join("");

  const allTags = ["All", ...new Set(P.flatMap((p) => p.tags))];
  const allStack = ["Laravel", "PHP 8", "Flutter", "React Native", "Swift", "Kotlin", "React", "Next.js", "Vue 3", "TypeScript", "Node.js", "Python", "Stripe Connect", "OpenAI", "Anthropic Claude", "RAG · pgvector", "AWS", "PostgreSQL", "MySQL", "Redis", "Firebase", "Agora", "Docker"];
  let filter = "All";

  const contactButtons = (msg) =>
    [
      S.whatsapp && `<a class="btn btn-wa" href="${wa(msg)}" target="_blank" rel="noopener">${ICON.wa}WhatsApp</a>`,
      S.email && `<a class="btn btn-primary" href="mailto:${esc(S.email)}?subject=${encodeURIComponent("Project inquiry")}">${ICON.mail}Email me</a>`,
      S.github && `<a class="btn" href="${esc(S.github)}" target="_blank" rel="noopener">${ICON.gh}GitHub</a>`,
      S.upwork && `<a class="btn btn-up" href="${esc(S.upwork)}" target="_blank" rel="noopener">${ICON.upwork}Message me on Upwork</a>`,
      S.linkedin && `<a class="btn" href="${esc(S.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`,
    ].filter(Boolean).join("");

  const card = (p, i) => `
    <a class="card reveal" href="#/p/${p.slug}" data-tags="${esc(p.tags.join(","))}" style="--d:${(i % 2) * 80}ms">
      <div class="card-media">
        <img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="${i < 2 ? "eager" : "lazy"}" />
        ${p.videos?.length ? `<span class="badge">▶ ${p.videos.length > 1 ? p.videos.length + " videos" : "Video demo"}</span>` : ""}
      </div>
      <div class="card-body">
        <div class="card-top"><span class="card-num">${String(i + 1).padStart(2, "0")}</span><span class="card-tags">${p.tags.join(" · ")}</span></div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.tagline)}</p>
        <div class="chips">${p.stack.slice(0, 4).map((s) => `<span>${esc(s)}</span>`).join("")}${p.stack.length > 4 ? `<span>+${p.stack.length - 4}</span>` : ""}</div>
        <span class="card-cta">View case study <i>→</i></span>
      </div>
    </a>`;

  const bySlug = (slug) => P.find((p) => p.slug === slug);
  const mini = (p) => p ? `
    <a class="mini" href="#/p/${p.slug}">
      <img src="${esc(p.cover)}" alt="" loading="lazy" />
      <span><strong>${esc(p.title)}</strong><small>${esc(p.subtitle)}</small></span>
      <i>→</i>
    </a>` : "";

  const spotlight = (p, i) => `
    <article class="spot ${i % 2 ? "flip" : ""} reveal">
      <a class="spot-media" href="#/p/${p.slug}">
        <img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="${i < 1 ? "eager" : "lazy"}" />
        ${p.videos?.length ? `<span class="badge">▶ ${p.videos.length > 1 ? p.videos.length + " videos" : "Video demo"}</span>` : ""}
      </a>
      <div class="spot-body">
        <p class="kicker"><span class="spot-num">${String(i + 1).padStart(2, "0")}</span> ${esc(p.subtitle)}</p>
        <h3>${esc(p.title)}</h3>
        <p class="spot-tag">${esc(p.tagline)}</p>
        <ul class="ticks">${(p.highlights || []).slice(0, 3).map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        <div class="chips">${p.stack.slice(0, 5).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        <a class="btn btn-primary" href="#/p/${p.slug}">Read the case study →</a>
      </div>
    </article>`;

  const first = S.name.split(" ")[0];
  const pad = (n) => String(n).padStart(2, "0");
  const ctaBtn = (msg, label, extra = "") =>
    S.whatsapp ? `<a class="btn btn-wa ${extra}" href="${wa(msg)}" target="_blank" rel="noopener">${ICON.wa}${label}</a>`
    : S.upwork ? `<a class="btn btn-up ${extra}" href="${esc(S.upwork)}" target="_blank" rel="noopener">${ICON.upwork}${label}</a>` : "";
  // Image tile with overlay (used for "More projects" and "Keep exploring")
  const tile2 = (pr) => `
    <a class="card tile2 reveal" href="#/p/${pr.slug}" data-tags="${esc(pr.tags.join(","))}">
      <img src="${esc(pr.cover)}" alt="${esc(pr.title)}" loading="lazy" />
      ${pr.videos?.length ? `<span class="badge">▶ ${pr.videos.length > 1 ? pr.videos.length + " videos" : "Video"}</span>` : ""}
      ${pr.links?.length ? `<span class="badge badge-live">● Live on stores</span>` : ""}
      <span class="t2-body">
        <span class="t2-tags">${esc(pr.tags.join(" · "))}</span>
        <strong>${esc(pr.title)}</strong>
        <small>${esc(pr.tagline)}</small>
        <span class="t2-go">View case study →</span>
      </span>
    </a>`;

  // Pro project card
  const pcard = (pr, big = false) => `
    <a class="card pc ${big ? "pc-big" : ""} reveal" href="#/p/${pr.slug}" data-tags="${esc(pr.tags.join(","))}">
      <span class="pc-img"><img src="${esc(pr.cover)}" alt="${esc(pr.title)}" loading="lazy" />
        <span class="pc-badges">${pr.links?.length ? `<span class="pb pb-live">● Live</span>` : ""}${pr.videos?.length ? `<span class="pb">▶ Video</span>` : ""}</span>
      </span>
      <span class="pc-body">
        <span class="pc-tags">${esc(pr.tags.join(" · "))}</span>
        <strong>${esc(pr.title)}</strong>
        <small>${esc(pr.subtitle)}</small>
        <span class="pc-go">View case study <i>→</i></span>
      </span>
    </a>`;

  function home(section) {
    document.title = `${S.name} · ${S.role}`;
    const showcase = (S.heroShowcase || []).map((x) => ({ ...x, p: bySlug(x.slug) })).filter((x) => x.p);
    const featured = (S.featured || []).map(bySlug).filter(Boolean);
    const rest = P.filter((p) => !featured.includes(p));
    const restTags = ["All", ...new Set(rest.flatMap((p) => p.tags))];
    const svc = S.services || [];
    const all = [...featured, ...rest];
    app.innerHTML = `
      <section class="hero ph2">
        <div class="ph2-text">
          <p class="eyebrow reveal"><span class="dot"></span>Available for new projects</p>
          <h1 class="reveal">Web & mobile apps,<br /><span class="soft">built to ship.</span></h1>
          <p class="lead reveal">${esc(S.heroIntro || S.intro)}</p>
          <div class="hero-actions reveal">
            <a class="btn btn-primary btn-lg" href="#/work">See my work</a>
            ${S.whatsapp ? `<a class="btn btn-wa btn-lg" href="${wa()}" target="_blank" rel="noopener">${ICON.wa}WhatsApp me</a>` : S.upwork ? `<a class="btn btn-up btn-lg" href="${esc(S.upwork)}" target="_blank" rel="noopener">${ICON.upwork}Message me on Upwork</a>` : ""}
          </div>
          <dl class="ph2-facts reveal">
            <div><dt>10+</dt><dd>years building apps</dd></div>
            <div><dt>16</dt><dd>apps live in stores</dd></div>
            <div><dt>${P.length}</dt><dd>case studies</dd></div>
          </dl>
        </div>
        <div class="mosaic reveal">
          ${featured.slice(0, 3).map((pr, k) => `
          <a class="mo mo-${k}" href="#/p/${pr.slug}">
            <img src="${esc(pr.cover)}" alt="${esc(pr.title)}" loading="eager" />
            <span class="mo-cap"><strong>${esc(pr.title)}</strong><small>${esc(pr.tags.join(" · "))}</small></span>
          </a>`).join("")}
        </div>
      </section>

      <section id="work" class="section">
        <div class="pro-head reveal">
          <div>
            <h2>Work</h2>
            <p class="sub">${P.length} projects, each with real screens and the stack behind it. Tap any card to open it.</p>
          </div>
          <div class="filters seg" role="tablist">${allTags.map((t) => `<button class="${t === filter ? "on" : ""}" data-f="${esc(t)}">${esc(t)}<em>${t === "All" ? P.length : P.filter((x) => x.tags.includes(t)).length}</em></button>`).join("")}</div>
        </div>
        <div class="pgrid">${all.map((pr, k) => pcard(pr, k < 2)).join("")}</div>
      </section>

      <section id="services" class="section">
        <div class="pro-head reveal"><div><h2>What I do</h2><p class="sub">Build new products, fix what's broken, or add AI that's actually useful.</p></div></div>
        <div class="svc-pro">
          ${svc.map((x, i) => `
          <article class="sp reveal" style="--d:${i * 70}ms">
            <span class="sp-ico">${x.icon || ""}</span>
            <h3>${esc(x.title)}</h3>
            <p>${esc(x.text)}</p>
            <ul class="ticks">${x.items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          </article>`).join("")}
        </div>
        ${S.wins?.length ? `<div class="pro-wins reveal"><span>Recent results</span>${S.wins.map((w) => `<p>${esc(w)}</p>`).join("")}</div>` : ""}
        <p class="pro-stack reveal">${allStack.map((t) => `<span>${esc(t)}</span>`).join("")}</p>
      </section>

      ${S.process?.length ? `
      <section id="process" class="section">
        <div class="pro-head reveal"><div><h2>How I work</h2><p class="sub">Simple, transparent, no surprises.</p></div></div>
        <ol class="pro-steps">
          ${S.process.map(([h, t, g], i) => `<li class="reveal" style="--d:${i * 70}ms"><span>${i + 1}</span><h3>${esc(h)}</h3><p>${esc(t)}</p>${g ? `<em>${esc(g)}</em>` : ""}</li>`).join("")}
        </ol>
      </section>` : ""}

      ${S.faq?.length ? `
      <section id="faq" class="section">
        <div class="pro-head reveal"><div><h2>FAQ</h2></div></div>
        <div class="faq2">
          ${S.faq.map(([q, ans], i) => `<details class="reveal" ${i === 0 ? "open" : ""}><summary>${esc(q)}<i aria-hidden="true">+</i></summary><p>${esc(ans)}</p></details>`).join("")}
        </div>
      </section>` : ""}

      <section id="contact" class="section">
        <div class="pro-contact reveal">
          <h2><span class="ti">Have a project</span><br />in mind?</h2>
          <p class="lead">Tell me what you're building or what's broken${S.whatsapp ? "" : ", in a message on Upwork"}. I'll reply with a short technical plan.</p>
          <div class="c3-actions">
            ${S.whatsapp ? `<a class="act act-wa" href="${wa()}" target="_blank" rel="noopener"><span class="act-ico">${ICON.wa}</span><span><small>WhatsApp</small><strong>${esc(S.whatsappDisplay)}</strong></span><i>↗</i></a>` : ""}
            ${S.email ? `<a class="act" href="mailto:${esc(S.email)}"><span class="act-ico">${ICON.mail}</span><span><small>Email</small><strong>${esc(S.email)}</strong></span><i>↗</i></a>` : ""}
            ${S.phone ? `<a class="act" href="tel:${esc(S.phone)}"><span class="act-ico">📞</span><span><small>Call</small><strong>${esc(S.whatsappDisplay || S.phone)}</strong></span><i>↗</i></a>` : ""}
            ${S.github ? `<a class="act" href="${esc(S.github)}" target="_blank" rel="noopener"><span class="act-ico">${ICON.gh}</span><span><small>GitHub</small><strong>${esc(S.github.replace(/^https?:\/\//, ""))}</strong></span><i>↗</i></a>` : ""}
            ${S.upwork && !S.whatsapp ? `<a class="act act-up" href="${esc(S.upwork)}" target="_blank" rel="noopener"><span class="act-ico">${ICON.upwork}</span><span><small>Upwork</small><strong>Message me on Upwork</strong></span><i>↗</i></a>` : ""}
          </div>
          ${S.location ? `<p class="c3-loc">📍 ${esc(S.location)}</p>` : ""}
        </div>
      </section>`;
    startShowcase(showcase);
    bindFilters();
    app.querySelectorAll(".need-tabs button").forEach((b) => b.addEventListener("click", () => {
      app.querySelectorAll(".need-tabs button").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", x === b); });
      app.querySelectorAll(".need-panel").forEach((p) => { p.hidden = p.dataset.p !== b.dataset.t; if (!p.hidden) p.classList.add("in"); });
    }));
    observe();
    if (section) document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
  }

  // Hero showcase: cycles through projects every few seconds (pauses on hover)
  let scTimer;
  function startShowcase(list) {
    clearInterval(scTimer);
    const root = app.querySelector(".showcase");
    if (!root || list.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const shots = root.querySelectorAll(".browser-screen img"), dots = root.querySelectorAll(".sc-dots i");
    const phone = root.querySelector(".phone-mock");
    let k = 0, paused = false;
    const show = (n) => {
      k = (n + list.length) % list.length;
      const x = list[k];
      shots.forEach((im, i) => im.classList.toggle("on", i === k));
      dots.forEach((d, i) => d.classList.toggle("on", i === k));
      phone.classList.toggle("on", !!x.phone);
      phone.querySelectorAll("img").forEach((im) => im.classList.toggle("on", +im.dataset.k === k));
      root.querySelectorAll("[data-sc-title]").forEach((el) => (el.textContent = x.p.title));
      root.querySelector("[data-sc-sub]").textContent = x.p.subtitle;
      root.querySelectorAll("[data-sc-link]").forEach((el) => (el.href = `#/p/${x.p.slug}`));
    };
    root.addEventListener("mouseenter", () => (paused = true));
    root.addEventListener("mouseleave", () => (paused = false));
    dots.forEach((d, i) => d.addEventListener("click", (e) => { e.preventDefault(); show(i); }));
    scTimer = setInterval(() => !paused && !document.hidden && show(k + 1), 3600);
  }

  function bindFilters() {
    app.querySelectorAll(".filters button").forEach((b) =>
      b.addEventListener("click", () => {
        filter = b.dataset.f;
        app.querySelectorAll(".filters button").forEach((x) => x.classList.toggle("on", x === b));
        app.querySelectorAll(".card").forEach((c) => (c.hidden = filter !== "All" && !c.dataset.tags.split(",").includes(filter)));
      })
    );
    if (filter !== "All") app.querySelector(`.filters button[data-f="${filter}"]`)?.click();
  }

  function project(slug) {
    clearInterval(scTimer);
    const i = P.findIndex((p) => p.slug === slug);
    if (i < 0) return home();
    const p = P[i], imgs = images(p);
    const others = [...P.slice(i + 1), ...P.slice(0, i)];
    const related = [...others.filter((o) => o.tags.some((t) => p.tags.includes(t))), ...others].filter((o, k, arr) => arr.indexOf(o) === k).slice(0, 3);
    const phoneVids = p.videos?.every((v) => v.phone);
    document.title = `${p.title} · ${S.name}`;
    app.innerHTML = `
      <article class="case">
        <a href="#/work" class="back">← All projects</a>
        <header class="case-head">
          <p class="kicker">${esc(p.subtitle)}</p>
          <h1>${esc(p.title)}</h1>
          <p class="lead">${esc(p.tagline)}</p>
        </header>

        ${p.videos?.length && !phoneVids ? "" : `<div class="case-cover reveal"><img src="${esc(p.cover)}" alt="${esc(p.title)} cover" /></div>`}

        ${p.videos?.length ? `
        <section class="case-section case-videos ${phoneVids ? "" : "lead-video"}">
          ${phoneVids ? `<h2 class="reveal">Watch it in action</h2>` : ""}
          <div class="videos ${phoneVids ? "phones" : ""}">
            ${p.videos.map((v) => `
              <figure class="video reveal ${v.phone ? "phone" : ""}">
                <video controls playsinline preload="none" poster="${esc(v.poster || "")}" src="${esc(v.src)}"></video>
                <figcaption>${esc(v.label || "")}</figcaption>
              </figure>`).join("")}
          </div>
        </section>` : ""}


        <div class="case-info">
          <div class="case-summary reveal">
            <h2>Overview</h2>
            <p>${esc(p.summary)}</p>
            ${p.highlights?.length ? `<h2>Key features</h2><ul class="ticks">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
          </div>
          <aside class="case-meta reveal">
            <div><h4>Role</h4><p>${esc(p.role)}</p></div>
            <div><h4>Platform</h4><p>${esc(p.tags.join(", "))}</p></div>
            <div><h4>Tech stack</h4><div class="chips">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div></div>
            ${p.live ? `<a class="btn btn-primary" href="${esc(p.live)}" target="_blank" rel="noopener">Live demo ↗</a>` : ""}
            ${(p.links || []).map(([l, u]) => `<a class="btn" href="${esc(u)}" target="_blank" rel="noopener">${esc(l)} ↗</a>`).join("")}
            ${p.repo ? `<a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener">Source code ↗</a>` : ""}
            ${S.whatsapp ? `<a class="btn btn-wa" href="${wa(`Hi Chirag, I saw your ${p.title} project and need something similar.`)}" target="_blank" rel="noopener">${ICON.wa}Build something similar</a>` : S.upwork ? `<a class="btn btn-up" href="${esc(S.upwork)}" target="_blank" rel="noopener">${ICON.upwork}Build something similar</a>` : ""}
          </aside>
        </div>

        ${imgs.length ? `
        <section class="case-section">
          <h2 class="reveal">Screens <sup>${imgs.length}</sup></h2>
          ${[true, false].map((ph) => imgs.some((im) => !!im.phone === ph) ? `
          <div class="${ph ? "phone-gallery" : "gallery"}">
            ${imgs.map((im, k) => !!im.phone !== ph ? "" : `
              <figure class="shot reveal ${ph ? "phone-shot" : ""} ${im.framed ? "framed" : ""}" data-k="${k}" tabindex="0">
                <img src="${esc(im.src)}" alt="${esc(im.caption)}" loading="lazy" />
                <figcaption>${esc(im.caption)}</figcaption>
              </figure>`).join("")}
          </div>` : "").join("")}
        </section>` : ""}

        <section class="cta-band cta-glow reveal">
          <div>
            <h2>Need something like ${esc(p.title)}?</h2>
            <p>Send me a message. I'll reply with a short plan, timeline and estimate.</p>
          </div>
          <div class="hero-actions">${contactButtons(`Hi Chirag, I saw your ${p.title} project and need something similar.`)}</div>
        </section>

        <section class="case-section">
          <h2 class="reveal">More work</h2>
          <div class="pgrid">${related.map((r) => pcard(r)).join("")}</div>
        </section>
      </article>`;
    window.scrollTo(0, 0);
    app.querySelectorAll(".shot").forEach((f) => {
      const open = () => lightbox.open(imgs, +f.dataset.k);
      f.addEventListener("click", open);
      f.addEventListener("keydown", (e) => e.key === "Enter" && open());
    });
    app.querySelectorAll("video").forEach((v) => v.addEventListener("play", () => app.querySelectorAll("video").forEach((o) => o !== v && o.pause())));
    observe();
  }

  /* Lightbox */
  const lightbox = (() => {
    const el = document.getElementById("lightbox"), img = el.querySelector("img"), cap = el.querySelector("figcaption");
    let list = [], k = 0;
    const show = () => { img.src = list[k].src; img.alt = list[k].caption; cap.textContent = `${k + 1} / ${list.length}  ·  ${list[k].caption}`; };
    const go = (d) => { k = (k + d + list.length) % list.length; show(); };
    const close = () => { el.hidden = true; document.body.style.overflow = ""; };
    el.querySelector(".lb-close").onclick = close;
    el.querySelector(".lb-prev").onclick = (e) => { e.stopPropagation(); go(-1); };
    el.querySelector(".lb-next").onclick = (e) => { e.stopPropagation(); go(1); };
    el.addEventListener("click", (e) => e.target === el && close());
    document.addEventListener("keydown", (e) => {
      if (el.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    });
    let x0 = null;
    el.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    el.addEventListener("touchend", (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); x0 = null; });
    return { open(l, i) { list = l; k = i; show(); el.hidden = false; document.body.style.overflow = "hidden"; } };
  })();

  /* Scroll reveal */
  let io;
  function observe() {
    io?.disconnect();
    io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { rootMargin: "0px 0px -6% 0px" });
    app.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  /* Router: #/  #/work  #/services  #/faq  #/contact  #/p/<slug> */
  function route() {
    const [, a, b] = location.hash.split("?")[0].split("/");
    if (a === "p" && b) project(b);
    else if (app.querySelector(".hero") && a) document.getElementById(a)?.scrollIntoView({ behavior: "smooth" });
    else home(a);
  }
  window.addEventListener("hashchange", route);
  route();
})();
