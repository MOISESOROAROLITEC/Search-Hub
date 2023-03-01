let countRepo
let urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get("username");
let userResultPerPage = Number(localStorage.getItem("userResultPerPage")) || 30;
let page = urlParams.get("page") || 1;
let userData = false;
let userRepo = false;

let searchData = urlParams.get('search');
let formatEnd


function formatPageNumber() {
	let urlFormated
	if (isNaN(page)) {
		page = 1
		let url = window.location.href;
		let pos = url.indexOf("&")
		urlFormated = url.slice(0, pos) + `&page=${page}`
		window.history.pushState(null, "", urlFormated);
	}
	if ((userResultPerPage * page) >= 1000) {
		page = (1000 / userResultPerPage).toFixed();
		formatEnd = page
		let url = window.location.href;
		let pos = url.indexOf("&")
		urlFormated = url.slice(0, pos) + `&page=${page}`
		window.history.pushState(null, "lol", urlFormated);
	}
}
formatPageNumber()

function updateresultPerPage(event) {
	localStorage.setItem("userResultPerPage", event.target.value)
	updatePage()
}
function pagineLeft() {
	if (page != 1)
		updatePage(Number(page) - 1)
}
function pagineRight() {
	if (page != 10)
		updatePage(Number(page) + 1)
}
function goPage(number) {
	updatePage(number);
}

function pagination(num) {
	function option(number, selected = "") {
		return `<option ${selected} value="${number}">${number}</option>`
	}
	let paginationBlock = `
		<div class="numberCount">
			<button class="pagSpace pagineLeft" onclick="pagineLeft()"> < </div>
			<div class="pagination"></div>
			<button class="pagSpace pagineRight" onclick="pagineRight()"> > </button>
		</div>
		<div class="numberOption">
			<select onchange="updateresultPerPage(event)" class="repoPagination" id="repoPagination" name="repoPagination">
			</select>
		</div>
	`;
	document.querySelector(".paginationBox").innerHTML = paginationBlock;
	let select = document.querySelector(".repoPagination");
	[10, 30, 50, 75, 100].forEach(nbr => {
		if (nbr == userResultPerPage) {
			select.innerHTML += option(nbr, "selected")
		} else {
			select.innerHTML += option(nbr)
		}
	});
	let paginationNbr = document.querySelector(".pagination")
	let nbrPage = (countRepo / userResultPerPage).toFixed()
	if (userResultPerPage * nbrPage > 1000)
		nbrPage = (1000 / userResultPerPage).toFixed()
	let deb = Number(page) - 5;
	if (deb < 1)
		deb = 1;

	let fin = Number(page) + 5;
	if (fin > nbrPage)
		fin = nbrPage;

	if (nbrPage < 10)
		deb = 1;

	if (deb == 1)
		if (nbrPage > 10)
			fin = 10;
		else {
			fin = nbrPage;
		}
	if (formatEnd) {
		fin = formatEnd
	}
	for (let i = deb; i <= fin; i++) {
		if (i == page) {
			paginationNbr.innerHTML += `<div class="pagSpace activePage" >${i}</div> `
		} else {
			paginationNbr.innerHTML += `<div class="pagSpace" onclick="goPage(${i})" >${i}</div> `
		}
	}
	if (page == 1) {
		document.querySelector(".pagineLeft").disabled = true;
		document.querySelector(".pagineLeft").style.cursor = "initial";
	}
	if (page == nbrPage) {
		document.querySelector(".pagineRight").disabled = true;
		document.querySelector(".pagineRight").style.cursor = "initial";
	}
	if (nbrPage == 0) {
		document.querySelector(".pagineLeft").disabled = true;
		document.querySelector(".pagineLeft").style.cursor = "initial";

		document.querySelector(".pagineRight").disabled = true;
		document.querySelector(".pagineRight").style.cursor = "initial";
	}
}
function updatePage(page = "") {
	if (page)
		page = `&page=${page}`;
	window.location.href = `userRepo.html?username=${username}` + page
}

function topicsChips(chip) {
	return `<div class="topicsChips" >${chip}</div>`
}

