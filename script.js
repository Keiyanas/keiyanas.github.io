// ══════════════════════════════════════════
//  Enter World
// ══════════════════════════════════════════
const splash      = document.getElementById('splash');
const site        = document.getElementById('site');
const enterWorld  = document.getElementById('enter-world');
const bgMusic     = document.getElementById('bg-music');
const bgVideoWrap = document.getElementById('bg-video-wrap');

function enterSite() {
  bgVideoWrap.classList.add('visible');

  // Play music — works because this runs inside a user gesture
  bgMusic.volume = 0.6;
  bgMusic.play().catch(() => {
    // music.mp3 not found yet — silently ignore until you add your file
  });

  splash.classList.add('hidden');
  site.classList.add('visible');
}

enterWorld.addEventListener('click', enterSite);
enterWorld.addEventListener('touchend', e => { e.preventDefault(); enterSite(); });


// ══════════════════════════════════════════
//  Typewriter
//  — words are defined in index.html so
//    you can easily edit them there
// ══════════════════════════════════════════
(function () {
  const el          = document.getElementById('typewriter');
  const words       = window.typewriterWords || ["hi, im ian.", "AMD Radeon 7 8845HS, 16GB, 1TB SSD.", "i'm a developer."];
  const typeSpeed   = 65;   // ms per character typed
  const deleteSpeed = 35;   // ms per character deleted
  const pauseAfter  = 1800; // ms pause after fully typed
  const pauseBefore = 400;  // ms pause before typing next word

  let wordIndex = 0;
  let charIndex = 0;
  let deleting  = false;

  function tick() {
    const word    = words[wordIndex % words.length];
    const current = word.slice(0, charIndex);
    el.textContent = current;

    if (!deleting && charIndex < word.length) {
      // Still typing
      charIndex++;
      setTimeout(tick, typeSpeed);
    } else if (!deleting && charIndex === word.length) {
      // Finished typing — pause then start deleting
      deleting = true;
      setTimeout(tick, pauseAfter);
    } else if (deleting && charIndex > 0) {
      // Deleting
      charIndex--;
      setTimeout(tick, deleteSpeed);
    } else {
      // Done deleting — move to next word
      deleting = false;
      wordIndex++;
      setTimeout(tick, pauseBefore);
    }
  }

  // Start after a short delay so it feels intentional
  setTimeout(tick, 800);
})();

// No inspect element, no ctrl+u, no f12, no ctrl+shift+i/j
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