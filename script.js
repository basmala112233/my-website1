```javascript
/* =========================================================
   DR. MOHAMED ALI — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active");

      const isOpen = nav.classList.contains("active");

      menuBtn.innerHTML = isOpen ? "✕" : "☰";
      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "إغلاق القائمة" : "فتح القائمة"
      );
    });

    // إغلاق القائمة عند الضغط على أي رابط
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");

        menuBtn.innerHTML = "☰";
        menuBtn.setAttribute("aria-label", "فتح القائمة");
      });
    });
  }


  /* =======================================================
     HEADER ON SCROLL
  ======================================================= */

  const header = document.querySelector(".header");

  function handleHeader() {

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleHeader, {
    passive: true
  });

  handleHeader();


  /* =======================================================
     HERO SEQUENCE
  ======================================================= */

  const heroElements = [
    document.querySelector(".eyebrow"),
    document.querySelector(".hero h1"),
    document.querySelector(".roles"),
    document.querySelector(".hero-text"),
    document.querySelector(".hero-actions"),
    document.querySelector(".stats")
  ];

  heroElements.forEach((element, index) => {

    if (!element) return;

    element.classList.add("hero-sequence");

    element.style.animationDelay = `${index * 0.14}s`;
  });


  /* =======================================================
     ANIMATED ROLES
  ======================================================= */

  const rolesContainer = document.querySelector(".roles");

  if (rolesContainer) {

    const roleItems = [
      "طبيب",
      "مبرمج",
      "متداول"
    ];

    const spans = rolesContainer.querySelectorAll("span");

    let currentRole = 0;

    function showRole() {

      spans.forEach(span => {
        span.classList.remove("animated-role", "show");
      });

      const target = spans[currentRole];

      if (target) {

        target.classList.add("animated-role");

        setTimeout(() => {
          target.classList.add("show");
        }, 50);
      }

      currentRole++;

      if (currentRole >= roleItems.length) {
        currentRole = 0;
      }
    }

    // لو عدد الـ spans مطابق
    if (spans.length >= 3) {

      spans.forEach((span, index) => {

        span.classList.add("animated-role");

        span.style.transitionDelay = `${index * 0.15}s`;

      });

      setTimeout(() => {
        spans.forEach(span => {
          span.classList.add("show");
        });
      }, 800);
    }
  }


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements = document.querySelectorAll(
    ".section-title, " +
    ".about-box, " +
    ".field-card, " +
    ".skill-box, " +
    ".vision-card, " +
    ".quote, " +
    ".contact-card"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });


  const revealObserver = new IntersectionObserver(
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
     STAGGER CARDS
  ======================================================= */

  const cardGroups = [
    ".field-card",
    ".vision-card",
    ".skill-box",
    ".market-grid > div",
    ".stats .stat"
  ];

  cardGroups.forEach(selector => {

    const cards = document.querySelectorAll(selector);

    cards.forEach((card, index) => {

      card.style.transitionDelay = `${index * 0.12}s`;

      card.classList.add("premium-reveal");
    });
  });


  const premiumElements = document.querySelectorAll(
    ".premium-reveal"
  );

  const premiumObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      });

    },
    {
      threshold: 0.1
    }
  );


  premiumElements.forEach(element => {
    premiumObserver.observe(element);
  });


  /* =======================================================
     SKILLS PROGRESS
  ======================================================= */

  const progressBars = document.querySelectorAll(
    ".progress i"
  );

  const progressObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const bar = entry.target;

        const width = bar.dataset.width;

        if (width) {
          bar.style.setProperty(
            "--progress-width",
            width
          );

          bar.classList.add("loaded");
        }

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
     TRADING CHART
  ======================================================= */

  const charts = document.querySelectorAll(".chart");

  const chartObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("loaded");

        observer.unobserve(entry.target);
      });

    },
    {
      threshold: 0.4
    }
  );


  charts.forEach(chart => {
    chartObserver.observe(chart);
  });


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navLinks = document.querySelectorAll(
    ".nav a"
  );


  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        navLinks.forEach(link => {

          link.classList.remove("active-link");

          if (
            link.getAttribute("href") ===
            `#${currentId}`
          ) {
            link.classList.add("active-link");
          }

        });

      });

    },
    {
      threshold: 0.25,
      rootMargin: "-20% 0px -55% 0px"
    }
  );


  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  /* =======================================================
     PARTICLES
  ======================================================= */

  const particlesContainer =
    document.getElementById("particles");


  if (particlesContainer) {

    const particleCount =
      window.innerWidth < 600 ? 25 : 55;


    for (let i = 0; i < particleCount; i++) {

      const particle =
        document.createElement("span");

      particle.className = "particle";

      particle.style.left =
        `${Math.random() * 100}%`;

      particle.style.top =
        `${Math.random() * 100}%`;

      const size =
        Math.random() * 2 + 1;

      particle.style.width =
        `${size}px`;

      particle.style.height =
        `${size}px`;

      particle.style.animationDuration =
        `${Math.random() * 5 + 4}s`;

      particle.style.animationDelay =
        `${Math.random() * 5}s`;

      particlesContainer.appendChild(
        particle
      );
    }
  }


  /* =======================================================
     MOUSE PARALLAX
  ======================================================= */

  const heroVisual =
    document.querySelector(".hero-visual");


  if (
    heroVisual &&
    window.matchMedia("(min-width: 851px)").matches
  ) {

    heroVisual.addEventListener(
      "mousemove",
      event => {

        const rect =
          heroVisual.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width - 0.5;

        const y =
          (event.clientY - rect.top) /
          rect.height - 0.5;


        const photo =
          heroVisual.querySelector(".photo-card");

        const tags =
          heroVisual.querySelectorAll(
            ".floating-tag"
          );


        if (photo) {

          photo.style.transform =
            `translate(${x * 8}px, ${y * 8}px) rotate(${x * -2}deg)`;
        }


        tags.forEach((tag, index) => {

          const power =
            (index + 1) * 7;

          tag.style.transform =
            `translate(${x * power}px, ${y * power}px)`;
        });

      }
    );


    heroVisual.addEventListener(
      "mouseleave",
      () => {

        const photo =
          heroVisual.querySelector(".photo-card");

        const tags =
          heroVisual.querySelectorAll(
            ".floating-tag"
          );


        if (photo) {
          photo.style.transform = "";
        }

        tags.forEach(tag => {
          tag.style.transform = "";
        });

      }
    );
  }


  /* =======================================================
     CARD 3D TILT
  ======================================================= */

  const tiltCards =
    document.querySelectorAll(
      ".field-card, .vision-card"
    );


  if (
    window.matchMedia("(min-width: 851px)").matches
  ) {

    tiltCards.forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

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
     SMOOTH SCROLL
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(targetId);


          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =======================================================
     COUNTER ANIMATION
  ======================================================= */

  const counters =
    document.querySelectorAll(
      ".stat strong"
    );


  counters.forEach(counter => {

    const text =
      counter.textContent.trim();

    if (
      text === "∞" ||
      text.includes("%")
    ) {
      return;
    }

    const target =
      parseInt(text, 10);

    if (isNaN(target)) return;


    counter.textContent = "00";


    const counterObserver =
      new IntersectionObserver(
        entries => {

          if (!entries[0].isIntersecting) {
            return;
          }


          let current = 0;

          const duration = 1000;

          const start =
            performance.now();


          function update(now) {

            const progress =
              Math.min(
                (now - start) / duration,
                1
              );


            current =
              Math.floor(
                progress * target
              );


            counter.textContent =
              String(current).padStart(2, "0");


            if (progress < 1) {

              requestAnimationFrame(update);

            } else {

              counter.textContent =
                String(target).padStart(2, "0");
            }
          }


          requestAnimationFrame(update);

          counterObserver.disconnect();

        },
        {
          threshold: 0.8
        }
      );


    counterObserver.observe(counter);

  });


  /* =======================================================
     VISION CHART EXTRA EFFECT
  ======================================================= */

  const tradingCards =
    document.querySelectorAll(
      ".trading-animation"
    );


  tradingCards.forEach(card => {

    card.addEventListener(
      "mouseenter",
      () => {

        const svg =
          card.querySelector("svg");

        if (svg) {
          svg.style.transform =
            "scale(1.05)";
        }

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        const svg =
          card.querySelector("svg");

        if (svg) {
          svg.style.transform =
            "";
        }

      }
    );

  });


  /* =======================================================
     PHOTO LOADING EFFECT
  ======================================================= */

  const photo =
    document.querySelector(
      ".photo-card img"
    );


  if (photo) {

    photo.addEventListener(
      "load",
      () => {

        photo.classList.add(
          "image-loaded"
        );

      }
    );

  }


  /* =======================================================
     WHATSAPP FLOAT BUTTON
  ======================================================= */

  const whatsapp =
    document.querySelector(
      ".whatsapp-float"
    );


  if (whatsapp) {

    whatsapp.addEventListener(
      "mouseenter",
      () => {

        whatsapp.style.animationPlayState =
          "paused";

      }
    );


    whatsapp.addEventListener(
      "mouseleave",
      () => {

        whatsapp.style.animationPlayState =
          "running";

      }
    );

  }


  /* =======================================================
     CURSOR GLOW
  ======================================================= */

  if (
    window.matchMedia("(min-width: 851px)").matches
  ) {

    const cursorGlow =
      document.createElement("div");

    cursorGlow.className =
      "cursor-glow";

    document.body.appendChild(
      cursorGlow
    );


    document.addEventListener(
      "mousemove",
      event => {

        cursorGlow.style.left =
          `${event.clientX}px`;

        cursorGlow.style.top =
          `${event.clientY}px`;

      }
    );

  }


  /* =======================================================
     PAGE LOADED
  ======================================================= */

  document.body.classList.add(
    "page-loaded"
  );


  /* =======================================================
     CONSOLE
  ======================================================= */

  console.log(
    "%c DR. MOHAMED ALI ",
    "background:#00d4aa;color:#04110e;font-size:16px;font-weight:bold;padding:8px 15px;border-radius:5px;"
  );

  console.log(
    "%c طبيب × مبرمج × متداول ",
    "color:#00d4aa;font-size:13px;font-weight:bold;"
  );

});
```
