import { save, read } from "./storage.js"

// Afficher les recettes
function showRecipe(item, index) {
    let livreDeRecettesExist = read();

    let recipes = [];
    if (livreDeRecettesExist) recipes = livreDeRecettesExist;
    
    const nom = item.nom;
    const ingredients = item.ingredients;
    const cookingTime = item.cookingTime;
    const steps = item.steps;
    const idRecipe = item.id;
    const image = item.image;


    const recipesBook = document.getElementById("mes-recettes-enregistrees");
    const template = document.createElement("div");
    template.setAttribute("id", idRecipe);
    template.setAttribute("class", "recette");

    const recipeContainer = recipesBook.appendChild(template);

    const recipeTitleContainer = document.createElement("h3");
    recipeTitleContainer.setAttribute("id", `resultat-titre-de-la-recette-${idRecipe}`);
    recipeTitleContainer.setAttribute("class", "titre-recette")

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
        imageContainer.setAttribute("alt", `Plat de ${nom}`);

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
    poubelleButton.setAttribute("class", "bouton-edition");
    poubelleButton.innerText = "🗑️";
    recipeContainer.appendChild(poubelleButton);

    poubelleButton.onclick = () => {
        const elementToDelete = document.getElementById(idRecipe);
        const elementToDeleteName = document.getElementById(`resultat-titre-de-la-recette-${idRecipe}`);

        if (confirm(`Voulez-vous supprimer la recette ${elementToDeleteName.textContent} ?`)) {
            elementToDelete.parentNode.removeChild(elementToDelete);
            recipes.splice(index, 1);
            save(recipes);
        }
    };

    // Modifier la recette
    // const editButton = document.createElement("button");

    // editButton.setAttribute("id", `modifier-${idRecipe}`);
    // editButton.setAttribute("class", "bouton-edition");
    // editButton.innerText = "✏️";
    // recipeTitleContainer.append(editButton);
}

export { showRecipe }