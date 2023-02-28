let responseData
let countRepo
let formatEnd

let repobtn = document.querySelector(".searchRepo");
let usernamebtn = document.querySelector(".searchUsername");
let headerSearchInput = document.querySelector(".headerSearchInput");

let urlParams = new URLSearchParams(window.location.search);
let page = urlParams.get("page") || 1;
let searchData = urlParams.get('search');

let resultPerPage = Number(localStorage.getItem("resultPerPage")) || 30;
let searchType = localStorage.getItem("searchType") || "repo";


// console.log(searchType);
function onload() {
	if (searchType == "repo") {
		repobtn.classList.add("searchType");
		usernamebtn.classList.remove("searchType");
	} else {
		usernamebtn.classList.add("searchType");
		repobtn.classList.remove("searchType");
	}
}
onload()

function formatPageNumber() {
	let urlFormated
	let url = window.location.href;
	let pos = url.indexOf("&")
	if (isNaN(page)) {
		page = 1
		urlFormated = url.slice(0, pos) + `&page=${page}`
		window.history.pushState(null, "", urlFormated);
	}
	if ((resultPerPage * page) >= 1000) {
		page = (1000 / resultPerPage).toFixed();
		formatEnd = page
		urlFormated = url.slice(0, pos) + `&page=${page}`
		window.history.pushState(null, "", urlFormated);
	}
}
formatPageNumber()

