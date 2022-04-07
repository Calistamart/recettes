var Recetto = function () {
  this.init();
  // Verifie si il y a deja des recettes enregistrees
  let livreDeRecettesExist = JSON.parse(
    localStorage.getItem("MonLivreDeRecettes")
  );

  this.recipes = [];
  if (livreDeRecettesExist) this.recipes = livreDeRecettesExist;

  // Mettre en forme les recettes enregistrées
  for (const index in this.recipes) {
    this.showRecipe(this.recipes[index], index)
  }
};

Recetto.prototype.init = function () {
  this.recipesEl = document.getElementById("mes-recettes-enregistrees");

  let addFieldBtn = document.querySelector("#addField");
  addFieldBtn.onclick = this.addField;

  let showForm = document.getElementById("showForm");
  showForm.onclick = () => {
    let div = document.getElementById("recetteForm");
    div.style.display = div.style.display === "none" ? "block" : "none";
  };

  // Bouton pour supprimer toutes les recettes
  const deleteAllButton = document.querySelector("#delete-all-button");
  deleteAllButton.onclick = deleteButton;

  const saveButton = document.querySelector("#save-button");
  saveButton.onclick = this.saveRecipe.bind(this);

  const searchBar = document.querySelector("#barre-de-recherche");
  searchBar.onkeyup = search;

  // Display image
  const imageInput = document.querySelector("#image-input");

  imageInput.addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const uploadedImage = reader.result;
      document.querySelector("#display-image").src = uploadedImage;
    });
    reader.readAsDataURL(e.target.files[0]);
  });
};

// Fonction pour rajouter des champs (pour les ingrédients)
Recetto.prototype.addField = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const input = document.createElement("input");
  input.type = "text";
  input.name = "ingredients[]";
  container.appendChild(input);
  container.appendChild(document.createElement("br"));
};

// Afficher les recettes
Recetto.prototype.showRecipe = function (item, index) {
  const nom = item.nom;
  const ingredients = item.ingredients;
  const cookingTime = item.cookingTime;
  const steps = item.steps;
  const idRecipe = item.id;
  const image = item.image;

  const template = document.createElement("div");
  template.setAttribute("id", idRecipe);
  template.setAttribute("class", "recette");

  const recipeContainer = this.recipesEl.appendChild(template);

  const recipeTitleContainer = document.createElement("h3");
  recipeTitleContainer.setAttribute("id", `resultat-titre-de-la-recette-${idRecipe}`);

  const ingredientsContainer = document.createElement("p");
  ingredientsContainer.setAttribute("id", `resultat-liste-des-ingredients-${idRecipe}`);

  const cookingTimeContainer = document.createElement("p");
  cookingTimeContainer.setAttribute("id", `resultat-temps-de-cuisson-${idRecipe}`);

  const stepsContainer = document.createElement("p");
  stepsContainer.setAttribute("id", `resultat-etapes-de-la-recette-${idRecipe}`);

  const title = recipeContainer.appendChild(recipeTitleContainer);
  title.innerHTML = nom[0].toUpperCase() + nom.slice(1);

  if (image) {
    const imageContainer = document.createElement("img");
    imageContainer.setAttribute("id", `image-de-la-recette-${idRecipe}`);
    imageContainer.setAttribute("src", image);
    imageContainer.setAttribute("class", "image-recette");

    const img = recipeContainer.appendChild(imageContainer);
    img.innerHTML = image;
  }

  const ingr = recipeContainer.appendChild(ingredientsContainer);
  ingr.innerHTML = ingredients;

  const time = recipeContainer.appendChild(cookingTimeContainer);
  time.innerHTML = `Temps de cuisson : ${cookingTime} minutes`;

  const step = recipeContainer.appendChild(stepsContainer);
  step.innerHTML = steps;

  // Supprimer la recette
  const poubelleButton = document.createElement("button");
  const attributPoubelleButton = `supprimer-la-recette-${idRecipe}`;

  poubelleButton.setAttribute("id", attributPoubelleButton);
  poubelleButton.setAttribute("class", "bouton-supprimmer-la-recette");
  poubelleButton.innerText = "🗑️";
  recipeContainer.appendChild(poubelleButton);

  poubelleButton.onclick = () => {
    const elementToDelete = document.getElementById(idRecipe);
    elementToDelete.parentNode.removeChild(elementToDelete);
    this.recipes.splice(index, 1);
    localStorage.setItem("MonLivreDeRecettes", JSON.stringify(this.recipes));
  };
};

// Séparer chaque étape dans un array (par un retour à la ligne)
function separateSteps() {
  const recipe = document.getElementById("etapes-de-la-recette").value;
  const steps = recipe.split(/\r?\n/);
  return steps;
}

// Bouton pour supprimer toutes les recettes
function deleteButton(event) {
  event.preventDefault();
  localStorage.clear();
  location.reload();
}

// Recupère le formulaire, en fait un objet et l'enregistre avec localStorage
Recetto.prototype.saveRecipe = function () {
  let recipe = {
    id: Date.now(),
    nom: document.getElementById("formTitle").value,
    ingredients: ingredientsListArray(),
    cookingTime: document.getElementById("cookingTime").value,
    steps: separateSteps(),
    image: document.querySelector("#display-image").src
  };

  console.log(this.recipes);
  this.showRecipe(recipe, this.recipes.length);

  this.recipes.push(recipe);
  document.forms[0].reset();

  localStorage.setItem("MonLivreDeRecettes", JSON.stringify(this.recipes));
};

// Rechercher une recette
function search() {
  const input = document.getElementById("barre-de-recherche");
  const filter = input.value.toUpperCase();
  const mesRecettes = document.getElementById("mes-recettes-enregistrees");
  const recette = mesRecettes.getElementsByClassName("recette");
  let title, recherche;

  for (let i = 0; i < recette.length; i++) {
    title = recette[i].getElementsByTagName("h3")[0];
    recherche = title.textContent || title.innerText;
    if (recherche.toUpperCase().indexOf(filter) > -1) {
      recette[i].style.display = "";
    } else {
      recette[i].style.display = "none";
    }
  }
}

// Faire un array pour les ingrédients
function ingredientsListArray() {
  const inputs = document.getElementsByName("ingredients[]");
  let tabIngredients = [];

  inputs.forEach((input) => {
    tabIngredients.push(input.value);
  });
  return tabIngredients;
}

let elRecetto = new Recetto();