let searchBtn = document.getElementById("searchBtn");
let searchInput = document.getElementById("searchInput");
let navbar = document.getElementById("navbar");
let allRecipes = [];
let recipeDetails = {};

async function getRecipes(term) {
    let api = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
   allRecipes = await api.json();
    allRecipes = allRecipes.recipes;
    displayRecipes();
}


async function getDetails(id) {
    let api = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    recipeDetails = await api.json();
    recipeDetails = recipeDetails.recipe;
    displayRecipeDetails();
}

function displayRecipes() {
    let cartoona = ``;
   
    for (let i = 0; i < allRecipes.length; i++) {
        let rId = "'" + allRecipes[i].recipe_id + "'";
        cartoona += `
        <div class="col-md-4 ">
        <div class="recipe" onclick="getDetails(${rId})">
          <img class="w-100" src="${allRecipes[i].image_url}" alt="" >
          <h4 class="mt-2 font-weight-bolder">${allRecipes[i].title}</h4>
          <p class="lead font-weight-bold">${allRecipes[i].publisher}</p>
        </div>
      </div>`
        
    }
    document.getElementById("recipesRow").innerHTML=cartoona;
}

function displayRecipeDetails()
{
   let cartona=``;
   for(let i of recipeDetails.ingredients)
   {
       cartona+=`<li class="d-flex py-1 align-items-center font-weight-bolder"><span class="fa-li">
       <i class="fas fa-utensils"></i></span>${i}</li>`
   }
   let cartona2=` <div class="recipeDetials ">
   <h3 class="font-weight-bolder h2 mb-3 text-center">${recipeDetails.title}</h3>
   <img src="${recipeDetails.image_url}" alt="" class="w-100  mb-3">
   <ul class="fa-ul">${cartona}</ul>
 </div>`

 document.getElementById("recipeDetails").innerHTML=cartona2;

}

searchBtn.addEventListener("click",function()
{
    getRecipes(searchInput.value);
})

