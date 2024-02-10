import View from "./View.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__interior");
  _errorMsg = "You have no bookmarks yet";

  addHandlerLoad(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerRemove(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (!e.target.classList.contains("bookmarks__item__btn")) return;

      const btn = e.target.closest(".bookmarks__item__btn");

      handler(btn.dataset.id);
    });
  }

  _generateMarkup() {
    return `
            <div class="bookmarks__grid">
                ${this._data
                  .map((el) => {
                    return `
                        <a href="#${el.id}" class="bookmarks__item">
                            <img src="${el.image}" alt="" class="bookmarks__item__img">
                            <div class="bookmarks__item__container__misc">
                                <span class="bookmarks__item__span bookmarks__item__span--big">${el.coinName}</span>
                                <span class="bookmarks__item__span bookmarks__item__span--small">${el.symbol}</span>
                                <button class="bookmarks__item__btn" data-id="${el.id}">Remove</button>
                            </div>
                        </a>
                    `;
                  })
                  .join("")}
            </div>
        `;
  }

  _generateErrorMessage() {
    return `
        <div class="container__message">
            <div class="container__message__interior">
                <span class="message">${this._errorMsg}</span>
            </div>
        </div>
    `;
  }
}

export default new BookmarksView();
