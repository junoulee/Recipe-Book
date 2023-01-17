/* exported data */
var data = {
  view: 'search-view',
  favorites: [],
  matchingResults: [],
  resultId: 1,
  favoritesId: 1
};

function dataStorage(event) {
  var dataModel = JSON.stringify(data.favorites);
  localStorage.setItem('ajax-project-local-storage', dataModel);
}

var favoritesData = localStorage.getItem('ajax-project-local-storage');
if (typeof favoritesData === 'string') {
  data.favorites = JSON.parse(favoritesData);
}
window.addEventListener('beforeunload', dataStorage);
