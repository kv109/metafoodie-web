import {matchMediaMobile, matchMediaDesktop} from './mediaqueries'

export const swipeResults = _ => {

// if (matchMediaMobile.matches) {

    const mapEl = document.getElementById('map');
    let mainEl = document.querySelector("main");
    let yStartTouch, yEndTouch;
    const transitionDuration = 0.5;

    mainEl.style.top = `-68vh`
    mainEl.style.transition = `${transitionDuration}s ease`;

    mainEl.addEventListener("touchstart", e => {

        e.preventDefault();
        yStartTouch = e.changedTouches[0].clientY;

    })

    mainEl.addEventListener("touchend", e => {

        e.preventDefault();

        yEndTouch = e.changedTouches[0].clientY;

        if (yEndTouch > yStartTouch) {
            mainEl.style.top = `0px`
        }

        else if (yEndTouch < yStartTouch) {
            let mapRectHeight = mapEl.getBoundingClientRect().bottom - mapEl.getBoundingClientRect().top;
            let yMain = mapRectHeight-15;
            mainEl.style.top = `-${yMain}px`
        }

    })

// }
} 
