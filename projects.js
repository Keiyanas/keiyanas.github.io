/* =============================================
   projects.js  —  Projects subpage logic
   ============================================= */

/* ============================================================
   🚀  CUSTOMISE YOUR PROJECTS HERE
   Add/remove objects in the PROJECTS array.
   Fields:
     name  — display name
     url   — where the link goes
     tag   — optional label shown on the right (e.g. "React", "2024")
   ============================================================ */
const PROJECTS = [
  { name: "Specials.",   url: "valentine.html",                tag: "Web for Normies"     },
  { name: "Edelweiss.",   url: "edelweiss.html",                tag: "Web for My Gf"     },
  // ↓ keep adding as many as you like
];

/* ============================================================
   🎨  SPACE / COMET SETTINGS  (easy to tweak)
   ============================================================ */
const SPACE_CONFIG = {
  starCount:    180,    // number of background stars
  starMaxSize:  2.2,    // max star radius (px)
  starSpeed:    0.08,   // star twinkle speed

  cometCount:   6,      // how many comets at once
  cometSpeed:   { min: 5, max: 14 },   // px per frame
  cometLength:  { min: 80, max: 220 }, // tail length (px)
  cometWidth:   { min: 1, max: 2.5 },  // stroke width
  cometColor:   "#b76e79",             // hex or rgba — matches --accent
  cometSpawnEdge: true,                // spawn from top/left edges

  bgColor:      "#0d0d0d",             // should match --bg in CSS
};

/* ============================================================
   ■  FOLDER DROPDOWN  LOGIC
   ============================================================ */
(function initFolder() {
  const btn      = document.getElementById("folderBtn");
  const dropdown = document.getElementById("folderDropdown");
  const list     = document.getElementById("projectList");

  // Build project list
  PROJECTS.forEach(p => {
    const li = document.createElement("li");
    const a  = document.createElement("a");
    a.href        = p.url;
    a.textContent = p.name;
    if (p.tag) {
      const span = document.createElement("span");
      span.className   = "project-tag";
      span.textContent = p.tag;
      a.appendChild(span);
    }
    li.appendChild(a);
    list.appendChild(li);
  });

  // Toggle
  function toggleDropdown(forceClose = false) {
    const isOpen = dropdown.classList.contains("open") || forceClose;
    if (isOpen) {
      dropdown.classList.remove("open");
      dropdown.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
    } else {
      dropdown.classList.add("open");
      dropdown.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-expanded", "true");
    }
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!document.getElementById("folderWrapper").contains(e.target)) {
      toggleDropdown(true);
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleDropdown(true);
  });
})();

/* ============================================================
   ■  SPACE CANVAS
   ============================================================ */
(function initSpace() {
  const canvas = document.getElementById("spaceCanvas");
  const ctx    = canvas.getContext("2d");
  const CFG    = SPACE_CONFIG;

  let W, H, stars = [], comets = [];

  /* ---- Resize ---- */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildStars();
  }

  /* ---- Stars ---- */
  function buildStars() {
    stars = [];
    for (let i = 0; i < CFG.starCount; i++) {
      stars.push({
        x:        Math.random() * W,
        y:        Math.random() * H,
        r:        Math.random() * CFG.starMaxSize + 0.3,
        alpha:    Math.random(),
        dAlpha:   (Math.random() * 0.01 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
      });
    }
  }

  function drawStars() {
    stars.forEach(s => {
      s.alpha += s.dAlpha * CFG.starSpeed * 10;
      if (s.alpha > 1 || s.alpha < 0) s.dAlpha *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 220, 255, ${Math.max(0, Math.min(1, s.alpha))})`;
      ctx.fill();
    });
  }

  /* ---- Comets ---- */
  function spawnComet() {
    const angle = (Math.random() * 30 + 20) * (Math.PI / 180); // 20–50° downward
    const speed = lerp(CFG.cometSpeed.min, CFG.cometSpeed.max, Math.random());
    const len   = lerp(CFG.cometLength.min, CFG.cometLength.max, Math.random());
    const w     = lerp(CFG.cometWidth.min, CFG.cometWidth.max, Math.random());
    let x, y;
    if (CFG.cometSpawnEdge && Math.random() < 0.5) {
      // Spawn from top edge
      x = Math.random() * W;
      y = -len;
    } else {
      // Spawn from left edge
      x = -len;
      y = Math.random() * H * 0.6;
    }
    return { x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, len, w, alpha: 0, fadeIn: true };
  }

  function initComets() {
    for (let i = 0; i < CFG.cometCount; i++) {
      const c = spawnComet();
      // stagger starting positions
      c.x += Math.cos(Math.atan2(c.vy, c.vx)) * Math.random() * W;
      c.y += Math.sin(Math.atan2(c.vy, c.vx)) * Math.random() * H;
      c.alpha = Math.random();
      comets.push(c);
    }
  }

  function drawComets() {
    comets.forEach((c, i) => {
      // Move
      c.x += c.vx;
      c.y += c.vy;
      // Fade in
      if (c.fadeIn) { c.alpha = Math.min(1, c.alpha + 0.04); if (c.alpha >= 1) c.fadeIn = false; }

      // Tail gradient
      const tailX = c.x - Math.cos(Math.atan2(c.vy, c.vx)) * c.len;
      const tailY = c.y - Math.sin(Math.atan2(c.vy, c.vx)) * c.len;
      const grad = ctx.createLinearGradient(tailX, tailY, c.x, c.y);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, hexToRgba(CFG.cometColor, c.alpha * 0.9));

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(c.x, c.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = c.w;
      ctx.lineCap     = "round";
      ctx.stroke();

      // Head glow
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.w * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(CFG.cometColor, c.alpha * 0.8);
      ctx.fill();

      // Reset if off screen
      if (c.x > W + 100 || c.y > H + 100) {
        comets[i] = spawnComet();
      }
    });
  }

  /* ---- Helpers ---- */
  function lerp(a, b, t) { return a + (b - a) * t; }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  /* ---- Loop ---- */
  function loop() {
    ctx.fillStyle = CFG.bgColor;
    ctx.fillRect(0, 0, W, H);
    drawStars();
    drawComets();
    requestAnimationFrame(loop);
  }

  /* ---- Init ---- */
  resize();
  initComets();
  window.addEventListener("resize", resize);
  loop();
})();

// Disables inspect element
document.onkeydown = function(e) {
if(event.keyCode == 123) {
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
return false;
}
}
