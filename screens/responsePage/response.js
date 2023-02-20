let responsePage = `
	<div class="responsePage">
		<div class="responseCount"></div>
		<section class="responseContent">
		</section>
		<div class="pagination">la pagination</div>
	</div>
`
function repositoryBlock(id, title, description,) {
	return `
	<div class="repoBlock" id="${id}">
		<div class="repoTitleBlock">
			<img src="./src/doc/book_mark.png">
			<div class="title">${title}</div>
		</div>
		<div class="description"> ${description} </div>
		<div class="topics"></div>
		<div class="bottomInfo">  </div>
	</div>
`}
let dataLoadError = `
		<div class="dataLoadError">
		<p>
			Erreur de chargement des données.<br><br>
			Connectez vous à internet et réesayez.
			</p>
		</div>
`
function topicsChips(chip) {
	return `<div class="topicsChips" >${chip}</div>`
}
function repoBlockBottomInfos(language, licence, updateDate) {
	let dataReturned = "";
	let lang = `
	<div class="languageBlock">
		<img src="./src/doc/Ellipse.png" class="languageBlockImage">
		<div class="languageName"> ${language} </div>
	</div>
	`
	let lic = `
	<div class="licenceName"> ${licence} </div>
	`
	let date = `
	<div class="updateDate"><i>publié le</i> ${dateLisible(updateDate)} </div>
	`
	if (language) dataReturned += lang;
	if (licence) dataReturned += lic;
	if (updateDate) dataReturned += date;
	return dataReturned
}
let githubData
let countRepo
let resultPerPage = 30;
let page = 1;

const token = "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";
const searchUrl = "https://api.github.com/search/repositories";

const headers = new Headers();
headers.append("Authorization", `Bearer ${token}`);

let bodyContent = document.querySelector(".bodyContent")
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
	let query = `q=${encodeSearchTerm(searchData)}&per_page=${resultPerPage}&page=${page}&sort=stars&order=desc`;
	console.log("la queri composer est : ", query);
	fetch(`${searchUrl}?${query}`, { headers })
		.then(response => response.json())
		.then(data => {
			// Afficher les résultats de recherche
			githubData = data
			countRepo = data.total_count
			console.log("data :", data);
			console.log("data items :", data.items);
			countResultFind()
			let responseContent = document.querySelector(".responseContent")
			data.items.forEach(item => {
				responseContent.innerHTML += repositoryBlock(item.id, item.full_name, item.description);
				let bottomInfo = document.getElementById(`${item.id}`).querySelector(".bottomInfo");
				console.log(bottomInfo);
				console.log(item.topics.length != 0);
				if (item.topics.length != 0) {
					item.topics.forEach(topic => {
						// console.log("le topic est : ", topic);
						if (topic != null) {
							document.getElementById(`${item.id}`).querySelector(".topics").innerHTML += topicsChips(topic)
						}
					})
				}
				bottomInfo.innerHTML += repoBlockBottomInfos(item.language, item.license?.name, item.updated_at)
			});
			// data.items.topics.forEach(item => {
			// 	responseContent.innerHTML += repositoryBlock(item.id, item.full_name, item.description)
			// });
		})
		.catch(error => {
			document.querySelector(".responseCount").innerHTML = "";
			document.querySelector(".pagination").innerHTML = "";
			document.querySelector(".responseContent").innerHTML = dataLoadError;
			console.error("l'erreur est : ", error)
		});
}
function showAnswer(data) {

}

function showResponsePage() {
	showHeader()
	bodyContent.innerHTML = responsePage;
	document.querySelector(".responseCount").style.color = "#1122ff"
	getGithubData()
	countResultFind()
}