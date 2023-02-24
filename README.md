## 1)_la description affiche null lorsqu'il n'y a pas de description : arolitec, booba

2)_Permetre à ce qu'on puisse aller au déla de 10 page lors de la pagination

3)_Profiner le message de l'erreur que s'affiche sur la page des dossier. type d'erreur : pas de connection, erreur de traitement, pas de resource trouver

3)_lorsqu'on a 228 resultat(pour booba par exemple) on nous offre 2 page

4)_Ajouter la taille du fichier devant chaque fichier

5)_lors du chargement de la page, je goit get username et reponame à partir de l'url et si cest null je dois faire un get a partir du localstorage. ce qui implique que pour chaque recherche je doit mettre a jour le LS

##########################
**get user repos : https://api.github.com/users/${username}/repos
**get file content : https://raw.githubusercontent.com/shelfio/chrome-aws-lambda-layer/master/readme.md
##############