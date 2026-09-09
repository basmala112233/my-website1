document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const header = document.querySelector(".header");

  /* =========================
     MOBILE MENU
  ========================= */

  menuBtn?.addEventListener("click", () => {
    nav?.classList.toggle("active");
    menuBtn.textContent = nav?.classList.contains("active") ? "✕" : "☰";
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuBtn.textContent = "☰";
    });
  });


  /* =========================
     TYPING ROLES
  ========================= */

  const roles = ["طبيب", "مبرمج", "متداول"];
  const rolesContainer = document.querySelector(".roles");

  if (rolesContainer) {
    rolesContainer.innerHTML = `
      <span class="animated-role"></span>
      <b>×</b>
      <span>شغف</span>
    `;

    const roleElement = rolesContainer.querySelector(".animated-role");
    let index = 0;

    function changeRole() {
      roleElement.style.opacity = "0";
      roleElement.style.transform = "translateY(15px)";

      setTimeout(() => {
        roleElement.textContent = roles[index];
        roleElement.style.opacity = "1";
        roleElement.style.transform = "translateY(0)";
        index = (index + 1) % roles.length;
      }, 350);
    }

    changeRole();
    setInterval(changeRole, 2200);
  }


  /* =========================
     PARTICLES
  ========================= */

  const particles = document.getElementById("particles");

  if (particles) {
    const count = window.innerWidth <= 600 ? 25 : 55;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("span");

      particle.className = "particle";

      const size = Math.random() * 2 + 1;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration =
        `${4 + Math.random() * 7}s`;
      particle.style.animationDelay =
        `${Math.random() * 5}s`;

      particles.appendChild(particle);
    }
  }


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements = document.querySelectorAll(`
    .section,
    .about-box,
    .field-card,
    .skill-box,
    .quote,
    .contact-card,
    footer
  `);

  revealElements.forEach(el => {
    el.classList.add("premium-reveal");
  });

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  /* =========================
     HERO ANIMATION
  ========================= */

  const heroItems = [
    ".eyebrow",
    ".hero h1",
    ".roles",
    ".hero-text",
    ".hero-actions",
    ".stats"
  ];

  heroItems.forEach((selector, index) => {
    const element = document.querySelector(selector);

    if (!element) return;

    element.classList.add("hero-sequence");
    element.style.animationDelay =
      `${0.15 + index * 0.14}s`;
  });


  /* =========================
     PROGRESS BARS
  ========================= */

  const progressBars =
    document.querySelectorAll(".progress i");

  progressBars.forEach(bar => {
    bar.dataset.width = bar.style.width;
    bar.style.width = "0%";
  });

  const progressObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const bars =
          entry.target.querySelectorAll(".progress i");

        bars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, index * 250);
        });

        progressObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".skill-box")
    .forEach(box => progressObserver.observe(box));


  /* =========================
     HEADER SCROLL
  ========================= */

  function updateHeader() {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 40
    );
  }

  window.addEventListener("scroll", updateHeader);
  updateHeader();


  /* =========================
     ACTIVE NAV
  ========================= */

  const sections =
    document.querySelectorAll("main section[id]");

  const navLinks =
    document.querySelectorAll(".nav a");

  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link =>
          link.classList.remove("active-link")
        );

        const active =
          document.querySelector(
            `.nav a[href="#${entry.target.id}"]`
          );

        active?.classList.add("active-link");
      });
    },
    {
      threshold: 0.45
    }
  );

  sections.forEach(section =>
    navObserver.observe(section)
  );


  /* =========================
     CARD TILT
  ========================= */

  if (window.innerWidth > 850) {
    document
      .querySelectorAll(".field-card, .skill-box")
      .forEach(card => {

        card.addEventListener("mousemove", e => {
          const rect = card.getBoundingClientRect();

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const rotateX =
            ((y - rect.height / 2) /
              (rect.height / 2)) * -3;

          const rotateY =
            ((x - rect.width / 2) /
              (rect.width / 2)) * 3;

          card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "";
        });
      });
  }


  /* =========================
     SMOOTH SCROLL
  ========================= */

  document.querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", e => {
        const id = link.getAttribute("href");
        const target = document.querySelector(id);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });

    });


  /* =========================
     ESC CLOSE MENU
  ========================= */

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      nav?.classList.remove("active");

      if (menuBtn) {
        menuBtn.textContent = "☰";
      }
    }
  });

});
