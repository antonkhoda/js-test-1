"use strict";

//Функція перенесення даннив в textarea вкладки Edit
let editTextareaContent = function () {
  let objectDiv = document.querySelector(".result");
  let instrument = document.getElementById("edit-textarea");
  instrument.value = objectDiv.innerHTML;
};
editTextareaContent();

let colors = [
  "#e85a2a",
  "#f6d781",
  "#edd5cd",
  "#d97b7a",
  "#7189bf",
  "#efa476",
  "#dddddd",
  "white",
  "black",
];

//Функція формування блоку з палітрою кольорів з відповідного масиву
let colorPalette = function () {
  let colorPaletteItem = document.createElement("div");
  colorPaletteItem.classList.add("color-palette");
  for (let i = 0; i < colors.length; i++) {
    let color = document.createElement("div");
    color.style.backgroundColor = colors[i];
    color.classList.add("color");
    colorPaletteItem.appendChild(color);
  }
  document.getElementById("panel-style").appendChild(colorPaletteItem);
  return colorPaletteItem;
};

colorPalette();

// let returnColor = function (color) {
//   color.addEventListener("click", function (event) {
//     return event.target.style.backgroundColor;
//   });
// };

//Дії на кнопку Style (формування вкладки і скриття вкладки Edit)
document.getElementById("style").addEventListener("click", function () {
  document.getElementById("panel-edit").style.display = "none";
  document.getElementById("panel-style").style.display = "block";
  document.getElementById("edit").classList.remove("button-is-active");
  document.getElementById("style").classList.add("button-is-active");

  let objectDiv = document.querySelector(".result");
  let radioForm = document.forms.radio;

  radioForm.addEventListener("click", function () {
    for (let i = 0; i < radioForm.elements.length; i++) {
      if (radioForm.elements[i].checked == true)
        objectDiv.style.fontSize = radioForm.elements[i].value + "px";
    }
  });

  let checkboxForm = document.forms.checkbox;

  checkboxForm.addEventListener("click", function () {
    for (let i = 0; i < checkboxForm.elements.length; i++) {
      if (
        checkboxForm.elements[i].checked == true &&
        checkboxForm.elements[i].value == "bold"
      ) {
        objectDiv.style.fontWeight = "bold";
      } else if (
        checkboxForm.elements[i].checked == false &&
        checkboxForm.elements[i].value == "bold"
      ) {
        objectDiv.style.fontWeight = "";
      }

      if (
        checkboxForm.elements[i].checked == true &&
        checkboxForm.elements[i].value == "italic"
      ) {
        objectDiv.style.fontStyle = "italic";
      } else if (
        checkboxForm.elements[i].checked == false &&
        checkboxForm.elements[i].value == "italic"
      ) {
        objectDiv.style.fontStyle = "";
      }
    }
  });

  let select = document.querySelector(".select");

  select.addEventListener("click", function () {
    if (select.value != "Choose option")
      objectDiv.style.fontFamily = select.value;
  });

  let colorBackgroundButton = document.getElementById("colorBack");
  let colorTextButton = document.getElementById("colorText");
  let color = document.querySelector(".color-palette");
  let colorFlag = true;

  colorTextButton.addEventListener("click", function () {
    colorTextButton.style.backgroundColor = "#b7ccfb";
    colorBackgroundButton.style.backgroundColor = "";
    color.style.display = "flex";
    colorFlag = false;

    color.addEventListener("click", function (event) {
      if (colorFlag == false)
        if (
          event.target.style.backgroundColor ==
          document.getElementById("style").style.backgroundColor
        ) {
          color.style.display = "none";
          colorTextButton.style.backgroundColor = "";
          colorBackgroundButton.style.backgroundColor = "";
        } else {
          objectDiv.style.color = event.target.style.backgroundColor;
        }
    });
  });

  colorBackgroundButton.addEventListener("click", function () {
    colorBackgroundButton.style.backgroundColor = "#b7ccfb";
    colorTextButton.style.backgroundColor = "";
    color.style.display = "flex";
    colorFlag = true;

    color.addEventListener("click", function (event) {
      if (colorFlag == true)
        if (
          event.target.style.backgroundColor ==
          document.getElementById("style").style.backgroundColor
        ) {
          color.style.display = "none";
          colorTextButton.style.backgroundColor = "";
          colorBackgroundButton.style.backgroundColor = "";
        } else {
          objectDiv.style.backgroundColor = event.target.style.backgroundColor;
        }
    });
  });
});

