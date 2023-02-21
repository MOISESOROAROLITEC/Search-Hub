// let bodyContent = document.querySelector(".bodyContent")
// let homePage = `
// 	<div class="homePage">
// 		<div class="searchBox">
// 			<div class="topLogo"><img class="homeBlueLogo" src="./src/doc/blue_searchhub.png" alt="logo bleu de searchhub"></div>
// 			<div class="searchInputBox">
// 				<form action="./pages/repositorys/repositorys.html" onsubmit="submitHomePage(event)">
// 					<input class="searchInput" type="text" name="search" autofocus="true">
// 				</form>
// 				<i class="fa fa-search searchLogoMagnify" aria-hidden="true" title="cliquer pour valider la récherche" onclick="clickMagnify(event)"></i>
// 			</div>
// 			<div class="infoText">
// 				Utilisateurs Github, les repositories Github et la recherche de code.
// 			</div>
// 		</div>
// 	</div>
// `;
// let bodyContent = document.querySelector('.bodyContent');

function getInputData() {
	return document.querySelector(".searchInput").value
	// localStorage.setItem("inputData", searchData)
	// console.log("valeur est :", text.value);
}

function submitHomePage(event) {
	// event.preventDefault()
	console.log("je soumet");
}
function clickMagnify(event) {
	window.location.href = `pages/repositorys/repositorys.html?search=${getInputData()}`
	// history.pushState({ path: this.path }, '', `./pages/response/response.html?search=${getInputData()}`);
}