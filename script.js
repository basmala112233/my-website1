```javascript
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SETTINGS
  ========================= */

  const defaultSettings = {
    name: "محمد علي",
    description:
      "شغوف بالطب والتكنولوجيا والأسواق المالية، وأسعى لصناعة مستقبل يجمع بين العلم والإبداع والتكنولوجيا.",
    photo:
      "https://i.ibb.co/BxK1s4K/IMG-20260902-WA0141.jpg",
    whatsapp: "201281689551",
    phone: "+20 128 168 9551",
    color: "#00d4aa",

    htmlSkill: 90,
    jsSkill: 80,
    uiSkill: 85
  };

  const saved =
    JSON.parse(localStorage.getItem("doctorWebsiteSettings") || "{}");

  const settings = {
    ...defaultSettings,
    ...saved
  };


  /* =========================
     APPLY SETTINGS
  ========================= */

  const heroName = document.querySelector(".hero h1");
  if (heroName) {
    heroName.innerHTML = `
      <span>د.</span>
      ${settings.name.split(" ")[0] || ""}
      <strong>
        ${settings.name.split(" ").slice(1).join(" ") || ""}
      </strong>
    `;
  }

  const description =
    document.querySelector(".hero-text");

  if (description) {
    description.textContent = settings.description;
  }


  /* الصورة */

  const photo =
    document.querySelector(".photo-card img");

  if (photo) {
    photo.src = settings.photo;
  }


  /* الواتساب */

  document.querySelectorAll(
    'a[href*="wa.me"]'
  ).forEach(link => {
    link.href = `https://wa.me/${settings.whatsapp}`;
  });


  /* رقم الهاتف */

  const phone =
    document.querySelector(".contact-number strong");

  if (phone) {
    phone.textContent = settings.phone;
  }


  /* اللون */

  document.documentElement.style.setProperty(
    "--main-color",
    settings.color
  );


  /* =========================
     MOBILE MENU
  ========================= */

  const menuBtn =
    document.getElementById("menuBtn");

  const nav =
    document.getElementById("nav");

  menuBtn?.addEventListener("click", () => {
    nav?.classList.toggle("active");

    menuBtn.textContent =
      nav?.classList.contains("active")
        ? "✕"
        : "☰";
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuBtn.textContent = "☰";
    });
  });


  /* =========================
     HERO ROLES
  ========================= */

  const rolesContainer =
    document.querySelector(".roles");

  if (rolesContainer) {

    const roles = [
      "طبيب",
      "مبرمج",
      "متداول"
    ];

    const role =
      rolesContainer.querySelector(".animated-role") ||
      document.createElement("span");

    role.className = "animated-role";

    rolesContainer.innerHTML = "";
    rolesContainer.appendChild(role);

    let index = 0;

    function changeRole() {

      role.style.opacity = "0";
      role.style.transform =
        "translateY(15px)";

      setTimeout(() => {

        role.textContent =
          roles[index];

        role.style.opacity = "1";
        role.style.transform =
          "translateY(0)";

        index =
          (index + 1) % roles.length;

      }, 300);
    }

    changeRole();

    setInterval(changeRole, 2200);
  }


  /* =========================
     PARTICLES
  ========================= */

  const particles =
    document.getElementById("particles");

  if (particles) {

    const count =
      window.innerWidth < 600
        ? 25
        : 50;

    for (let i = 0; i < count; i++) {

      const particle =
        document.createElement("span");

      particle.className = "particle";

      const size =
        Math.random() * 2 + 1;

      particle.style.width =
        `${size}px`;

      particle.style.height =
        `${size}px`;

      particle.style.left =
        `${Math.random() * 100}%`;

      particle.style.top =
        `${Math.random() * 100}%`;

      particle.style.animationDuration =
        `${4 + Math.random() * 7}s`;

      particle.style.animationDelay =
        `${Math.random() * 5}s`;

      particles.appendChild(particle);
    }
  }


  /* =========================
     REVEAL
  ========================= */

  const revealElements =
    document.querySelectorAll(`
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

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting)
            return;

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  /* =========================
     PROGRESS BARS
  ========================= */

  const skills = {
    ".skill-box:nth-child(1) .skill-row:nth-child(1) i":
      settings.htmlSkill + "%",

    ".skill-box:nth-child(1) .skill-row:nth-child(2) i":
      settings.jsSkill + "%",

    ".skill-box:nth-child(1) .skill-row:nth-child(3) i":
      settings.uiSkill + "%"
  };

  Object.entries(skills).forEach(
    ([selector, value]) => {

      const bar =
        document.querySelector(selector);

      if (bar) {
        bar.style.width = value;
        bar.dataset.width = value;
      }

    }
  );


  /* =========================
     HEADER
  ========================= */

  const header =
    document.querySelector(".header");

  window.addEventListener("scroll", () => {

    header?.classList.toggle(
      "scrolled",
      window.scrollY > 40
    );

  });


  /* =========================
     ACTIVE NAV
  ========================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(".nav a");

  const navObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting)
            return;

          navLinks.forEach(link =>
            link.classList.remove(
              "active-link"
            )
          );

          const active =
            document.querySelector(
              `.nav a[href="#${entry.target.id}"]`
            );

          active?.classList.add(
            "active-link"
          );

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
      .querySelectorAll(
        ".field-card, .skill-box"
      )
      .forEach(card => {

        card.addEventListener(
          "mousemove",
          e => {

            const rect =
              card.getBoundingClientRect();

            const x =
              e.clientX - rect.left;

            const y =
              e.clientY - rect.top;

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


  /* =========================
     SMOOTH SCROLL
  ========================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        e => {

          const target =
            document.querySelector(
              link.getAttribute("href")
            );

          if (!target) return;

          e.preventDefault();

          target.scrollIntoView({
            behavior: "smooth"
          });

        }
      );

    });

});
```
