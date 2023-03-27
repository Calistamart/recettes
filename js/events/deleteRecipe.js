class BinButton {
    constructor() {
        this.init()
    }

    init() {
        this.recipes = recipes
        this.idRecipe = idRecipe
    }
        
    createBinButtons() {
    // Supprimer la recette
        const poubelleButton = document.createElement("button");
        const attributPoubelleButton = `supprimer-la-recette-${idRecipe}`;
    
        poubelleButton.setAttribute("id", attributPoubelleButton);
        poubelleButton.setAttribute("class", "bouton-edition");
        poubelleButton.innerText = "🗑️";
        poubelleButton.addEventListener('click', this.deleteRecipe(idRecipe, recipes))
        recipeContainer.appendChild(poubelleButton);
        }

    deleteRecipe(idRecipe, recipes) {
    // Deletes recipe with bin button
        const elementToDelete = document.getElementById(idRecipe);
        const elementToDeleteName = document.getElementById(`resultat-titre-de-la-recette-${idRecipe}`);
    
        if (confirm(`Voulez-vous supprimer la recette ${elementToDeleteName.textContent} ?`)) {
            elementToDelete.parentNode.removeChild(elementToDelete);
            recipes.splice(index, 1);
            save(recipes);
        }
    }
}

export { BinButton }