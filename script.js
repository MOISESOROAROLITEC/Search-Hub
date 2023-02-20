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
switch (window.location.pathname) {
	case "/index.html":
		showHomePage()
		break;
	case "/":
		showHomePage()
		break;
	default:
		showHomePage()
		break;
}