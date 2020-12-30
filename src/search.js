const providers = ["facebook"]

let summary = 0;
let ratingsCount = 0;
let scoresArr = [];
let totalRatingCount = 0;

const createShareLink = place => {

    let shareLinkEl = document.querySelector(".results-share")
    let shareEndpoint = `${window.location.href.slice(0,window.location.href.indexOf('?query'))}/?query=`
    shareLink = `${shareEndpoint}${place.name}, ${place.formatted_address}`
    shareLinkEl.innerHTML = `<a target="_blank" href="${shareLink}">${shareLink}</a>`;

}

const printOutput = (provider, tagClass, info) => {
    document.querySelector(`#${provider}_results td.${tagClass}`).innerHTML = info;
}

// ZOMATO FETCH

const zomatoFetch = (name, lat, lng) => {

    // // GET CITY ID VIA COORDINATES
    // //https://developers.zomato.com/api/v2.1/search?entity_id=265&entity_type=city&q=jeffs&count=10&lat=50.2719995&lon=19.0013386&radius=100


    // // CORRECTING PLACE NAME


    // const nameZomato = name;
    // const regex = /'/i
    // const nameZomatoRegEx = nameZomato.replace(regex, '').toLowerCase();
    // // console.log(nameZomatoRegEx);
    // const nameZomatoEnc = encodeURI(nameZomatoRegEx);
    // // console.log(nameZomatoEnc);


    // // END CORRECTING PLACE NAME


    // const zomatoEndpoint = 'https://developers.zomato.com/api/v2.1/';

    // fetch(`${zomatoEndpoint}cities?lat=${lat}&lon=${lng}`, {
    //         headers: {
    //             'user-key': '75ee7a9950d1cc11bfa90884ecc49cee'
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(json => {
    //         let cityId = json.location_suggestions[0].id;
    //         return fetch(`${zomatoEndpoint}search?entity_id=${cityId}&entity_type=city&q=${nameZomatoEnc}&count=10&lat=${lat}&lon=${lng}&radius=100`, {
    //             headers: {
    //                 'user-key': '75ee7a9950d1cc11bfa90884ecc49cee'
    //             }
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(zomatoObject => {
    //         console.log(zomatoObject);
    //         console.log(zomatoObject.restaurants[0].restaurant.name);
    //         console.log(zomatoObject.restaurants[0].restaurant.user_rating.aggregate_rating);
    //         console.log(zomatoObject.restaurants[0].restaurant.user_rating.votes);

    //         const zomatoData = {
    //             data: [{
    //                 name: zomatoObject.restaurants[0].restaurant.name,
    //                 rating: zomatoObject.restaurants[0].restaurant.user_rating.aggregate_rating,
    //                 rating_count: zomatoObject.restaurants[0].restaurant.user_rating.votes
    //             }],
    //             provider: 'zomato'
    //         }

    //         appendResults(zomatoData);

    //     })
    //     .catch(err => console.log(err));
}

// END ZOMATO FETCH





// YELP FETCH

const yelpFetch = (name, lat, lng, address) => {

    const yelpEndpoint = 'https://api.yelp.com/v3'
    const CORS = 'https://cors-anywhere.herokuapp.com/'


    // CORRECTING PLACE NAME
    let yelpTempName = name;

    let regEx = /(bistro|restauracja|cantine)/ig;

    yelpTempName = yelpTempName.replace(regEx, '');
    console.log('/bistro|restauracja/')
    console.log(yelpTempName)

    // regEx = /restauracja/i;
    // yelpTempName = yelpTempName.replace(regEx, '');
    // console.log('/restauracja/')
    // console.log(yelpTempName)

    regEx = /^ /i;
    yelpTempName = yelpTempName.replace(regEx, '');
    console.log('/^ /')
    console.log(yelpTempName)

    regEx = /(\-|\.)/ig;
    yelpTempName = yelpTempName.replace(regEx, '');
    console.log('/znaki specjalne/')
    console.log(yelpTempName)

    // let name = 'Craft Beereeeeee Muranów - Piwny Świat'
    regEx = /\s\w*\s/i
    // const yelpName = encodeURI(name);
    // console.log(name.indexOf(regEx.exec(name))+regEx.exec(name)[0].length);
    if (regEx.exec(yelpTempName) != null) {
        yelpTempName = yelpTempName.slice(0, yelpTempName.indexOf(regEx.exec(yelpTempName)) + regEx.exec(yelpTempName)[0].length);
    };

    console.log('/\s\w*\s/')
    console.log(yelpTempName)

    regEx = / +$/i;
    yelpTempName = yelpTempName.replace(regEx, '');
    console.log('/ +$/')
    console.log(yelpTempName)



    // yelpTempName = yelpTempName.;
    // const yelpName = encodeURI('restauracja ogród smaku');
    // const yelpName = 'restauracja ogród smaku';
    const yelpName = yelpTempName;

    // console.log(yelpName);
    // console.log(address);

    // const yelpAddress = encodeURI('Nowolipki 17c, 00-152 Warszawa, Polska')
    // console.log(yelpAddress)

    // END CORRECTING PLACE NAME

    const yelpURL = `${CORS}${yelpEndpoint}/businesses/search?term=${yelpName}&latitude=${lat}&longitude=${lng}&limit=3&radius=100`
    // &ocation=${address}
    console.log(yelpURL);
    // const yelpURL = `${CORS}${yelpEndpoint}/businesses/phone?phone=+48124249600`
    // const yelpURL = `${CORS}${yelpEndpoint}/businesses/matches?name=${yelpName}&address1=${address}&city=warszawa&state=MZ&country=PL`

    fetch(yelpURL, {
            headers: {
                'Authorization': 'Bearer eUOzyXXUDELRannD8wqSnnZPs9cyKPqOsJBaFoBELGTTyghw1gL47dIPKLGb2HpFd_tDo0Z4TxJrd2Tv39b4dG_qjf7wMBU-sqUnjQY5kHOdXXDM-R50tLY5tETrX3Yx'
            }
        })
        .then(response => response.json())
        .then(yelpObject => {
            console.log(yelpObject);
            const yelpData = {
                data: [{
                    name: yelpObject.businesses[0].name,
                    rating: yelpObject.businesses[0].rating,
                    rating_count: yelpObject.businesses[0].review_count
                }],
                provider: 'yelp'
            }

            appendResults(yelpData);
        })
        .catch(err => {
            console.log('brak yelpa')
            const yelpData = {
                data: [{
                    name: 'brak yelpa',
                    rating: '',
                    rating_count: ''
                }],
                provider: 'yelp'
            }

            appendResults(yelpData);
        });
}

// END YELP FETCH


// FETCH SCORES FROM PROVIDERS

const fetchResults = (lat, lng, name, provider) => {

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
        .then(resolve => {

            // console.log(resolve);
            appendResults(resolve)
        })
        .catch(err => console.log(err))

}

// SCORES TABLE GENERATION

const appendResults = results => {
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

            // CALCULATING ARITMETIC AVERAGE

            // ratingsCount += 1;
            // summary += rating;
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
            ratingSummaryEl.innerHTML = `${percentage}%`
        }

        // IF SCORE NOT AVAILABLE FOR THE PLACE, PRINTS "Couldn't find"

    } else {
        printOutput(provider, 'name', ':(');
        printOutput(provider, 'rating', `Couldn't find`);
    }
}

// FETCH SCORE FROM GOOGLE AND THEN FROM OTHER PROVIDERS

const fetchResultsForGooglePlace = place => {

    // console.log('\n'.repeat('5'));
    // console.log('place:');
    // console.log(place);


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

        providers.forEach(provider => {
            fetchResults(lat, lng, name, provider);
        })

        zomatoFetch(name, lat, lng);
        yelpFetch(name, lat, lng, place.formatted_address);

    }
}

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

window.App.initAutocomplete = _ => {

    let userQuery = window.location.search.slice((window.location.search.search('=') + 1));
    let markers = [];

    // CUSTOM MARKER

    let icon = {
        url: 'https://walanus.pl/metafoodie/img/marker-icon/noun_Map%20Marker_22297C.png',
        size: new google.maps.Size(100, 132),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(50, 66)
    };

    // INITIALIZING GOOGLE MAP

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

    // INITIALIZING GOOGLE PLACES SERVICE

    let placesService = new google.maps.places.PlacesService(map);

    // Create the search box and link it to the UI element.

    let input = document.getElementById('pac-input');
    input.focus();
    let searchBox = new google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards current map's viewport.

    map.addListener('bounds_changed', _ => {
        searchBox.setBounds(map.getBounds());
    });

    // FETCH RESULTS AFTER CLICK ON MARKER

    map.addListener('click', event => {
        if (event.placeId) {
            placesService.getDetails({
                placeId: event.placeId
            }, (place, status) => {
                // console.log('place google:')
                // console.log(place)
                createShareLink(place);
                fetchResultsForGooglePlace(place);

            });

            // RESET OF WEIGHTED AVERAGE CALCULATIONS

            scoresArr = [];
            totalRatingCount = 0;
        }
    });

    searchBox.addListener('places_changed', _ => {
        let places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(marker => {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        let bounds = new google.maps.LatLngBounds();
        let place = places[0];

        createShareLink(place);

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

        if (place.geometry.viewport) {
            // Only geocodes have viewport
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
        fetchResultsForGooglePlace(place)
    });

    // IF USER ENTERS QUERY IN WEB ADDRESS

    if (userQuery) {

        // DECODING OF URL QUERY

        let decodedUserQuery = decodeURIComponent(userQuery);

        // FIND PLACE FROM QUERY INTERFACE

        const request = {
            query: decodedUserQuery,
            fields: ["name", "geometry", "type", "rating", "user_ratings_total", "formatted_address"]
        };

        placesService.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }

                let place = results[0];
                map.setCenter(place.geometry.location);
                createShareLink(place);
                fetchResultsForGooglePlace(place);
            }
        });

        const createMarker = place => {
            const marker = new google.maps.Marker({
                map,
                position: place.geometry.location,
                icon
            });
        }
    }
}