// let bodyContent = document.querySelector(".bodyContent")
let homePage = `
	<div class="homePage">
		<div class="searchBox">
			<div class="topLogo"><img class="homeBlueLogo" src="./src/doc/blue_searchhub.png" alt="logo bleu de searchhub"></div>
			<div class="searchInputBox">
				<form onsubmit="submitHomePage(event)">
					<input class="searchInput" type="text" name="search" autofocus="true">
				</form>
				<img class="searchLogoMagnify" title="cliquer pour valider la récherche" src="./src/blue_magnify.png" alt="logo de recherche" onclick="clickMagnify(event)">
			</div>
			<div class="infoText">
				Utilisateurs Github, les repositories Github et la recherche de code.
			</div>
		</div>
	</div>
`
let searchData
function getInputData() {
	searchData = document.querySelector(".searchInput").value
	// console.log("valeur est :", text.value);
}

function submitHomePage(event) {
	event.preventDefault()
	getInputData()
	// console.log(event.target);
	showResponsePage()
}
function clickMagnify(event) {
	getInputData()
	// console.log(searchData);
	// window.location.pathname = "/log" on change l'URL indiquée dans le navigateur :
	// history.pushState({ path: this.path }, '', `./screens/responsePage/responsePage.html`);
	showResponsePage()
}