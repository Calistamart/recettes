// Fonction pour rajouter des champs (pour les ingrédients)
function addField(e) {
  e.preventDefault();
  e.stopPropagation();
  var input = document.createElement("input");
  input.type = "text";
  input.name = "ingredients[]";
  container.appendChild(input);
  container.appendChild(document.createElement("br"));
}

let addFieldBtn = document.querySelector("#addField");
addFieldBtn.onclick = addField;

// Le best code recupère le formulaire, en fait un objet et l'enregistre avec localStorage
let allRecipes = [];

function addRecipe(e) {
  e.preventDefault
  let recipe = {
    id: Date.now(),
    nom: document.getElementById("nom-de-la-recette").value,
    cookingTime: document.getElementById("temps-de-cuisson").value,
    steps: separateSteps()
  }
  console.log(recipe)

  allRecipes.push(recipe);

  localStorage.setItem('MonLivreDeRecettes', JSON.stringify(allRecipes));
}

let test = document.querySelector("#test-button");
test.onclick = addRecipe;

// Affiche un JSON à partir des données du formulaire.
function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(this);

  const formJSON = Object.fromEntries(data.entries());

  recettes.push(formJSON);

  results.innerText = "";
  recettes.forEach((recette) => (results.innerText += JSON.stringify(recette)));
  localStorage.setItem("recettes", JSON.stringify(recettes));
}

// Enregistre la recette avec localStorage
var recettes = JSON.parse(localStorage.getItem("recettes")) || [];
const results = document.querySelector(".results pre");

results.innerText = "";
recettes.forEach((recette) => (results.innerText += JSON.stringify(recette)));

let recetteForm = document.querySelector("form#recetteForm");
recetteForm.onsubmit = handleFormSubmit;

// Faire un array pour les ingrédients


function ingredientsListArray() {
  let inputs = document.getElementsByName("ingredients[]");
  let tabIngredients = [];
  let phraseIngredients = "Les ingrédients sont : ";

  const renderer = document.getElementById("ingr")
  renderer.innerHTML = ''

  inputs.forEach((input, i)=>{
    renderer.innerHTML += "ingredient[" + i + "] = " + input.value + " <br> ";
    tabIngredients.push(input.value)
  })
};

let ingredientsArrayButton = document.getElementById("ingredientsArrayButton");
ingredientsArrayButton.onclick = ingredientsListArray;

// Bouton + pour afficher la saisie de recette
function ShowRecipeSaisie() {
  let div = document.getElementById("saisie-de-la-recette");
  if (div.style.display === "none") {
    div.style.display = "block";
  }
  else {
    div.style.display = "none";
  }
};

let showRecipeSaisieButton = document.getElementById("bouton-plus");
showRecipeSaisieButton.onclick = ShowRecipeSaisie;

// Séparer chaque étape dans un array (par un ;)
function separateSteps() {
  const recipe = document.getElementById("etapes-de-la-recette").value;
  const steps = recipe.split(";");
  console.log(steps);
  return steps;
}

let separateStepsButton = document.getElementById("save-button");
separateStepsButton.onclick = separateSteps;

// Bouton pour supprimer toutes les recettes
let deleteAllButton = document.querySelector("#delete-all-button");
deleteAllButton.onclick = deleteButton;

function deleteButton(event) {
  event.preventDefault();
  localStorage.clear();
  location.reload();
}





// Faire que le array des ingrédient rentre dans l'objet recette
// Supprimer qu'une seule recette
// Modifier les recettes





class Recipe {
  constructor(name, ingredients, cookingTime, steps) {
    this.name = name;
    this.ingredients = ingredients;
    this.cookingTime = cookingTime;
    this.steps = steps;
  }
}

let couscous = new Recipe(
  "Couscous",
  ["250g de semoule", " 85g de viande", "100g de légumes"],
  120,
  ["Mettre la semoule", "Mettre la viande", "Mettre les légumes"]
);

console.log(couscous);