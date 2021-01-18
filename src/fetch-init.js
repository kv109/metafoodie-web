import {yelpFetch} from './fetch-yelp'
import {zomatoFetch} from './fetch-zomato'
import {foursquareFetch} from './fetch-foursquare'


// ------------------------------------------- FETCH FROM PROVIDERS

export const fetchResults = place => {

    console.log('fetchResults -> place')
    console.log(place)

    const name = place.name;
    const location = place.geometry.location;
    const lat = location.lat();
    const lng = location.lng();


    // zomatoFetch(name, lat, lng); // 1000 API calls daily
    // foursquareFetch(name, lat, lng); // 500 API calls daily
    yelpFetch(name, lat, lng) // 5000 API calls daily






    // PRELOADER

    // providers.forEach(provider => {
    //     printToHTML(provider, 'Loading...');
    //     printToHTML(provider, 'Loading...');
    // })

    // AMAZON SERVERLESS STORAGE REQUEST

    // const params = `lat=${lat}&lng=${lng}&name=${name}&provider=${provider}`;
    // const apiUrl = `https://5ysytaegql.execute-api.eu-north-1.amazonaws.com/search/by_lat_lng_name?${params}`;

    // fetch(apiUrl)
    //     .then(resolve => resolve.json())
    //     .then(resolve => {
    //         renderResults(resolve)
    //     })
    //     .catch(err => console.log(err))

    // document.querySelector(".alert").classList.add('hidden');




}