export default class View {
  _data;

  render(data, insertString = "afterbegin") {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();

    this._clear();
    this._insertMarkup(markup, insertString);
  }

  update(data) {
    if (!data) return;

    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll("*"));

    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    newElements.forEach((newEl, i) => {
      const cEl = currentElements[i];

      if (
        !newEl.isEqualNode(cEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        cEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(cEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          cEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
        <div class="container__spinner">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F5F5F5" class="w-6 h-6 svg--big">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>                          
        </div>
    `;

    this._clear();
    this._insertMarkup(markup);
  }

  renderError() {
    const markup = this._generateErrorMessage();

    this._clear();
    this._insertMarkup(markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _insertMarkup(markup, insertString) {
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
