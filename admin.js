```javascript
document.addEventListener("DOMContentLoaded", () => {

  const ids = [
    "name",
    "roles",
    "description",
    "photo",
    "field1",
    "field2",
    "field3",
    "htmlSkill",
    "jsSkill",
    "uiSkill",
    "phone",
    "whatsapp",
    "color"
  ];

  const defaults = {
    name:"محمد علي",
    roles:"طبيب × مبرمج × متداول",
    description:"شغوف بالطب والتكنولوجيا والأسواق المالية، وأسعى لصناعة مستقبل يجمع بين العلم والإبداع والتكنولوجيا.",
    photo:"https://i.ibb.co/BxK1s4K/IMG-20260902-WA0141.jpg",
    field1:"الطب",
    field2:"البرمجة",
    field3:"التداول",
    htmlSkill:"90",
    jsSkill:"80",
    uiSkill:"85",
    phone:"+20 128 168 9551",
    whatsapp:"201281689551",
    color:"#00d4aa"
  };


  /* تحميل البيانات */

  ids.forEach(id => {

    const input = document.getElementById(id);

    if(!input) return;

    const saved =
      localStorage.getItem("admin_" + id);

    input.value =
      saved !== null
        ? saved
        : defaults[id];

  });


  /* نسب المهارات */

  function updateRange(id,valueId){

    const range =
      document.getElementById(id);

    const value =
      document.getElementById(valueId);

    function update(){
      value.textContent =
        range.value + "%";
    }

    range.addEventListener(
      "input",
      update
    );

    update();
  }

  updateRange(
    "htmlSkill",
    "htmlValue"
  );

  updateRange(
    "jsSkill",
    "jsValue"
  );

  updateRange(
    "uiSkill",
    "uiValue"
  );


  /* اللون */

  const color =
    document.getElementById("color");

  const preview =
    document.getElementById("colorPreview");

  function updateColor(){

    preview.style.background =
      color.value;

  }

  color.addEventListener(
    "input",
    updateColor
  );

  updateColor();


  /* الحفظ */

  document
    .getElementById("save")
    .addEventListener("click", () => {

      ids.forEach(id => {

        const input =
          document.getElementById(id);

        if(!input) return;

        localStorage.setItem(
          "admin_" + id,
          input.value
        );

      });

      const message =
        document.getElementById("message");

      message.textContent =
        "✓ تم حفظ جميع التعديلات بنجاح";

      message.classList.add("show");

      setTimeout(() => {
        message.classList.remove("show");
      },3000);

    });

});
```
