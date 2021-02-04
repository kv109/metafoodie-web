// MEDIA QUERIES

export const matchMediaMobile = window.matchMedia("(max-width: 900px)");
export const matchMediaTablet = window.matchMedia("");
export const matchMediaDesktop = window.matchMedia("(min-width: 901px)");
export let mediaQueryChange = false;

export const headerEl = document.querySelector("header");
export const gridMainEl = document.querySelector(".grid-main");
const inputEl = document.getElementById('pac-input');
const mapEl = document.getElementById('map');


// HIDE HEADER WHEN INPUT CLICKED ON MOBILE

export const hideHeader = _ => {
  gridMainEl.style.top = `-${headerEl.offsetHeight}px`
  gridMainEl.classList.add("transition-style")
}

const hideHeaderAndMapGrow = _ => {
  hideHeader();
  mapGrow();
}

const mobileInputListener = _ => {
  if (matchMediaMobile.matches) {
    inputEl.addEventListener("click", hideHeaderAndMapGrow)
  }
}

const desktopInputListener = _ => {
  if (matchMediaDesktop.matches) {
    inputEl.removeEventListener("click", hideHeaderAndMapGrow);
    gridMainEl.style.top = "0px"
  }
}

mobileInputListener()
matchMediaMobile.addListener(mobileInputListener)

desktopInputListener()
matchMediaDesktop.addListener(desktopInputListener);



// MAP RESIZE ON CLICK

export const mapGrow = _ => {
  mapEl.style.height = "70vh";
  mapEl.classList.add("transition-style")
  hideHeader();
}

const mapDesktopSize = _ => {
  mapEl.style.height = "30vh";
  mapEl.classList.remove("transition-style")
}

const mapGrowMobileListener = _ => {

  if (matchMediaMobile.matches) {
    mapEl.addEventListener("touchend", mapGrow)
  }
}

const mapGrowDesktopListener = _ => {

  if (matchMediaDesktop.matches) {
    mapEl.removeEventListener("touchend", mapGrow)
    mapDesktopSize();
  }
}

mapGrowMobileListener();
mapGrowDesktopListener();

matchMediaMobile.addListener(mapGrowMobileListener);
matchMediaMobile.addListener(mapGrowDesktopListener);