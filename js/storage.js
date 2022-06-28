function save(data) {
    localStorage.setItem("MonLivreDeRecettes", JSON.stringify(data));
}

function read() {
    return JSON.parse(localStorage.getItem("MonLivreDeRecettes"));
}

// Bouton pour supprimer toutes les recettes
function reset(event) {
    if (confirm("Voulez-vous supprimer toutes les recettes ?")) {
        event.preventDefault();
        localStorage.clear();
        location.reload();
    }
}

export { save, read, reset }