let headerSearchInput = document.querySelector(".headerSearchInput");
let urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get("username");
let reposName = urlParams.get("repo");

function updatePage(search = "", page = "") {
	if (page)
		page = `&page=${page}`;
	window.location.href = `../repositorys/repositorys.html?search=${search}` + page
}

function topicsChips(chip) {
	return `<div class="topicsChips" >${chip}</div>`
}
function changeChearchType(type) {
	if (localStorage.getItem("searchType") == type)
		return
	if (type == "repo") {
		repobtn.classList.add("searchType");
		usernamebtn.classList.remove("searchType");
		localStorage.setItem("searchType", type);
		// updatePage()
	} else {
		usernamebtn.classList.add("searchType");
		repobtn.classList.remove("searchType");
		localStorage.setItem("searchType", type);
		// updatePage()
	}
}

function repoNameBlock() {
	return `
		<img class="bookMark" src="../../src/doc/book_mark.png" alt="book_mark">
		<div class="repoName">
			<a href="../userRepo/userRepo.html?username=${username}" class="username" title="voir les repos de ${username}">${username}</a>/${reposName}
		</div>
		<div class="repoType">public</div>
	`
}
document.querySelector(".repoNameBlock").innerHTML = repoNameBlock()

function userBlock() {
	return `
		<div class="userBlock">
			<img class="avatar" src="https://avatars.githubusercontent.com/${username}" alt="Avatar de l'utilisateur octocat">
			<a href="../userRepo/userRepo.html?username=${username}" class="username" title="voir les repos de ${username}">${username}</a>
		</div>
	`
}
function formatSize(sizeInBytes) {
	const units = ["octets", "ko", "Mo", "Go"];
	let size = sizeInBytes;
	let unitIndex = 0;
	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	}
	return `${Math.round(size * 100) / 100} ${units[unitIndex]}`;
}
function fileBlock(name, type, size = "") {
	let fileType = type == "file" ? "file.svg" : "folder.svg"
	let fileSize = ""
	if (size != 0) {
		fileSize = formatSize(size)
	}
	return `
	<div class="fileBlock">
		<div class="iconNameBlock">
			<img src="../../src/doc/${fileType}" alt="icon du fichier" class="iconFile">
			<div class="fileName">${name}</div>
		</div>

		<div class="fileSize">${fileSize}</div>
	</div>
	`
}

const repoUrl = "https://api.github.com/repos/";

function getUrl() {
	let query = `${username}/${reposName}/contents`;
	let url = `${repoUrl}${query}`;
	return url
}

let filesBlock = document.querySelector(".filesBlock");

function formatNumber(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function getGithubData() {
	filesBlock.innerHTML = `<div class="dataLoading"><div><i class="fas fa-circle-notch fa-spin spinner"></i> <div class="dataLoadText">Chargement des données...</div> </div></div>`;
	fetch(getUrl())
		.then(response => response.json())
		.then(data => {
			showAnswer(data)
		})
		.catch(error => {
			dataLoadError();
		})
}
function hr() {
	return `
		<hr class="separator">
	`
}
function showAnswer(data) {

	document.querySelector(".dataLoading").remove()
	filesBlock.innerHTML = userBlock()
	if (!data.length) {
		document.querySelector(".filesBlock").innerHTML += hr() + `<div class="fileBlock" style="text-align: center; display: block;">Ce repositorie est vide</div>`
	} else {
		let dir = data.filter(el => el.type == "dir");
		let file = data.filter(el => el.type == "file");
		let dataSorted = [...dir, ...file]
		dataSorted.forEach((item) => {
			filesBlock.innerHTML += hr() + fileBlock(item.name, item.type, item.size);
		})
	}
}

function showResponsePage() {
	getGithubData()
}
showResponsePage();
