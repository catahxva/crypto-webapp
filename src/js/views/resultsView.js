import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".search__interior__container");
  _errorMsg = "There are no results for your query";

  _generateMarkup() {
    return `
            <div class="search__container__results">
                <ul class="search__results__list">
                ${this._data
                  .map((el) => {
                    return `
                                <li class="search__result">
                                    <a href="#${el.id}" class="search__result__link">
                                        <img src="${el.image}" alt="" class="search__result__img">
                                        <div class="search__result__container__spans">
                                            <span class="search__result__span search__result__span--big">${el.coinName}</span>
                                            <span class="search__result__span search__result__span--small">${el.symbol}</span>
                                        </div>
                                        <span class="search__result__price">${el.price}</span>
                                    </a>
                                </li>
                            `;
                  })
                  .join("")}
                </ul>
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

export default new ResultsView();
