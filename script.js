```javascript
document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active");

      menuBtn.textContent =
        nav.classList.contains("active") ? "✕" : "☰";
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuBtn.textContent = "☰";
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

      roleElement.style.opacity = "0";
      roleElement.style.transform = "translateY(15px)";

      setTimeout(() => {

        roleElement.textContent =
          words[currentRole];

        roleElement.style.opacity = "1";
        roleElement.style.transform = "translateY(0)";

        currentRole =
          (currentRole + 1) % words.length;

      }, 350);
    }

    showRole();

    setInterval(showRole, 2300);
  }


  /* =========================================
     PREMIUM REVEAL
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

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        });

      }, {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =========================================
     HERO ANIMATION
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
     STAGGER CARDS
  ========================================= */

  document.querySelectorAll(".field-card")
    .forEach((card, index) => {

      card.style.transitionDelay =
        `${index * 0.12}s`;

    });

  document.querySelectorAll(".skill-box")
    .forEach((box, index) => {

      box.style.transitionDelay =
        `${index * 0.15}s`;

    });


  /* =========================================
     PROGRESS BARS
  ========================================= */

  const progressBars =
    document.querySelectorAll(".progress i");

  progressBars.forEach(bar => {

    const finalWidth =
      bar.style.width;

    bar.dataset.width = finalWidth;

    bar.style.width = "0%";

  });

  if ("IntersectionObserver" in window) {

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

  }


  /* =========================================
     PARTICLES
  ========================================= */

  const particlesContainer =
    document.getElementById("particles");

  if (particlesContainer) {

    const particleCount =
      window.innerWidth < 600 ? 25 : 50;

    const fragment =
      document.createDocumentFragment();

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

      fragment.appendChild(particle);
    }

    particlesContainer.appendChild(fragment);
  }


  /* =========================================
     HEADER SCROLL EFFECT
  ========================================= */

  const header =
    document.querySelector(".header");

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =========================================
     ACTIVE NAV LINK
  ========================================= */

  const sections =
    document.querySelectorAll("main section[id]");

  const navLinks =
    document.querySelectorAll(".nav a");

  if ("IntersectionObserver" in window) {

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
        threshold: 0.4
      });

    sections.forEach(section => {
      navObserver.observe(section);
    });

  }


  /* =========================================
     CARD 3D TILT
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
          ((y - centerY) / centerY) * -4;

        const rotateY =
          ((x - centerX) / centerX) * 4;

        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-6px)`;

      });

      card.addEventListener("mouseleave", () => {

        card.style.transform = "";

      });

    });

  }


  /* =========================================
     MOUSE GLOW
  ========================================= */

  const site =
    document.querySelector(".site");

  if (site && window.innerWidth > 850) {

    const mouseGlow =
      document.createElement("div");

    mouseGlow.className =
      "mouse-glow";

    document.body.appendChild(mouseGlow);

    document.addEventListener("mousemove", e => {

      mouseGlow.style.left =
        `${e.clientX}px`;

      mouseGlow.style.top =
        `${e.clientY}px`;

    });

  }


  /* =========================================
     SCROLL PROGRESS
  ========================================= */

  const progress =
    document.createElement("div");

  progress.className =
    "scroll-progress";

  document.body.appendChild(progress);

  function updateScrollProgress() {

    const scrollTop =
      window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progress.style.width =
      `${percentage}%`;

  }

  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );

  updateScrollProgress();


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document.querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", e => {

        const targetId =
          link.getAttribute("href");

        if (!targetId || targetId === "#") {
          return;
        }

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


  /* =========================================
     BACK TO TOP
  ========================================= */

  const topButton =
    document.createElement("button");

  topButton.className =
    "back-to-top";

  topButton.innerHTML = "↑";

  topButton.setAttribute(
    "aria-label",
    "العودة إلى الأعلى"
  );

  document.body.appendChild(topButton);

  window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {
      topButton.classList.add("show");
    } else {
      topButton.classList.remove("show");
    }

  }, { passive: true });

  topButton.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  /* =========================================
     CONTACT BUTTON EFFECT
  ========================================= */

  document.querySelectorAll(
    ".btn.primary, .contact-btn"
  ).forEach(button => {

    button.addEventListener("mousemove", e => {

      const rect =
        button.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;

      button.style.setProperty(
        "--mouse-x",
        `${x}px`
      );

      button.style.setProperty(
        "--mouse-y",
        `${y}px`
      );

    });

  });


  /* =========================================
     CONSOLE
  ========================================= */

  console.log(
    "%c DR. MOHAMED ALI ",
    "background:#00d4aa;color:#04110e;font-size:16px;font-weight:bold;padding:8px;"
  );

  console.log(
    "Doctor × Programmer × Trader"
  );

});
```
