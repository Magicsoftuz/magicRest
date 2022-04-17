import { async } from 'regenerator-runtime';
import * as config from './config.js';
import * as helpers from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: {},
    resultsPerPage: config.RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};
export const loadRecipe = async function (id) {
  try {
    console.log(config);
    const data = await helpers.getJSON(`${config.API_URL}${id}`);

    console.log(data);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    console.error(`${err} 🆘🆘🆘`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await helpers.getJSON(`${config.API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ings => {
    ings.quantity = (ings.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const saveLocalStorage = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};

export const addBookmarks = function (recipe) {
  // add bookmarks
  state.bookmarks.push(recipe);
  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  saveLocalStorage();
};

export const deleteBookmarks = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  saveLocalStorage();
};

const init = function () {
  const storage = localStorage.getItem('bookmark');
  if (storage) {
    state.bookmarks = JSON.parse(storage);
  }
};
init();
