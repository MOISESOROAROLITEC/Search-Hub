
function getInputData() {
	return document.querySelector(".searchInput").value
}
function submitHomePage(event) {
	event.preventDefault();
	let inputValue = document.querySelector(".searchInput").value.replace(/\s+/g, ' ').trim();
	// console.log(inputValue);
	// document.querySelector(".searchInput").value = inputValue
	// return
	window.location.href = `./pages/repositorys/repositorys.html?search=${inputValue}`
}