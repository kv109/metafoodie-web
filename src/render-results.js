import {
    matchMediaMobile,
    matchMediaTablet,
    matchMediaDesktop,
    mediaQueryChange
} from './mediaqueries'
import {
    printToHTML
} from './print-to-html'
import {
    firstUpperCase
} from './first-upper-case'
import {
    loadingErrorMobile,
    loadingErrorTablet,
    loadingErrorDesktop,
    loadingError
} from './loading-error-catch'

let scoresArr = [];
let totalRatingCount = 0;
// let summary = 0;

export const renderResults = results => {

    // console.log('renderResults -> results')
    // console.log(results)

    const place = results.data[0];
    const name = place.name;
    const provider = results.provider;
    const url = place.url;
    // const rating = place.rating;
    const website = place.website;
    const address = place.formatted_address;
    const rating = parseFloat(place.rating);
    const isRatingNumber = !isNaN(rating);
    let shareEndpoint;
    let rating_count;

    const restaurantTitle = document.querySelector(".results-name");
    const restaurantAddress = document.querySelector(".results-address");
    const ratingSummaryEl = document.querySelector(".results-average");
    const resultsArrowEl = document.querySelector('.results-arrow');
    const providerTagEl = document.querySelector(`.results-provider-${provider}`);

    const printResultsForMobile = (url, provider, rating, rating_count) => {
        if (matchMediaMobile.matches) {
            providerTagEl.innerHTML = `<!--MOBILE -->
        
                    <p class="provider-icon"><a href="${url}" target="_blank"><img class="icon" src="img/provider-${provider}-color.svg" alt="${provider}"></a></p>
                    <p class="provider-rating">${rating}</p>
                    <p class="provider-rating-count">${rating_count}</p>
                    `
        }
    }

    const printResultsForDesktop = (url, provider, rating, rating_count) => {
        if (matchMediaDesktop.matches) {
            providerTagEl.classList.add("results-provider-hover")
            providerTagEl.innerHTML = `<!--DESKTOP -->
                    
                    <a href="${url}" target="_blank" class="provider-background"><p class="provider-icon"><img class="icon" src="img/provider-${provider}-color.svg" alt="${provider}"></p>
                    <p class="provider-rating">${rating}</p>
                    <p class="provider-rating-count">${rating_count}</p></a>
                    `
        }
    }

    const createShareLink = _ => {
        if (window.location.href.indexOf('?query') < 1) {
            shareEndpoint = `${window.location.href.slice(0,window.location.href.indexOf('?query'))}/?query=`
        } else {
            shareEndpoint = `${window.location.href.slice(0,window.location.href.indexOf('?query'))}?query=`
        }
        return `${shareEndpoint}${name}, ${place.formatted_address}`
    }

    // RENDER OF:
    // 1. RESTAURANT'S NAME
    // 2. LINK TO WEBSITE OR TO GOOGLE SEARCH DEPENDING ON AVAILABILITY OF place.website [findPlaceFromQuery doesn't provide "website" and "url" fields]
    // 3. SHARE LINK

    const putShareLinkToAddressBar = _ => {
        history.pushState({}, "", createShareLink());
    }

    const renderNameAndLinks = _ => {

        if (place.website) {
            restaurantTitle.innerHTML = `${name}<div class="results-links"><div class="results-share"><a target="_blank" href="${website}"><img class="results-link-img" src="img/website-link-green.svg" alt="Strona internetowa restauracji"></a></div>
            <div class="results-link"><img src="img/share-link-green.svg" alt="Skopiuj wyniki wyszukiwania" class="results-link-img" data-clipboard-text="${createShareLink()}"></div></div>`;
            putShareLinkToAddressBar();
        } else {
            restaurantTitle.innerHTML = `${name}<div class="results-links"><div class="results-share"><a target="_blank" href="https://www.google.com/search?q=${name}"><img class="results-link-img" src="img/google-search-green.svg" alt="Wyszukaj ${name} w Google"></a></div>
            <div class="results-link"><img src="img/share-link-green.svg" alt="Skopiuj wyniki wyszukiwania" class="results-link-img" data-clipboard-text="${createShareLink()}"></div></div>`;
            putShareLinkToAddressBar();

        }

    }

    if (provider === 'google') {

        // RESET OF WEIGHTED AVERAGE CALCULATIONS

        scoresArr = [];
        totalRatingCount = 0;

        // RATING'S COUNT FOR GOOGLE

        rating_count = place.user_ratings_total; // <------ GOOGLE

        // RENDER NAME AND LINKS

        renderNameAndLinks();

        // PRINT RESTAURANT'S ADDRESS

        restaurantAddress.innerHTML = address;

    }

    // RATING'S COUNT FOR OTHER PROVIDERS
    else {

        rating_count = place.rating_count;

    }

    // REMOVE ARROW INFO

    resultsArrowEl.classList.remove("hidden");

    if (place) {

        // AVERAGE SCORE PRESENTATION

        if (isRatingNumber) {

            // RESULTS RENDER FOR MOBILE AND DESTKOP

            printResultsForMobile(url, provider, rating, rating_count)
            printResultsForDesktop(url, provider, rating, rating_count)

            matchMediaMobile.addListener(_ => printResultsForMobile(url, provider, rating, rating_count))
            matchMediaDesktop.addListener(_ => printResultsForDesktop(url, provider, rating, rating_count))

            // CALCULATING ARITMETIC AVERAGE

            // totalRatingCount += 1;
            // summary += rating;
            // const percentage = Math.round(((summary / totalRatingCount) / 5) * 100)

            // // CALCULATING WEIGTHED AVERAGE

            scoresArr.push(Math.round(rating * rating_count));
            totalRatingCount += rating_count;

            let numerator = 0;
            let denumerator = totalRatingCount;

            scoresArr.forEach(score => {
                numerator += score;
            });

            const percentage = Math.round(numerator / denumerator / 5 * 100);

            // PRINTING AVERAGE SCORE BAR

            let textColor = "#ffffff";
            let backgroundColor;
            if (percentage > 85) {
                backgroundColor = "#4c9f26"
            } else if (percentage > 70) {
                backgroundColor = "#ddee07"
                textColor = "#444444"
            } else if (percentage > 50) {
                backgroundColor = "#d49520"
            } else {
                backgroundColor = "red"
            }

            ratingSummaryEl.style.backgroundColor = backgroundColor;
            ratingSummaryEl.style.color = textColor;
            ratingSummaryEl.innerHTML = `
            <p class="score-info">średnia ważona</p>
            <p class="score-percentage">${percentage}%</p>`

        } else {

            // console.log('złoty groń 2')
            loadingError(provider)

        }
    }

    // IF SCORE NOT AVAILABLE FOR THE PLACE, PRINTS "Couldn't find"
    else {

        printToHTML(provider, ':(');
        printToHTML(provider, `Couldn't find`);
    }

}