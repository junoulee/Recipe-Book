var matchingResults = document.querySelector('.matching-results');
var searchKeyword = document.querySelector('#site-search');
var searchButton = document.querySelector('#search-button');
var numberOfHits = document.querySelector('.results-text');
var showModal = document.querySelector('.hidden');
var overlay = document.querySelector('.overlay-hidden');

function getResults() {
  var searchValue = searchKeyword.value;
  if (searchValue === '') {
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.edamam.com/search?q=' + searchValue + '&app_id=a1100983&app_key=e2ed55cd9fd501a90232f2085e84df8c');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    numberOfHits.textContent = xhr.response.hits.length + ' matching results for ' + '"' + searchValue + '"';
    // console.log(xhr.status);
    // console.log(xhr.response);
    // console.log(xhr.response.hits[0].recipe.calories);

    dataLoop(xhr.response.hits);
    dataStore(xhr.response.hits);
  });

  xhr.send();
  var resultsDisplayed = document.querySelectorAll('li');
  for (var i = 0; i < resultsDisplayed.length; i++) {
    if (resultsDisplayed) {
      resultsDisplayed[i].remove();
      data.matchingResults = [];
      data.resultId = 1;
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
  recipePic.setAttribute('href', '#');
  recipePic.setAttribute('id', 'pic-link');
  recipePic.setAttribute('resultId', data.resultId);
  resultColumn.appendChild(recipePic);
  document.querySelectorAll('#card-link');
  recipePic.addEventListener('click', modalPopUp);

  var recipeName = document.createElement('h3');
  recipeName.classList.add('recipe-name');
  recipeName.setAttribute('href', '#');
  recipeName.setAttribute('id', 'name-link');
  recipeName.setAttribute('resultId', data.resultId);
  recipeName.textContent = result.label;
  resultColumn.appendChild(recipeName);
  document.querySelectorAll('#name-link');
  recipeName.addEventListener('click', modalPopUp);

  var cardLink = document.createElement('a');
  cardLink.setAttribute('href', '#');
  cardLink.setAttribute('id', 'card-link');
  cardLink.setAttribute('resultId', data.resultId);
  recipeName.append(cardLink);
  data.resultId++;
  document.querySelectorAll('#card-link');
  cardLink.addEventListener('click', modalPopUp);

  var source = document.createElement('h5');
  source.classList.add('source-text');
  source.textContent = 'Source: ' + result.source;
  resultColumn.appendChild(source);

  var bottomRow = document.createElement('div');
  bottomRow.classList.add('row-bottom');

  var leftColumn = document.createElement('div');
  leftColumn.classList.add('column-half');

  var leftDetails = document.createElement('h5');
  leftDetails.classList.add('calories-servings-left');
  leftDetails.textContent = Math.trunc(result.calories) + ' Calories ';
  leftColumn.appendChild(leftDetails);

  var rightColumn = document.createElement('div');
  rightColumn.classList.add('column-half');

  var rightDetails = document.createElement('h5');
  rightDetails.classList.add('calories-servings-right');
  rightDetails.textContent = result.yield + ' Servings';
  rightColumn.appendChild(rightDetails);

  bottomRow.appendChild(leftColumn);
  bottomRow.appendChild(rightColumn);
  resultColumn.appendChild(bottomRow);

  return bullets;
}

function dataLoop(result) {

  for (var i = 0; i < result.length; i++) {
    var domTree = renderResult(result[i].recipe);
    matchingResults.appendChild(domTree);
  }
}

function dataStore(result) {

  for (var i = 0; i < result.length; i++) {
    var resultValues = { resultId: i + 1, name: result[i].recipe.label, diet: result[i].recipe.dietLabels, cuisine: result[i].recipe.cuisineType, mealType: result[i].recipe.mealType, dishType: result[i].recipe.dishType, calories: Math.trunc(result[i].recipe.calories), serving: result[i].recipe.yield, source: result[i].recipe.source, image: result[i].recipe.image, url: result[i].recipe.url };
    data.matchingResults.push(resultValues);
  }
}

function renderModal(result) {

  var modalDiv = document.createElement('div');
  modalDiv.classList.add('modal-div');
  modalDiv.setAttribute('id', 'modal-div');

  var columnHalfOne = document.createElement('div');
  columnHalfOne.classList.add('column-half');
  modalDiv.appendChild(columnHalfOne);

  var xButton = document.createElement('i');
  xButton.classList.add('fa-solid');
  xButton.classList.add('fa-x');
  xButton.setAttribute('id', 'x-button-left');
  columnHalfOne.appendChild(xButton);

  var modalImage = document.createElement('img');
  modalImage.classList.add('modal-image');
  modalImage.setAttribute('src', result.image);
  // if this doesn't work - get it from data array
  columnHalfOne.appendChild(modalImage);

  var columnHalfTwo = document.createElement('div');
  columnHalfTwo.classList.add('column-half');
  modalDiv.appendChild(columnHalfTwo);

  var xButtonRight = document.createElement('i');
  xButtonRight.classList.add('fa-solid');
  xButtonRight.classList.add('fa-x');
  xButtonRight.setAttribute('id', 'x-button-right');
  columnHalfTwo.appendChild(xButtonRight);

  xButton.addEventListener('click', modalClose);
  xButtonRight.addEventListener('click', modalClose);

  var modalDetails = document.createElement('div');
  modalDetails.classList.add('modal-details');
  columnHalfTwo.appendChild(modalDetails);

  var modalTitle = document.createElement('h3');
  modalTitle.classList.add('modal-title');
  modalTitle.textContent = result.name;
  modalDetails.appendChild(modalTitle);

  var diet = document.createElement('h5');
  diet.classList.add('recipe-details');
  diet.textContent = 'Diet type: ' + result.diet;
  if (result.diet.length === 0) {
    diet.textContent = 'Diet type: Unavailable';
  }
  modalDetails.appendChild(diet);

  var cuisine = document.createElement('h5');
  cuisine.classList.add('recipe-details');
  cuisine.textContent = 'Cuisine type: ' + result.cuisine;
  if (result.cuisine.length === 0) {
    cuisine.textContent = 'Cuisine type: Unavailable';
  }
  modalDetails.appendChild(cuisine);

  var meal = document.createElement('h5');
  meal.classList.add('recipe-details');
  meal.textContent = 'Meal type: ' + result.mealType;
  if (result.mealType.length === 0) {
    meal.textContent = 'Meal type: Unavailable';
  }
  modalDetails.appendChild(meal);

  var dish = document.createElement('h5');
  dish.classList.add('recipe-details');
  dish.textContent = 'Dish type: ' + result.dishType;

  modalDetails.appendChild(dish);

  var calories = document.createElement('h5');
  calories.classList.add('recipe-details');
  calories.textContent = 'Calories: ' + Math.trunc(result.calories);
  modalDetails.appendChild(calories);

  var serving = document.createElement('h5');
  serving.classList.add('recipe-details');
  serving.textContent = 'Serving: ' + result.serving;
  modalDetails.appendChild(serving);

  var source = document.createElement('h5');
  source.classList.add('recipe-details');
  source.textContent = 'Recipe source: ' + result.source;
  modalDetails.appendChild(source);

  var button = document.createElement('a');
  button.setAttribute('href', result.url);
  button.setAttribute('id', 'go-to-site');
  button.setAttribute('target', '_blank');
  button.textContent = 'VISIT RECIPE PAGE';
  modalDetails.appendChild(button);

  return modalDiv;
}

function modalPopUp(event) {
  if (event.target.matches('#card-link') === true || event.target.matches('#pic-link') === true || event.target.matches('#name-link') === true) {
    for (var i = 0; i < data.matchingResults.length; i++) {
      var targetId = Number(event.target.getAttribute('resultid'));
      if (targetId === data.matchingResults[i].resultId) {
        var modalDom = renderModal(data.matchingResults[i]);
        showModal.appendChild(modalDom);
        showModal.className = 'modal';
        overlay.className = 'overlay';
      }
    }
  }
}

// DOM tree results need a result ID CHECK
// matching result array results need a result ID CHECK
// function datastore needs to store results in the matching result array CHECK
// matching result array needs to clear out after a new search CHECK

function modalClose(event) {
  if (event.target.matches('#x-button-left') === true || (event.target.matches('#x-button-right') === true)) {
    showModal.className = 'hidden';
    overlay.className = 'overlay-hidden';
  }
}
