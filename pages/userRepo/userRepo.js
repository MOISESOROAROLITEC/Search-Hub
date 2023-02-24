let countRepo
let urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get("username");
let resultPerPage = localStorage.getItem("resultPerPage") || 30;
let page = urlParams.get("page") || 1;
let userData = false;
let userRepo = false;
// let searchData = urlParams.get('search');

function updatePage(search = "", page = "") {
	console.log(window.location.search);
	if (page)
		page = `&page=${page}`;
	window.location.href = `repositorys.html?search=${search}` + page
}
function updateresultPerPage(event) {
	// console.log(event.target);
	// console.log(event.target.value);
	localStorage.setItem("resultPerPage", event.target.value)
	updatePage()
}
function pagineLeft() {
	if (page != 1)
		updatePage("", Number(page) - 1)
}
function pagineRight() {
	if (page != 10)
		updatePage("", Number(page) + 1)
}
function goPage(number) {
	// localStorage.setItem("page", number);
	updatePage("", number);
}


function topicsChips(chip) {
	return `<div class="topicsChips" >${chip}</div>`
}
function clickMagnify(event) {
	updatePage(document.querySelector(".headerSearchInput").value);
}
function userBox(data) {
	// console.log("la data est : ", dshowuserata);
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
		if (nbr == resultPerPage) {
			select.innerHTML += option(nbr, "selected")
		} else {
			select.innerHTML += option(nbr)
		}
	});
	// console.dir(select)
	let paginationNbr = document.querySelector(".pagination")
	let nbrPage = (countRepo / resultPerPage).toFixed()
	// let activePage = "activePage"
	if (nbrPage > 10)
		nbrPage = 10;
	for (let i = 1; i <= nbrPage; i++) {
		if (i == page) {
			paginationNbr.innerHTML += `<div class="pagSpace activePage" >${i}</div> `
		} else {
			paginationNbr.innerHTML += `<div class="pagSpace" onclick="goPage(${i})" >${i}</div> `
		}
	}
	if (page == 1)
		document.querySelector(".pagineLeft").disabled = true;
	if (page == nbrPage)
		document.querySelector(".pagineRight").disabled = true;
}

// const token = "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";
const userInfoUrl = "https://api.github.com/users/";

function encodeSearchTerm(sentence) {
	return encodeURIComponent(sentence)
}
function formatNumber(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function countResultFind(event) {
	// console.log(countRepo);
	let countResultFindDiv = document.querySelector(".responseCount")
	switch (countRepo) {
		case 0:
			countResultFindDiv.innerHTML = "<div class='repoNotFind'>aucun repository trouvé 😔</div>"

			break;
		case undefined:
			countResultFindDiv.innerHTML = "chargement des données ..."
			break;
		default:
			countResultFindDiv.innerHTML = `${formatNumber(countRepo)} repository results`
			break;
	}
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
	// let query = `q=${encodeSearchTerm(searchData)}&per_page=${resultPerPage}&page=${page}&sort=best-match`;
	// console.log(`la queri composer est : ${searchUrl}?${query}`);
	let userBoxDoc = document.querySelector(".userBox")
	userBoxDoc.innerHTML = `<div class="dataLoading">Chargement des information de ${username} ...</div>`;
	fetch(`${userInfoUrl}${username}`)
		.then(response => response.json())
		.then(data => {
			// console.log(data);
			// document.querySelector(".dataLoading").innerHTML = ""
			userData = true;
			userBoxDoc.innerHTML = userBox(data);
			// showAnswer(data)
		})
		.catch(error => {
			// document.querySelector(".paginationBox").innerHTML = "";
			dataLoadError();
			// document.querySelector(".retry").addEventListener("click", updatePage())
			console.error("l'erreur est : ", error)
		});
}
let repoBox = document.querySelector(".repoBox");
function getUserRepos() {
	// responsePage = document.querySelector(".responsePage")
	// responsePage.innerHTML = `<div class="dataLoading">Chargement des données ...</div>`;
	repoBox.innerHTML = `<div class="dataLoading">Chargement des repositories de ${username} ...</div>`;
	const userRepos = `https://api.github.com/users/${username}/repos?page=1&per_page=100`
	fetch(userRepos)
		.then(response => response.json())
		.then(data => {
			// console.log("la reponse est : ", data);
			repoBox.innerHTML = ""
			userRepo = data;
			showUserRepos(data);
		})
		.catch(error => {
			// document.querySelector(".paginationBox").innerHTML = "";
			console.error("l'erreur est : ", error)
		});
}

function showUserRepos(data) {
	// console.log("data :", data);
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
}

getUserInfo()
getUserRepos()
