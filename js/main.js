"use strict";

let displayArea = document.querySelector("#rowData");
let searchContainer = document.querySelector("#searchContainer");
let sideBarOpenClose = document.querySelector(".open-close-icon")


let meals=[];
let mealCategories=[];
let mealAreas=[];
let mealIngredients=[];


let clear= () => "";

(async()=>{
    await getMeals("");
    displayMainData(displayMeals);
})()


async function getMeals(search)
{
    let data;
    if(search.length===1)
    data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
    else
    data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    let result= await data.json();
    meals=result.meals;    
}

async function getMealCategories()
{
    let data = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let result= await data.json();
    mealCategories=result.categories;    
}

async function getMealAreas()
{
    let data = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let result= await data.json();
    mealAreas=result.meals;    
}

async function getMealIngredients()
{
    let data = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    let result= await data.json();
    mealIngredients=result.meals;    
}

async function getMealsByCategory(category)
{
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let result= await data.json();
    meals=result.meals;    
}

async function getMealsByArea(area)
{
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let result= await data.json();
    meals=result.meals;    
}

async function getMealsByIngredient(ingredient)
{
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    let result= await data.json();
    meals=result.meals;    
}

async function getMealDetails(id)
{
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    return await data.json();
}

sideBarOpenClose.addEventListener('click', function(e){
    if(sideBarOpenClose.classList.contains("fa-align-justify")){
        openSideNav();
    }else{
        closeSideNav();
    }
});

function closeSideNav(){
    $(".side-nav-menu").css({left:"0px"}).animate({"left":"-256.562px"}, "slow");
    sideBarOpenClose.classList.add("fa-align-justify");
}

function openSideNav(){
    $(".side-nav-menu").css({left:"-256.562px"}).animate({"left":"0px"}, "slow");
    sideBarOpenClose.classList.remove("fa-align-justify");
}



async function mealClick(id){
    let meal = await getMealDetails(id);
    displayMainData(()=>displayMealDetails(meal.meals[0]));   
}

async function categoryMealClick(category){
    await getMealsByCategory(category);
    displayMainData(displayMeals);   
}

async function areaMealClick(area){
    await getMealsByArea(area);
    displayMainData(displayMeals);   
}

async function ingredientsMealClick(ingredient){
    await getMealsByIngredient(ingredient);
    displayMainData(displayMeals);   
}

function searchClick(){
    displaySearchContainer(SearchInputs);
    displayMainData(clear);

}

function ContactsClick(){
    displaySearchContainer(clear);
    displayMainData(ContactUs);
}

async function CategoriesClick(){
    displaySearchContainer(clear);
    await getMealCategories();
    displayMainData(displayMealCategories); 
}

async function AreaClick(){
    displaySearchContainer(clear);
    await getMealAreas();
    displayMainData(displayMealAreas); 
}

async function IngredientsClick(){
    displaySearchContainer(clear);
    await getMealIngredients();
    displayMainData(displayMealIngredients); 
}

async function search(search){
    await getMeals(search);
    displayMainData(displayMeals);
}


function displaySearchContainer(data){
    searchContainer.innerHTML=data();
}

 function displayMainData(data){
 displayArea.innerHTML=data();
}


function SearchInputs(){
    return`<div class="row py-4 ">
    <div class="col-md-6 ">
        <input onkeyup="search(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
        <input onkeyup="search(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
    </div>
</div>`
}

function displayMeals(){
    let displayData="";
    meals.forEach(meal => {
        displayData+=`<div class="col-md-3">
        <div onclick="mealClick(${meal.idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${meal.strMeal}</h3>
            </div>
        </div>
</div>`;  
 });

 return displayData;
}

function displayMealDetails(meal){
    let displayData=`<div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">`;
        for (let index = 1; index <=20; index++) {
            let key="strIngredient"+index;
            if(meal[key]!=="")
            displayData+=`<li class="alert alert-info m-2 p-1">${meal[key]}</li>`;
        }
  
       displayData+=`</ul>

        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            
        </ul>

        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`;  
 
 return displayData;
}


function displayMealCategories(){
    let displayData="";
    mealCategories.forEach(category => {
        displayData+=`<div class="col-md-3">
        <div onclick="categoryMealClick('${category.strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${category.strCategoryThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>${category.strCategory}</h3>
                <p>${category.strCategoryDescription}</p>
            </div>
        </div>
</div>`;  
 });

 return displayData;
}

