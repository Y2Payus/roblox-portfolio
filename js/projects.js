// ============================================================
// EDIT YOUR PROJECTS HERE
// ============================================================
// category: "UI's" | "GUI" | "Tools"  (tabs are created automatically)
// image:    "images/yourfile.png"  or ""  for a placeholder
//           For Tools, drop the real logo in /images (e.g. "images/figma.png")
//           and set image: "images/figma.png". It replaces the placeholder icon.
// icon:     Tools only. Built-in placeholder icon name + color.
// play:     Roblox game link, or "" to hide the button
// code:     GitHub / Pastebin link, or "" to hide the button

// Original placeholder icons (not brand logos)
var ICONS = {
  pen: '<path d="M10 38l4-12 20-20 8 8-20 20z"/><path d="M14 26l8 8"/><circle cx="12" cy="36" r="2"/>',
  layers: '<path d="M24 8L6 18l18 10 18-10z"/><path d="M6 26l18 10 18-10"/><path d="M6 33l18 10 18-10"/>',
  cube: '<path d="M24 5l17 9v20L24 43 7 34V14z"/><path d="M7 14l17 9 17-9M24 23v20"/>',
  globe: '<circle cx="24" cy="24" r="17"/><ellipse cx="24" cy="24" rx="17" ry="7"/><ellipse cx="24" cy="24" rx="7" ry="17"/>',
  bezier: '<path d="M8 36C8 14 40 34 40 12"/><circle cx="8" cy="36" r="3"/><circle cx="40" cy="12" r="3"/><path d="M8 36l10-14M40 12L30 26"/>',
  code: '<path d="M17 14L7 24l10 10M31 14l10 10-10 10M27 10l-6 28"/>'
};

var projects = [
  // ---------- GUI: full menu screens ----------
  {
    title: "Battlepass",
    description: "Tier card carousel with claim states, an XP progress bar, and purchase / skip-tier buttons.",
    category: "GUI",
    image: "images/battlepass.jpg",
    tags: ["Menu", "Progression", "Purple"],
    play: "", code: ""
  },
  {
    title: "Settings Menu (Crystal)",
    description: "Settings panel with toggle rows and an ornate crystal frame and header.",
    category: "GUI",
    image: "images/settings-purple.jpg",
    tags: ["Settings", "Toggles", "Frame"],
    play: "", code: ""
  },
  {
    title: "Shop",
    description: "Tabbed shop for gamepasses, dev products and extras, with price tags on each item.",
    category: "GUI",
    image: "images/shop.jpg",
    tags: ["Shop", "Tabs", "Monetization"],
    play: "", code: ""
  },
  {
    title: "Codes Redeem",
    description: "Cartoon-style code redemption window with a text field and redeem button.",
    category: "GUI",
    image: "images/codes-redeem.jpg",
    tags: ["Cartoon", "Input"],
    play: "", code: ""
  },
  {
    title: "Settings Menu (Cartoon)",
    description: "Bubbly settings window with big colored on/off toggle buttons and currency bars.",
    category: "GUI",
    image: "images/settings-cartoon.jpg",
    tags: ["Cartoon", "Settings"],
    play: "", code: ""
  },
  // ---------- UI's: HUD and prompts ----------
  {
    title: "Blood Effects Prompt",
    description: "Bold comic-style opt-in prompt with big Yes / No buttons.",
    category: "UI's",
    image: "images/blood-effects-prompt.jpg",
    tags: ["Prompt", "Comic", "Buttons"],
    play: "", code: ""
  },
  {
    title: "Racing HUD",
    description: "In-race HUD with a live leaderboard, lap timer, speedometer and minimap.",
    category: "UI's",
    image: "images/racing-hud.jpg",
    tags: ["HUD", "Racing", "Leaderboard"],
    play: "", code: ""
  },
  {
    title: "Figma",
    description: "Interface mockups, layouts and design systems before they become Roblox GUIs.",
    category: "Tools",
    image: "images/figma-transparent.png",
    icon: "pen", color: "#f472b6",
    tags: ["Design", "Prototyping"],
    play: "", code: ""
  },
  {
    title: "Adobe Photoshop",
    description: "Icons, textures and image assets for GUIs and game thumbnails.",
    category: "Tools",
    image: "images/photoshop-transparent.png",
    icon: "layers", color: "#a78bfa",
    tags: ["Assets", "Editing"],
    play: "", code: ""
  },
  {
    title: "Roblox Studio",
    description: "Building, scripting and testing every experience.",
    category: "Tools",
    image: "images/roblox-studio.png",
    icon: "cube", color: "#00e0a4",
    tags: ["Luau", "GUI", "Testing"],
    play: "", code: ""
  },
  {
    title: "Blender",
    description: "3D models, meshes and renders.",
    category: "Tools",
    image: "images/blender-transparent.png",
    icon: "globe", color: "#a3e635",
    tags: ["3D", "Modeling"],
    play: "", code: ""
  },
  {
    title: "Adobe Illustrator",
    description: "Vector icons and clean scalable graphics.",
    category: "Tools",
    image: "images/adobe-illustrator-transparent.png",
    icon: "bezier", color: "#22d3ee",
    tags: ["Vector", "Icons"],
    play: "", code: ""
  },
  {
    title: "VS Code",
    description: "Writing and organizing Luau code outside of Studio.",
    category: "Tools",
    image: "images/vs-code-transparent.png",
    icon: "code", color: "#fbbf24",
    tags: ["Luau", "Editor"],
    play: "", code: ""
  }
];

