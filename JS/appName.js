// UI Variables
const search = document.querySelector("#search");
const submit = document.querySelector("#submit");
const resultEl = document.querySelector(".result-container");
const recipeEl = document.querySelector(".recipe-container");

// Search Meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear meals
  recipeEl.innerHTML = '';
  resultEl.innerHTML = '';

  // Get search term
  const term = search.value;

  // Check for empty
  if(term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      const meal = data.meals[0];
      console.log(meal);
           
      if( meal[`strMeal`] === null) {
        noResult();
      }  if ( meal.strMeal.toLowerCase() === term.toLowerCase() ) {
          addMealToDOM(meal);
        } else {
          noResult();
        }      
    });    
  } 
  
  // Clear search value
  search.value = '';
}

// Add meal to DOM
function addMealToDOM(meal) {
  resultEl.innerHTML = 
    `  <div class="search-result">
    <div class="img">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="dish-image">
    </div>
    <div class="dish-info">
      <div class="dish-title">
        <span>${meal.strMeal}</span>
      </div>
      <div class="dish-spec">
      <span class="category">Category: <span class="dish-category">${meal.strCategory}</span></span>
       <span class="origin">Origin: <span>${meal.strArea}</span></span>
      </div>
    </div>
  </div> `;

 recipeEl.innerHTML =
    `<div class="recipe">
      <span class="recipe-title">Recipe</span>
      <span class="meal-recipe">${meal.strInstructions} </span>
     </div>`;
}

// No result function
function noResult() {
  resultEl.innerHTML =`<p class="empty-result">There are no search results. Check the meal name at the Meal Category Menu</p>`
}


// Event listeners
submit.addEventListener('submit', searchMeal)