  // MEDIA QUERIES

  import {
    map
  } from "jquery";

  export const matchMediaMobile = window.matchMedia("(max-width: 690px)");
  export const matchMediaTablet = window.matchMedia("");
  // export const matchMediaTablet = window.matchMedia("(min-width: 691px) & (max-width:1169)");
  export const matchMediaDesktop = window.matchMedia("(min-width: 691px)");
  export let mediaQueryChange = false;

  const headerEl = document.querySelector("header");
  const gridMainEl = document.querySelector(".grid-main");
  const inputEl = document.getElementById('pac-input');
  const mapEl = document.getElementById('map');


  // HIDE HEADER WHEN INPUT CLICKED ON MOBILE

  const hideHeader = _ => {
    gridMainEl.style.top = `-${headerEl.offsetHeight}px`
    gridMainEl.classList.add("transition-style")
    // gridMainEl.style.transition = "0.4s ease"
  }

  const mobileInputListener = _ => {
    if (matchMediaMobile.matches) {
      inputEl.addEventListener("click", hideHeader);
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

  const mapGrow = _ => {
    mapEl.style.height = "60vh";
    mapEl.classList.add("transition-style")
    hideHeader()
    // mapEl.style.transition = "1s ease";
  }

  const mapDesktopSize = _ => {
    mapEl.style.height = "30vh";
    // mapEl.style.transition = "0s"
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
      // window.addEventListener("resize", mapDesktopSize)
      mapDesktopSize();
    }
  }

  mapGrowMobileListener();
  mapGrowDesktopListener();

  matchMediaMobile.addListener(mapGrowMobileListener);
  matchMediaMobile.addListener(mapGrowDesktopListener);