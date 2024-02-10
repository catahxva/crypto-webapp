const btnMenuOpen = document.querySelector(".mobile__menu__btn");
const btnMenuClose = document.querySelector(".nav__btn--close");
const navMenu = document.querySelector(".nav");
const overviewMenu = document.querySelector(".overview--menu");

btnMenuOpen.addEventListener("click", function () {
  navMenu.classList.add("nav--active");
  overviewMenu.classList.add("overview--active");
});

const closeMenuF = function () {
  navMenu.classList.remove("nav--active");
  overviewMenu.classList.remove("overview--active");
};

[btnMenuClose, overviewMenu].forEach((el) =>
  el.addEventListener("click", closeMenuF)
);

const nav = document.querySelector(".nav__container__buttons");
const buttons = document.querySelectorAll(".nav__btn");
const sections = document.querySelectorAll(".section");

nav.addEventListener("click", function (e) {
  const btnClicked = e.target.closest(".nav__btn");
  const dataSection = btnClicked?.dataset?.section;

  if (!btnClicked || !dataSection) return;

  buttons.forEach((btn) => btn.classList.remove("nav__btn--active"));

  btnClicked.classList.add("nav__btn--active");

  sections.forEach((section) => section.classList.remove("section--active"));

  document
    .querySelector(`.section--${dataSection}`)
    .classList.add("section--active");

  closeMenuF();
});

const homeSearchButton = document.querySelector(".message__button");

//search button from home
homeSearchButton.addEventListener("click", function () {
  const dataSection = this.dataset.section;

  if (!dataSection) return;

  buttons.forEach((btn) => btn.classList.remove("nav__btn--active"));
  document
    .querySelector(`.nav__btn--${dataSection}`)
    .classList.add("nav__btn--active");
  sections.forEach((section) => section.classList.remove("section--active"));
  document
    .querySelector(`.section--${dataSection}`)
    .classList.add("section--active");
});

//close settings
const settings = document.querySelector(".settings");
const btnOpen = document.querySelector(".nav__btn__settings");
const btnClose = document.querySelector(".settings__form__btn");
const overview = document.querySelector(".overview--settings");

btnOpen.addEventListener("click", function () {
  settings.classList.add("settings--active");
  overview.classList.add("overview--active");
});

const closeSettingsF = function () {
  settings.classList.remove("settings--active");
  overview.classList.remove("overview--active");
};

[btnClose, overview].forEach((el) =>
  el.addEventListener("click", closeSettingsF)
);

//mobile menu
