// Faire un array pour les ingrédients
function ingredientsListArray() {
  const inputs = document.getElementsByName("ingredients[]");
  let tabIngredients = [];

  inputs.forEach((input) => {
    if (input.value) tabIngredients.push(input.value);
  });
  return tabIngredients;
}

// Séparer chaque étape dans un array (par un retour à la ligne)
function separateSteps() {
  const recipe = document.getElementById("etapes-de-la-recette").value;
  const steps = recipe.split(/\r?\n/);
  return steps;
}

export { ingredientsListArray, separateSteps }