function displayMealAreas(){
    let displayData="";
    mealAreas.forEach(area => {
        displayData+=`<div class="col-md-3">
        <div onclick="areaMealClick('${area.strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${area.strArea}</h3>
        </div>
        </div>`;  
 });

 return displayData;
}

function displayMealIngredients(){
    let displayData="";
    mealIngredients.forEach(ingredient => {
        displayData+=`<div class="col-md-3">
        <div onclick="ingredientsMealClick('${ingredient.strIngredient}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${ingredient.strIngredient}</h3>
                <p>${ingredient.strDescription?.substr(0, 100)}</p>
        </div>
</div>`;  
 });

 return displayData;
}


function ContactUs(){
    return`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation(this)" type="text" class="form-control" placeholder="Enter Your Name" fdprocessedid="8wj91m">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation(this)" type="email" class="form-control " placeholder="Enter Your Email" fdprocessedid="luyssn">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation(this)" type="text" class="form-control " placeholder="Enter Your Phone" fdprocessedid="qrbkq">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation(this)" type="number" class="form-control " placeholder="Enter Your Age" fdprocessedid="da5ck">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" onkeyup="inputsValidation(this)" type="password" class="form-control " placeholder="Enter Your Password" fdprocessedid="xm4fz">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput" onkeyup="inputsValidation(this)" type="password" class="form-control " placeholder="Repassword" fdprocessedid="xmszvc">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
}




let nameInputIsValid=false , emailInputIsValid=false ,phoneInputIsValid=false,ageInputIsValid=false,passwordInputIsValid=false,repasswordInputInputIsValid=false;
    
function inputsValidation(e){
    debugger;
    let submitBtn= document.querySelector("#submitBtn");
    if(e.id==="nameInput"){
        let alert= document.querySelector("#nameAlert");
        let pattern = /^[A-za-z ]+$/
       if(!pattern.test(e.value)){
       alert.classList.remove("d-none");
       nameInputIsValid=false;
       }
       else{
       alert.classList.add("d-none");
       nameInputIsValid=true;
       }
    }

    if(e.id==="emailInput"){
        let alert= document.querySelector("#emailAlert");
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
       if(!pattern.test(e.value)){
       alert.classList.remove("d-none");
       emailInputIsValid=false;
    }
     else{
       alert.classList.add("d-none");
       emailInputIsValid=true;
    }
    }

    if(e.id==="phoneInput"){
        let alert= document.querySelector("#phoneAlert");
        let pattern = /^(01)[0125][0-9]{8}$/
       if(!pattern.test(e.value)){
       alert.classList.remove("d-none");
       phoneInputIsValid=false;
    }
     else{
       alert.classList.add("d-none");
       phoneInputIsValid=true;
    }
    }

    if(e.id==="ageInput"){
        let alert= document.querySelector("#ageAlert");
        let pattern = /^[0-9]{2}$/
       if(!pattern.test(e.value)){
       alert.classList.remove("d-none");
       ageInputIsValid=false;
    }else{
       alert.classList.add("d-none");
       ageInputIsValid=true;
    }
    }
    if(e.id==="passwordInput"){
        let alert= document.querySelector("#passwordAlert");
        let pattern = /(?=.*[0-9])(?=.*\W).{8,}/
       if(!pattern.test(e.value)){
       alert.classList.remove("d-none");
       passwordInputIsValid=false;
    }else{
       alert.classList.add("d-none");
       passwordInputIsValid=true;
    }
    }
    if(e.id==="repasswordInput"){
        let password= document.querySelector("#passwordInput");
        let alert= document.querySelector("#repasswordAlert");
       if(password.value!=e.value){
       alert.classList.remove("d-none");
       repasswordInputInputIsValid=false;
    }else{
       alert.classList.add("d-none");
       repasswordInputInputIsValid=true;
    }
    }

   if(nameInputIsValid && emailInputIsValid && phoneInputIsValid && ageInputIsValid &&passwordInputIsValid &&repasswordInputInputIsValid)
    {
      
        submitBtn.disabled=false;
    }else{
        submitBtn.disabled=true;
    }
    
}



