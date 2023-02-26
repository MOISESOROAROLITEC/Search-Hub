# Liste des tâche à effectuer
## liste des tâches sur l'ecran de recherche des repositories
* la description affiche null lorsqu'il n'y a pas de description : arolitec, booba (FAIT)
* Permetre à ce qu'on puisse aller au déla de 10 page lors de la pagination (FAIT)
* faire en sorte que l'url correspondent avec la recherche qui est faite : lorsqu'on modifie la page dans l'url on doit formater l'url pour qu'il puisse correspondre. faire find de & et slice jusqu'a la fin


## Page des dossiers
* Profiner le message de l'erreur que s'affiche sur la page des dossier. type d'erreur : pas de connection, erreur de traitement, pas de resource trouver

#### 3)_lorsqu'on a 228 resultat(pour booba par exemple) on nous offre 2 #### 4)_Ajouter la taille du fichier devant chaque fichier

#### 5)_lors du chargement de la page, je goit get username et reponame à partir de l'url et si cest null je dois faire un get a partir du localstorage. ce qui implique que pour chaque recherche je doit mettre a jour le LS

#### 6)_JE DOIT RETIRER CE FICHIER (FICHIER README.MD) DU PROJET

#### 7)_Je doit pouvoir savoir si un repo est vide ou pas et affichier un message
[coidhof:pdiq]

#### 8)_Ne pas oublier d'enlever en mode sombre pour le dernier push

##########################
**get user repos : https://api.github.com/users/${username}/repos
**get file content : https://raw.githubusercontent.com/shelfio/chrome-aws-lambda-layer/master/readme.md
##############