//Дії на кнопку Edit (формування вкладки і очистка поля після збереження)
document.getElementById("edit").addEventListener("click", function () {
  document.getElementById("panel-edit").style.display = "block";
  document.getElementById("panel-style").style.display = "none";
  document.getElementById("edit").classList.add("button-is-active");
  document.getElementById("style").classList.remove("button-is-active");
  editTextareaContent();
});

//Дії на кнопку Save у вкладці Edit
document.getElementById("save").addEventListener("click", function () {
  let objectDiv = document.querySelector(".result");
  let instrument = document.getElementById("edit-textarea");
  objectDiv.innerHTML = instrument.value;
});

//Дії на кнопку Add у вкладці Edit (додавання нового блоку з можливістю додавання списку і таблиці в поле для редагування вкладки Edit)
document.getElementById("add").addEventListener("click", function () {
  document.getElementById("panel-list").style.display = "none";
  document.querySelector(".result").style.display = "none";
  document.querySelector(".panel").style.display = "none";
  document.querySelector(".panel-add").style.display = "block";
  document.getElementById("panel-table").style.display = "block";
  document.getElementById("list").classList.remove("button-is-active");
  document.getElementById("table").classList.add("button-is-active");
});

//Дії на кнопку Table (формування вкладки і скриття вкладки List)
document.getElementById("table").addEventListener("click", function () {
  document.getElementById("panel-list").style.display = "none";
  document.getElementById("panel-table").style.display = "block";
  document.getElementById("list").classList.remove("button-is-active");
  document.getElementById("table").classList.add("button-is-active");
});

//Дії на кнопку Сreate Table у вкладці Table (перенесення данних з полів вкладки у textarea вкладки Edit - формування таблиці)
document.getElementById("createTable").addEventListener("click", function () {
  document.querySelector(".result").style.display = "block";
  document.querySelector(".panel").style.display = "block";
  document.querySelector(".panel-add").style.display = "none";

  let instrument = document.getElementById("edit-textarea");
  let formTable = document.forms.panelTable;
  if (formTable.countTR.value > 0 && formTable.countTD.value > 0) {
    let widthTD = formTable.widthTD.value;
    if (widthTD < 30) widthTD = 30;
    let heightTD = formTable.heightTD.value;
    if (heightTD < 30) heightTD = 30;
    let borderWith = formTable.borderWith.value;
    if (borderWith < 1) borderWith = 1;
    let borderTD =
      borderWith +
      "px " +
      formTable.borderType.value +
      " " +
      formTable.borderColor.value;

    console.log(borderTD);

    instrument.value += `<table>`;
    for (let i = 0; i < formTable.countTR.value; i++) {
      instrument.value += `<tr>`;
      for (let j = 0; j < formTable.countTD.value; j++) {
        instrument.value += `<td width="${widthTD}px" height="${heightTD}px" style="border: ${borderTD};">TD</td>`;
      }
      instrument.value += `</tr>`;
    }
    instrument.value += `</table>`;
  }
});

//Дії на кнопку List (формування вкладки і скриття вкладки Table)
document.getElementById("list").addEventListener("click", function () {
  document.getElementById("panel-table").style.display = "none";
  document.getElementById("panel-list").style.display = "block";
  document.getElementById("table").classList.remove("button-is-active");
  document.getElementById("list").classList.add("button-is-active");
});

//Дії на кнопку Create List (перенесення данних з полів вкладки у textarea вкладки Edit - формування списку)
document.getElementById("createList").addEventListener("click", function () {
  document.querySelector(".result").style.display = "block";
  document.querySelector(".panel").style.display = "block";
  document.querySelector(".panel-add").style.display = "none";

  let countLi = document.getElementById("countLi");
  let typeOfMarks = document.getElementById("typeOfMarks");
  let instrument = document.getElementById("edit-textarea");
  if (countLi.value > 0) {
    instrument.value += `<ul type="${typeOfMarks.value}">`;
    for (let i = 0; i < countLi.value; i++) {
      instrument.value += `<li>Item ${i}</li>`;
    }
    instrument.value += `</ul>`;
  }
});
