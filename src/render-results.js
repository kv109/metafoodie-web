import {
    matchMediaMobile,
    mediaQuery
} from './mediaqueries'
import {
    printToHTML
} from './print-to-html'
import {
    firstUpperCase
} from './first-upper-case'

// require("./clipboard.min.js")
// import("./clipboard.min.js")


// ------------------------------------------- RENDER RESULTS

// const clipboard = new ClipboardJS('#results-share');

let scoresArr = [];
let totalRatingCount = 0;
// const providers = [];
// let summary = 0;

export const renderResults = results => {

    // console.log('renderResults -> results')
    // console.log(results)

    // RESULTS - PRINTING NAME, WEBSITE, SHARELINK AND ADDRESS

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
        providerTagEl.innerHTML = `<!--MOBILE -->
        
                    <p class="provider-icon"><a href="${url}" target="_blank"><img class="icon" src="img/${provider}_icon.png" alt="${provider}"></a></p>
                    <p class="provider-rating">${rating}</p>
                    <p class="provider-rating-count">${rating_count}</p>
                    `
    }

    const printResultsForDesktop = (url, provider, rating, rating_count) => {
        providerTagEl.innerHTML = `<!--DESKTOP -->
                    
                    <a href="${url}" target="_blank"><p class="provider-icon"><img class="icon" src="img/${provider}_icon.png" alt="${provider}"></p>
                    <p class="provider-rating">${rating}</p>
                    <p class="provider-rating-count">${rating_count}</p></a>
                    `
    }


    if (provider === 'google') {
        rating_count = place.user_ratings_total; // <------ GOOGLE

        if (window.location.href.indexOf('?query') < 1) {
            shareEndpoint = `${window.location.href.slice(0,window.location.href.indexOf('?query'))}/?query=`
        } else {
            shareEndpoint = `${window.location.href.slice(0,window.location.href.indexOf('?query'))}?query=`
        }
    
        let shareLink = `${shareEndpoint}${name}, ${place.formatted_address}`
        // restaurantTitle.innerHTML = `<a href="${website}" target="_blank">${name}</a><div class="results-share"><a target="_blank" href="${shareLink}">Skopiuj link do wyników</a></div>`;    
    
        if (place.website) {
        // console.log('nazwa ze stroną')
            restaurantTitle.innerHTML = `${name}<div class="results-share"><a target="_blank" href="${website}"><img class="results-link-img" src="img/website.svg"></a></div>
            <div class="results-link"><img src="img/share-link.svg" class="results-link-img" data-clipboard-text="${shareLink}"></div>`
    
        } else {
        // console.log('nazwa bez strony')
            restaurantTitle.innerHTML = `${name}<div class="results-share"><a target="_blank" href="https://www.google.com/search?q=${name}"><img class="results-link-img" src="img/search-google.svg"></a></div>
            <div class="results-link"><img src="img/share-link.svg" class="results-link-img" data-clipboard-text="${shareLink}"></div>`;
        }
    
        restaurantAddress.innerHTML = address;

    } else {
        rating_count = place.rating_count; // <------ OTHER PROVIDERS
    }





    // REMOVE ARROW INFO

    resultsArrowEl.classList.remove("hidden");

    if (place) {


        // AVERAGE SCORE PRESENTATION

        if (isRatingNumber) {

            // RESULTS RENDER FOR MOBILE AND DESTKOP

            mediaQuery(_ => printResultsForMobile(url, provider, rating, rating_count), _ => printResultsForDesktop(url, provider, rating, rating_count));

            matchMediaMobile.addListener(_ => {
                mediaQuery(_ => printResultsForMobile(url, provider, rating, rating_count), _ => printResultsForDesktop(url, provider, rating, rating_count))
            });

            // CALCULATING ARITMETIC AVERAGE

            // totalRatingCount += 1;
            // summary += rating;
            // const percentage = Math.round(((summary / totalRatingCount) / 5) * 100)

            // // CALCULATING WEIGTHED AVERAGE

            scoresArr.push(Math.round(rating * rating_count));
            totalRatingCount += rating_count;

            let numerator = 0;
            let denumerator = totalRatingCount;
            // console.log(totalRatingCount)


            scoresArr.forEach(score => {
                numerator += score;
            });

            const percentage = Math.round(numerator / denumerator / 5 * 100);
            // console.log(percentage)

            // PRINTING AVERAGE SCORE BAR

            let textColor = "#ffffff";
            let backgroundColor;
            if (percentage > 85) {
                backgroundColor = "#24aa24"
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
            providerTagEl.innerHTML = `
            <p class="provider-name">${firstUpperCase(provider)}</p> 
            <p class="provider-rating">:(</p>
            <p class="provider-rating-count">brak wyników albo problem z usługą</p></a>
            `
        }

        // IF SCORE NOT AVAILABLE FOR THE PLACE, PRINTS "Couldn't find"

    } else {

        printToHTML(provider, ':(');
        printToHTML(provider, `Couldn't find`);
    }









    //////////////////////////////////////////////////////////// moje małe funkcje

    



    // providers.forEach(provider => {
    //     fetchResults(lat, lng, name, provider);
    // })

    // END OF RESULTS - PRINTING NAME, WEBSITE, SHARELINK AND ADDRESS

}