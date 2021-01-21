import {
    preloader
} from './preloader'
import {
    renderResults
} from './render-results'
import {
    matchMediaMobile,
    matchMediaTablet,
    matchMediaDesktop,
} from './mediaqueries'
import {
    loadingErrorMobile,
    loadingErrorTablet,
    loadingErrorDesktop,
    mediaQueryChange,
    loadingError
    // loadingErrorFoursquareNotFullObject
} from './loading-error-catch'
import {
    data
} from 'jquery'




// ------------------------------------------- FETCH FOURSQUARE FUNCTION

export const foursquareFetch = (name, lat, lng) => {

    const provider = 'foursquare';
    const params = `lat=${lat}&lng=${lng}&name=${name}`;
    const apiUrl = `https://5ysytaegql.execute-api.eu-north-1.amazonaws.com/search/${provider}?${params}`;
    // const apiUrl = encodeURI(`https://5ysytaegql.execute-api.eu-north-1.amazonaws.com/search/${provider}?${params}`);
    // console.log(apiUrl)

    preloader(provider);

    fetch(apiUrl)
        .then(response => response.json())
        .then(foursquareObject => {
            // console.log('foursquareObject')
            // console.log(foursquareObject)
            const foursquareData = {
                data: [{
                    name: foursquareObject.response.venue.name,
                    rating: foursquareObject.response.venue.rating / 2,
                    rating_count: foursquareObject.response.venue.ratingSignals,
                    url: foursquareObject.response.venue.canonicalUrl
                }],
                provider
            }

            // APPEND RESULTS
            if (foursquareObject.response.venue.rating == null || foursquareObject.response.venue.ratingSignals == null) {
                // console.log("niepełne???")
                loadingError(provider)

            } else {

                renderResults(foursquareData)

            }
        })
        .catch(err => {
            // if (err.status === 500) {
            //     loadingErrorEndOfAPICalls('foursquare');
            // } else {
            // console.log("złoty groń")
            loadingError(provider)
            // }



            //         // }
        })






    // preloader('foursquare');
    // const foursquareClientId = 'N0G1TES0V3ME5GSZA4GLP0E2FABY3R5PY32M11NJ0NJ00R51'
    // const foursquareClientSecret = 'WJXVCJN22MA2N2F5EMBU0YOQY1ILPGHAF4O23DQZOJJUZP3S'
    // const foursquareEndPoint = `https://api.foursquare.com/v2/venues/`
    // const foursquareRequiredURLPart = `client_id=${foursquareClientId}&client_secret=${foursquareClientSecret}&v=20210101`
    // const foursquareGetVenueIdURL = `${foursquareEndPoint}search?${foursquareRequiredURLPart}&ll=${lat},${lng}&radius=100&limit=1&query=${name}`

    // fetch(foursquareGetVenueIdURL)
    //     .then(response => response.json())
    //     .then(getIdObject => {
    //         const foursquareRestaurantURL = `${foursquareEndPoint}${getIdObject.response.venues[0].id}?${foursquareRequiredURLPart}`
    //         return fetch(foursquareRestaurantURL)
    //     })
    //     .then(response => response.json())
    //     .then(foursquareObject => {
    //         const foursquareData = {
    //             data: [{
    //                 name: foursquareObject.response.venue.name,
    //                 rating: foursquareObject.response.venue.rating / 2,
    //                 rating_count: foursquareObject.response.venue.ratingSignals,
    //                 url: foursquareObject.response.venue.canonicalUrl
    //             }],
    //             provider: 'foursquare'
    //         }

    //         // APPEND RESULTS

    //         renderResults(foursquareData);
    //     })
    //     .catch(err => {

    //         // if (getIdObject.meta.code === 429) {
    //         //     loadingErrorEndOfAPICalls('foursquare');
    //         // } else {
    //         loadingError('foursquare')
    //         // }

    //     })
}