// function addFields()
// Fonction pour rajouter des champs {
//   // Generate a dynamic number of inputs
//   var number = document.getElementById("ingredientsForm").value;
//   // Get the element where the inputs will be added to
//   var container = document.getElementById("container");
//   // Remove every children it had before
//   while (container.hasChildNodes()) {
//     container.removeChild(container.lastChild);
//   }
//   for (i = 0; i < number; i++) {
//     // Append a node with a random text
//     container.appendChild(document.createTextNode("Ingredient " + (i + 1)));
//     // Create an <input> element, set its type and name attributes
//     var input = document.createElement("input");
//     input.type = "text";
//     input.name = "ingredientsForm" + i;
//     container.appendChild(input);
//     // Append a line break
//     container.appendChild(document.createElement("br"));
//   }
// }

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

function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const formJSON = Object.fromEntries(data.entries());

  const results = document.querySelector(".results pre");
  results.innerText = JSON.stringify(formJSON, null, 2);
}

const form = document.querySelector(".contact-form");
form.addEventListener("submit", handleFormSubmit);

// input.addEventListener("input", function (event) {
//   output.innerText = event.target.value;
// });

// let ingredients = ["Voilz", "iold"];

// ingredients.push("visl");

// console.log(ingredients);

// document.getElementById("listIngredients");

function sendData(data) {
  let XHR = new XMLHttpRequest();
  let urlEncodeData = "";
  let urlEncodeDataPairs = [];
  let name;

  for (name in data) {
    urlEncodeDataPairs.push(
      encodeURIComponent(name) + "=" + encodeURIComponent(data[name])
    );
  }

  urlEncodeData = urlEncodeDataPairs.join("&").replace(/%20/g, "+");

  XHR.addEventListener("load", function (event) {
    alert("Ouais ! Données envoyées et réponse chargée.");
  });

  XHR.addEventListener("error", function (event) {
    alert("Oups ! Quelque chose s'est mal passé.");
  });

  XHR.open('POST','https://');

  XHR.send(FD);
}
