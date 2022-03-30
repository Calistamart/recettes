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

// Faire un array pour les ingrédients
function ingredientsListArray() {
  let inputs = document.getElementsByName("ingredients[]");
  let tabIngredients = [];

  inputs.forEach((input) => {
    tabIngredients.push(input.value);
  });
  return tabIngredients;
}

// Bouton + pour afficher la saisie de recette
function ShowRecipeSaisie() {
  let div = document.getElementById("saisie-de-la-recette");
  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}

let showRecipeSaisieButton = document.getElementById("bouton-plus");
showRecipeSaisieButton.onclick = ShowRecipeSaisie;

// Séparer chaque étape dans un array (par un retour à la ligne)
function separateSteps() {
  const recipe = document.getElementById("etapes-de-la-recette").value;
  const steps = recipe.split(/\r?\n/);
  return steps;
}

// Bouton pour supprimer toutes les recettes
let deleteAllButton = document.querySelector("#delete-all-button");
deleteAllButton.onclick = deleteButton;

function deleteButton(event) {
  event.preventDefault();
  localStorage.clear();
  location.reload();
}

// Le best code recupère le formulaire, en fait un objet et l'enregistre avec localStorage
var allRecipes = [];

function addRecipe() {
  let recipe = {
    id: Date.now(),
    nom: document.getElementById("nom-de-la-recette").value,
    ingredients: ingredientsListArray(),
    cookingTime: document.getElementById("temps-de-cuisson").value,
    steps: separateSteps(),
  };
  console.log(recipe);

  allRecipes.push(recipe);
  console.log(allRecipes);

  localStorage.setItem("MonLivreDeRecettes", JSON.stringify(allRecipes));
}

let saveButton = document.querySelector("#save-button");
saveButton.onclick = addRecipe;

// Affiche les recettes en dessous joliment
function DisplayRecipe() {
  let contentNomDeLaRecette = document.getElementById("resultat-titre-de-la-recette");
  let contentListeDesIngredients = document.getElementById("resultat-liste-des-ingredients");
  let contentTempsDeCuisson = document.getElementById("resultat-temps-de-cuisson");
  let contentEtapesDeLaRecette = document.getElementById("resultat-etapes-de-la-recette");
  let contentToutesLesRecettes = document.getElementById("resultat-toutes-les-recettes");


  const lastRecipe = allRecipes[allRecipes.length - 1];
  contentNomDeLaRecette.innerHTML = lastRecipe.nom;
  contentListeDesIngredients.innerHTML = "Ingrédients : " + lastRecipe.ingredients;
  contentTempsDeCuisson.innerHTML = "Temps de cuisson : " + lastRecipe.cookingTime + " minutes";
  contentEtapesDeLaRecette.innerHTML = lastRecipe.steps;
   
}

let displayRecipeButton = document.querySelector("#display-button");
displayRecipeButton.onclick = DisplayRecipe;


// Ajoute les elements sans remplacer les anciens
function addTemplate(e) {
  e.preventDefault();
  e.stopPropagation();
  var recetteTemplate = document.createElement("div").appendChild("h3").appendChild("p").appendChild("p").appendChild("p");
  mes-recettes.appendChild(recetteTemplate);
  mes-recettes.appendChild(document.createElement("br"));

  for (let recipe of allRecipes) {
    console.log(recipe)
  }
}

addTemplate();

// Faire que les recettes précédentes restent sauvegardées et affichées
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
  ["250g de semoule", "85g de viande", "100g de légumes"],
  120,
  ["Mettre la semoule", "Mettre la viande", "Mettre les légumes"]
);

console.log(couscous);
