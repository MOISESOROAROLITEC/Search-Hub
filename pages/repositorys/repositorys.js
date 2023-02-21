let responsePage = `
	<div class="responsePage">
		<div class="responseCount"></div>
		<section class="responseContent">
		</section>
		<div class="pagination">
		</div>
	</div>
`
function repositoryBlock(id, title, description,) {
	return `
	<div class="repoBlock" id="${id}">
		<div class="repoTitleBlock">
			<img src="../../src/doc/book_mark.png">
			<div class="title">${title}</div>
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

	let paginationBlock = `
		<div class="numberCount">
			<div class="pagSpace Topleft"> < </div>
			<div class="pagSpace numberCountNumber"></div>
			<div class="pagSpace Topleft"> > </div>
		</div>
		<div class="numberOption">
			<select class="repoPagination" id="repoPagination" name="repoPagination">
			<option value="au">1</option>
			<option value="ca">2</option>
			<option value="usa">3</option>
			</select>
		</div>
	`
	document.querySelector(".pagination").innerHTML = paginationBlock

}
let githubData
let countRepo
let resultPerPage = 30;
let page = 1;

const token = "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";
const searchUrl = "https://api.github.com/search/repositories";

const headers = new Headers();
// headers.append("Authorization", `Bearer ${token}`);

let bodyContent = document.querySelector(".bodyContent")
let responseContent = document.querySelector(".responseContent")
function encodeSearchTerm(sentence) {
	return encodeURIComponent(sentence)
}
function formatNumber(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function countResultFind(event) {
	console.log(countRepo);
	let countResultFindDiv = document.querySelector(".responseCount")
	switch (countRepo) {
		case 0:
			countResultFindDiv.innerHTML = "aucun repository trouvé 😔"
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
	let searchData = new URLSearchParams(window.location.search).get('search');
	let query = `q=${encodeSearchTerm(searchData)}&per_page=${resultPerPage}&page=${page}&sort=stars&order=desc`;
	// console.log("la queri composer est : ", query);
	responseContent = document.querySelector(".responseContent")
	responseContent.innerHTML = `<div class="dataLoading">Chargement des données ...</div>`;
	fetch(`${searchUrl}?${query}`)
		.then(response => response.json())
		.then(data => {
			githubData = data
			showAnswer(data)
		})
		.catch(error => {
			document.querySelector(".responseCount").innerHTML = "";
			document.querySelector(".pagination").innerHTML = "";
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
		let bottomInfo = document.getElementById(`${item.id}`).querySelector(".bottomInfo");
		if (item.topics.length != 0) {
			item.topics.forEach(topic => {
				// console.log("le topic est : ", topic);
				if (topic != null) {
					document.getElementById(`${item.id}`).querySelector(".topics").innerHTML += topicsChips(topic)
				}
			})
		}
		if (bottomInfo)
			bottomInfo.innerHTML += repoBlockBottomInfos(item.language, item.license?.name, item.created_at, item.updated_at)
	});
	let option = document.querySelector(".repoPagination")
	console.log(option);
	pagination(countRepo)
}

function showResponsePage() {
	console.log("show rep");
	// showHeader()
	bodyContent.innerHTML = responsePage;
	document.querySelector(".responseCount").style.color = "#1122ff"
	getGithubData()
}
showResponsePage();
