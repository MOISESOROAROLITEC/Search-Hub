
function getInputData() {
	return document.querySelector(".searchInput").value
}

function submitHomePage(event) {
	console.log("je soumet");
}
function clickMagnify(event) {
	window.location.href = `pages/repositorys/repositorys.html?search=${getInputData()}`
}