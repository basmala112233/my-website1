```javascript
/* =========================
   MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", function () {
    nav.classList.toggle("active");
  });

  const navLinks = nav.querySelectorAll("a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("active");
    });
  });
}


/* =========================
   TEXT ANIMATION
========================= */

const rolesContainer = document.querySelector(".roles");

if (rolesContainer) {

  const words = ["طبيب", "مبرمج", "متداول"];

  let index = 0;

  rolesContainer.innerHTML = "";

  const word = document.createElement("span");
  const separator1 = document.createElement("b");
  const separator2 = document.createElement("b");

  separator1.textContent = " × ";
  separator2.textContent = " × ";

  rolesContainer.appendChild(word);

  word.className = "animated-role";

  function changeWord() {

    word.classList.remove("show");

    setTimeout(function () {

      word.textContent = words[index];

      word.classList.add("show");

      index++;

      if (index >= words.length) {
        index = 0;
      }

    }, 500);
  }

  changeWord();

  setInterval(changeWord, 2200);
}


/* =========================
   SCROLL ANIMATION
========================= */

const animatedSections = document.querySelectorAll(
  ".section, .field-card, .skill-box, .about-box, .contact-card, .quote"
);

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    function (entries) {

      entries.forEach(function (entry) {

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

  animatedSections.forEach(function (element) {

    element.classList.add("reveal");

    observer.observe(element);

  });

} else {

  animatedSections.forEach(function (element) {
    element.classList.add("reveal-show");
  });

}


/* =========================
   PARTICLES
========================= */

const particles = document.getElementById("particles");

if (particles) {

  for (let i = 0; i < 45; i++) {

    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.top =
      Math.random() * 100 + "%";

    particle.style.animationDelay =
      Math.random() * 6 + "s";

    particle.style.animationDuration =
      5 + Math.random() * 8 + "s";

    particles.appendChild(particle);
  }
}
```
