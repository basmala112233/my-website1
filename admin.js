```javascript
document.addEventListener("DOMContentLoaded", () => {

  const SUPABASE_URL =
    "https://yzalkwkbnxapiiseqraj.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_McRUA7P1sOfa_x2LPxQB7A_kEmhJ-Vc";

  async function loadWebsiteData() {

    try {

      const response = await fetch(
        SUPABASE_URL + "/rest/v1/site_content?id=eq.1&select=*",
        {
          headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": "Bearer " + SUPABASE_KEY
          },
          cache: "no-store"
        }
      );

      const data = await response.json();

      console.log("Supabase:", data);

      if (!data || !data.length) {
        console.log("لا توجد بيانات");
        return;
      }

      const site = data[0];


      /* الاسم */

      const name = document.querySelector(".hero h1");

      if (name && site.name) {

        const parts = site.name.trim().split(" ");

        name.innerHTML =
          `<span>د.</span> ${parts[0] || ""} 
           <strong>${parts.slice(1).join(" ")}</strong>`;

      }


      /* الوصف */

      const description =
        document.querySelector(".hero-text");

      if (description && site.description) {

        description.textContent =
          site.description;

      }


      /* الصورة */

      const image =
        document.querySelector(".photo-card img");

      if (image && site.photo) {

        image.src =
          site.photo;

      }


      /* المجالات */

      const cards =
        document.querySelectorAll(".field-card");

      const fields = [
        site.field1,
        site.field2,
        site.field3
      ];

      cards.forEach((card, index) => {

        if (!fields[index]) return;

        const title =
          card.querySelector("h3");

        if (title) {

          title.textContent =
            fields[index];

        }

      });


      /* المهارات */

      const skills = [
        site.html_skill,
        site.js_skill,
        site.ui_skill
      ];

      const bars =
        document.querySelectorAll(".progress i");

      bars.forEach((bar, index) => {

        if (skills[index] !== null &&
            skills[index] !== undefined) {

          bar.style.width =
            skills[index] + "%";

        }

      });


      /* الهاتف */

      const phone =
        document.querySelector(
          ".contact-number strong"
        );

      if (phone && site.phone) {

        phone.textContent =
          site.phone;

      }


      /* واتساب */

      document
        .querySelectorAll('a[href*="wa.me"]')
        .forEach(link => {

          if (site.whatsapp) {

            link.href =
              "https://wa.me/" +
              site.whatsapp;

          }

        });


      /* اللون */

      if (site.color) {

        document.documentElement.style
          .setProperty(
            "--primary",
            site.color
          );

      }

    } catch (error) {

      console.error(
        "خطأ Supabase:",
        error
      );

    }

  }


  loadWebsiteData();


  /* =========================
     MOBILE MENU
  ========================= */

  const menuBtn =
    document.getElementById("menuBtn");

  const nav =
    document.getElementById("nav");

  if (menuBtn && nav) {

    menuBtn.addEventListener(
      "click",
      () => {

        nav.classList.toggle("active");

      }
    );

    nav.querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            nav.classList.remove("active");

          }
        );

      });

  }


  /* =========================
     SMOOTH SCROLL
  ========================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const id =
            link.getAttribute("href");

          const target =
            document.querySelector(id);

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth"
          });

        }
      );

    });


  /* =========================
     HEADER
  ========================= */

  const header =
    document.querySelector(".header");

  window.addEventListener(
    "scroll",
    () => {

      if (!header) return;

      if (window.scrollY > 40) {

        header.classList.add("scrolled");

      } else {

        header.classList.remove("scrolled");

      }

    }
  );

});
```
