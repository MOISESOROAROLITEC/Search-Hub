function showHomePage(params) {
	let bodyContent = document.querySelector(".bodyContent")
	bodyContent.innerHTML = homePage
}

function dateLisible(date) {
	// console.log("la date est : ", date);
	let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	return new Date(date).toLocaleDateString('fr-FR', dateOptions)
}

function goHomePage() {
	hideHeader()
	document.querySelector('.bodyContent').innerHTML = homePage;
}
function dataLoadError(message) {
	let responsePage = document.querySelector(".responsePage")
	let returned = `
			<div class="dataLoadError">
				<div class="errorMessage">${message || "Erreur de chargement des données. Connectez vous à internet et réessayez."}
				</div>
				<div class="errBtn">
					<a href="${window.location.href}" class="errorButton retry" title="récharger la page">
						réessayez
					<a href="../../index.html" class="errorButton retry" title="allez à la page d'accueil">page d'accueil</a>
				</div>
			</div>
			`;
	responsePage.innerHTML = returned;
}