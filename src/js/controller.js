import * as model from './model.js';
import { MODEL_CLOSE_SEC } from './config.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import bookmarksView from './view/bookmarksView.js';
import paginationView from './view/paginationView.js';
import addRecipeView from './view/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './view/paginationView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0) update results view to mark selected
    resultsView.update(model.getSearchResultPage());

    // 1) Load Recipe
    await model.loadRecipe(id);

    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);

    //3) Update bookmark
    bookmarksView.update(model.state.bookmarks);

  } catch (error) {
    recipeView.renderError()
    console.error(error);
  }
}


const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search result
    await model.loadSearchResult(query);

    // 3) Render search results
    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());

    // 4) Render pagination
    //paginationView.addHandlerClick(controlPagination);
    paginationView.render(model.state.search)

  } catch (error) {
    console.error(error);
  }
}

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search)
}

const controlServings = function (updateTo) {
  model.updataServings(updateTo);
  recipeView.update(model.state.recipe);
}



const controlAddBookmark = function () {

  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);

  } else {
    model.deleteBookmark(model.state.recipe.id)

  }

  //2) Update recipeview
  recipeView.update(model.state.recipe);

  //3) Render bookmark
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {
  try {
    //Show Loader
    addRecipeView.renderSpinner();

    //Uupload new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //recipeview render
    recipeView.render(model.state.recipe);

    //Success Message
    addRecipeView.renderMessage();

    //bookmark render
    bookmarksView.render(model.state.bookmarks);

    //change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`)
    //window hide
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);

  } catch (error) {
    console.error('💥', error);
    addRecipeView.renderError(error.message);
  }



}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('Welcome!');

}
init();