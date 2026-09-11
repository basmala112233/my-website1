```javascript
/* =========================================================
   DR. MOHAMED ALI
   PORTFOLIO ANIMATION SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const header = document.getElementById("header");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const particles = document.getElementById("particles");
  const animatedRole = document.getElementById("animatedRole");
  const year = document.getElementById("year");


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

      nav.classList.toggle("active");

      if (nav.classList.contains("active")) {
        menuBtn.textContent = "✕";
        menuBtn.setAttribute("aria-label", "إغلاق القائمة");
      } else {
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-label", "فتح القائمة");
      }

    });


    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("active");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute(
          "aria-label",
          "فتح القائمة"
        );

      });

    });

  }


  /* =======================================================
     HEADER SCROLL
  ======================================================= */

  function handleHeader() {

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  window.addEventListener(
    "scroll",
    handleHeader,
    { passive: true }
  );

  handleHeader();


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("show");

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
      }
    );


  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* =======================================================
     HERO ROLE ANIMATION
  ======================================================= */

  if (animatedRole) {

    const roles = [
      "مبرمج",
      "مطور مواقع",
      "مهتم بالتقنية",
      "متداول"
    ];

    let roleIndex = 0;

    setInterval(() => {

      animatedRole.classList.remove("show");
      animatedRole.classList.add("hide");

      setTimeout(() => {

        roleIndex++;

        if (roleIndex >= roles.length) {
          roleIndex = 0;
        }

        animatedRole.textContent =
          roles[roleIndex];

        animatedRole.classList.remove("hide");
        animatedRole.classList.add("show");

      }, 500);

    }, 2500);

  }


  /* =======================================================
     SKILL BARS
  ======================================================= */

  const progressBars =
    document.querySelectorAll(".progress i");

  const progressObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const bar = entry.target;

          const width =
            bar.dataset.width || "0%";

          bar.style.setProperty(
            "--progress-width",
            width
          );

          setTimeout(() => {
            bar.classList.add("loaded");
          }, 150);

          observer.unobserve(bar);

        });

      },
      {
        threshold: 0.5
      }
    );


  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });


  /* =======================================================
     CHART ANIMATION
  ======================================================= */

  const charts =
    document.querySelectorAll(".chart");

  const chartObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const chart = entry.target;

          chart.classList.add("loaded");

          observer.unobserve(chart);

        });

      },
      {
        threshold: 0.5
      }
    );


  charts.forEach(chart => {
    chartObserver.observe(chart);
  });


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navLinks =
    document.querySelectorAll(".nav a");

  const sectionObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const id =
            entry.target.getAttribute("id");

          navLinks.forEach(link => {

            link.classList.remove(
              "active-link"
            );

            if (
              link.getAttribute("href") ===
              `#${id}`
            ) {
              link.classList.add(
                "active-link"
              );
            }

          });

        });

      },
      {
        threshold: 0.45
      }
    );


  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  /* =======================================================
     PARTICLES
  ======================================================= */

  if (particles) {

    const particleCount =
      window.innerWidth <= 600 ? 35 : 70;

    for (
      let i = 0;
      i < particleCount;
      i++
    ) {

      const particle =
        document.createElement("span");

      particle.className = "particle";

      particle.style.left =
        Math.random() * 100 + "%";

      particle.style.top =
        Math.random() * 100 + "%";

      particle.style.animationDuration =
        (4 + Math.random() * 7) + "s";

      particle.style.animationDelay =
        (-Math.random() * 8) + "s";

      particle.style.opacity =
        (0.1 + Math.random() * 0.5);

      particles.appendChild(particle);

    }

  }


  /* =======================================================
     MOUSE PARALLAX HERO
  ======================================================= */

  const visual =
    document.querySelector(".hero-visual");

  const photo =
    document.querySelector(".photo-card");

  if (
    visual &&
    photo &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    visual.addEventListener(
      "mousemove",
      event => {

        const rect =
          visual.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const moveX =
          (x / rect.width - 0.5) * 14;

        const moveY =
          (y / rect.height - 0.5) * 14;

        photo.style.transform =
          `translate(${moveX}px, ${moveY}px) rotate(-1deg)`;

      }
    );


    visual.addEventListener(
      "mouseleave",
      () => {

        photo.style.transform = "";

      }
    );

  }


  /* =======================================================
     SMOOTH BUTTON EFFECT
  ======================================================= */

  document
    .querySelectorAll(".btn, .contact-btn")
    .forEach(button => {

      button.addEventListener(
        "mousemove",
        event => {

          const rect =
            button.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          button.style.setProperty(
            "--mouse-x",
            `${x}px`
          );

          button.style.setProperty(
            "--mouse-y",
            `${y}px`
          );

        }
      );

    });


  /* =======================================================
     CARD TILT
  ======================================================= */

  const cards =
    document.querySelectorAll(
      ".field-card, .skill-box"
    );

  if (
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    cards.forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateX =
            ((y / rect.height) - 0.5) * -5;

          const rotateY =
            ((x / rect.width) - 0.5) * 5;

          card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform = "";

        }
      );

    });

  }


  /* =======================================================
     COUNTERS
  ======================================================= */

  const counters =
    document.querySelectorAll(
      "[data-counter]"
    );

  const counterObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const counter =
            entry.target;

          const target =
            Number(
              counter.dataset.counter
            );

          let current = 0;

          const duration = 1200;

          const start =
            performance.now();

          function animateCounter(now) {

            const progress =
              Math.min(
                (now - start) / duration,
                1
              );

            current =
              Math.floor(
                progress * target
              );

            if (target === 100) {
              counter.textContent =
                current + "%";
            } else {
              counter.textContent =
                String(current).padStart(2, "0");
            }

            if (progress < 1) {
              requestAnimationFrame(
                animateCounter
              );
            }

          }

          requestAnimationFrame(
            animateCounter
          );

          observer.unobserve(counter);

        });

      },
      {
        threshold: 0.8
      }
    );


  counters.forEach(counter => {
    counterObserver.observe(counter);
  });


  /* =======================================================
     CONSOLE
  ======================================================= */

  console.log(
    "%cDR. MOHAMED ALI",
    "color:#00d4aa;font-size:24px;font-weight:bold;"
  );

  console.log(
    "%cDoctor × Programmer × Trader",
    "color:#8da2b8;font-size:14px;"
  );

});
```
