import View from "./View.js";

class CoinView extends View {
  _parentElement = document.querySelector(".home__interior");
  _errorMsg = "There was a problem with finding your coin";

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".home__data__button--bookmark");

      if (!btn) return;

      handler();
    });
  }

  addHandlerCompare(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".home__data__button--compare");

      if (!btn) return;

      handler();
    });
  }

  addHandlerHash(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _generateMarkup() {
    return `
            <div class="home__container home__container__coin">
                <img src=${this._data.image} alt="" class="home__img">
                <div class="home__data">
                    <div class="home__data__container__title">
                        <div class="home__data__container__misc">
                            <img src=${
                              this._data.image
                            } alt="" class="home__data__title__img">
                            <h3 class="home__data__title">${
                              this._data.coinName
                            } (${this._data.priceDate})</h3>
                        </div>
                        <div class="home__data__container__buttons">
                            <button class="home__data__button home__data__button--bookmark">
                                ${
                                  this._data.bookmarked
                                    ? `
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F5F5F5" class="w-6 h-6 home__data__svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                                    </svg>                              
                                `
                                    : `
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F5F5F5" class="w-6 h-6 home__data__svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                    </svg>                                          
                                `
                                }
                            </button>
                            <button class="home__data__button home__data__button--compare">
                                ${
                                  this._data.comparing
                                    ? `
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F5F5F5" class="w-6 h-6 home__data__svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                    </svg>                              
                                    `
                                    : `
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F5F5F5" class="w-6 h-6 home__data__svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                                    </svg>                                          
                                `
                                }
                            </button>
                        </div>
                    </div>
                    <div class="home__data__grid">
                        <div class="home__data__cell">
                            <span class="home__data__cell__span home__data__cell__span--small">Price</span>
                            <span class="home__data__cell__span home__data__cell__span--big">${
                              this._data.price.formatted
                            }</span>
                        </div>
                        <div class="home__data__cell">
                            <span class="home__data__cell__span home__data__cell__span--small">Volume (24h)</span>
                            <span class="home__data__cell__span home__data__cell__span--big">${
                              this._data.volume24Hours.formatted
                            }</span>
                        </div>
                        <div class="home__data__cell">
                            <span class="home__data__cell__span home__data__cell__span--small">Circulating Supply</span>
                            <span class="home__data__cell__span home__data__cell__span--big">${
                              this._data.circulatingSupply.formatted
                            }</span>
                        </div>
                        <div class="home__data__cell">
                            <span class="home__data__cell__span home__data__cell__span--small">All Time High</span>
                            <span class="home__data__cell__span home__data__cell__span--big">${
                              this._data.allTimeHigh.formatted
                            }</span>
                        </div>
                        <div class="home__data__cell">
                            <span class="home__data__cell__span home__data__cell__span--small">Market Cap</span>
                            <span class="home__data__cell__span home__data__cell__span--big">${
                              this._data.marketCap.formatted
                            }</span>
                        </div>
                        <div class="home__data__cell">
                            <span class="home__data__cell__span home__data__cell__span--small">Max Supply</span>
                            <span class="home__data__cell__span home__data__cell__span--big">${
                              this._data.maxSupply.formatted
                            }</span>
                        </div>
                        <div class="home__data__cell">
                            <span class="home__data__cell__span home__data__cell__span--small">Rank</span>
                            <span class="home__data__cell__span home__data__cell__span--big">${
                              this._data.rank
                            }</span>
                        </div>
                        <div class="home__data__cell">
                            <span class="home__data__cell__span home__data__cell__span--small">Markets</span>
                            <span class="home__data__cell__span home__data__cell__span--big">${
                              this._data.markets
                            }</span>
                        </div>
                        <div class="home__data__cell">
                            <span class="home__data__cell__span home__data__cell__span--small">Exchanges</span>
                            <span class="home__data__cell__span home__data__cell__span--big">${
                              this._data.exchanges
                            }</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="home__container home__container__chart">
                <form action="#" class="home__chart__form">
                    <div class="home__chart__form__group">
                        <label for="period" class="home__chart__form__label">Data for:</label>
                        <select name="period" id="" class="home__chart__form__select">
                            <option value="24h">24h</option>
                            <option value="7d">7 days</option>
                            <option value="30d">30 days</option>
                        </select>
                    </div>
                    <button class="home__chart__form__btn" type="submit">OK</button>
                </form>
                <div class="home__chart__holder">
                    <canvas id="chart"></canvas>
                </div>
            </div>
        `;
  }

  _generateErrorMessage() {
    return `
        <div class="container__message">
            <div class="container__message__interior">
                <span class="message">${this._errorMsg}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F5F5F5" class="w-6 h-6 message__svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>                              
            </div>
        </div>
    `;
  }
}

export default new CoinView();
