let githubData
let countRepo
let headerSearchInput = document.querySelector(".headerSearchInput");
let urlParams = new URLSearchParams(window.location.search);
let resultPerPage = localStorage.getItem("resultPerPage") || 30;
let page = urlParams.get("page") || 1;
let searchData = urlParams.get('search');

let responsePage = `

`;
function updatePage(search = "", page = "") {
	if (!search)
		search = searchData;
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
function repositoryBlock(id, title, description,) {
	return `
		<div class="repoBlock" id="${id}">
			<div class="repoTitleBlock">
				<img src="../../src/doc/book_mark.png">
				<a href="../files/files.html?username=${title.split("/")[0]}&repo=${title.split("/")[1]}" class="title">${title}</a>
			</div>
			<div class="description"> ${description} </div>
			<div class="topics"></div>
			<div class="bottomInfo">  </div>
		</div>
`}
function dataLoadError() {
	let returned = ""
	if (githubData) {
		returned = `
			<div class="dataLoadError">
			<p>
				Erreur de traitement des données.
				</p>
			</div>`;
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


const token = "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";
const searchUrl = "https://api.github.com/search/repositories";

const headers = new Headers();
// headers.append("Authorization", `Bearer ${token}`);

// let bodyContent = document.querySelector(".bodyContent")
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

function getGithubData() {
	let query = `q=${encodeSearchTerm(searchData)}&per_page=${resultPerPage}&page=${page}&sort=stars&order=desc`;
	// console.log("la queri composer est : ", query);
	responseContent = document.querySelector(".responseContent")
	responseContent.innerHTML = `<div class="dataLoading">Chargement des données ...</div>`;
	fetch(`${searchUrl}?${query}`)
		.then(response => response.json())
		.then(data => {
			githubData = data
			console.log(data);
			showAnswer(data)
		})
		.catch(error => {
			document.querySelector(".responseCount").innerHTML = "";
			document.querySelector(".paginationBox").innerHTML = "";
			responseContent.innerHTML = dataLoadError();
			console.error("l'erreur est : ", error)
		});
}
function showAnswer(data) {
	countRepo = data.total_count
	console.log("data :", data);
	console.log("data items :", data.items);
	countResultFind()
	document.querySelector(".dataLoading").remove()
	data.items.forEach(item => {
		responseContent.innerHTML += repositoryBlock(item.id, item.full_name, item.description);
		console.log();
		document.getElementById(`${item.id}`).addEventListener("click", () => console.log("lol"))
		let bottomInfo = document.getElementById(`${item.id}`).querySelector(".bottomInfo");
		if (item.topics.length != 0) {
			item.topics.forEach(topic => {
				if (topic != null) {
					document.getElementById(`${item.id}`).querySelector(".topics").innerHTML += topicsChips(topic)
				}
			})
		}
		if (bottomInfo)
			bottomInfo.innerHTML += repoBlockBottomInfos(item.language, item.license?.name, item.created_at, item.updated_at)
	});
	if (countRepo) {
		pagination(countRepo)
	}
}

function showResponsePage() {
	document.querySelector(".responseCount").style.color = "#1122ff"
	headerSearchInput.value = searchData;
	getGithubData()
}
showResponsePage();
