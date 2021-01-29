import {
    matchMediaMobile,
    matchMediaDesktop,
} from './mediaqueries'
import {
    printToHTML
} from './print-to-html'
import {
    loadingError
} from './loading-error-catch'
import {
    colorTransition
} from './color-transition'

let scoresArr = [];
let totalRatingCount = 0;
// let summary = 0;

export const renderResults = results => {

    const place = results.data[0];
    const name = place.name;
    const provider = results.provider;
    const url = place.url;
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
    const resultsMobileArrowEl = document.querySelector('.results-mobile-arrow-info');
    const providerTagEl = document.querySelector(`.results-provider-${provider}`);

    const printResultsForMobile = (url, provider, rating, rating_count) => {
        if (matchMediaMobile.matches) {
            providerTagEl.innerHTML = `<!--MOBILE -->
        
                    <p class="provider-icon-${provider}"><a href="${url}" target="_blank"><img class="icon" src="img/provider-${provider}-color.svg" alt="${provider}"></a></p>
                    <p class="provider-rating">${rating}</p>
                    <p class="provider-rating-count">${rating_count}</p>
                    `

            // MAKE PROVIDER ICON TOUCHABLE

            let providerLinkEl = document.querySelector(`.provider-icon-${provider}`)
            providerLinkEl.addEventListener("touchend", _ => {
                window.open(url, '_blank')
            })

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

    const mouseOver = (elementId, srcOver, srcOut) => {
        let image = document.querySelector(`${elementId}`);
        image.addEventListener("mouseover", _ => {
            image.setAttribute('src', `${srcOver}`)
        });
        image.addEventListener("mouseout", _ => {
            image.setAttribute('src', `${srcOut}`)
        });
        image.addEventListener("touchstart", _ => {
            image.setAttribute('src', `${srcOver}`)
        });
        image.addEventListener("touchend", _ => {
            image.setAttribute('src', `${srcOut}`)
        });
        image.addEventListener("touchmove", _ => {
            image.setAttribute('src', `${srcOut}`)
        });
    }

    const copySuccessToolip = _ => {
        const resultsLinkEl = document.querySelector(".results-link");
        const copySuccessEl = document.querySelector(".copy-success");
        resultsLinkEl.addEventListener("click", _ => {
            copySuccessEl.classList.remove("hidden");
            copySuccessEl.classList.add("copy-success-anim");
        })
        resultsLinkEl.addEventListener("mouseout", _ => {
            copySuccessEl.classList.remove("copy-success-anim");
            copySuccessEl.classList.add("hidden");

        })
    }

    const renderNameAndLinks = _ => {

        if (place.website) {
            restaurantTitle.innerHTML = `${name}
            
            <div class="results-links">
            
            <div class="results-share"><a target="_blank" href="${website}"><img title="Strona internetowa restauracji '${name}'" class="results-link-img" id="website-link" src="img/website-link-grey.svg" alt="Strona internetowa restauracji"></a></div>

            <div class="results-link"><img id="results-link-img" src="img/share-link-grey.svg" title="Skopiuj adres strony z wynikami o '${name}' do schowka" alt="Skopiuj wyniki wyszukiwania" class="results-link-img" data-clipboard-text="${createShareLink()}"></div>

            <div class="copy-success hidden">Skopiowano do schowka</div>
          
            </div>`

            // OPEN WEBSITE LINK ON TOUCH ON MOBILE

            let shareEl = document.querySelector(".results-share a")
            shareEl.addEventListener("touchend", _ => {
                window.open(website, '_blank')
            })

            putShareLinkToAddressBar();
            mouseOver('#website-link', 'img/website-link-green.svg', 'img/website-link-grey.svg');
            mouseOver('#results-link-img', 'img/share-link-green.svg', 'img/share-link-grey.svg');
            copySuccessToolip();

        } else {

            restaurantTitle.innerHTML = `${name}
            
            <div class="results-links">
            
            <div class="results-share"><a target="_blank" href="https://www.google.com/search?q=${name}%20${address}"><img title="Wyszukaj '${name}' w Google" class="results-link-img" id="google-search" src="img/google-search-grey.svg" alt="Wyszukaj ${name} w Google"></a></div>

            <div class="results-link"><img id="results-link-img" src="img/share-link-grey.svg" title="Skopiuj adres strony z wynikami o '${name}' do schowka" alt="Skopiuj wyniki wyszukiwania" class="results-link-img" data-clipboard-text="${createShareLink()}"></div>

            <div class="copy-success hidden">Skopiowano do schowka</div>
            
            </div>`

            // OPEN WEBSITE LINK ON TOUCH ON MOBILE

            let shareEl = document.querySelector(".results-share a")
            shareEl.addEventListener("touchend", _ => {
                window.open(`https://www.google.com/search?q=${name}`, '_blank')
            })

            putShareLinkToAddressBar();
            mouseOver('#google-search', 'img/google-search-green.svg', 'img/google-search-grey.svg');
            mouseOver('#results-link-img', 'img/share-link-green.svg', 'img/share-link-grey.svg');
            copySuccessToolip();

        }

    }

    if (provider === 'google') {

        document.title = `Metafoodie - ${place.name}`

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

    // SHOW ARROW INFO

    resultsArrowEl.classList.remove("hidden");
    resultsMobileArrowEl.classList.remove("hidden");

    if (place) {

        // AVERAGE SCORE PRESENTATION

        if (isRatingNumber && place.user_ratings_total > 0) {

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

            // let textColor = "#ffffff";
            // let backgroundColor;

            colorTransition(ratingSummaryEl, percentage);
            ratingSummaryEl.innerHTML = `
            <p class="score-info">ocena średnia</p>
            <p class="score-percentage">${percentage/20}</p>`

        } else if (isRatingNumber && place.user_ratings_total === 0) {

            loadingError(provider);

            colorTransition(ratingSummaryEl, '1');

            ratingSummaryEl.innerHTML = `
            <p class="zero-score-warning">Obiekt ma zero ocen w bazie Google</p>
            `



        } else {

            loadingError(provider)

        }
    }

    // IF SCORE NOT AVAILABLE FOR THE PLACE, PRINTS "Couldn't find"
    else {

        printToHTML(provider, ':(');
        printToHTML(provider, `Couldn't find`);
    }

}