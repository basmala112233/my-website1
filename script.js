```javascript
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });
}

// حركة بسيطة للخلفية
const particles = document.getElementById("particles");

if (particles) {
  for (let i = 0; i < 35; i++) {
    const dot = document.createElement("span");

    dot.style.position = "absolute";
    dot.style.width = Math.random() * 3 + 1 + "px";
    dot.style.height = dot.style.width;
    dot.style.background = "rgba(0, 212, 170, 0.45)";
    dot.style.borderRadius = "50%";
    dot.style.left = Math.random() * 100 + "%";
    dot.style.top = Math.random() * 100 + "%";
    dot.style.animation = `floatParticle ${5 + Math.random() * 8}s ease-in-out infinite`;
    dot.style.animationDelay = Math.random() * 5 + "s";

    particles.appendChild(dot);
  }
}
```
