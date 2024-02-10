import * as model from "./model.js";
import AnimationView from "./views/animationView.js";
import coinView from "./views/coinView.js";
import chartView from "./views/chartView.js";
import bookmarksView from "./views/bookmarksView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import compareView from "./views/compareView.js";
import settingsView from "./views/settingsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const controlCoin = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    coinView.renderSpinner();

    await model.getCoin(id);

    await model.getHistoricData(id);

    coinView.render(model.state.currentCoin);

    chartView.createChart(model.state.historicData);
  } catch (err) {
    coinView.renderError();
  }
};

const controlChart = async function (timePeriod) {
  try {
    await model.getHistoricData(model.state.currentCoin.id, timePeriod);

    chartView.updateChart(model.state.historicData);
  } catch (err) {
    console.log(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();

    if (!query) return;

    await model.getSearchResults(query);

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
};

const controlToggleBookmark = function () {
  if (!model.state.currentCoin.bookmarked) {
    model.addBookmark(model.state.currentCoin);
  } else {
    model.removeBookmark(model.state.currentCoin.id);
  }

  coinView.update(model.state.currentCoin);

  bookmarksView.render(model.state.bookmarks);
};

const controlRemoveBookmark = function (id) {
  model.removeBookmark(id);

  bookmarksView.render(model.state.bookmarks);

  if (id === model.state.currentCoin.id)
    coinView.update(model.state.currentCoin);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlCompare = function () {
  compareView.render(model.state.compareCoins);
};

const controlToggleCompare = function () {
  try {
    if (!model.state.currentCoin.comparing) {
      model.addToCompare(model.state.currentCoin);
    } else {
      model.removeCompare(model.state.currentCoin.id);
    }

    coinView.update(model.state.currentCoin);

    compareView.render(model.state.compareCoins);
  } catch (err) {
    compareView.showNotification();
  }
};

const controlRemoveCompare = function (id) {
  model.removeCompare(id);

  compareView.render(model.state.compareCoins);

  if (id === model.state.currentCoin.id) {
    coinView.update(model.state.currentCoin);
  }
};

const controlSettings = function (currency) {
  model.changeStateCurrency(currency);

  location.reload();
};

const init = function () {
  coinView.addHandlerHash(controlCoin);
  coinView.addHandlerBookmark(controlToggleBookmark);
  coinView.addHandlerCompare(controlToggleCompare);

  chartView.addHandlerUpdate(controlChart);

  searchView.addHandlerSearch(controlSearchResults);

  bookmarksView.addHandlerLoad(controlBookmarks);
  bookmarksView.addHandlerRemove(controlRemoveBookmark);

  paginationView.addHandlerPagination(controlPagination);

  compareView.addHandlerLoad(controlCompare);
  compareView.addHandlerRemove(controlRemoveCompare);

  settingsView.addHandlerSettings(controlSettings);

  new AnimationView();
};

init();
