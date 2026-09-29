// Renders the page from content.js. You shouldn't need to edit this file.
(function () {
  const S = window.SITE || {};
  const $ = (sel) => document.querySelector(sel);

  // Escape text so special characters in content.js display correctly.
  const esc = (v = "") =>
    String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const has = (arr) => Array.isArray(arr) && arr.length > 0;
  const linkAttrs = (url) => (/^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "");
  const initials = (name = "") => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  // ---- Theme ----
  if (S.theme?.accentColor) document.documentElement.style.setProperty("--accent", S.theme.accentColor);
  const saved = localStorage.getItem("theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const mode = saved || (S.theme?.defaultMode === "auto" || !S.theme?.defaultMode
    ? (systemDark ? "dark" : "light")
    : S.theme.defaultMode);
  document.documentElement.dataset.theme = mode;
  $("#theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  });

  document.title = [S.name, S.title].filter(Boolean).join(" — ") || "Portfolio";
  $("#brand").textContent = S.name || "Portfolio";

  // ---- Sections ----
  const sections = [];
  const render = (id, title, html) => {
    const el = document.getElementById(id);
    if (!html) { el.remove(); return; }
    el.innerHTML = `<h2>${esc(title)}</h2>${html}`;
    el.classList.add("reveal");
    sections.push({ id, title });
  };

  // Hero
  const avatar = S.photo
    ? `<img class="avatar" src="${esc(S.photo)}" alt="${esc(S.name)}">`
    : `<div class="avatar" aria-hidden="true">${esc(initials(S.name))}</div>`;
  const heroButtons = [
    S.resumePdf && `<a class="btn primary" href="${esc(S.resumePdf)}" download>Download résumé</a>`,
    S.email && `<a class="btn" href="mailto:${esc(S.email)}">Email me</a>`,
    ...(S.links || []).map((l) => `<a class="btn" href="${esc(l.url)}"${linkAttrs(l.url)}>${esc(l.label)}</a>`),
  ].filter(Boolean).join("");
  $("#hero").innerHTML = `
    ${avatar}
    <div>
      <h1>${esc(S.name)}</h1>
      ${S.title ? `<div class="title">${esc(S.title)}</div>` : ""}
      ${S.tagline ? `<p class="tagline">${esc(S.tagline)}</p>` : ""}
      ${S.location ? `<div class="meta">📍 ${esc(S.location)}</div>` : ""}
      <div class="btn-row">${heroButtons}</div>
    </div>`;

  // About
  render("about", "About", has(S.about) && S.about.map((p) => `<p>${esc(p)}</p>`).join(""));

  // Skills
  render("skills", "Skills", has(S.skills) && `<div class="skills-grid">${S.skills.map((g) => `
    <div><h3>${esc(g.group)}</h3>
      <div class="chips">${(g.items || []).map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
    </div>`).join("")}</div>`);

  // Projects (with tag filters)
  if (has(S.projects)) {
    const tags = [...new Set(S.projects.flatMap((p) => p.tags || []))];
    const filters = tags.length > 1
      ? `<div class="filters">${["All", ...tags].map((t, i) =>
          `<button data-tag="${esc(t)}" class="${i === 0 ? "active" : ""}">${esc(t)}</button>`).join("")}</div>`
      : "";
    const cards = S.projects.map((p) => `
      <article class="card" data-tags="${esc((p.tags || []).join("|"))}">
        ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)} screenshot" loading="lazy">` : ""}
        <div class="card-body">
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.description)}</p>
          ${has(p.tags) ? `<div class="chips">${p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>` : ""}
          ${has(p.links) ? `<div class="card-links">${p.links.map((l) =>
            `<a href="${esc(l.url)}"${linkAttrs(l.url)}>${esc(l.label)} →</a>`).join("")}</div>` : ""}
        </div>
      </article>`).join("");
    render("projects", "Projects", `${filters}<div class="project-grid">${cards}</div>`);

    document.querySelectorAll(".filters button").forEach((btn) =>
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filters button").forEach((b) => b.classList.toggle("active", b === btn));
        const tag = btn.dataset.tag;
        document.querySelectorAll(".project-grid .card").forEach((card) => {
          card.style.display = tag === "All" || card.dataset.tags.split("|").includes(tag) ? "" : "none";
        });
      })
    );
  } else {
    render("projects", "Projects", "");
  }

  // Experience
  render("experience", "Experience", has(S.experience) && `<div class="timeline">${S.experience.map((e) => `
    <div class="entry">
      <div class="entry-head">
        <h3>${esc(e.role)} <span class="org">· ${esc(e.company)}</span></h3>
        <span class="dates">${esc(e.dates)}${e.location ? ` · ${esc(e.location)}` : ""}</span>
      </div>
      ${has(e.points) ? `<ul>${e.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>` : ""}
    </div>`).join("")}</div>`);

  // Education
  render("education", "Education", has(S.education) && `<div class="timeline">${S.education.map((e) => `
    <div class="entry">
      <div class="entry-head">
        <h3>${esc(e.degree)} <span class="org">· ${esc(e.school)}</span></h3>
        <span class="dates">${esc(e.dates)}</span>
      </div>
      ${e.details ? `<p>${esc(e.details)}</p>` : ""}
    </div>`).join("")}</div>`);

  // Extras
  render("extras", S.extras?.title || "More", has(S.extras?.items) && `<ul class="extras-list">${S.extras.items.map((i) =>
    `<li><span>${esc(i.name)}</span><span class="muted">${esc(i.detail)}</span></li>`).join("")}</ul>`);

  // Contact
  render("contact", "Get in touch", (S.email || has(S.links)) && `
    <p class="muted">I'm always open to new opportunities and conversations.</p>
    <div class="btn-row">
      ${S.email ? `<a class="btn primary" href="mailto:${esc(S.email)}">${esc(S.email)}</a>` : ""}
      ${(S.links || []).map((l) => `<a class="btn" href="${esc(l.url)}"${linkAttrs(l.url)}>${esc(l.label)}</a>`).join("")}
    </div>`);

  $("#footer").textContent = `© ${new Date().getFullYear()} ${S.name || ""}`;

  // ---- Nav (built from whichever sections exist) ----
  const nav = $("#nav-links");
  nav.innerHTML = sections.map((s) => `<a href="#${s.id}">${esc(s.title)}</a>`).join("");
  $("#menu-toggle").addEventListener("click", () => nav.classList.toggle("open"));
  nav.addEventListener("click", (e) => { if (e.target.tagName === "A") nav.classList.remove("open"); });

  // Highlight current section + fade-in on scroll
  const navLinks = [...nav.querySelectorAll("a")];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); revealer.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll(".section").forEach((el) => { observer.observe(el); revealer.observe(el); });
})();
