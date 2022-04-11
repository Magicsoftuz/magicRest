import icons from '../img/icons.svg'; // parcel 1
// import icons from 'url:../img/icons.svg'; // parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

// https://forkify-api.herokuapp.com/v2

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // loading Spinner
    recipeView.spinner();

    // Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const loadSearchResultsController = async function () {
  try {
    // 0) Spinner
    resultView.spinner();

    // 1) Inputdan data ni oldi
    const query = searchView.getQuery();
    searchView.clearInput();

    // 2) Modelga berdi
    await model.loadSearchResults(query);

    // 3) Render results
    resultView.render(model.getSearchResultPage());

    // 4) Pagination btn
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const paginationHandle = function (goToPage) {
  // Render Result New
  resultView.render(model.getSearchResultPage(goToPage));
  // New pagination btn
  paginationView.render(model.state.search);
};

function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(loadSearchResultsController);
  paginationView.addHandlerPagination(paginationHandle);
}
init();
