let header = `
	<header onload="loading(event)">
		<div class="headLogoBox" onclick="goHomePage(event)">
			<img class="headWhiteLogo" src="./src/doc/white_searchhub.png" alt="logo Search hub du header">
		</div>
		<div class="leftHeadItem">
			<div class="headSearchBox">
				<img class="headerSearchLogo" title="cliquer pour valider la récherche" src="./src/blue_magnify.png"
					alt="logo de recherche" onclick="clickMagnify(event)">
				<form class="headFormInput" onsubmit="submitHomePage(event)">
					<input class="headerSearchInput" type="text" name="search" autofocus="true">
				</form>
			</div>
		</div>
	</header>
`;
function showHeader() {
	document.querySelector(".headerContent").innerHTML = header;
}
function hideHeader() {
	document.querySelector('.headerContent').innerHTML = ""
}