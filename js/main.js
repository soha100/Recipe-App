//www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
//www.themealdb.com/api/json/v1/1/lookup.php?i=52772

let searchInputEl = document.querySelector(".search-input");
let searchBtnEl = document.querySelector("#search-btn");
let resultAreaEl = document.querySelector(".result-area");
let recipeDetails = document.querySelector(".recipe-details");

searchBtnEl.addEventListener("click", getRecipes);
resultAreaEl.addEventListener("click", getItemDetail);
recipeDetails.addEventListener("click", closeDetails);
function getRecipes() {
  let searchItem = searchInputEl.value.trim();
  let apiUrl = `https:\\www.themealdb.com/api/json/v1/1/filter.php?c=${searchItem}`;

  fetch(apiUrl)
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      desplayRecipes(data);
    });
}

function desplayRecipes(recipes) {
  resultAreaEl.innerHTML = "";
  if (recipes.meals == null) {
    resultAreaEl.innerHTML = "No Data";
    return;
  }

  recipes.meals.forEach((recipe) => {
    resultAreaEl.innerHTML += `
        <div class="card">
          <div class="card-img">
            <img src="${recipe.strMealThumb}" alt="" />
          </div>
          <div class="card-info">
            <h2>${recipe.strMeal}</h2>
            <a href="#" class ="getRecipe" data-id=${recipe.idMeal}>Get Recipe</a>
          </div>
        </div>
        `;
  });
}

function getItemDetail(e) {
  if (e.target.classList.contains("getRecipe")) {
    let id = e.target.getAttribute("data-id");
    let apiUrl = `https:\\www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    fetch(apiUrl)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        displayRecipeDetails(data);
      });
  }
}

function displayRecipeDetails(recipeItem) {
  recipeDetails.classList.remove("showDetails");

  let item = recipeItem.meals[0];
  recipeDetails.innerHTML = "";

  recipeDetails.innerHTML = `
 <i class="fas fa-times"></i>
        <h2>${item.strCategory}</h2>
        <p>Introduction</p>
        <p>${item.strInstructions}</p>
        <a href="${item.strYoutube}">Watch Video</a>
 `;
}

function closeDetails(e) {
  if (e.target.classList.contains("fa-times")) {
    e.target.parentElement.classList.add("showDetails");
  }
}
