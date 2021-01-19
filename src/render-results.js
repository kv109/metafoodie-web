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




// ------------------------------------------- RENDER RESULTS



let scoresArr = [];
let totalRatingCount = 0;
const providers = [];
// let summary = 0;

export const renderResults = results => {

    // console.log('renderResults -> results')
    // console.log(results)

    // RESULTS - PRINTING NAME, WEBSITE, SHARELINK AND ADDRESS

    const restaurantTitle = document.querySelector(".results-name");
    const restaurantAddress = document.querySelector(".results-address");

    let shareEndpoint;

    const place = results.data[0];
    const provider = results.provider;
    const rating = place.rating;
    const website = place.website;
    let rating_count;


    if (provider === 'google') {
        rating_count = place.user_ratings_total; // <------ GOOGLE

        // console.log(rating_count, place.formatted_address, place.name, place.website)

        if (window.location.href.indexOf('?query') < 1) {
            shareEndpoint = `${window.location.href.slice(0,window.location.href.indexOf('?query'))}/?query=`
        } else {
            shareEndpoint = `${window.location.href.slice(0,window.location.href.indexOf('?query'))}?query=`
        }
    
        let shareLink = `${shareEndpoint}${place.name}, ${place.formatted_address}`
    
        // restaurantTitle.innerHTML = `<a href="${place.website}" target="_blank">${place.name}</a><div class="results-share"><a target="_blank" href="${shareLink}">Skopiuj link do wyników</a></div>`;    
    
        if (place.website) {
    // console.log('nazwa ze stroną')
            restaurantTitle.innerHTML = `${place.name}<div class="results-share"><a target="_blank" href="${place.website}">Strona restauracji  &#8594;</a></div>`;
    
        } else {
    // console.log('nazwa bez strony')
    
            restaurantTitle.innerHTML = `${place.name}`;
        }
            //  &#8594; strzałka
    
        restaurantAddress.innerHTML = place.formatted_address;

    } else {
        rating_count = place.rating_count; // <------ OTHER PROVIDERS
    }

    // console.log(typeof rating)
    // console.log(rating)
    // console.log(typeof rating_count);
    // console.log(rating_count);

    const url = place.url;
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





    // REMOVE ARROW INFO

    resultsArrowEl.classList.remove("hidden");

    if (place) {
        const rating = parseFloat(place.rating);
        const isRatingNumber = !isNaN(rating);

        // AVERAGE SCORE PRESENTATION

        if (isRatingNumber) {

            // console.log('number')

            // RESULTS RENDER FOR MOBILE AND DESTKOP

            // mediaQuery(printResultsForMobile, printResultsForDesktop);
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