// Enregistre les recettes avec localStorage
var recettes = JSON.parse(localStorage.getItem('recettes')) || []
const results = document.querySelector(".results pre");

results.innerText = ''
recettes.forEach((recette)=>results.innerText += JSON.stringify(recette))

let addFieldBtn = document.querySelector('#addField')
addFieldBtn.onclick = addField

let recetteForm = document.querySelector('form#recetteForm')
recetteForm.onsubmit = handleFormSubmit

// Fonction pour rajouter des champs (pour les ingrédients)
function addField(e) {
  e.preventDefault()
  e.stopPropagation()
  var input = document.createElement("input");
  input.type = "text";
  input.name = "ingredientsForm";
  container.appendChild(input);
  container.appendChild(document.createElement("br"));
}

// Affiche un JSON à partir des données du formulaire.
function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(this);

  const formJSON = Object.fromEntries(data.entries());

  recettes.push(formJSON)

  results.innerText = ''
  recettes.forEach((recette)=>results.innerText += JSON.stringify(recette))
  localStorage.setItem('recettes', JSON.stringify(recettes))
}

class Recipe {
  constructor(name, ingredients, ingredientsQuantity, cookingTime, steps) {
    this.name = name;
    this.ingredients = ingredients;
    this.ingredientsQuantity = ingredientsQuantity;
    this.cookingTime = cookingTime;
    this.steps = steps;
  }
}

let couscous = new Recipe(
  "Couscous",
  ["Semoule", "viande", "Légumes"],
  [250, 85, 100],
  120,
  ["Mettre la semoule", "Mettre la viande", "Mettre les légumes"]
);

console.log(couscous);

// Assigner le resultat de la recette dans une variable
// let savedRecipe = handleFormSubmit();

// Faire un truc avec des arrays pour les ingrédients et les quantités, et les associer
function ListeDIngredients () {
  let ingredients = [];
  ingredients.push(document.getElementById("champ-liste-des-ingredients".value));
  console.log(ingredients);
};