import * as helpers from "./helpers.js";

export const state = {
  currentCoin: {},
  historicData: {},
  search: {
    results: [],
    page: 1,
    resultsPerPage: 6,
  },
  bookmarks: [],
  compareCoins: [],
  currency: {
    referenceId: "yhjMzLPhuIDl",
    currency: "USD",
  },
};

export const getCoin = async function (id) {
  try {
    const {
      data: { coin },
    } = await helpers.getJSON(
      `${process.env.API_URL}coin/${id}?referenceCurrencyUuid=${state.currency.referenceId}&timePeriod=24h`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.API_KEY,
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      }
    );

    state.currentCoin = {
      coinName: coin.name,
      image: coin.iconUrl,
      rank: coin.rank,
      id: coin.uuid,
      symbol: coin.symbol,
      price: {
        formatted: helpers.formatCurrency(
          Number(coin.price),
          state.currency.currency
        ),
        value: Number(coin.price),
      },
      priceDate: helpers.formatDate(coin.priceAt),
      marketCap: {
        formatted: helpers.formatCurrency(
          Number(coin.marketCap),
          state.currency.currency
        ),
        value: Number(coin.marketCap),
      },
      volume24Hours: {
        formatted: helpers.formatCurrency(
          Number(coin["24hVolume"]),
          state.currency.currency
        ),
        number: Number(coin["24hVolume"]),
      },
      allTimeHigh: {
        formatted: helpers.formatCurrency(
          Number(coin.allTimeHigh.price),
          state.currency.currency
        ),
        value: Number(coin.allTimeHigh.price),
      },
      maxSupply: {
        formatted: helpers.formatNumber(Number(coin.supply.max)),
        value: Number(coin.supply.max),
      },
      circulatingSupply: {
        formatted: helpers.formatNumber(Number(coin.supply.circulating)),
        value: Number(coin.supply.circulating),
      },
      markets: coin.numberOfMarkets,
      exchanges: coin.numberOfExchanges,
    };

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.currentCoin.bookmarked = true;
    else state.currentCoin.bookmarked = false;

    if (state.compareCoins.some((coin) => coin.id === id))
      state.currentCoin.comparing = true;
    else state.currentCoin.comparing = false;
  } catch (err) {
    throw err;
  }
};

export const getHistoricData = async function (id, timePeriod = "24h") {
  try {
    const {
      data: { history },
    } = await helpers.getJSON(
      `${process.env.API_URL}coin/${id}/history?referenceCurrencyUuid=${state.currency.referenceId}&timePeriod=${timePeriod}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.API_KEY,
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      }
    );

    const [coinPrices, coinTimeStamps] = helpers.getPricesAndDates(
      history,
      timePeriod
    );

    state.historicData = {
      coinPrices,
      coinTimeStamps,
      period: timePeriod,
    };
  } catch (err) {
    throw err;
  }
};

export const getSearchResults = async function (query) {
  try {
    const {
      data: { coins },
    } = await helpers.getJSON(
      `${process.env.API_URL}search-suggestions?referenceCurrencyUuid=${state.currency.referenceId}&query=${query}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.API_KEY,
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      }
    );

    state.search.results = coins.map((el) => {
      return {
        coinName: el.name,
        symbol: el.symbol,
        price: helpers.formatCurrency(
          Number(el.price),
          state.currency.currency
        ),
        image: el.iconUrl,
        id: el.uuid,
      };
    });

    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const addBookmark = function (coin) {
  state.bookmarks.push(coin);

  if (coin.id === state.currentCoin.id) state.currentCoin.bookmarked = true;

  helpers.persistLocalStorage("bookmarks", JSON.stringify(state.bookmarks));
};

export const addToCompare = function (coin) {
  try {
    console.log(state.compareCoins.length);
    if (state.compareCoins.length >= 2) throw new Error("");

    state.compareCoins.push(coin);

    if (coin.id === state.currentCoin.id) state.currentCoin.comparing = true;

    helpers.persistLocalStorage(
      "compareCoins",
      JSON.stringify(state.compareCoins)
    );
  } catch (err) {
    throw err;
  }
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex((coin) => coin.id === id);

  state.bookmarks.splice(index, 1);

  if (id === state.currentCoin.id) state.currentCoin.bookmarked = false;

  helpers.persistLocalStorage("bookmarks", JSON.stringify(state.bookmarks));
};

export const removeCompare = function (id) {
  const index = state.compareCoins.findIndex((coin) => coin.id === id);

  state.compareCoins.splice(index, 1);

  if (id === state.currentCoin.id) state.currentCoin.comparing = false;

  helpers.persistLocalStorage(
    "compareCoins",
    JSON.stringify(state.compareCoins)
  );
};

export const changeStateCurrency = function (currency) {
  state.currency = {
    referenceId: currency === "USD" ? "yhjMzLPhuIDl" : "5k-_VTxqtCEI",
    currency,
  };

  helpers.persistLocalStorage("currency", JSON.stringify(state.currency));
};

(function () {
  const storageBookmarks = localStorage.getItem("bookmarks");
  const storageCurrency = localStorage.getItem("currency");
  const storageCompare = localStorage.getItem("compareCoins");

  if (storageBookmarks) state.bookmarks = JSON.parse(storageBookmarks);
  if (storageCurrency) state.currency = JSON.parse(storageCurrency);
  if (storageCompare) state.compareCoins = JSON.parse(storageCompare);
})();