function updatePage(search = "", page = "") {
	if (!search)
		search = searchData;
	if (page)
		page = `&page=${page}`;
	window.location.href = `repositorys.html?search=${search}` + page
}
function updateresultPerPage(event) {
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
function repositoryBlock(id, title, description,) {
	return `
		<div class="repoBlock" id="${id}">
			<div class="repoTitleBlock">
				<img src="../../src/doc/book_mark.png">
				<a href="../files/files.html?username=${title.split("/")[0]}&repo=${title.split("/")[1]}" class="title">${title}</a>
			</div>
			<div class="description"> ${description || ""} </div>
			<div class="topics"></div>
			<div class="bottomInfo">  </div>
		</div>
`}

function topicsChips(chip) {
	return `<div class="topicsChips" >${chip}</div>`
}

function repoBlockBottomInfos(language, licence, createdDate, updateDate) {
	let dataReturned = "";
	let lang = `
	<div class="languageBlock">
		<img src="../../src/doc/Ellipse.png" class="languageBlockImage">
		<div class="languageName"> ${language} </div>
	</div>
	`
	let lic = `
	<div class="licenceName"> ${licence} </div>
	`
	let created = `
	<div class="updateDate"><i>créé le : </i> ${dateLisible(createdDate)} </div>
	`
	let update = `
	<div class="updateDate"><i>mise à jour : </i> ${dateLisible(updateDate)} </div>
	`
	if (language) dataReturned += lang;
	if (licence) dataReturned += lic;
	if (createdDate) dataReturned += created
	if (updateDate) dataReturned += update;
	return dataReturned
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
		// console.log("je suis dans la boucle for de range");
		if (nbr == resultPerPage) {
			select.innerHTML += option(nbr, "selected")
		} else {
			select.innerHTML += option(nbr)
		}
	});
	// console.dir(select)
	let paginationNbr = document.querySelector(".pagination")
	let nbrPage = (countRepo / resultPerPage).toFixed()
	if (resultPerPage * nbrPage > 1000)
		nbrPage = (1000 / resultPerPage).toFixed()
	// console.log("nbr de page est :", nbrPage);

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
			// deb = page - 10
		}
	if (formatEnd) {
		fin = formatEnd
		// console.log("fend");
	}

	// console.log("le debut est : ", deb);
	// console.log("le fin est : ", fin);

	for (let i = deb; i <= fin; i++) {
		// console.log("je suis dans la boucle for i i++");
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

function changeChearchType(type) {
	if (localStorage.getItem("searchType") == type)
		return
	if (type == "repo") {
		repobtn.classList.add("searchType");
		usernamebtn.classList.remove("searchType");
		localStorage.setItem("searchType", type);
		updatePage()
	} else {
		usernamebtn.classList.add("searchType");
		repobtn.classList.remove("searchType");
		localStorage.setItem("searchType", type);
		updatePage()
	}
}

const token = "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";
const searchUrl = "https://api.github.com/search/repositories";

const headers = new Headers();

let responseContent = document.querySelector(".responseContent")
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
function dataLoading() {
	return `
		<div class="dataLoading">
			<div>
				<i class="fas fa-circle-notch fa-spin spinner"></i>
				<div class="dataLoadText">Chargement des données ...</div>
			</div>
		</div>
	`;
}
function Repositories() {
	let query = `q=${encodeSearchTerm(searchData)}&per_page=${resultPerPage}&page=${page}&sort=best-match`;
	// console.log(`la queri composer est : ${searchUrl}?${query}`);
	responseContent = document.querySelector(".responseContent")
	responseContent.innerHTML = dataLoading()
	fetch(`${searchUrl}?${query}`)
		.then(response => response.json())
		.then(data => {
			responseData = data?.items
			// console.log(responseData);
			showAnswer(data)
		})
		.catch((error) => {
			// console.log("l'erreur est :", error);
			dataLoadError(!responseData ? null : "Erreur de traitement des données");
		})
}
function showAnswer(data) {
	countRepo = data.total_count
	countResultFind()
	document.querySelector(".dataLoading").remove()
	data.items.forEach(item => {
		responseContent.innerHTML += repositoryBlock(item.id, item.full_name, item.description);
		let bottomInfo = document.getElementById(`${item.id}`).querySelector(".bottomInfo");
		if (item.topics.length != 0) {
			item.topics.forEach(topic => {
				if (topic != null) {
					document.getElementById(`${item.id}`).querySelector(".topics").innerHTML += topicsChips(topic);
				}
			})
		}
		if (bottomInfo)
			bottomInfo.innerHTML += repoBlockBottomInfos(item.language, item.license?.name, item.created_at, item.updated_at);
	});
	if (countRepo) {
		pagination(countRepo)
	}
}
function Users() {
	let usersUrl = `https://api.github.com/search/users?q=${encodeSearchTerm(searchData)}&per_page=${resultPerPage}&page=${page}&sort=best-match`
	fetch(usersUrl)
		.then(response => response.json())
		.then(data => {
			// responseData = data?.items
			countRepo = data.total_count
			// console.log(data);
			showUsers(data.items)
			// showAnswer(data)
		})
		.catch((error) => {
			// console.log("l'erreur est :", error);
			dataLoadError(!responseData ? null : "Erreur de traitement des données");
		})
}

function userCard(imgUrl, username, login, bio = "") {
	if (bio.length >= 200) {
		// console.log(bio);
		bio = bio.slice(0, 200) + " ..."
	}
	// console.log("le login est : ", login);
	if (!login)
		return "";
	return `
		<div class="userCard">
			<a href="../userRepo/userRepo.html?username=${login}" title="cliquer pour voir les repositories de ${login}">
				<img src="${imgUrl}" class="userAvatar">
			</a>
			<div class="userInfosBox">
				<a class="title" href="../userRepo/userRepo.html?username=${login}" title="cliquer pour voir les repositories de ${login}">
					<div class="userName"> ${username || login} </div>
				</a>
				<div class="userLogin"> ${login || ""} </div>
				<div class="userBio"> ${bio || ""} </div>
			</div>
		</div>
	`;
}

function showUsers(data) {
	data.forEach(el => {
		fetch(el.url)
			.then(response => response.json())
			.then(data => {
				// console.log("la seconde data est : ", data);

				responseContent.innerHTML += userCard(data.avatar_url, data.name, data.login, data.bio)
			})
	})
}

function showResponsePage() {
	document.querySelector(".responseCount").style.color = "#1122ff"
	headerSearchInput.value = searchData;
	// console.log(searchType);
	if (searchType == "repo") {
		Repositories();
	} else {
		Users();
	}
}
showResponsePage();
