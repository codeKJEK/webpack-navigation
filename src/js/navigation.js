import "../styles/navigation.scss";

// INITIALIZE PAGE
function initializePage() {
  createHtml();
}

window.addEventListener("DOMContentLoaded", initializePage);

// CREATE HTML ELEMENTS
function createHtml() {
  const blockName = "banner";
  const navBlockName = "navigation";
  const logo = `<a href="index.html" class="${blockName}__link ${blockName}__link--logo">Company Logo</a>`;
  const phoneNumber = `<a href="tel:1234567890" class="${blockName}__link ${blockName}__link--phone">(123) 456-7890</a>`;
  const menuLinks = [
    { text: "Home", href: "index.html" },
    { text: "About", href: "about.html" },
    { text: "Services", href: "service.html" },
    { text: "Reviews", href: "review.html" },
    { text: "Contact", href: "contact.html" },
    { text: "FAQ", href: "faq.html" },
  ];
  const desktopNav = createDesktopNav(blockName, menuLinks);
  const desktopDivider = `
        <div class="${blockName}__divider">
            ${logo}
            ${desktopNav}
            ${phoneNumber}
        </div>
    `;
  const mobileNav = createMobileNav(menuLinks);
  insertHtml(blockName, navBlockName, desktopDivider, mobileNav);
}

// CREATE DESKTOP NAV
function createDesktopNav(blockName, menuLinks) {
  const menuItems = menuLinks.map((link) => {
    return `<li class="${blockName}__item"><a href="${link.href}" class="${blockName}__link">${link.text}</a></li>`;
  });
  const desktopMenu = `
        <nav class="${blockName}__navigation">
            <ul class="${blockName}__list">
                ${menuItems.join("")}
            </ul>
        </nav>
    `;
  return desktopMenu;
}

// CREATE MOBILE NAV
function createMobileNav(menuLinks) {
  const blockName = "navigation";
  const menuItems = menuLinks.map((link) => {
    return `<li class="${blockName}__item"><a href="${link.href}" class="${blockName}__link">${link.text}</a></li>`;
  });
  const closeButton = `<button class="${blockName}__button ${blockName}__button--close">Close Menu</button>`;
  const openButton = `<button class="${blockName}__button ${blockName}__button--open">Open Menu</button>`;
  const mobileMenu = `
        <nav class="${blockName}">
            <div class="${blockName}__divider">
                <ul class="${blockName}__list">
                    ${menuItems.join("")}
                    <li class="${blockName}__item">${closeButton}</li>
                </ul>
            </div>
            ${openButton}
        </nav>
    `;
  return mobileMenu;
}

// INSERT HTML ELEMENTS
function insertHtml(blockName, navBlockName, desktopDivider, mobileNav) {
  return new Promise((resolve) => {
    const insertionPoint = document.querySelector(`.${blockName}`);
    insertionPoint.insertAdjacentHTML("afterbegin", desktopDivider);
    insertionPoint.insertAdjacentHTML("afterend", mobileNav);
    resolve();
  }).then(() => {
    bindEventListeners(blockName, navBlockName);
  });
}

// BIND EVENT LISTENERS
function bindEventListeners(blockName, navBlockName) {
  const openButton = document.querySelector(`.${navBlockName}__button--open`);
  const closeButton = document.querySelector(`.${navBlockName}__button--close`);
  let currentScrollY = 0;
  openButton.addEventListener("click", () => toggleMenu(true));
  closeButton.addEventListener("click", () => toggleMenu(false));

  window.addEventListener(
    "scroll",
    debounce(() => {
      const newScrollY = window.scrollY;
      if (newScrollY > currentScrollY) {
        document
          .querySelector(`.${blockName}`)
          .setAttribute("data-state", "hidden");
        document
          .querySelector(`.${navBlockName}`)
          .setAttribute("data-state", "hidden");
      } else {
        document
          .querySelector(`.${blockName}`)
          .setAttribute("data-state", "visible");
        document
          .querySelector(`.${navBlockName}`)
          .setAttribute("data-state", "visible");
      }
      currentScrollY = newScrollY;
    }, 100)
  );
}

function toggleMenu(expand) {
  console.log("click");
  const menuState = expand ? "open" : "closed";
  const buttonState = expand ? "hidden" : "visible";
  const menuDivider = document.querySelector(`.navigation__divider`);
  const openButton = document.querySelector(`.navigation__button--open`);
  menuDivider.setAttribute("data-state", menuState);
  openButton.setAttribute("data-state", buttonState);
}

// debounce function
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
