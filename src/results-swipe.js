import {
    matchMediaMobile,
    matchMediaDesktop
} from './mediaqueries.js'
// import {getResultsHeight} from './render-results'


export const swipeResults = map => {

    // DOM CACHE
    
    const mapEl = document.getElementById('map');
    const mainEl = document.querySelector("main");
    const gridEl = document.querySelector(".grid-results");
    // const resultsNameEl = document.querySelector(".results-name");
    // const resultsLinksEl = document.querySelector(".results-link");
    // const resultsAddressEl = document.querySelector(".results-address");
    // const resultsAverageEl = document.querySelector(".results-average");
    // const resultsProvidersEl = document.querySelector(".results-providers-wrapper");
    // const resultsMobileArrowInfoEl = document.querySelector(".results-mobile-arrow-info");

    // let totalResultsHeight = resultsLinksEl.offsetHeight;
    // let totalResultsHeight = resultsNameEl.offsetHeight;

    // console.log(totalResultsHeight);

    // console.log('resultsHeight(gridEl)')
    // console.log(getResultsHeight(gridEl))
    

    // VARIABLES

    let yStartTouch, yEndTouch;
    let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    const transitionDuration = 0.5;

    const resultsTopPosition = `${windowHeight-450}px`;
    const resultsBottomPosition = 85;

    // ALLOW OR DISALLOW CLICKING ON MARKERS

    const clickableMarkers = boolean => {
        map.setOptions({
            clickableIcons: boolean
        })
    }

    // INITIAL SETUP

    mainEl.style.top = resultsTopPosition;
    
    const clickableMarkersMobile = _ => {
        if (matchMediaMobile.matches) {
            clickableMarkers(false);
        }
    }

    clickableMarkersMobile(false);
    matchMediaMobile.addListener(clickableMarkersMobile(false))


    // SLIDE DOWN ON TOUCH OUTSIDE OF RESULTS AREA

    window.addEventListener("touchend", e => {

        if (!mainEl.contains(e.target)) {
            mainEl.style.top = `${resultsBottomPosition}vh`;
            clickableMarkers(true);
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
            mainEl.style.top = `${resultsBottomPosition}vh`;
            clickableMarkers(true);

        }

        // SLIDE UP
        else if (yEndTouch < yStartTouch) {
            mainEl.style.top = resultsTopPosition;
            // console.log(map);
            clickableMarkers(false);

        }

        // TOUCH WHEN RESULTS ARE IN THE BOTTOM
        else if ((yEndTouch === yStartTouch)) {
            mainEl.style.top = resultsTopPosition;
            clickableMarkers(false);

        }

    })
}