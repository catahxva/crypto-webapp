import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".search__container__pagination");

  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".search__pagination__btn");

      if (!btn) return;

      const goToPage = btn.dataset.goto * 1;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    console.log(this._parentElement);
    const currentPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (currentPage === 1 && numPages > 1 && numPages === 2) {
      return `
                <div class="search__container__pagination">
                    <div class="search__pagination__interior">
                        <button class="search__pagination__btn search__pagination__btn--active" data-goto="${currentPage}">
                            <span class="search__pagination__btn__span">${currentPage}</span>
                        </button>
                        <button class="search__pagination__btn" data-goto="${
                          currentPage + 1
                        }">
                            <span class="search__pagination__btn__span">${
                              currentPage + 1
                            }</span>
                        </button>
                    </div>
                </div>
            `;
    }

    if (currentPage === 1 && numPages > 1 && numPages > 2) {
      return `
                <div class="search__container__pagination">
                    <div class="search__pagination__interior">
                        <button class="search__pagination__btn search__pagination__btn--active" data-goto="${currentPage}">
                            <span class="search__pagination__btn__span">${currentPage}</span>
                        </button>
                        <button class="search__pagination__btn" data-goto="${
                          currentPage + 1
                        }">
                            <span class="search__pagination__btn__span">${
                              currentPage + 1
                            }</span>
                        </button>
                        <button class="search__pagination__btn" data-goto="${
                          currentPage + 2
                        }">
                            <span class="search__pagination__btn__span">${
                              currentPage + 2
                            }</span>
                        </button>
                    </div>
                </div>
            `;
    }

    if (currentPage === numPages && numPages > 1 && numPages === 2) {
      return `
                <div class="search__container__pagination">
                    <div class="search__pagination__interior">
                        <button class="search__pagination__btn" data-goto="${
                          currentPage - 1
                        }">
                            <span class="search__pagination__btn__span">${
                              currentPage - 1
                            }</span>
                        </button>
                        <button class="search__pagination__btn search__pagination__btn--active" data-goto="${currentPage}">
                            <span class="search__pagination__btn__span">${currentPage}</span>
                        </button>
                    </div>
                </div>
            `;
    }

    if (currentPage === numPages && numPages > 1 && numPages > 2) {
      return `
                <div class="search__container__pagination">
                    <div class="search__pagination__interior">
                        <button class="search__pagination__btn" data-goto="${
                          currentPage - 2
                        }">
                            <span class="search__pagination__btn__span">${
                              currentPage - 2
                            }</span>
                        </button>
                        <button class="search__pagination__btn" data-goto="${
                          currentPage - 1
                        }">
                            <span class="search__pagination__btn__span">${
                              currentPage - 1
                            }</span>
                        </button>
                        <button class="search__pagination__btn search__pagination__btn--active" data-goto="${currentPage}">
                            <span class="search__pagination__btn__span">${currentPage}</span>
                        </button>
                    </div>
                </div>
            `;
    }

    if (currentPage < numPages) {
      return `
                <div class="search__container__pagination">
                    <div class="search__pagination__interior">
                        <button class="search__pagination__btn" data-goto="${
                          currentPage - 1
                        }">
                            <span class="search__pagination__btn__span">${
                              currentPage - 1
                            }</span>
                        </button>
                        <button class="search__pagination__btn search__pagination__btn--active" data-goto="${currentPage}">
                            <span class="search__pagination__btn__span">${currentPage}</span>
                        </button>
                        <button class="search__pagination__btn" data-goto="${
                          currentPage + 1
                        }">
                            <span class="search__pagination__btn__span">${
                              currentPage + 1
                            }</span>
                        </button>
                    </div>
                </div>
            `;
    }

    return ``;
  }
}

export default new PaginationView();
