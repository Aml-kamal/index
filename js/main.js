"use strict";
let rowData = document.getElementById("rowData");
let searchData = document.querySelector("#searchData");
let searchInputs = document.querySelector("#searchInputs");
let getCategories = document.querySelector("#getCategories");
let getArea = document.querySelector("#getArea");
let getIngredients = document.querySelector("#getIngredients");
let contacts = document.querySelector("#contacts");

$(function () {
  $(".lds-default").fadeOut(500, function () {
    $(".loading-sc").fadeOut(500);
    $("body").css("overflow", "visible")
  });
});

function closeNav() {
  let boxWidth = $(".nav-tab").outerWidth();

  $(".nav-menu").animate({ left: -boxWidth }, 750);
  $(".nav-links li").animate(
    {
      top: 450,
    },
    700
  );
  $(".nav-icon").addClass("fa-align-justify");
  $(".nav-icon").removeClass("fa-x");
}
$(".nav-item-icon").click(function () {
  let allLeft = $(".nav-menu").css("left");

  if (allLeft == "0px") {
    closeNav();
  } else {
    openNav();
  }
});
function openNav() {
  $(".nav-menu").animate({ left: "0px" }, 700);
  $(".nav-links li").animate(
    {
      top: 0,
    },
    700
  );
  $(".nav-icon").addClass("fa-x");

  $(".nav-icon").removeClass("fa-align-justify");
}
async function getMenu() {
  closeNav();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s`
  );

  let allMeal = await response.json();

  displayMeals(allMeal.meals);

  console.log(allMeal.meals);
}
getMenu();
function displayMeals(data) {
  let cartoona = ``;
  for (let i = 0; i < data.length; i++) {
    cartoona += `

<div class="col-md-3">
<div class="menu position-relative rounded-2" onclick="getMealDetails('${data[i].idMeal}')">
    <img class="w-100" src="${data[i].strMealThumb}" alt="">
    <div class="layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${data[i].strMeal}</h3>
    </div>
</div>

</div>

`;
  }
  rowData.innerHTML = cartoona;
}
// .........getMenuDetails........
async function getMealDetails(id) {
  closeNav();

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  respone = await respone.json();

  displayMealDetails(respone.meals[0]);
}

function displayMealDetails(data) {
  let cartoona = ``;
  cartoona = `
  <div class="col-md-4 text-white">
              <img class="w-100 rounded-2" src="${data.strMealThumb}"
                  alt="">
                  <h2>${data.strMeal}</h2>
          </div>
          <div class="col-md-8 text-white">
              <h2>Instructions</h2>
              <p>${data.strInstructions}</p>
              <h3><span class="fw-bold">Area : </span>${data.strArea}</h3>
              <h3><span class="fw-bold">Category : </span>${data.strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex flex-wrap">


    
              </ul>

              <h3>Tags :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
      <li class="alert alert-danger p-2">
      ${data.strTags}
      </li>
              </ul>
        <a href="${data.strSource}" target="_blank" rel="noopener noreferrer" class="btn btn-success">Source</a> 
         <a href="${data.strYoutube}" target="_blank" rel="noopener noreferrer" class="btn btn-danger">Youtube</a> 

          </div>`;

  rowData.innerHTML = cartoona;
}

//..........................
//.................search
searchInputs.addEventListener("click", function searchInputs() {
  rowData.innerHTML = "";
  closeNav();
  let cartoona = ``;
  cartoona = `
   <div class="row p-5">
                <div class="col-md-6 ">
                    <input type="text"  class="form-control text-white bg-transparent"  placeholder="Search By Name" onkeyup="searchByName(this.value)">
                </div>
                <div class="col-md-6">
                    <input type="text"  class="form-control text-white bg-transparent "  placeholder="Search By First Letter" onkeyup="searchByFirstLetter(this.value)">
                </div>
            </div>
    
  `;
  searchData.innerHTML = cartoona;
});

async function searchByName(term) {
  closeNav();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  let endResponse = await response.json();
  if (endResponse.meals) {
    displayMeals(endResponse.meals);
  } else {
    displayMeals();
  }
}

async function searchByFirstLetter(term) {
  closeNav();
  if (term == false) {
    term = "a";
  }
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  let endResponse = await response.json();
  if (endResponse.meals) {
    displayMeals(endResponse.meals);
  } else {
    displayMeals();
  }
}

//................category
getCategories.addEventListener("click", async function getCategories() {
  closeNav();
  rowData.innerHTML = "";
  searchData.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let finalResponse = await response.json();
  displayCat(finalResponse.categories);
  closeNav();

  console.log(finalResponse.categories);
});
function displayCat(data) {
  rowData.innerHTML = "";
  searchData.innerHTML = "";

  let cartoona = ``;
  for (let i = 0; i < data.length; i++) {
    cartoona += `

<div class="col-md-3">
<div class="menu position-relative rounded-2" onclick="catMeals('${
      data[i].strCategory
    }')">
    <img class="w-100" src="${data[i].strCategoryThumb}" alt="">
    <div class="layer position-absolute d-flex align-items-center text-black p-2 flex-column">
        <h3>${data[i].strCategory}</h3>
         <p>${data[i].strCategoryDescription
           .split(" ")
           .slice(0, 30)
           .join(" ")}</p>

    </div>
</div>

</div>

`;
  }
  rowData.innerHTML = cartoona;
}
//.........catMeals
async function catMeals(id) {
  rowData.innerHTML = "";
  searchData.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
  );
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
}
//..........area
getArea.addEventListener("click", async function getArea() {
  closeNav();
  rowData.innerHTML = "";
  searchData.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  let allResponse = await response.json();
  displayArea(allResponse.meals);
  console.log(allResponse.meals);
});

function displayArea(data) {
  rowData.innerHTML = "";
  searchData.innerHTML = "";

  let cartoona = ``;
  for (let i = 0; i < data.length; i++) {
    cartoona += `
  
  <div class="col-md-3 text-center">
<div class="menu text-white mx-auto" onclick="areaMeals('${data[i].strArea}')" >
<i class="fa-4x fa-solid fa-house-laptop "></i>
        <h3>${data[i].strArea}</h3>

    
</div>

</div>

  `;
  }
  rowData.innerHTML = cartoona;
}
//........areaMeals
async function areaMeals(id) {
  rowData.innerHTML = "";
  searchData.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
}
//..................ingredients
getIngredients.addEventListener("click", async function getIngredients() {
  rowData.innerHTML = "";
  searchData.innerHTML = "";

  closeNav();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let finalResponses = await response.json();
  displayIng(finalResponses.meals.slice(0, 20));
  console.log(finalResponses.meals.slice(0, 20));
});
function displayIng(data) {
  rowData.innerHTML = "";
  searchData.innerHTML = "";
  let cartoona = ``;
  for (let i = 0; i < data.length; i++) {
    cartoona += `
  <div class="col-md-3 text-center">
<div class="menu text-white mx-auto" onclick="ingrediantsMeals('${
      data[i].strIngredient
    }')">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>    
        <h3>${data[i].strIngredient}</h3>
         <p>${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
</div>
</div>
  `;
  }
  rowData.innerHTML = cartoona;
}
// ............ingrediantsMeals
async function ingrediantsMeals(id) {
  rowData.innerHTML = "";
  searchData.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
}
//.............contact
contacts.addEventListener("click", function contacts() {
  rowData.innerHTML = "";

  closeNav();
  let cartoona = ``;
  cartoona += `
  <div class="contacts vh-100 d-flex justify-content-center align-items-center">
  <div class="text-center w-75">
      <div class="row gy-4">
          <div class="col-md-6">
              <input type="text" id="nameId" onkeyup="validation(this, 'msgName')"  class="form-control" placeholder="Enter Your Name">
              <div id="msgName" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input type="email" id="emailId" onkeyup="validation(this, 'msgEmail')"  class="form-control " placeholder="Enter Your Email">
              <div id="msgEmail" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input type="text" id="phoneId" onkeyup="validation(this, 'msgPhone')"  class="form-control " placeholder="Enter Your Phone">
              <div id="msgPhone" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input type="number" id="ageId" onkeyup="validation(this, 'msgAge')"  class="form-control " placeholder="Enter Your Age">
              <div id="msgAge" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input type="password" id="passwordId" onkeyup="validation(this, 'msgPassword')"  class="form-control " placeholder="Enter Your Password">
              <div id="msgPassword" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input type="password" id="repasswordId" onkeyup="validation(this, 'msgRepassword')"  class="form-control " placeholder="Repassword">
              <div id="msgRepassword" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" class="btn btn-outline-danger my-3  " disabled>Submit</button>
  </div>
</div> `;
  rowData.innerHTML = cartoona;
});
function validation(element, msgId) {
  let msg = document.getElementById(msgId);
  let submitBtn = document.getElementById("submitBtn");
  let regex = {
    nameId: /^[A-Za-z]{3,}$/,
    emailId: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
    phoneId: /^01[0152][0-9]{8}$/,
    ageId: /^([1-9]|[1-9][0-9])$/,
    passwordId: /^((?=.*\d)(?=.*[a-zA-Z]).{8,20})$/,
    repasswordId: /^((?=.*\d)(?=.*[a-zA-Z]).{8,20})$/,
  };
  if (regex[element.id].test(element.value) == true) {
    msg.classList.add("d-none");
    submitBtn.removeAttribute("disabled");
  } else {
    msg.classList.remove("d-none");
    submitBtn.setAttribute("disabled", "");
  }
}
