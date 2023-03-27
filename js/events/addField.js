function addField(e) {
// Fonction pour rajouter des champs (pour les ingrédients)
    e.preventDefault();
    e.stopPropagation();
    const input = document.createElement("input");
    input.type = "text";
    input.name = "ingredients[]";
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
}

export { addField }