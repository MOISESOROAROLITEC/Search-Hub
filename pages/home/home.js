
function getInputData() {
	return document.querySelector(".searchInput").value
}
function submitHomePage(event) {
	event.preventDefault();
	let inputValue = document.querySelector(".searchInput").value.replace(/\s+/g, ' ').trim();

	window.location.href = `./pages/repositorys/repositorys.html?search=${inputValue}`
}