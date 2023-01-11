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