(function () {
  "use strict";
  var grid = document.getElementById("project-grid");
  var filtersEl = document.getElementById("filters");
  var empty = document.getElementById("empty");
  if (!grid || !filtersEl) return;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function openLightbox(src, title) {
    var box = el("div", "lightbox");
    var img = document.createElement("img");
    img.src = src; img.alt = title;
    box.appendChild(img);
    box.appendChild(el("span", "lb-close", "Close"));
    function close() { box.remove(); document.removeEventListener("keydown", onKey); }
    function onKey(e) { if (e.key === "Escape") close(); }
    box.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    document.body.appendChild(box);
  }

  function linkBtn(label, href) {
    var a = el("a", "", label);
    a.href = href; a.target = "_blank"; a.rel = "noopener";
    return a;
  }

  function render(filter) {
    grid.innerHTML = "";
    var shown = projects.filter(function (p) { return filter === "All" || p.category === filter; });
    empty.hidden = shown.length > 0;
    shown.forEach(function (p) {
      var card = el("article", "card");
      var thumb = el("div", "thumb" + (p.category === "Tools" ? " tool" : ""));
      if (p.image) {
        var img = document.createElement("img");
        img.src = p.image; img.alt = p.title; img.loading = "lazy";
        if (p.category !== "Tools") {
          thumb.classList.add("zoom");
          thumb.addEventListener("click", function () { openLightbox(p.image, p.title); });
        }
        thumb.appendChild(img);
      } else if (p.icon && ICONS[p.icon]) {
        thumb.style.color = p.color || "#00e0a4";
        thumb.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true">' + ICONS[p.icon] + '</svg>';
      } else {
        thumb.textContent = "Add a screenshot";
      }
      var body = el("div", "card-body");
      body.appendChild(el("h4", "", p.title));
      body.appendChild(el("p", "", p.description));
      var tags = el("div", "tags");
      p.tags.forEach(function (t) { tags.appendChild(el("span", "", t)); });
      body.appendChild(tags);
      var links = el("div", "card-links");
      if (p.play) links.appendChild(linkBtn("Play on Roblox", p.play));
      if (p.code) links.appendChild(linkBtn("View Code", p.code));
      body.appendChild(links);
      card.appendChild(thumb);
      card.appendChild(body);

      // subtle 3D tilt on hover (desktop)
      card.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(800px) rotateY(" + x * 8 + "deg) rotateX(" + -y * 8 + "deg) translateY(-4px)";
      });
      card.addEventListener("pointerleave", function () { card.style.transform = ""; });

      grid.appendChild(card);
    });
  }

  var cats = ["All"];
  var order = ["UI's", "GUI", "Tools"]; // tab order; any new category is added after these
  order.concat(projects.map(function (p) { return p.category; })).forEach(function (c) {
    if (cats.indexOf(c) === -1 && projects.some(function (p) { return p.category === c; })) cats.push(c);
  });

  cats.forEach(function (c, i) {
    var count = c === "All" ? projects.length : projects.filter(function (p) { return p.category === c; }).length;
    var b = el("button", "filter" + (i === 0 ? " on" : ""), c);
    b.type = "button";
    b.appendChild(el("span", "", String(count)));
    b.addEventListener("click", function () {
      filtersEl.querySelectorAll(".filter").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on");
      render(c);
    });
    filtersEl.appendChild(b);
  });

  render("All");
})();