function userBox(data) {
	let name = data.name || "";
	let bio = data.bio || "";
	return `
		<div class="avatarBox">
			<img src="${data.avatar_url}" alt="${name || data.login}" class="avatar">
			<img src="../../src/doc/reddit.png" alt="" class="redit">
		</div>
		<div class="nameBox">
			<div class="name">${name}</div>
			<div class="username">${data.login}</div>
		</div>
		<div class="bioBox">${bio}</div>
	`
}
const userInfoUrl = "https://api.github.com/users/";

function formatNumber(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function countResultFind(event) {
	let countResultFindDiv = document.querySelector(".responseCount")
	switch (countRepo) {
		case 0:
			countResultFindDiv.innerHTML = "<div class='repoNotFind'>aucun repository trouvé 😔</div>"
			break;
		default:
			countResultFindDiv.innerHTML = `${formatNumber(countRepo)} repository results`
			break;
	}
}
function dateLisible(date) {
	let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	return new Date(date).toLocaleDateString('fr-FR', dateOptions)
}

function repositoryBlock(id, title, description, language, updateDate) {
	return `
		<div class="repoBlock" id="${id}">
			<div class="repoTitleBlock">
				<a href="../files/files.html?username=${username}&repo=${title}" class="title">${title}</a>
				${language ? `
					<div class="languageBlock" >
						<img src="../../src/doc/Ellipse.png" class="languageBlockImage">
						<div class="languageName"> ${language} </div>
					</div>
				` : ""}
				<div class="updateDate"><i>mise à jour : </i> ${dateLisible(updateDate)} </div>
			</div>
			<div class="description"> ${description || ""} </div>
			<div class="topics"></div>
		</div>
`}

function topicsChips(chip) {
	return `<div class="topicsChips" >${chip}</div>`
}

function getUserInfo() {
	let userBoxDoc = document.querySelector(".userBox")
	userBoxDoc.innerHTML = `<div class="dataLoading"><div><i class="fas fa-circle-notch fa-spin spinner"></i> <div class="dataLoadText">Chargement des données ...</div> </div></div>`;
	fetch(`${userInfoUrl}${username}`)
		.then(response => response.json())
		.then(data => {
			countRepo = data.public_repos
			userData = data.length
			userBoxDoc.innerHTML = userBox(data);
			getUserRepos()

		})
		.catch(error => {
			dataLoadError(userData ? null : "aucun utilisateur ne correcpond a ce nom");
			console.error("l'erreur est : ", error)
		});
}
let repoBox = document.querySelector(".repoBox");
function getUserRepos() {
	repoBox.innerHTML = `<div class="dataLoading"><div><i class="fas fa-circle-notch fa-spin spinner"></i> <div class="dataLoadText">Chargement des données ...</div> </div></div>`;

	const userRepos = `https://api.github.com/users/${username}/repos?per_page=${userResultPerPage}&page=${page}`;
	fetch(userRepos)
		.then(response => response.json())
		.then(data => {
			repoBox.innerHTML = ""
			userRepo = data;
			showUserRepos(data);
		})
		.catch(error => {
			console.error("l'erreur est : ", error);
			dataLoadError(userData ? null : `l'utilisateur '<span class="errorUsername" >${username}</span>' est introuvable`);
		});
}

function showUserRepos(data) {
	if (data.length == 0) {
		document.querySelector(".repoBox").innerHTML += `<div class="emptyRepo">Ce utilisateur n'a pas de repositorie</div>`
	} else {
		data.forEach(item => {
			repoBox.innerHTML += repositoryBlock(item.id, item.name, item.description, item.language, item.updated_at);
			let bottomInfo = document.getElementById(`${item.id}`).querySelector(".bottomInfo");
			if (item.topics.length != 0) {
				item.topics.forEach(topic => {
					if (topic != null) {
						document.getElementById(`${item.id}`).querySelector(".topics").innerHTML += topicsChips(topic)
					}
				})
			}
		});
		if (countRepo)
			pagination(countRepo);
	}
}

getUserInfo()
