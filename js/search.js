import { showRecipe } from "./display.js"
import { read } from "./storage.js"

function search() {
// Rechercher une recette
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


function sortBy() {
// Trier par ...
  let livreDeRecettesExist = read();

  let recipes = [];
  if (livreDeRecettesExist) recipes = livreDeRecettesExist;

  let aCacher = document.querySelectorAll(".recette");
  const trierPar = document.getElementById("menu-deroulant-trier-par");

  switch (trierPar.value) {
    case "ordre-alphabetique":
      let sortedAlpha = recipes.sort((x, y) => { return x.nom.localeCompare(y.nom); });

      aCacher.forEach(element => element.style.display = "none");

      for (const index in sortedAlpha) {
        showRecipe(sortedAlpha[index], index);
      }
      break;
    case "date-recente":
      let sortedNew = recipes.sort((a, b) => { return b.id - a.id; });

      aCacher.forEach(element => element.style.display = "none");

      for (const index in sortedNew) {
        showRecipe(sortedNew[index], index);
      };
      break;
    case "default":
      for (const index in recipes) {
        showRecipe(recipes[index], index);
      };

      aCacher.forEach(element => element.style.display = "none");

      break;
    default: ;
  }
};


export { search, sortBy }