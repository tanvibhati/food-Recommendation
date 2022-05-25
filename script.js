const searchForm = document.querySelector("#next");
const searchForm1 = document.querySelector("#next1");
const calresult = document.querySelector(".bmr");
const error = document.querySelector(".err");
const error1 = document.querySelector(".err1");
const calform = document.querySelector("#calcu");
const re = document.querySelector("#res");
const co = document.querySelector("#contain");
const searchResultDiv = document.querySelector(".search-result");
const searchResultDiv1 = document.querySelector(".search-result1");
const searchResultDiv2 = document.querySelector(".search-result2");
const container = document.querySelector(".container");
let searchQuery = "";
let searchQuery2 = "";
let searchQuery3 = "";
let names = "";
let cals = "";
let age = "";
let gender = "";
let calculate = "";
let bcal = ""
let weight = "";
let height = "";
let calmax = "";
let calmin = "";
const APP_ID = "c9bc6250";
const APP_key = "6d4135f6ef57d7d922c349fe352253c6";
// console.log(container)
searchForm.addEventListener("click", searche);
searchForm1.addEventListener("click", searche);
calform.addEventListener("click",bmr);

function searche (e) {
  e.preventDefault();
  var myArray = [
    "Apple",
    "Avodcado",
    "Almond",
    "Asparagus",
    "Banana",
    "Blueberries",
    "Bell pepper",
    "Broccoli",
    "Carrot",
    "Cauliflower",
    "Cucumber",
    "Chicken breast",
    "Egg",
    "Orange",
    "Strawberry",
    "Lean beef",
    "Grape",
    "Pineapple",
    "Kiwifruit",
    "Cherries",
    "Coconut",
    "Macadamia nuts",
    "Walnuts",
    "Kale",
    "Tomato",
    "Cabbage",
    "Celery",
    "Lettuce",
    "Mushrooms",
    "Squash",
    "Salmon",
    "Sardines",
    "Shellfish",
    "Shrimp",
    "Trout",
    "Tuna",
    "Brown rice",
    "Oats",
    "Quinoa",
    "Green beans",
    "Kidney beans",
    "Lentils",
    "Potato",
    "Sweat potato",
    "Spinach",
    "Sprout",
    "Apple Cider Vinegar",
    "Grapefruit",
    "Chia Seeds",
    "Yogurt",
    "Lemon",
    "Mustard Green",
    "Pea",
    "Onion",
    "Beet",
    "EggPlant",
    "Green tea",
    "Black tea",
    "Cod",
    "Turkey breast",
    "Sesame",
    "Pistachios"
  ];
  searchQuery = myArray[Math.floor(Math.random() * myArray.length)];
  searchQuery2 = myArray[Math.floor(Math.random() * myArray.length)];
  searchQuery3 = myArray[Math.floor(Math.random() * myArray.length)];
  
  age = document.querySelector("input[name=age]").value;
  weight = document.querySelector("input[name=weight]").value;
  height = document.querySelector("input[name=height]").value;
  
  const r = document.querySelectorAll("input[name=gender]");
  const r1 = document.querySelectorAll("input[name=type3]");
  let bo = "";
  let ao = "";
  
  for (const rb of r) {
    if (rb.checked) {
      bo = 1;
      break;
    }
  }
  
  for (const ra of r1) {
    if (ra.checked) {
      ao = 1;
      break;
    }
  }
  
  if ((!(bo == 1))|| (!(ao == 1)) || (age === "") || (weight === "") || (height === "")) {
    let g1 = "";
    
    g1 += `
    <div class = "e">
    <p style="color:red;">Please select your options and fill up all fields!</p>
    </div>
    `;
    error1.innerHTML = g1;
    return false;
    
  } else {
    error1.style.display = "none";
    re.style.display = "block";
    co.style.display = "none";
  }
  
  gender = document.querySelector('input[name=gender]:checked').value;
  names = document.querySelector('input[name=type3]:checked').value;
  
  if (gender == "male") {
    calculate = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender == "female") {
    calculate = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  if (names == "breakfast") {
    cals = calculate * 0.25;
  } else if (names == "lunch") {
    cals = calculate * 0.4;
  } else {
    cals = calculate * 0.35;
  }
  calmax = cals / 3;
  calmin = cals / 4;
  
  console.log(calculate)
  console.log(cals);
  console.log(calmax);
  fetchAPI();
};

function bmr(e) {
  e.preventDefault();
  
  age = document.querySelector("input[name=age]").value;
  weight = document.querySelector("input[name=weight]").value;
  height = document.querySelector("input[name=height]").value;
  
  const r = document.querySelectorAll("input[name=gender]");
  let bo = "";
  
  for (const rb of r) {
    if (rb.checked) {
      bo = 1;
      break;
    }
  }
  
  if ((!(bo == 1)) || (age === "") || (weight === "") || (height === "")) {
    let g = "";
    
    g += `
    <div class = "e">
    <p style="color:red;">Please select your gender and fill up all fields!</p>
    </div>
    `;
    error.innerHTML = g;
    return false;
    
  } else {
    error.style.display = "none";
  }
  
  gender = document.querySelector('input[name=gender]:checked').value;
  
  if (gender == "male") {
    calculate = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender == "female") {
    calculate = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  bcal = weight / ((height / 100)^2);
  
  
  generatecal(calculate, bcal);
}

function generatecal(cal, bcal) {
  let generatecals = "";
  
  generatecals += `
    <div class = "cal-num">
    <p>Your BMR (basal metabolic rate) is: <b> ${cal}</b> calorie/day </p>
    <p>Your BMI (Body Mass Index) is: <b>${bcal.toFixed(2)}</b></p>
    <a target="_blank" style="color:red;" href="https://www.calculator.net/calorie-calculator.html">(View details about how this was calculated)</a>
    </div>
  `;
  
  calresult.innerHTML = generatecals;
}

function show(shown, hidden) {
  document.getElementById(shown).style.display = "block";
  document.getElementById(hidden).style.display = "none";
  return false;
}


async function fetchAPI() {
  const URL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=100&calories=${calmin}-${calmax}`;
  const response = await fetch(URL);
  const URL1 = `https://api.edamam.com/search?q=${searchQuery2}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=100&calories=${calmin}-${calmax}`;
  const response1 = await fetch(URL1);
  const URL2 = `https://api.edamam.com/search?q=${searchQuery3}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=100&calories=${calmin}-${calmax}`;
  const response2 = await fetch(URL2);
  const data = await response.json();
  const data1 = await response1.json();
  const data2 = await response2.json();
  const hits = data.hits;
  const hits1 = data1.hits;
  const hits2 = data2.hits;
  var datas = hits[Math.floor(Math.random() * hits.length)];
  var datas1 = hits1[Math.floor(Math.random() * hits1.length)];
  var datas2 = hits2[Math.floor(Math.random() * hits2.length)];
  generateHTML(datas);
  generateHTML1(datas1);
  generateHTML2(datas2);
  console.log(datas);
  console.log(datas1);
  console.log(datas2);
}

function generateHTML(results) {
  
  let c = "";
  let a = results.recipe.calories.toFixed(2);
  let b = results.recipe.yield;
  
  c = a/b;
  
  console.log(a);
  console.log(b);
  console.log(c);
  
  let generatedHTML = "";

  generatedHTML += `
      <div class="item">
        <img src="${results.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${results.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            results.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${c.toFixed(2)} per serving</p>
        <p class="item-data">Diet label: ${
          results.recipe.dietLabels.length > 0
            ? results.recipe.dietLabels
            : "No Data Found"
        }</p>
        <p class="item-datas">Health labels: ${results.recipe.healthLabels}</p>
      </div>
    `;

  searchResultDiv.innerHTML = generatedHTML;
}

function generateHTML1(results) {
  
  let c = "";
  let a = results.recipe.calories.toFixed(2);
  let b = results.recipe.yield;
  
  c = a/b;
  
  console.log(a);
  console.log(b);
  console.log(c);
  
  let generatedHTML1 = "";

  generatedHTML1 += `
      <div class="item">
        <img src="${results.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${results.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            results.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${c.toFixed(2)} per serving</p>
        <p class="item-data">Diet label: ${
          results.recipe.dietLabels.length > 0
            ? results.recipe.dietLabels
            : "No Data Found"
        }</p>
        <p class="item-datas">Health labels: ${results.recipe.healthLabels}</p>
      </div>
    `;

  searchResultDiv1.innerHTML = generatedHTML1;
}

function generateHTML2(results) {
  
  let c = "";
  let a = results.recipe.calories.toFixed(2);
  let b = results.recipe.yield;
  
  c = a/b;
  
  console.log(a);
  console.log(b);
  console.log(c);
  
  let generatedHTML2 = "";

  generatedHTML2 += `
      <div class="item">
        <img src="${results.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${results.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            results.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${c.toFixed(2)} per serving</p>
        <p class="item-data">Diet label: ${
          results.recipe.dietLabels.length > 0
            ? results.recipe.dietLabels
            : "No Data Found"
        }</p>
        <p class="item-datas">Health labels: ${results.recipe.healthLabels}</p>
      </div>
    `;

  searchResultDiv2.innerHTML = generatedHTML2;
}
