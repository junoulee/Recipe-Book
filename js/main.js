// var results = document.querySelector('.matching-results');
var searchKeyword = document.querySelector('#site-search');
var searchButton = document.querySelector('#search-button');

function getResults(event) {
  var searchValue = searchKeyword.value;
  if (searchValue === '') {
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.edamam.com/search?q=' + searchValue + '&app_id=a1100983&app_key=e2ed55cd9fd501a90232f2085e84df8c');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.status);
    // console.log(xhr.response);
    // console.log(searchValue);
  });
  xhr.send();

}

function clickResults(event) {
  if (event.target === searchButton) {
    getResults();
  }
}

searchKeyword.addEventListener('search', getResults);
searchButton.addEventListener('click', clickResults);

// function renderResult(result) {
//   var bullets = document.createElement('li');
//   bullets.classList.add('recipe-card');

//   var resultColumn = document.createElement('div');
//   resultColumn.classList.add('column-third');
//   bullets.appendChild(resultColumn);

//   var recipePic = document.createElement('img');
//   recipePic.classList.add('result-image');
//   recipePic.setAttribute('src', result.hits.recipe.url);
//   resultColumn.appendChild(recipePic);

//   var recipeName = document.createElement('h2');
//   recipeName.classList.add('recipe-name');
//   recipeName.textContent = result.hits.label;
//   resultColumn.appendChild(recipeName);

// }
