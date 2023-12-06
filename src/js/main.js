import "../styles/navigation.scss";
import "../styles/content.scss";

function initializePage() {
  const blockName = "banner";
  const navigation = buildNavigation(blockName);
  insertNavigation(blockName, navigation);
  bindListeners(blockName);
}

function buildNavigation(blockName) {
  const logo = `<a href="index.html" class="${blockName}__link ${blockName}__link--logo">Company Logo</a>`;
  const phoneNumber = `<a href="tel:1234567890" class="${blockName}__link ${blockName}__link--phone">(123) 456-7890</a>`;
  const openMenuButton = `<button class="${blockName}__button ${blockName}__button--open" aria-expanded="false" aria-controls="main-menu-container">Open Menu</button>`;
  const menu = buildMenu(blockName);
  const container = `
    <a href="#content" class="${blockName}__link ${blockName}__link--skip">Skip to Main Content</a>
    <div class="${blockName}__container ${blockName}__container--main">
      ${logo}
      <nav class="${blockName}__navigation">
        ${menu}
        ${openMenuButton}
      </nav>
      ${phoneNumber}
    </div>  
  `;
  return container;
}

function buildMenu(blockName) {
  const menuLinks = [
    { href: "index.html", text: "Home" },
    { href: "about.html", text: "About" },
    { href: "service.html", text: "Services" },
    { href: "review.html", text: "Reviews" },
    { href: "contact.html", text: "Contact" },
    { href: "faq.html", text: "FAQ" },
  ];
  const menuItems = menuLinks.map((link) => {
    return `<li class="${blockName}__item"><a href="${link.href}" class="${blockName}__link ${blockName}__link--menu">${link.text}</a></li>`;
  });
  const closeMenuButton = `<button class="${blockName}__button ${blockName}__button--close" aria-expanded="false" aria-controls="mainMenuContainer">Close Menu</button>`;
  const mainMenu = `
  <div id="mainMenuContainer" class="${blockName}__container ${blockName}__container--list" data-state="closed">
    <ul class="${blockName}__list">
      ${menuItems.join("")}
      <li class="${blockName}__item">${closeMenuButton}</li>
    </ul>
  </div>`;
  return mainMenu;
}

function insertNavigation(blockName, navigation) {
  document
    .querySelector(`.${blockName}`)
    .insertAdjacentHTML("beforeend", navigation);
}

function bindListeners(blockName) {
  const banner = document.querySelector(`.${blockName}`);
  banner.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches(`.${blockName}__button--open`)) {
      toggleMenu(true);
      setTimeout(() => {
        changeFocus(true);
      }, 500);
    } else if (target.matches(`.${blockName}__button--close`)) {
      toggleMenu(false);
      setTimeout(() => {
        changeFocus(false);
      }, 500);
    }
  });
  window.addEventListener(
    "resize",
    debounce(() => {
      if (window.innerWidth >= 1024) {
        toggleMenu(false);
      }
    })
  );
}

function toggleMenu(expand) {
  const state = expand ? "true" : "false";
  const dataState = expand ? "open" : "closed";
  const mainMenuContainer = document.getElementById("mainMenuContainer");
  const menuButtons = [
    document.querySelector(".banner__button--open"),
    document.querySelector(".banner__button--close"),
  ];
  mainMenuContainer.setAttribute("data-state", dataState);
  menuButtons.forEach((button) => {
    button.setAttribute("aria-expanded", state);
  });
}

function changeFocus(expand) {
  const focusElement = expand
    ? document.querySelector(".banner__list").children[0].children[0]
    : document.querySelector(".banner__button--open");
  focusElement.focus();
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.addEventListener("DOMContentLoaded", initializePage);
