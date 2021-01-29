import {
    matchMediaMobile,
    matchMediaDesktop
} from './mediaqueries'

export const swipeResults = _ => {

    const mapEl = document.getElementById('map');
    let mainEl = document.querySelector("main");
    let yStartTouch, yEndTouch;
    const transitionDuration = 0.5;

    mainEl.style.top = `-68vh`
    // mainEl.style.transition = `${transitionDuration}s ease`;

    // // SLIDE DOWN ON TOUCH OUTSIDE OF RESULTS AREA

    window.addEventListener("touchend", e => {
        console.log(e.target);
        if (e.target.matches("nav")) {}
        // mainEl.style.top = `0px`}
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

        if (yEndTouch > yStartTouch) {
            mainEl.style.top = `0px`
        } else if (yEndTouch < yStartTouch) {
            let mapRectHeight = mapEl.getBoundingClientRect().bottom - mapEl.getBoundingClientRect().top;
            let yMain = mapRectHeight - 15;
            mainEl.style.top = `-${yMain}px`
        }

    })

}