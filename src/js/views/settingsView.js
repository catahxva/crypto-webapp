class SettingsView {
  _parentElement = document.querySelector(".settings__form");

  addHandlerSettings(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();

      const currency = this.querySelector(".settings__form__select").value;

      handler(currency);
    });
  }
}

export default new SettingsView();
