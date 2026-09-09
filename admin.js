```javascript
document.addEventListener("DOMContentLoaded", async () => {

  const SUPABASE_URL =
    "https://yzalkwkbnxapiiseqraj.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_McRUA7P1sOfa_x2LPxQB7A_kEmhJ-Vc";

  const API =
    SUPABASE_URL + "/rest/v1/site_content?id=eq.1";

  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: "Bearer " + SUPABASE_KEY
  };


  /* =========================
     تحميل بيانات الموقع
  ========================= */

  async function loadSiteData() {

    try {

      const response = await fetch(API, {
        headers
      });

      const data = await response.json();

      if (!data.length) return;

      const site = data[0];


      /* الاسم */

      const heroName =
        document.querySelector(".hero h1");

      if (heroName && site.name) {

        heroName.innerHTML =
          `<span>د.</span> ${site.name.split(" ")[0]}
          <strong>${site.name.split(" ").slice(1).join(" ")}</strong>`;

      }


      /* المسمى */

      const roles =
        document.querySelector(".roles");

      if (roles && site.roles) {

        roles.innerHTML =
          `<span>${site.roles}</span>`;

      }


      /* الوصف */

      const heroText =
        document.querySelector(".hero-text");

      if (heroText && site.description) {

        heroText.textContent =
          site.description;

      }


      /* الصورة */

      const photo =
        document.querySelector(".photo-card img");

      if (photo && site.photo) {

        photo.src =
          site.photo;

      }


      /* المجالات */

      const fieldCards =
        document.querySelectorAll(".field-card");

      const fields = [
        site.field1,
        site.field2,
        site.field3
      ];

      fieldCards.forEach((card,index)=>{

        if(fields[index]){

          const title =
            card.querySelector("h3");

          if(title)
            title.textContent =
              fields[index];

        }

      });


      /* المهارات */

      const progress =
        document.querySelectorAll(".progress i");

      const skills = [
        site.html_skill,
        site.js_skill,
        site.ui_skill
      ];

      progress.forEach((bar,index)=>{

        if(skills[index] !== undefined){

          bar.style.width =
            skills[index] + "%";

        }

      });


      /* رقم الهاتف */

      const phone =
        document.querySelector(".contact-number strong");

      if(phone && site.phone){

        phone.textContent =
          site.phone;

      }


      /* واتساب */

      const whatsappLinks =
        document.querySelectorAll(
          'a[href*="wa.me"]'
        );

      whatsappLinks.forEach(link=>{

        if(site.whatsapp){

          link.href =
            "https://wa.me/" +
            site.whatsapp;

        }

      });


      /* اللون الرئيسي */

      if(site.color){

        document.documentElement
          .style
          .setProperty(
            "--primary",
            site.color
          );

      }

    }

    catch(error){

      console.error(
        "Supabase error:",
        error
      );

    }

  }


  /* تشغيل تحميل البيانات */

  loadSiteData();


  /* =========================
     القائمة للموبايل
  ========================= */

  const menuBtn =
    document.getElementById("menuBtn");

  const nav =
    document.getElementById("nav");

  if(menuBtn && nav){

    menuBtn.addEventListener(
      "click",
      ()=>{
        nav.classList.toggle("active");
      }
    );

    nav.querySelectorAll("a")
      .forEach(link=>{

        link.addEventListener(
          "click",
          ()=>{
            nav.classList.remove("active");
          }
        );

      });

  }


  /* =========================
     Smooth Scroll
  ========================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(link=>{

    link.addEventListener(
      "click",
      event=>{

        const id =
          link.getAttribute("href");

        const target =
          document.querySelector(id);

        if(!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior:"smooth"
        });

      }
    );

  });


  /* =========================
     Header Scroll
  ========================= */

  const header =
    document.querySelector(".header");

  window.addEventListener(
    "scroll",
    ()=>{

      if(!header) return;

      if(window.scrollY > 40)
        header.classList.add("scrolled");
      else
        header.classList.remove("scrolled");

    }
  );


  /* =========================
     Particles
  ========================= */

  const particles =
    document.getElementById("particles");

  if(particles){

    const count =
      window.innerWidth < 600
      ? 25
      : 45;

    for(let i=0;i<count;i++){

      const p =
        document.createElement("span");

      p.className = "particle";

      p.style.left =
        Math.random()*100 + "%";

      p.style.top =
        Math.random()*100 + "%";

      p.style.animationDuration =
        4 + Math.random()*7 + "s";

      p.style.animationDelay =
        Math.random()*5 + "s";

      particles.appendChild(p);

    }

  }


  /* =========================
     Reveal
  ========================= */

  const reveal =
    document.querySelectorAll(
      ".section,.about-box,.field-card,.skill-box,.quote,.contact-card,footer"
    );

  reveal.forEach(el=>{
    el.classList.add("premium-reveal");
  });

  const observer =
    new IntersectionObserver(
      entries=>{

        entries.forEach(entry=>{

          if(entry.isIntersecting){

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold:.12
      }
    );

  reveal.forEach(el=>{
    observer.observe(el);
  });

});
```
