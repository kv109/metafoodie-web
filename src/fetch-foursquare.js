import {
    preloader
} from './preloader'
import {
    renderResults
} from './render-results'
import {
    loadingError
} from './loading-error-catch'



// ------------------------------------------- FETCH FOURSQUARE FUNCTION

export const foursquareFetch = (name, lat, lng) => {

    const provider = 'foursquare';
    const params = `lat=${lat}&lng=${lng}&name=${name}`;
    const apiUrl = `https://5ysytaegql.execute-api.eu-north-1.amazonaws.com/search/${provider}?${params}`;

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