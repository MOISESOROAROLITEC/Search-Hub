
function getInputData() {
	return document.querySelector(".searchInput").value
}
function submitHomePage(event) {
	event.preventDefault();
	let inputValue = document.querySelector(".searchInput").value.replace(/\s+/g, ' ').trim();

	window.location.href = `./pages/repositorys/repositorys.html?search=${inputValue}`
}
function homeChangeChearchType(type) {
	if (localStorage.getItem("searchType") == type)
		return
	if (type == "repo") {
		repobtn.classList.add("homeSearchType");
		usernamebtn.classList.remove("homeSearchType");
		localStorage.setItem("searchType", type);
	} else {
		usernamebtn.classList.add("homeSearchType");
		repobtn.classList.remove("homeSearchType");
		localStorage.setItem("searchType", type);
	}
}
function homeColorSearchButtonType() {
	if (searchType == "repo") {
		repobtn.classList.add("homeSearchType");
		usernamebtn.classList.remove("homeSearchType");
	} else {
		usernamebtn.classList.add("homeSearchType");
		repobtn.classList.remove("homeSearchType");
	}
}
homeColorSearchButtonType()