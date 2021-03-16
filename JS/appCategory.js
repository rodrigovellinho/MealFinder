const search = document.querySelector(".category-list");
const mainCategory = document.querySelector(".main-category");
const categoryDishes = document.querySelector(".category-dishes");
 

function selectDish(e) {
 const searchTerm = e.target.textContent;
 
 fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchTerm}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const meal = data.meals;
      console.log(meal);
      
      addMealToDOM(meal);

    });

}

function addMealToDOM(meal) {
 categoryDishes.innerHTML = meal.map(meal => 
    `<div class="single-dish">
      <div class="dish-flexbox">
        <img src="${meal.strMealThumb}"alt="${meal.strMeal}"class="dish-photo">
        <span class="dish-title">"${meal.strMeal}"</span>
      </div>
     </div>`
  ).join('');
} 

// Event listeners
search.addEventListener('click', selectDish);
search.addEventListener('click', selectCategory)

function selectCategory(e) {
  const categoryTerm = e.target.getAttribute('id');
  console.log(categoryTerm);
  
fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  .then(res => res.json())
  .then(data => {
    const category = data.categories[categoryTerm];
    
    addCategoryToDOM(category)

  }); 
}

function addCategoryToDOM(category) {
  mainCategory.innerHTML =
  ` <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="category-photo">
      <div class="category-details">
      <span class="category-title">${category.strCategory}</span>
      <span class="category-description">${category.strCategoryDescription}</span>
   </div>`
}


