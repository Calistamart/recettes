# recettes

Recetto est un gestionnaire de recettes. Vous entrez une recette dans le formulaire puis elle s'enregistre sur votre navigateur, et vous pouvez consuter toutes vos recettes enregistrées.

Les recettes entrées sont sauvegardées sous forme d'objets, qui sont eux-mêmes contenus dans un tableau en JSON nommé "MonLivreDeRecettes".

Le fichier index.js contient l'objet du site, les fonctions initiales et les requêtes du DOM.

Le fichier storage.js contient les fonctions qui permettent la persistance, donc les localStorage.

Le fichier display.js contient la fonction qui permet d'afficher les recettes enregistrées.

Le fichier tools.js contient les outils utilisés dans le back-end pour mettre en forme l'objet recette.

Le fichier search.js contient les fonctions de filtrage et de tri pour l'affichage les recettes enregistrées.