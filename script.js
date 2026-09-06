```javascript
/* =========================================
   PREMIUM PORTFOLIO JAVASCRIPT
   DR. MOHAMED ALI
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });
  }


  /* =========================================
     TYPING / ROLE ANIMATION
  ========================================= */

  const rolesContainer = document.querySelector(".roles");

  if (rolesContainer) {

    const words = [
      "طبيب",
      "مبرمج",
      "متداول"
    ];

    rolesContainer.innerHTML = `
      <span class="animated-role"></span>
    `;

    const roleElement =
      rolesContainer.querySelector(".animated-role");

    let currentRole = 0;

    function showRole() {

      roleElement.classList.remove("show");

      setTimeout(() => {

        roleElement.textContent =
          words[currentRole];

        roleElement.classList.add("show");

        currentRole++;

        if (currentRole >= words.length) {
          currentRole = 0;
        }

      }, 350);
    }

    showRole();

    setInterval(showRole, 2300);
  }


  /* =========================================
     PREMIUM REVEAL SYSTEM
  ========================================= */

  const revealElements = document.querySelectorAll(`
    .section,
    .about-box,
    .field-card,
    .skill-box,
    .quote,
    .contact-card,
    footer
  `);

  revealElements.forEach(element => {
    element.classList.add("premium-reveal");
  });


  const revealObserver =
    new IntersectionObserver((entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      });

    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px"
    });


  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* =========================================
     STAGGER CARDS
  ========================================= */

  const cards = document.querySelectorAll(".field-card");

  cards.forEach((card, index) => {

    card.style.transitionDelay =
      `${index * 0.15}s`;

  });


  /* =========================================
     STAGGER SKILLS
  ========================================= */

  const skillBoxes =
    document.querySelectorAll(".skill-box");

  skillBoxes.forEach((box, index) => {

    box.style.transitionDelay =
      `${index * 0.18}s`;

  });


  /* =========================================
     HERO ELEMENTS
  ========================================= */

  const heroItems = [
    ".eyebrow",
    ".hero h1",
    ".roles",
    ".hero-text",
    ".hero-actions",
    ".stats"
  ];

  heroItems.forEach((selector, index) => {

    const element =
      document.querySelector(selector);

    if (!element) return;

    element.classList.add("hero-sequence");

    element.style.animationDelay =
      `${0.15 + index * 0.14}s`;

  });


  /* =========================================
     PROGRESS BAR ANIMATION
  ========================================= */

  const progressBars =
    document.querySelectorAll(".progress i");

  progressBars.forEach(bar => {

    const finalWidth =
      bar.style.width;

    bar.dataset.width = finalWidth;

    bar.style.width = "0%";

  });


  const progressObserver =
    new IntersectionObserver((entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const bars =
          entry.target.querySelectorAll(".progress i");

        bars.forEach((bar, index) => {

          setTimeout(() => {

            bar.style.width =
              bar.dataset.width;

          }, index * 250);

        });

        observer.unobserve(entry.target);

      });

    }, {
      threshold: 0.3
    });


  document.querySelectorAll(".skill-box")
    .forEach(box => {
      progressObserver.observe(box);
    });


  /* =========================================
     PARTICLES
  ========================================= */

  const particlesContainer =
    document.getElementById("particles");

  if (particlesContainer) {

    const particleCount =
      window.innerWidth < 600 ? 25 : 45;

    for (let i = 0; i < particleCount; i++) {

      const particle =
        document.createElement("span");

      particle.className = "particle";

      particle.style.left =
        Math.random() * 100 + "%";

      particle.style.top =
        Math.random() * 100 + "%";

      const size =
        Math.random() * 2 + 1;

      particle.style.width =
        `${size}px`;

      particle.style.height =
        `${size}px`;

      particle.style.animationDuration =
        `${4 + Math.random() * 7}s`;

      particle.style.animationDelay =
        `${Math.random() * 5}s`;

      particlesContainer.appendChild(particle);
    }
  }


  /* =========================================
     HEADER SCROLL EFFECT
  ========================================= */

  const header =
    document.querySelector(".header");

  window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 40) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  });


  /* =========================================
     ACTIVE NAV LINK
  ========================================= */

  const sections =
    document.querySelectorAll("main section[id]");

  const navLinks =
    document.querySelectorAll(".nav a");

  const navObserver =
    new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          link.classList.remove("active-link");
        });

        const activeLink =
          document.querySelector(
            `.nav a[href="#${entry.target.id}"]`
          );

        if (activeLink) {
          activeLink.classList.add("active-link");
        }

      });

    }, {
      threshold: 0.45
    });


  sections.forEach(section => {
    navObserver.observe(section);
  });


  /* =========================================
     PREMIUM CARD TILT
  ========================================= */

  const tiltCards =
    document.querySelectorAll(
      ".field-card, .skill-box"
    );

  if (window.innerWidth > 850) {

    tiltCards.forEach(card => {

      card.addEventListener("mousemove", e => {

        const rect =
          card.getBoundingClientRect();

        const x =
          e.clientX - rect.left;

        const y =
          e.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateX =
          ((y - centerY) / centerY) * -3;

        const rotateY =
          ((x - centerX) / centerX) * 3;

        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-5px)`;

      });

      card.addEventListener("mouseleave", () => {

        card.style.transform =
          "";

      });

    });

  }


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document.querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", e => {

        const targetId =
          link.getAttribute("href");

        const target =
          document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });

});
```
