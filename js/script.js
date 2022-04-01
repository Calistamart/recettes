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

// Verifie si il y a deja des recettes enregistrees 
let livreDeRecettesExist = JSON.parse(localStorage.getItem("MonLivreDeRecettes"));

if (typeof livreDeRecettesExist === "undefined" || livreDeRecettesExist === null) {
  var allRecipes = [];
}
else {
  var allRecipes = livreDeRecettesExist;
}

// Recupère le formulaire, en fait un objet et l'enregistre avec localStorage
function saveRecipe() {
  let recipe = {
    id: Date.now(),
    nom: document.getElementById("nom-de-la-recette").value,
    ingredients: ingredientsListArray(),
    cookingTime: document.getElementById("temps-de-cuisson").value,
    steps: separateSteps(),
  };

  allRecipes.push(recipe);
  document.forms[0].reset();

  localStorage.setItem("MonLivreDeRecettes", JSON.stringify(allRecipes));
}

let saveButton = document.querySelector("#save-button");
saveButton.onclick = saveRecipe;

// Affiche les recettes en dessous joliment
function DisplayRecipe() {
  // let contentNomDeLaRecette = document.getElementById("resultat-titre-de-la-recette");
  let contentListeDesIngredients = document.getElementById("resultat-liste-des-ingredients");
  // let contentTempsDeCuisson = document.getElementById("resultat-temps-de-cuisson");
  let contentEtapesDeLaRecette = document.getElementById("resultat-etapes-de-la-recette");

  const lastRecipe = allRecipes[allRecipes.length - 1];
  // contentNomDeLaRecette.innerHTML = lastRecipe.nom;
  contentListeDesIngredients.innerHTML = "Ingrédients : " + lastRecipe.ingredients;
  // contentTempsDeCuisson.innerHTML = "Temps de cuisson : " + lastRecipe.cookingTime + " minutes";
  contentEtapesDeLaRecette.innerHTML = lastRecipe.steps;
}

let displayRecipeButton = document.querySelector("#display-button");
displayRecipeButton.onclick = DisplayRecipe;

// Au lieu que ce soit une fontion, la recette s'affiche directement (impossible pour l'instant vu qu'il faut l'enregistrer pour la voir) onkeyup ?
const lastRecipe = allRecipes[allRecipes.length - 1];
const titreDeLaRecette = document.getElementById("nom-de-la-recette");
const listeDesIngredientsDeLaRecette = document.getElementById("resultat-liste-des-ingredients");
const tempsDeCuissonDeLaRecette = document.getElementById("temps-de-cuisson");

titreDeLaRecette.addEventListener("input", (e) => {
  const resultTitre = document.getElementById("resultat-titre-de-la-recette");
  resultTitre.textContent = e.target.value[0];
});

tempsDeCuissonDeLaRecette.addEventListener("input", (e) => {
  const resultTitre = document.getElementById("resultat-temps-de-cuisson");
  resultTitre.textContent = "Temps de cuisson : " + e.target.value + " minutes" ;
});


// Mettre en forme les recettes enregistrées
allRecipes.forEach((item) => {
  let nom = item.nom;
  let ingredients = item.ingredients;
  let cookingTime = item.cookingTime;
  let steps = item.steps;
  let idRecipe = item.id;

  const container = document.getElementById("mes-recettes-enregistrees");
  const template = document.createElement("div");
  template.setAttribute("id", idRecipe);
  template.setAttribute("class", "recette")

  const recipeContainer = container.appendChild(template);

  const recipeTitleContainer = document.createElement("h3");
  recipeTitleContainer.setAttribute("id", "resultat-titre-de-la-recette-" + idRecipe);

  const ingredientsContainer = document.createElement("p");
  ingredientsContainer.setAttribute("id", "resultat-liste-des-ingredients-" + idRecipe);

  const cookingTimeContainer = document.createElement("p");
  cookingTimeContainer.setAttribute("id", "resultat-temps-de-cuisson-" + idRecipe);

  const stepsContainer = document.createElement("p");
  stepsContainer.setAttribute("id", "resultat-etapes-de-la-recette-" + idRecipe);

  let title = recipeContainer.appendChild(recipeTitleContainer);
  title.innerHTML = nom[0].toUpperCase() + nom.slice(1);
  
  let ingr = recipeContainer.appendChild(ingredientsContainer);
  ingr.innerHTML = ingredients;

  let time = recipeContainer.appendChild(cookingTimeContainer);
  time.innerHTML = "Temps de cuisson : " + cookingTime + " minutes";

  let step = recipeContainer.appendChild(stepsContainer);
  step.innerHTML = steps;

  const poubelleButton = document.createElement("button");
  let attributPoubelleButton = "supprimer-la-recette-" + idRecipe;
  poubelleButton.setAttribute("id", attributPoubelleButton)
  poubelleButton.setAttribute("class", "bouton-supprimmer-la-recette")
  poubelleButton.innerText = "🗑️"
  recipeContainer.appendChild(poubelleButton);
  poubelleButton.onclick = deleteOneRecipe;
 });

// (!! NE MARCHE PAS) Supprimer qu'une seule recette
function deleteOneRecipe(idRecipe) {
  let elementToDelete = document.getElementById(idRecipe);
  elementToDelete.parentNode.removeChild(elementToDelete);
};

// ranger les recettes par ordre alphabétique à partir du menu déroulant
function RangerParOrdreAlphabetique() {
  var div = document.querySelector('#mes-recettes-enregistrees'),
      para = document.querySelectorAll('#mes-recettes-enregistrees div');
  var paraArr = [].slice.call(para).sort(function (a, b) {
      return a.textContent > b.textContent ? 1 : -1;
  });
  paraArr.forEach(function (p) {
      div.appendChild(p);
  });
}

const buttonTrierPar = document.getElementById("button-trier-par");
const menuDeroulant = document.getElementById("menu-deroulant-trier-par");

buttonTrierPar.onclick = (event) => {
  event.preventDefault();
  RangerParOrdreAlphabetique;
  location.reload;
}

// Rechercher une recette
function Search() {
  let input = document.getElementById("barre-de-recherche");
  let filter = input.value.toUpperCase();
  let mesRecettes = document.getElementById("mes-recettes-enregistrees");
  let recette = mesRecettes.getElementsByClassName("recette");
  let title, recherche;

  for (let i = 0; i < recette.length; i++) {
    title = recette[i].getElementsByTagName("h3")[0];
    recherche = title.textContent || title.innerText;
    if (recherche.toUpperCase().indexOf(filter) > -1) {
      recette[i].style.display = "";
    }
    else {
      recette[i].style.display = "none";
    }
  }
}

let searchBar = document.querySelector("#barre-de-recherche");
searchBar.onkeyup = Search;

// Modifier les recettes
// Choisir le tri des recettes


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