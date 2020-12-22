// import {searchForUserQuery} from './user-query.js'

const providers = ["facebook", "yelp", "zomato"]

let summary = 0;
let ratingsCount = 0;
let scoresArr = [];
let totalRatingCount = 0;
let markers = []

//  searchForUserQuery

// const searchForUserQuery = _ => {
//     let userQuery = window.location.search.slice((window.location.search.search('=') + 1));
//     if (userQuery !== '') {
//         let decodedUserQuery = decodeURIComponent(userQuery);
//         console.log(decodedUserQuery);

//         // appendResults(decodedUserQuery);
//         // fetchResultsForGooglePlace(decodedUserQuery)
//     } else {
//         console.log('string null')
//     }
// }

// searchForUserQuery();

// END OF searchForUserQuery

const printOutput = (provider, tagClass, info) => {
    document.querySelector(`#${provider}_results td.${tagClass}`).innerHTML = info;
}

function fetchResults(lat, lng, name, provider) {

    // PRELOADER

    providers.forEach(provider => {
        printOutput(provider, 'name', 'Loading...');
        printOutput(provider, 'rating', 'Loading...');
    })

    // AMAZON SERVERLESS STORAGE REQUEST

    const params = `lat=${lat}&lng=${lng}&name=${name}&provider=${provider}`;
    const apiUrl = `https://5ysytaegql.execute-api.eu-north-1.amazonaws.com/search/by_lat_lng_name?${params}`;

    fetch(apiUrl)
        .then(resolve => resolve.json())
        .then(resolve => appendResults(resolve))
        .catch(err => console.log(err))

}

// SCORES TABLE GENERATION

function appendResults(results) {
    const place = results.data[0];
    const provider = results.provider;
    const providerRowSelectorEl = document.querySelector(`#${provider}_results`);
    const providerRatingTagEl = providerRowSelectorEl.firstElementChild.nextElementSibling;
    const providerNameTagEl = providerRowSelectorEl.lastElementChild;
    const ratingSummaryEl = document.querySelector(".rating-summary");
    const restaurantTitle = document.querySelector(".restaurant-title");

    if (place) {
        const rating = parseFloat(place.rating)
        const isRatingNumber = !isNaN(rating);

        if (isRatingNumber) {
            providerRatingTagEl.innerHTML = `${rating} (${place.rating_count})`;
        } else {
            providerRatingTagEl.innerHTML = ("? / 0");
        }

        restaurantTitle.innerHTML = place.name;
        providerNameTagEl.innerHTML = place.name;

        // AVERAGE SCORE PRESENTATION

        if (isRatingNumber) {
            ratingsCount += 1;
            summary += rating;

            // CALCULATING ARITMETIC AVERAGE
            // const percentage = Math.round(((summary / ratingsCount) / 5) * 100)

            // CALCULATING WEIGTHED AVERAGE

            scoresArr.push(Math.round(rating * place.rating_count));
            totalRatingCount += place.rating_count;

            let numerator = 0;
            let denumerator = totalRatingCount;

            scoresArr.forEach(score => {
                numerator += score;
            });

            const percentage = Math.round(numerator / denumerator / 5 * 100);

            // console.log(provider, rating, place.rating_count);
            // console.log(scoresArr);
            // console.log(numerator, denumerator);

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
            ratingSummaryEl.innerHTML = `${percentage}%`
        }

        // IF SCORE NOT AVAILABLE FOR PLACE, PRINTS "Couldn't find"

    } else {
        printOutput(provider, 'name', ':(');
        printOutput(provider, 'rating', `Couldn't find`);
    }
}


