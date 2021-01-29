import {
    matchMediaMobile,
    matchMediaDesktop
} from './mediaqueries'

export const swipeResults = _ => {

    const mapEl = document.getElementById('map');
    let mainEl = document.querySelector("main");
    let gridEl = document.querySelector(".grid-results");
    let yStartTouch, yEndTouch;
    const transitionDuration = 0.5;
    // const resultsTopPosition = `23vh`;
    let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const resultsTopPosition = `${windowHeight-450}px`;
    console.log(mainEl.offsetHeight);
    console.log(getComputedStyle(mainEl).height)
    const resultsBottomPosition = 85;
    mainEl.style.top = resultsTopPosition

    // SLIDE DOWN ON TOUCH OUTSIDE OF RESULTS AREA

    window.addEventListener("touchend", e => {

        if (!mainEl.contains(e.target)) {
            mainEl.style.top = `${resultsBottomPosition}vh`
        }
    })

    // SLIDE ANIMATION OF RESULTS AREA IF ON MOBILE

    const animateMainEl = _ => {
        mainEl.style.transition = `${transitionDuration}s ease`;
    }

    const animateMainElListener = _ => {

        if (matchMediaMobile.matches) {
            animateMainEl();
        }

    }

    animateMainEl();
    matchMediaMobile.addListener(animateMainElListener);

    // SLIDE ANIMATION OF RESULTS AREA CANCELED IF ON DESKTOP

    const animateMainElStop = _ => {
        mainEl.style.transition = ``;
    }

    const animateMainElStopListener = _ => {

        if (matchMediaDesktop.matches) {
            animateMainElStop();
        }

    }

    animateMainElStopListener();
    matchMediaDesktop.addListener(animateMainElStopListener);


    // SWIPE OF RESULTS

    mainEl.addEventListener("touchstart", e => {

        e.preventDefault();
        yStartTouch = e.changedTouches[0].clientY;

    })

    mainEl.addEventListener("touchend", e => {

        e.preventDefault();

        yEndTouch = e.changedTouches[0].clientY;

        // SLIDE DOWN 

        if (yEndTouch > yStartTouch) {
            mainEl.style.top = `${resultsBottomPosition}vh`
        }

        // SLIDE UP
        else if (yEndTouch < yStartTouch) {
            mainEl.style.top = resultsTopPosition
        }

        // TOUCH WHEN RESULTS ARE IN THE BOTTOM

        else if ((yEndTouch === yStartTouch)) {
            mainEl.style.top = resultsTopPosition
        }

    })
}