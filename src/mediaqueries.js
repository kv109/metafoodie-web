
// MEDIA QUERIES

  export const matchMediaMobile = window.matchMedia("(max-width: 900px)");
  export const matchMediaTablet = window.matchMedia("");
  // export const matchMediaTablet = window.matchMedia("(min-width: 691px) & (max-width:1169)");
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

  const mobileInputListener = _ => {
    if (matchMediaMobile.matches) {
      inputEl.addEventListener("click", _ => {
        hideHeader();
        mapGrow();
      });
    }

  }
  const desktopInputListener = _ => {
    if (matchMediaDesktop.matches) {
      inputEl.removeEventListener("click", hideHeader);
      gridMainEl.style.top = "0px"

    }
  }

  mobileInputListener()
  matchMediaMobile.addListener(mobileInputListener)

  desktopInputListener()
  matchMediaDesktop.addListener(desktopInputListener)



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
      mapEl.addEventListener("click", mapGrow)
    }
  }

  const mapGrowDesktopListener = _ => {

    if (matchMediaDesktop.matches) {
      mapEl.removeEventListener("click", mapGrow)
      mapDesktopSize();
    }
  }

  mapGrowMobileListener();
  mapGrowDesktopListener();

  matchMediaMobile.addListener(mapGrowMobileListener);
  matchMediaMobile.addListener(mapGrowDesktopListener);