let headerSearchInput = document.querySelector(".headerSearchInput");
let urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get("username");
let reposName = urlParams.get("repo");
window.titl


function updatePage(search = "", page = "") {
	// if (!search)
	// 	search = searchData;
	if (page)
		page = `&page=${page}`;
	window.location.href = `../repositorys/repositorys.html?search=${search}` + page
}
function dataLoadError(errorMessage) {
	console.log(errorMessage);
	let returned = "";
	if (errorMessage == "Not Found") {
		returned = `
			<div class="dataLoadError">
				<div class="errorMessage">Erreur de traitement des données.</div>
				<div class="errBtn">
					<a href="#" class="errorButton retry" title="récharger la page">réésayez</a>
					<a href="../../index.html" class="errorButton retry" title="allez à la page d'accueil">page d'accueil</a>
				</div>
			</div>`;
	} else if (errorMessage === "This repository is empty.") {
		returned = `
			<div class="dataLoadError">
				<div class="errorMessage">Ce repos est vide</div>
				<div class="errBtn">
					<a href="#" class="errorButton retry" title="récharger la page">réésayez</a>
					<a href="../../index.html" class="errorButton retry" title="allez à la page d'accueil">page d'accueil</a>
				</div>
			</div>`
	} else {
		returned = `
			<div class="dataLoadError">
				<div class="errorMessage">Erreur de chargement des données.
				Connectez vous à internet et réesayez.</div>
				<div class="errBtn">
					<a href="#" class="errorButton retry" title="récharger la page">réésayez</a>
					<a href="../../index.html" class="errorButton retry" title="allez à la page d'accueil">page d'accueil</a>
				</div>
			</div>`
	}
	return returned;
}
function topicsChips(chip) {
	return `<div class="topicsChips" >${chip}</div>`
}
function clickMagnify(event) {
	updatePage(document.querySelector(".headerSearchInput").value);

}
function repoNameBlock() {
	return `
		<img class="bookMark" src="../../src/doc/book_mark.png" alt="book_mark">
		<div class="repoName"><a href="../userRepo/userRepo.html" class="username" title="voir les repos de ${username}">${username}</a>/${reposName}</div>
		<div class="repoType">public</div>
	`
}
document.querySelector(".repoNameBlock").innerHTML = repoNameBlock()

function userBlock() {
	return `
		<div class="userBlock">
			<img class="avatar" src="https://avatars.githubusercontent.com/${username}" alt="Avatar de l'utilisateur octocat">
			<a href="../userRepo/userRepo.html" class="username" title="voir les repos de ${username}">${username}</a>
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
	let fileType
	let fileSize = ""
	if (type == "file") {
		fileType = "file.svg"
	} else {
		fileType = "folder.svg"
	}
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
// const searchUrlUser = "https://api.github.com/users/repos";

function getUrl() {
	let query = `${username}/${reposName}/contents`;
	let url = `${repoUrl}${query}`;
	console.log("l'url est : ", url);
	return url
}

let filesBlock = document.querySelector(".filesBlock");

function formatNumber(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function getGithubData() {
	filesBlock.innerHTML = `<div class="dataLoading">Chargement des données ...</div>`;
	fetch(getUrl())
		.then(response => response.json())
		.then(data => {
			showAnswer(data)
		})
		.catch(error => {
			document.querySelector(".responsePage").innerHTML = dataLoadError(error.message);
			console.error("l'erreur est : ", error.message)
		});
}
function hr() {
	return `
		<hr class="separator">
	`
}
function showAnswer(data) {
	// countRepo = data.total_count
	console.log("data :", data);
	console.log("data items :", data.items);
	// countResultFind()
	document.querySelector(".dataLoading").remove()
	filesBlock.innerHTML = userBlock()
	let dir = data.filter(el => el.type == "dir");
	let file = data.filter(el => el.type == "file");
	let dataSorted = [...dir, ...file]
	dataSorted.forEach((item, index) => {
		// console.log("les data sont :", index);
		filesBlock.innerHTML += hr() + fileBlock(item.name, item.type, item.size);
	})
}

function showResponsePage() {
	console.log("show rep");
	getGithubData()
}
showResponsePage();
