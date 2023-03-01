let repobtn = document.querySelector(".searchRepo");
let usernamebtn = document.querySelector(".searchUsername");
let searchType = localStorage.getItem("searchType") || "repo";

function showHomePage(params) {
	let bodyContent = document.querySelector(".bodyContent")
	bodyContent.innerHTML = homePage
}

function dateLisible(date) {
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
function submitHeaderInput(event, url) {
	console.log("l'event :", event, " URL : ", url);
	event.preventDefault();
	let inputValue = document.querySelector(".headerSearchInput").value.replace(/\s+/g, ' ').trim();
	window.location.href = `${url}?search=${inputValue}`
}
function colorSearchButtonType() {
	if (searchType == "repo") {
		repobtn.classList.add("searchType");
		usernamebtn.classList.remove("searchType");
	} else {
		usernamebtn.classList.add("searchType");
		repobtn.classList.remove("searchType");
	}
}
function changeChearchType(type, page = "") {
	if (localStorage.getItem("searchType") == type)
		return
	if (type == "repo") {
		repobtn.classList.add("searchType");
		usernamebtn.classList.remove("searchType");
		localStorage.setItem("searchType", type);
		if (page == "repositoriesPage")
			updatePage()
	} else {
		usernamebtn.classList.add("searchType");
		repobtn.classList.remove("searchType");
		localStorage.setItem("searchType", type);
		if (page == "repositoriesPage")
			updatePage()
	}
}
colorSearchButtonType()