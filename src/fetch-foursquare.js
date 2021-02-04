import {
    preloader
} from './preloader'
import {
    renderResults
} from './render-results'
import {
    loadingError
} from './loading-error-catch'






// export const foursquareFetch = (name, lat, lng) => {

//     const foursquareClientId = 'N0G1TES0V3ME5GSZA4GLP0E2FABY3R5PY32M11NJ0NJ00R51'
//     const foursquareClientSecret = 'WJXVCJN22MA2N2F5EMBU0YOQY1ILPGHAF4O23DQZOJJUZP3S'
//     const foursquareEndPoint = `https://api.foursquare.com/v2/venues/`
//     const foursquareRequiredURLPart = `client_id=${foursquareClientId}&client_secret=${foursquareClientSecret}&v=20210101`
//     const foursquareGetVenueIdURL = `${foursquareEndPoint}search?${foursquareRequiredURLPart}&ll=${lat},${lng}&radius=100&limit=1&query=${name}`

//     console.log('input name');
//     console.log(name);

//     fetch(foursquareGetVenueIdURL)
//         .then(response => response.json())
//         .then(getIdObject => {
//             // console.log(getIdObject.response.venues[0].name);
//             // console.log(getIdObject.response.venues[0].id);
//             console.log('getIdObject');

//             console.log(getIdObject);
//             const foursquareRestaurantURL = `${foursquareEndPoint}${getIdObject.response.venues[0].id}?${foursquareRequiredURLPart}`
//             return fetch(foursquareRestaurantURL)
//         })
//         .then(response => response.json())
//         .then(foursquareObject => {
//             console.log('foursquareObject')
//             console.log(foursquareObject)
//             console.log(foursquareObject.response.venue.name)
//             console.log(foursquareObject.response.venue.rating)
//             console.log(foursquareObject.response.venue.ratingSignals)
//             const foursquareData = {
//                 data: [{
//                     name: foursquareObject.response.venue.name,
//                     rating: foursquareObject.response.venue.rating / 2,
//                     rating_count: foursquareObject.response.venue.ratingSignals
//                 }],
//                 provider: 'foursquare'
//             }
//             renderResults(foursquareData);
//         })
//         .catch(err => console.log(err))
// }











// ------------------------------------------- FETCH FOURSQUARE FUNCTION

export const foursquareFetch = (name, lat, lng) => {

    const provider = 'foursquare';
    const params = `lat=${lat}&lng=${lng}&name=${name}`;
    const apiUrl = `https://5ysytaegql.execute-api.eu-north-1.amazonaws.com/search/${provider}?${params}`;

    // console.log(apiUrl);


    preloader(provider);

    fetch(apiUrl)
        .then(response => response.json())
        .then(foursquareObject => {
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
                loadingError(provider)

            } else {

                renderResults(foursquareData)

            }
        })
        .catch(err => {
            loadingError(provider)
        })

}