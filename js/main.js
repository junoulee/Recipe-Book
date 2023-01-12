var matchingResults = document.querySelector('.matching-results');
var searchKeyword = document.querySelector('#site-search');
var searchButton = document.querySelector('#search-button');
var numberOfHits = document.querySelector('.results-text');

function getResults() {
  var searchValue = searchKeyword.value;
  if (searchValue === '') {
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.edamam.com/search?q=' + searchValue + '&app_id=a1100983&app_key=e2ed55cd9fd501a90232f2085e84df8c');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    numberOfHits.textContent = xhr.response.hits.length + ' Matching results for ' + searchValue;
    // console.log(xhr.status);
    // console.log(xhr.response);
    // console.log(xhr.response.hits[0].recipe.calories);
    dataLoop(xhr.response.hits);

  });

  xhr.send();
  var resultsDisplayed = document.querySelectorAll('li');
  for (var i = 0; i < resultsDisplayed.length; i++) {
    if (resultsDisplayed) {
      resultsDisplayed[i].remove();
    }
  }

}

function clickResults(event) {
  if (event.target === searchButton) {
    getResults();
  }
}

searchKeyword.addEventListener('search', getResults);
searchButton.addEventListener('click', clickResults);

function renderResult(result) {

  var bullets = document.createElement('li');
  bullets.classList.add('recipe-card');

  var resultColumn = document.createElement('div');
  resultColumn.classList.add('column-third');
  bullets.appendChild(resultColumn);

  var recipePic = document.createElement('img');
  recipePic.classList.add('result-image');
  recipePic.setAttribute('src', result.image);
  resultColumn.appendChild(recipePic);

  var recipeName = document.createElement('h3');
  recipeName.classList.add('recipe-name');
  recipeName.textContent = result.label;
  resultColumn.appendChild(recipeName);

  var source = document.createElement('h5');
  source.classList.add('source-text');
  source.textContent = 'Source: ' + result.source;
  resultColumn.appendChild(source);

  var fineDetails = document.createElement('h5');
  fineDetails.classList.add('calories-servings');
  fineDetails.textContent = Math.trunc(result.calories) + ' Calories ' + ' | ' + result.yield + ' Servings';
  resultColumn.appendChild(fineDetails);

  return bullets;
}
function dataLoop(result) {

  for (var i = 0; i < result.length; i++) {
    var domTree = renderResult(result[i].recipe);
    matchingResults.appendChild(domTree);
  }

}
document.addEventListener('DOMContentLoaded', dataLoop);
