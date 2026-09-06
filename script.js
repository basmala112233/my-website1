```javascript
// القائمة في الموبايل
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.onclick = function () {
    nav.classList.toggle("active");
  };

  nav.querySelectorAll("a").forEach(function (link) {
    link.onclick = function () {
      nav.classList.remove("active");
    };
  });
}


// إضافة CSS للحركات تلقائيًا
const premiumStyle = document.createElement("style");

premiumStyle.textContent = `
  .roles {
    min-height: 35px;
  }

  .animated-role {
    display: inline-block;
    color: #00d4aa;
    font-weight: 800;
    font-size: 1.15em;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.7s ease;
  }

  .animated-role.show {
    opacity: 1;
    transform: translateY(0);
  }

  .premium-reveal {
    opacity: 0;
    transform: translateY(50px);
    transition:
      opacity 1s ease,
      transform 1s cubic-bezier(.2,.8,.2,1);
  }

  .premium-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .photo-card {
    animation: premiumPhoto 5s ease-in-out infinite;
  }

  @keyframes premiumPhoto {
    0%, 100% {
      transform: rotate(-3deg) translateY(0);
    }

    50% {
      transform: rotate(-1deg) translateY(-12px);
    }
  }

  .photo-halo {
    animation: premiumHalo 4s ease-in-out infinite;
  }

  @keyframes premiumHalo {
    0%, 100% {
      transform: scale(.95);
      opacity: .35;
    }

    50% {
      transform: scale(1.08);
      opacity: .75;
    }
  }
`;

document.head.appendChild(premiumStyle);


// كلمة تظهر وراء كلمة
const roles = document.querySelector(".roles");

if (roles) {

  roles.innerHTML = "";

  const word = document.createElement("span");

  word.className = "animated-role";

  roles.appendChild(word);

  const words = [
    "طبيب",
    "مبرمج",
    "متداول"
  ];

  let current = 0;

  function changeRole() {

    word.classList.remove("show");

    setTimeout(function () {

      word.textContent = words[current];

      word.classList.add("show");

      current++;

      if (current >= words.length) {
        current = 0;
      }

    }, 400);
  }

  changeRole();

  setInterval(changeRole, 2200);
}


// ظهور الأقسام أثناء النزول
const elements = document.querySelectorAll(
  ".section, .field-card, .skill-box, .about-box, .contact-card, .quote"
);

elements.forEach(function (element) {
  element.classList.add("premium-reveal");
});


const observer = new IntersectionObserver(function (entries) {

  entries.forEach(function (entry) {

    if (entry.isIntersecting) {

      entry.target.classList.add("visible");

      observer.unobserve(entry.target);

    }

  });

}, {
  threshold: 0.15
});


elements.forEach(function (element) {
  observer.observe(element);
});
```
