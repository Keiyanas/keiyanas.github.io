// ════════════════════════════════════════
//  ENTER WORLD
// ════════════════════════════════════════
const splash      = document.getElementById('splash');
const site        = document.getElementById('site');
const enterWorld  = document.getElementById('enter-world');
const bgMusic     = document.getElementById('bg-music');
const bgVideoWrap = document.getElementById('bg-video-wrap');

function enterSite() {
  bgVideoWrap.classList.add('visible');

  bgMusic.volume = 0.55;
  bgMusic.play().catch(() => {
  });

  splash.classList.add('hidden');
  site.classList.add('visible');
}

enterWorld.addEventListener('click', enterSite);
enterWorld.addEventListener('touchend', e => { e.preventDefault(); enterSite(); });


// ════════════════════════════════════════
//  TYPEWRITER
//  Edit the words in index.html/here
// ════════════════════════════════════════
(function () {
  const el          = document.getElementById('typewriter');
  const words       = window.typewriterWords || ['hi, i\'m verkyana.', 'AMD Ryzen 7 8845HS, 16GB, 1TB SSD.', 'I\'m a developer'];
  const typeSpeed   = 65;
  const deleteSpeed = 35;
  const pauseAfter  = 1900;
  const pauseBefore = 380;
  let wordIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const word = words[wordIndex % words.length];
    el.textContent = word.slice(0, charIndex);

    if (!deleting && charIndex < word.length) {
      charIndex++;
      setTimeout(tick, typeSpeed);
    } else if (!deleting && charIndex === word.length) {
      deleting = true;
      setTimeout(tick, pauseAfter);
    } else if (deleting && charIndex > 0) {
      charIndex--;
      setTimeout(tick, deleteSpeed);
    } else {
      deleting = false;
      wordIndex++;
      setTimeout(tick, pauseBefore);
    }
  }

  setTimeout(tick, 900);
})();


// ════════════════════════════════════════
//  INTRO CARD — 3D TILT
//  Tracks mouse position across the whole
//  page and tilts the card toward the cursor.
//  Disabled automatically on touch devices.
// ════════════════════════════════════════
(function () {
  // Skip on touch screens
  if (window.matchMedia('(hover: none)').matches) return;

  const card = document.getElementById('introCard');
  if (!card) return;

  // Max tilt angle in degrees
  const MAX_TILT = 14;
  // How much the card shifts toward the cursor (px)
  const MAX_SHIFT = 8;

  let rafId = null;
  let targetRX = 0, targetRY = 0, targetTX = 0, targetTY = 0;
  let currentRX = 0, currentRY = 0, currentTX = 0, currentTY = 0;

  // Lerp factor — lower = smoother/lazier follow
  const LERP = 0.09;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    currentRX = lerp(currentRX, targetRX, LERP);
    currentRY = lerp(currentRY, targetRY, LERP);
    currentTX = lerp(currentTX, targetTX, LERP);
    currentTY = lerp(currentTY, targetTY, LERP);

    card.style.transform =
      `rotateX(${currentRX}deg) rotateY(${currentRY}deg) translate(${currentTX}px, ${currentTY}px)`;

    // Dynamic shadow depth based on tilt
    const depth = Math.abs(currentRX) + Math.abs(currentRY);
    card.style.boxShadow =
      `0 ${8 + depth}px ${52 + depth * 2}px rgba(0,0,0,${0.55 + depth * 0.01}),
       0 0 0 1px rgba(183,110,121,0.1)`;

    rafId = requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;

    // Normalise -1 to 1
    const nx = (e.clientX - cx) / cx;
    const ny = (e.clientY - cy) / cy;

    // rotateX tilts up/down (invert Y so cursor-up = tilt back)
    targetRX = -ny * MAX_TILT;
    targetRY =  nx * MAX_TILT;

    // Subtle translate so card floats toward the cursor
    targetTX =  nx * MAX_SHIFT;
    targetTY =  ny * MAX_SHIFT;
  });

  // Reset smoothly when the mouse leaves the window
  document.addEventListener('mouseleave', () => {
    targetRX = 0; targetRY = 0;
    targetTX = 0; targetTY = 0;
  });

  // Start the animation loop
  rafId = requestAnimationFrame(animate);
})();

// Disables F12, Ctrl+Shift+I/J, Ctrl+U to prevent easy access to dev tools.
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
