class SearchView {
  _parentElement = document.querySelector(".search__form");

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();

      handler();
    });
  }

  getQuery() {
    const query = this._parentElement.querySelector(
      ".search__form__input"
    ).value;

    this._clearInput();

    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search__form__input").value = "";
  }
}

export default new SearchView();
