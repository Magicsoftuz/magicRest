import { async } from 'regenerator-runtime';
import * as config from './config.js';
import * as helpers from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: {},
  },
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
