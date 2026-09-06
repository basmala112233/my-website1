```javascript
/* =========================
   MOBILE MENU
========================= */

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


/* =========================
   PREMIUM ROLE ANIMATION
========================= */

const rolesContainer = document.querySelector(".roles");

if (rolesContainer) {

  const roles = ["طبيب", "مبرمج", "متداول"];
  let currentRole = 0;

  rolesContainer.innerHTML = `
    <span class="animated-role"></span>
  `;

  const roleElement = rolesContainer.querySelector(".animated-role");

  function showRole() {

    roleElement.style.opacity = "0";
    roleElement.style.transform = "translateY(15px)";

    setTimeout(() => {

      roleElement.textContent = roles[currentRole];

      roleElement.style.opacity = "1";
      roleElement.style.transform = "translateY(0)";

      currentRole++;

      if (currentRole >= roles.length) {
        currentRole = 0;
      }

    }, 400);
  }

  showRole();

  setInterval(showRole, 2200);
}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
  ".section, .field-card, .skill-box, .about-box, .contact-card, .quote"
);

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("reveal-show");

        observer.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  element.classList.add("reveal");
  observer.observe(element);
});


/* =========================
   PARTICLES
========================= */

const particles = document.getElementById("particles");

if (particles) {

  for (let i = 0; i < 45; i++) {

    const dot = document.createElement("span");

    dot.className = "particle";

    dot.style.left = Math.random() * 100 + "%";
    dot.style.top = Math.random() * 100 + "%";

    dot.style.animationDelay =
      Math.random() * 6 + "s";

    dot.style.animationDuration =
      5 + Math.random() * 8 + "s";

    particles.appendChild(dot);
  }
}
```
