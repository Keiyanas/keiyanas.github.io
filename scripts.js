// Szehaehaea

const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// sigma

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Typewriter Effect
document.addEventListener("DOMContentLoaded", () => {
    const text = "Vers sigma";
    const typewriter = document.getElementById("typewriter-text");
    let index = 0;
  
    function type() {
      if (index < text.length) {
        typewriter.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100); // Typing speed in milliseconds
      }
    }
  
    type();
  });
  