function fetchResultsForGooglePlace(place) {
    // console.log("place:", place)

    const foodPlaceTypes = ["bakery", "bar", "cafe", "meal_delivery", "meal_takeaway", "restaurant"]
    if (place.types.join().match(foodPlaceTypes.join("|")) == null) {
        document.querySelector(".alert").classList.remove('d-none');

    } else {
        document.querySelector(".alert").classList.add('d-none');
        const name = place.name;
        const location = place.geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        place.rating_count = place.user_ratings_total;
        appendResults({
            data: [place],
            provider: "google"
        })

        providers.forEach(function (provider) {
            fetchResults(lat, lng, name, provider);
        })
    }
}

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
window.App.initAutocomplete = function () {

    let userQuery = window.location.search.slice((window.location.search.search('=') + 1));
    let shareLinkEl = document.querySelector(".results-share")
    let shareEndpoint = 'localhost:5500/dist/?query='

    // Custom marker

    let icon = {
        url: 'https://walanus.pl/metafoodie/img/marker-icon/noun_Map%20Marker_22297C.png',
        size: new google.maps.Size(100, 132),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(50, 66)
    };

    // USER DON'T ENTER QUERY IN WEB ADDRESS

    if (userQuery == '') {

        let map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 52.2688369,
                lng: 20.9829954
            },
            zoom: 16,
            mapTypeId: 'roadmap',
            mapTypeControl: false,
            streetViewControl: false,
            mapId: '33280f2f68566682'
        });

        let placesService = new google.maps.places.PlacesService(map);

        // Create the search box and link it to the UI element.
        let input = document.getElementById('pac-input');
        let searchBox = new google.maps.places.SearchBox(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        // Getting results after clicking marker
        map.addListener('click', function (event) {
            if (event.placeId) {
                placesService.getDetails({
                    placeId: event.placeId
                }, function (place, status) {
                    fetchResultsForGooglePlace(place);
                });
                scoresArr = [];
                totalRatingCount = 0;
            }
        });

        let markers = [];

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.

        searchBox.addListener('places_changed', function () {
            let places = searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            let bounds = new google.maps.LatLngBounds();
            let place = places[0];
            console.log(place);
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map,
                icon,
                title: place.name,
                position: place.geometry.location
            }));

            // console.log("markers:", markers);

            if (place.geometry.viewport) {
                // Only geocodes have viewport
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
            // });
            map.fitBounds(bounds);
            fetchResultsForGooglePlace(place)
        });

        // USER ENTER QUERY IN WEB ADDRESS

    } else {

        let decodedUserQuery = decodeURIComponent(userQuery);
        console.log(decodedUserQuery);

        let map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 52.2688369,
                lng: 20.9829954
            },
            zoom: 16,
            mapTypeId: 'roadmap',
            mapTypeControl: false,
            streetViewControl: false,
            mapId: '33280f2f68566682'
        });

        let placesService = new google.maps.places.PlacesService(map);
        // Create the search box and link it to the UI element.

        const request = {
            query: decodedUserQuery,
            fields: ["name", "geometry", "type", "rating", "user_ratings_total", "formatted_address"]
        };

        console.log(request)

        placesService.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }

                console.log('results[0]:')
                console.log(results[0])

                map.setCenter(results[0].geometry.location);
            }

            // Create Share link

            let shareLink = `${shareEndpoint}${results[0].name}, ${results[0].formatted_address}`
            shareLinkEl.innerHTML = `<a target="_blank" href="${shareLink}">${shareLink}</a>`;

            // END of Create Share link

            fetchResultsForGooglePlace(results[0])

        });

        function createMarker(place) {
            const marker = new google.maps.Marker({
                map,
                position: place.geometry.location,
                icon
            });
        }

        // WORKING SEARCHBOX

        let input = document.getElementById('pac-input');
        let searchBox = new google.maps.places.SearchBox(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        // Getting results after clicking marker
        map.addListener('click', function (event) {
            if (event.placeId) {
                placesService.getDetails({
                    placeId: event.placeId
                }, function (place, status) {

            // Create Share link

            shareLink = `${shareEndpoint}${place.name}, ${place.formatted_address}`
            shareLinkEl.innerHTML = `<a target="_blank" href="${shareLink}">${shareLink}</a>`;

            // END of Create Share link

                    fetchResultsForGooglePlace(place);
                });
                scoresArr = [];
                totalRatingCount = 0;



            }
        });

        let markers = [];


        searchBox.addListener('places_changed', function () {
            let places = searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            let bounds = new google.maps.LatLngBounds();
            let place = places[0];

            // Create Share link

            shareLink = `${shareEndpoint}${place.name}, ${place.formatted_address}`
            shareLinkEl.innerHTML = `<a target="_blank" href="${shareLink}">${shareLink}</a>`;

            // END of Create Share link


            console.log(place);
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map,
                icon,
                title: place.name,
                position: place.geometry.location
            }));

            // console.log("markers:", markers);

            if (place.geometry.viewport) {
                // Only geocodes have viewport
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
            // });



            map.fitBounds(bounds);
            fetchResultsForGooglePlace(place)
            

        });



    }
}