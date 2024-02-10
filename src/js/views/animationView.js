export default class AnimationView {
  _btnMenuOpen = document.querySelector(".mobile__menu__btn");
  _btnMenuClose = document.querySelector(".nav__btn--close");
  _navMenu = document.querySelector(".nav");
  _overviewMenu = document.querySelector(".overview--menu");
  _nav = document.querySelector(".nav__container__buttons");
  _buttons = document.querySelectorAll(".nav__btn");
  _sections = document.querySelectorAll(".section");
  _homeSearchButton = document.querySelector(".message__button");
  _settings = document.querySelector(".settings");
  _btnOpen = document.querySelector(".nav__btn__settings");
  _btnClose = document.querySelector(".settings__form__btn");
  _overview = document.querySelector(".overview--settings");
  _bookmarksContainer = document.querySelector(".bookmarks__interior");
  _searchContainer = document.querySelector(".search__interior");

  constructor() {
    this._attachMenuListeners();
    this._attachSectionChangeListeners();
    this._attachHomePageSearchListener();
    this._attachSettingsListeners();
    this._attachBookmarksListener();
    this._attachSearchListener();
  }

  _attachMenuListeners() {
    this._btnMenuOpen.addEventListener("click", () => {
      this._navMenu.classList.add("nav--active");
      this._overviewMenu.classList.add("overview--active");
    });

    const closeMenuF = () => {
      this._navMenu.classList.remove("nav--active");
      this._overviewMenu.classList.remove("overview--active");
    };

    [this._btnMenuClose, this._overviewMenu].forEach((el) =>
      el.addEventListener("click", closeMenuF)
    );
  }

  _attachSectionChangeListeners() {
    this._nav.addEventListener("click", (e) => {
      const btnClicked = e.target.closest(".nav__btn");
      const dataSection = btnClicked?.dataset?.section;

      if (!btnClicked || !dataSection) return;

      this._buttons.forEach((btn) => btn.classList.remove("nav__btn--active"));
      btnClicked.classList.add("nav__btn--active");

      this._sections.forEach((section) =>
        section.classList.remove("section--active")
      );

      document
        .querySelector(`.section--${dataSection}`)
        .classList.add("section--active");

      this._navMenu.classList.remove("nav--active");
      this._overviewMenu.classList.remove("overview--active");
    });
  }

  _attachHomePageSearchListener() {
    this._homeSearchButton.addEventListener("click", () => {
      const dataSection = this._homeSearchButton.dataset.section;

      if (!dataSection) return;

      this._buttons.forEach((btn) => btn.classList.remove("nav__btn--active"));
      document
        .querySelector(`.nav__btn--${dataSection}`)
        .classList.add("nav__btn--active");

      this._sections.forEach((section) =>
        section.classList.remove("section--active")
      );

      document
        .querySelector(`.section--${dataSection}`)
        .classList.add("section--active");
    });
  }

  _attachSettingsListeners() {
    this._btnOpen.addEventListener("click", () => {
      this._settings.classList.add("settings--active");
      this._overview.classList.add("overview--active");
    });

    const closeSettingsF = () => {
      this._settings.classList.remove("settings--active");
      this._overview.classList.remove("overview--active");
    };

    [this._btnClose, this._overview].forEach((el) =>
      el.addEventListener("click", closeSettingsF)
    );
  }

  _attachBookmarksListener() {
    this._bookmarksContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("bookmarks__item__btn")) return;

      const bookmarkPreview = e.target.closest(".bookmarks__item");

      if (!bookmarkPreview) return;

      this._buttons.forEach((btn) => btn.classList.remove("nav__btn--active"));
      document.querySelector(".nav__btn--1").classList.add("nav__btn--active");

      this._sections.forEach((section) =>
        section.classList.remove("section--active")
      );

      document.querySelector(".section--1").classList.add("section--active");
    });
  }

  _attachSearchListener() {
    this._searchContainer.addEventListener("click", (e) => {
      const previewItem = e.target.closest(".search__result");

      if (!previewItem) return;

      this._buttons.forEach((btn) => btn.classList.remove("nav__btn--active"));
      document.querySelector(".nav__btn--1").classList.add("nav__btn--active");

      this._sections.forEach((section) =>
        section.classList.remove("section--active")
      );

      document.querySelector(".section--1").classList.add("section--active");
    });
  }
}
