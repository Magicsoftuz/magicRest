import icons from '../img/icons.svg'; // parcel 1
// import icons from 'url:../img/icons.svg'; // parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView.js';

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
    // 1) Inputdan data ni oldi
    const query = searchView.getQuery();
    searchView.clearInput();
    if (!query) return;

    // 2) Modelga berdi
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(loadSearchResultsController);
}
init();
