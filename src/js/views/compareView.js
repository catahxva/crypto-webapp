import View from "./View.js";

class CompareView extends View {
  _parentElement = document.querySelector(".compare__interior");

  addHandlerLoad(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerRemove(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".compare__selected__btn");

      if (!btn) return;

      handler(btn.dataset.id);
    });
  }

  showNotification() {
    document
      .querySelector(".compare__notification")
      .classList.add("compare__notification--active");

    setTimeout(
      () =>
        document
          .querySelector(".compare__notification")
          .classList.remove("compare__notification--active"),
      3000
    );
  }

  _generateMarkup() {
    return `
            <div class="compare__container__message">
                <span class="compare__message">You can compare 2 coins at a time. You have ${
                  this._data.length === 0 ? "no" : this._data.length
                } coin${this._data.length === 1 ? "" : "s"} selected.</span>
            </div>
            <div class="compare__container__selected">
                <span class="compare__selected__span">Selected coins:</span>
                <div class="compare__container__selected__buttons">
                    ${this._data
                      .map((el) => {
                        return `
                            <button class="compare__selected__btn" data-id="${el.id}">
                                <span class="compare__selected__btn__span">
                                    ${el.coinName}
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F5F5F5" class="w-6 h-6 compare__selected__btn__svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>                              
                            </button>
                        `;
                      })
                      .join("")}
                </div>
            </div>
            <div class="compare__container__coins ${
              this._data.length === 2
                ? "compare__container__coins--visible"
                : ""
            }">
                <ul class="compare__list compare__list--1">
                    <li class="compare__list__item">
                        <span class="compare__list__item__span">Name</span>
                    </li>
                    <li class="compare__list__item">
                        <span class="compare__list__item__span">Price</span>
                    </li>
                    <li class="compare__list__item">
                        <span class="compare__list__item__span">ATH</span>
                    </li>
                    <li class="compare__list__item">
                        <span class="compare__list__item__span">Volume</span>
                    </li>
                    <li class="compare__list__item">
                        <span class="compare__list__item__span">Market Cap</span>
                    </li>
                    <li class="compare__list__item">
                        <span class="compare__list__item__span">Max Supply</span>
                    </li>
                    <li class="compare__list__item">
                        <span class="compare__list__item__span">Circulating Supply</span>
                    </li>
                    <li class="compare__list__item">
                        <span class="compare__list__item__span">Rank</span>
                    </li>
                </ul>
                ${this._data
                  .map((el, i, arr) => {
                    if (arr.length !== 2) return;

                    const elementValue = i === 0 ? i + 1 : i - 1;

                    return `
                            <ul class="compare__list">
                                <li class="compare__list__item">
                                    <span class="compare__list__item__span">${
                                      el.coinName
                                    }</span>
                                </li>
                                <li class="compare__list__item">
                                    <span class="compare__list__item__span compare__list__item__span--${
                                      el.price.value >
                                      arr[elementValue].price.value
                                        ? "green"
                                        : "red"
                                    }">${el.price?.formatted}</span>
                                </li>
                                <li class="compare__list__item">
                                    <span class="compare__list__item__span compare__list__item__span--${
                                      el.allTimeHigh.value >
                                      arr[elementValue].allTimeHigh.value
                                        ? "green"
                                        : "red"
                                    }">${el.allTimeHigh?.formatted}</span>
                                </li>
                                <li class="compare__list__item">
                                    <span class="compare__list__item__span compare__list__item__span--${
                                      el.volume24Hours.value >
                                      arr[elementValue].volume24Hours.value
                                        ? "green"
                                        : "red"
                                    }">${el.volume24Hours?.formatted}</span>
                                </li>
                                <li class="compare__list__item">
                                    <span class="compare__list__item__span compare__list__item__span--${
                                      el.marketCap.value >
                                      arr[elementValue].marketCap.value
                                        ? "green"
                                        : "red"
                                    }">${el.marketCap?.formatted}</span>
                                </li>
                                <li class="compare__list__item">
                                    <span class="compare__list__item__span compare__list__item__span--${
                                      el.maxSupply.value >
                                      arr[elementValue].maxSupply.value
                                        ? "green"
                                        : "red"
                                    }">${el.maxSupply?.formatted}</span>
                                </li>
                                <li class="compare__list__item">
                                    <span class="compare__list__item__span compare__list__item__span--${
                                      el.circulatingSupply.value >
                                      arr[elementValue].circulatingSupply.value
                                        ? "green"
                                        : "red"
                                    }">${el.circulatingSupply?.formatted}</span>
                                </li>
                                <li class="compare__list__item">
                                    <span class="compare__list__item__span compare__list__item__span--${
                                      el.rank < arr[elementValue].rank
                                        ? "green"
                                        : "red"
                                    }">${el.rank}</span>
                                </li>
                            </ul>
                        `;
                  })
                  .join("")}
            </div> 
        `;
  }

  _generateErrorMessage() {
    return `
        <div class="compare__container__message">
            <span class="compare__message">You can compare 2 coins at a time. You have no coins selected.</span>
        </div>
    `;
  }
}

export default new CompareView();
