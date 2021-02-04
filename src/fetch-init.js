import {
    yelpFetch
} from './fetch-yelp'
import {
    zomatoFetch
} from './fetch-zomato'
import {
    foursquareFetch
} from './fetch-foursquare'


// ------------------------------------------- FETCH FROM PROVIDERS

export const fetchResults = place => {

    const name = place.name;
    const location = place.geometry.location;
    const lat = location.lat();
    const lng = location.lng()

    zomatoFetch(name, lat, lng); // 1000 API calls daily
    // foursquareFetch(name, lat, lng); // 500 API calls daily
    yelpFetch(name, lat, lng) // 5000 API calls daily

}