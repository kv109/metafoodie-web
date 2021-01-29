import {
    matchMediaMobile,
    matchMediaDesktop
} from './mediaqueries'

export const swipeResults = _ => {

    const mapEl = document.getElementById('map');
    let mainEl = document.querySelector("main");
    let yStartTouch, yEndTouch;
    const transitionDuration = 0.5;
    const resultsTopPosition = 23;
    const resultsBottomPosition = 85;
    // let resultsDown = false;
    mainEl.style.top = `${resultsTopPosition}vh`

    // SLIDE DOWN ON TOUCH OUTSIDE OF RESULTS AREA

    window.addEventListener("touchend", e => {
        // console.log(e.target);

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
            mainEl.style.top = `${resultsTopPosition}vh`
        }

        // TOUCH WHEN RESULTS ARE IN THE BOTTOM

        else if ((yEndTouch === yStartTouch)) {
            mainEl.style.top = `${resultsTopPosition}vh`
        }


        // // SLIDE DOWN WHEN WINDOW ON THE TOP

        // if (!resultsDown && (yEndTouch > yStartTouch)) {
        //     mainEl.style.top = `0px`
        //     resultsDown = true;
        // } 

        // // SLIDE DOWN WHEN WINDOW ON THE BOTTOM

        // else if (resultsDown && (yEndTouch > yStartTouch)) {
        //     // mainEl.style.top = `1110px`
        //     mainEl.style.backgroundColor = `red`
        //     resultsDown = true;
        // }


        // // SLIDE UP WHEN WINDOW ON THE BOTTOM

        // else if (resultsDown && (yEndTouch < yStartTouch)) {
        //     let mapRectHeight = mapEl.getBoundingClientRect().bottom - mapEl.getBoundingClientRect().top;
        //     let yMain = mapRectHeight - 15;
        //     mainEl.style.top = `-${yMain}px`
        //     resultsDown = false;
        // }

        // // SLIDE UP WHEN WINDOW ON THE TOP

        // else if (!resultsDown && (yEndTouch < yStartTouch)) {
        //     let mapRectHeight = mapEl.getBoundingClientRect().bottom - mapEl.getBoundingClientRect().top;
        //     let yMain = mapRectHeight - 15;
        //     mainEl.style.top = `-${yMain}px`
        //     resultsDown = false;
        // }



    })
}