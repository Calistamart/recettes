import { search, sortBy } from "./search.js";
import { save, read, reset } from "./storage.js"
import { ingredientsListArray, separateSteps } from "./tools.js"
import { showRecipe } from "./display.js"


class Recetto {
  constructor() {
    this.init();
    // Verifie si il y a déjà des recettes enregistrees
    let livreDeRecettesExist = read();

    this.recipes = [];
    if (livreDeRecettesExist)
      this.recipes = livreDeRecettesExist;

    // Mettre en forme les recettes enregistrées
    for (const index in this.recipes) {
      showRecipe(this.recipes[index], index);
    }
  }
  init() {
    this.recipesEl = document.getElementById("mes-recettes-enregistrees");

    let addFieldBtn = document.querySelector("#addField");
    addFieldBtn.onclick = this.addField;

    let showForm = document.getElementById("showForm");
    showForm.onclick = () => {
      let div = document.getElementById("div-form");
      div.style.display = div.style.display === "none" ? "block" : "none";
    };

    // Boutons
    const deleteAllButton = document.querySelector("#delete-all-button");
    deleteAllButton.onclick = reset;

    const saveButton = document.querySelector("#save-button");
    saveButton.onclick = this.saveRecipe.bind(this);

    const searchBar = document.querySelector("#barre-de-recherche");
    searchBar.onkeyup = search;
    
    const trierPar = document.getElementById("menu-deroulant-trier-par");
    trierPar.addEventListener("change", sortBy)


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
  }

  // Fonction pour rajouter des champs (pour les ingrédients)
  addField(e) {
    e.preventDefault();
    e.stopPropagation();
    const input = document.createElement("input");
    input.type = "text";
    input.name = "ingredients[]";
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
  }

  // Recupère le formulaire, en fait un objet et l'enregistre avec localStorage
  saveRecipe() {
    let recipe = {
      id: Date.now(),
      nom: document.getElementById("formTitle").value,
      ingredients: ingredientsListArray(),
      cookingTime: document.getElementById("cookingTime").value,
      steps: separateSteps(),
      image: document.querySelector("#display-image").src
    };

    console.log(this.recipes);
    showRecipe(recipe, this.recipes.length);

    this.recipes.push(recipe);
    document.forms[0].reset();

    save(this.recipes);

    let div = document.getElementById("div-form");
    div.style.display = "none";
  }
}

// cliquer pour agrandir la recette
// Faire des livres de recettes a la pinterest qu'on peut partager

let elRecetto = new Recetto();