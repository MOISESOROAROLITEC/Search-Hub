let headerSearchInput = document.querySelector(".headerSearchInput");
let urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get("username");
let reposName = urlParams.get("repo");


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
			<p>
				Erreur de traitement des données.
				</p>
			</div>`;
	} else if (errorMessage === "This repository is empty.") {
		returned = `
			<div class="dataLoadError">
			<p>
				Ce repository est vide
				</p>
			</div>`
	} else {
		returned = `
			<div class="dataLoadError">
			<p>
				Erreur de chargement des données.<br><br>
				Connectez vous à internet et réesayez.
				</p>
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
		<img class="bookMark" src="/src/doc/book_mark.png" alt="book_mark">
		<a href="" class="repoName">${username}/${reposName}</a>
		<div class="repoType">public</div>
	`
}
document.querySelector(".repoNameBlock").innerHTML = repoNameBlock()

function userBlock() {
	return `
		<div class="userBlock">
			<img class="avatar" src="https://avatars.githubusercontent.com/${username}" alt="Avatar de l'utilisateur octocat">
			<div class="username">${username}</div>
		</div>
	`
}
function fileBlock(name, type, desc = "", date = "") {
	let fileType
	if (type == "file") {
		fileType = "file.svg"
	} else {
		fileType = "folder.svg"
	}
	return `
	<div class="fileBlock">
		<div class="iconNameBlock">
			<img src="../../src/doc/${fileType}" alt="icon du fichier" class="iconFile">
			<div class="fileName">${name}</div>
		</div>
		<div class="desc">${desc}</div>
		<div class="date">${date}</div>
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
			filesBlock.innerHTML = dataLoadError(error.message);
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
	let datalong = data.length
	data.forEach((item, index) => {
		console.log("les data sont :", index);
		// if (index == 0) {
		filesBlock.innerHTML += hr() + fileBlock(item.name, item.type)
		// }

		// fileBlock.innerHTML += hr();
	})
}

function showResponsePage() {
	console.log("show rep");
	getGithubData()
}
showResponsePage();
