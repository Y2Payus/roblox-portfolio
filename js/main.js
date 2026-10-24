(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll + counters + skill bars ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var start = performance.now();
    var dur = 1400;
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (i) { i.classList.add("in"); });
      document.querySelectorAll("[data-count]").forEach(animateCount);
      document.querySelectorAll(".track i").forEach(function (b) { b.style.width = b.dataset.w + "%"; });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.classList.add("in");
        el.querySelectorAll("[data-count]").forEach(animateCount);
        el.querySelectorAll(".track i").forEach(function (b) { b.style.width = b.dataset.w + "%"; });
        io.unobserve(el);
      });
    }, { threshold: 0.15 });
    items.forEach(function (i) { io.observe(i); });
    window.__revealObserver = io;
  }
  setupReveal();

  /* ---------- Typing effect ---------- */
  var typed = document.getElementById("typed");
  if (typed) {
    var words = ["Roblox Developer", "Luau Scripter", "Game Designer", "UI Builder"];
    var w = 0, c = 0, deleting = false;
    (function type() {
      var word = words[w];
      typed.textContent = word.slice(0, c);
      var delay = deleting ? 45 : 95;
      if (!deleting && c === word.length) { deleting = true; delay = 1400; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      c += deleting ? -1 : 1;
      setTimeout(type, delay);
    })();
  }

  /* ---------- Loader ---------- */
  var loader = document.getElementById("loader");
  if (loader) {
    var bar = document.getElementById("loader-bar");
    var pct = document.getElementById("loader-pct");
    var p = 0;
    var timer = setInterval(function () {
      p = Math.min(p + Math.random() * 14 + 6, 100);
      bar.style.width = p + "%";
      pct.textContent = Math.floor(p) + "%";
      if (p >= 100) {
        clearInterval(timer);
        setTimeout(function () {
          loader.style.transition = "opacity 0.5s";
          loader.style.opacity = "0";
          setTimeout(function () { loader.remove(); }, 520);
        }, 200);
      }
    }, 90);
  }

  /* ---------- Three.js background ---------- */
  var canvas = document.getElementById("bg");
  if (canvas && window.THREE && !reduceMotion) {
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 14;

    // Floating wireframe blocks (a nod to Roblox bricks)
    var group = new THREE.Group();
    scene.add(group);
    var colors = [0x00e0a4, 0x6d7cff, 0x8a5cff];
    var blocks = [];
    for (var i = 0; i < 26; i++) {
      var s = Math.random() * 1.1 + 0.4;
      var geo = new THREE.BoxGeometry(s, s, s);
      var mat = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length], wireframe: true, transparent: true, opacity: 0.35
      });
      var m = new THREE.Mesh(geo, mat);
      m.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 14 - 2);
      m.rotation.set(Math.random() * 3, Math.random() * 3, 0);
      m.userData = { rx: (Math.random() - 0.5) * 0.008, ry: (Math.random() - 0.5) * 0.008, fy: Math.random() * 6, sp: Math.random() * 0.4 + 0.2, baseY: m.position.y };
      group.add(m);
      blocks.push(m);
    }

    // Star dust
    var N = 600;
    var pos = new Float32Array(N * 3);
    for (var j = 0; j < N * 3; j++) pos[j] = (Math.random() - 0.5) * 50;
    var pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    var stars = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.045, transparent: true, opacity: 0.6 }));
    scene.add(stars);

    var mx = 0, my = 0;
    window.addEventListener("pointermove", function (e) {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function resize() {
      var w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);
    resize();

    var clock = new THREE.Clock();
    var running = true;
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running) animate();
    });

    function animate() {
      if (!running) return;
      var t = clock.getElapsedTime();
      blocks.forEach(function (b) {
        b.rotation.x += b.userData.rx;
        b.rotation.y += b.userData.ry;
        b.position.y = b.userData.baseY + Math.sin(t * b.userData.sp + b.userData.fy) * 0.6;
      });
      stars.rotation.y = t * 0.01;
      var scrollP = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
      group.rotation.y += (mx * 0.25 - group.rotation.y) * 0.04;
      group.rotation.x += (my * 0.15 + scrollP * 0.6 - group.rotation.x) * 0.04;
      camera.position.z = 14 - scrollP * 3;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  }

})();
