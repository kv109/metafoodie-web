const providers = ["facebook"]

let summary = 0;
let ratingsCount = 0;
let scoresArr = [];
let totalRatingCount = 0;

const firstUpperCase = word => `${word[0].toUpperCase()}${[...word].splice(1).join('')}`

const printOutput = (provider, info) => {
    document.querySelector(`.results-provider-${provider}`).innerHTML = info;
}

// FETCH FOURSQUARE FUNCTION

const foursquareFetch = (name, lat, lng) => {

    const foursquareClientId = 'N0G1TES0V3ME5GSZA4GLP0E2FABY3R5PY32M11NJ0NJ00R51'
    const foursquareClientSecret = 'WJXVCJN22MA2N2F5EMBU0YOQY1ILPGHAF4O23DQZOJJUZP3S'
    const foursquareEndPoint = `https://api.foursquare.com/v2/venues/`
    const foursquareRequiredURLPart = `client_id=${foursquareClientId}&client_secret=${foursquareClientSecret}&v=20210101`
    const foursquareGetVenueIdURL = `${foursquareEndPoint}search?${foursquareRequiredURLPart}&ll=${lat},${lng}&radius=100&limit=1&query=${name}`

    fetch(foursquareGetVenueIdURL)
        .then(response => response.json())
        .then(getIdObject => {
            const foursquareRestaurantURL = `${foursquareEndPoint}${getIdObject.response.venues[0].id}?${foursquareRequiredURLPart}`
            return fetch(foursquareRestaurantURL)
        })
        .then(response => response.json())
        .then(foursquareObject => {
            const foursquareData = {
                data: [{
                    name: foursquareObject.response.venue.name,
                    rating: foursquareObject.response.venue.rating / 2,
                    rating_count: foursquareObject.response.venue.ratingSignals,
                    url: foursquareObject.response.venue.canonicalUrl
                }],
                provider: 'foursquare'
            }

            // APPEND RESULTS

            appendResults(foursquareData);
        })
        .catch(err => console.log(err))
}



// FETCH ZOMATO FUNCTION

const zomatoFetch = (name, lat, lng) => {

    //// CORRECTING PLACE NAME

    let zomatoTempName = name;

    // CHANGING FOREIGN CHARACTERS TO LATIN ONES

    let nonLatinCharSwitchArr = [
        ['a', '00c0', '00c6', '00e0', '00e6'],
        ['c', '00c7', '00c7', '00e7', '00e7'],
        ['e', '00c8', '00cb', '00e8', '00eb'],
        ['i', '00cc', '00cf', '00ec', '00ef'],
        ['d', '00d0', '00d0', '00f0', '00f0'],
        ['n', '00d1', '00d1', '00f1', '00f1'],
        ['o', '00d2', '00d6', '00f2', '00f6'],
        ['o', '00d8', '00d8', '00f8', '00f8'],
        ['u', '00d9', '00dc', '00f9', '00fc'],
        ['y', '00dd', '00dd', '00fd', '00ff'],
        ['s', '00df', '00df', '00df', '00df'],

    ]

    nonLatinCharSwitchArr.forEach(range => {
        let charRange = `([\\u${range[1]}-\\u${range[2]}]|[\\u${range[3]}-\\u${range[4]}])`
        let regEx = new RegExp(charRange, 'ig');
        zomatoTempName = zomatoTempName.replace(regEx, nonLatinCharSwitchArr[nonLatinCharSwitchArr.indexOf(range)][0]);
    })

    // LEAVE ONLY 3 WORDS AT THE BEGINNING OF THE NAME

    let regEx = /\s[\wąęśółźżń]+\s[\wąęśółźżń]+\s/i;
    if (regEx.exec(zomatoTempName) != null) {
        zomatoTempName = zomatoTempName.slice(0, zomatoTempName.indexOf(regEx.exec(zomatoTempName)) + regEx.exec(zomatoTempName)[0].length);
    };

    // CHANGE POLISH CHARACTERS TO LATIN ONES

    const changePLToLA = (text, character, newCharacter) => {
        let regEx = new RegExp(character, 'ig');
        return text.replace(regEx, newCharacter);
    }

    const plArr = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ż', 'ź']
    const laArr = ['a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z']

    plArr.forEach(character => {
        zomatoTempName = changePLToLA(zomatoTempName, character, laArr[plArr.indexOf(character)]);
    })

    // REMOVING SOME SPECIAL CHARACTERS

    regEx = /(\-|\.|\'|\,|\"|\&)/ig;
    zomatoTempName = zomatoTempName.replace(regEx, '');

    // REMOVING WORDS CONTAING ONLY TWO LETTERS

    regEx = /\s\w\w\s/i;
    zomatoTempName = zomatoTempName.replace(regEx, '');

    // REMOVE WHITE SPACE AT THE BEGINNING

    regEx = /^ /i;
    zomatoTempName = zomatoTempName.replace(regEx, '');

    // REMOVE WHITE SPACE AT THE END

    regEx = / +$/i;
    zomatoTempName = zomatoTempName.replace(regEx, '');

    let zomatoName = zomatoTempName;

    //// END CORRECTING PLACE NAME

    //// FETCH 

    const zomatoEndpoint = 'https://developers.zomato.com/api/v2.1/';

    // 1. GET CITY ID OF PROVIDED LAT & LNG

    fetch(`${zomatoEndpoint}cities?lat=${lat}&lon=${lng}`, {
            headers: {
                'user-key': '75ee7a9950d1cc11bfa90884ecc49cee'
            }
        })
        .then(response => {
            return response.json()
        })
        .then(json => {

            // 2. GET RESTAURANT DATA BASED ON RECIEVED CITY ID AND NAME, LAT & LNG

            let cityId = json.location_suggestions[0].id;
            let URL = `${zomatoEndpoint}search?entity_id=${cityId}&entity_type=city&q=${zomatoName}&count=10&lat=${lat}&lon=${lng}&radius=100&sort=real_distance`
            return fetch(URL, {
                headers: {
                    'user-key': '75ee7a9950d1cc11bfa90884ecc49cee'
                }
            })
        })
        .then(response => {
            return response.json()
        })
        .then(zomatoObject => {
            const zomatoData = {
                data: [{
                    name: zomatoObject.restaurants[0].restaurant.name,
                    rating: zomatoObject.restaurants[0].restaurant.user_rating.aggregate_rating,
                    rating_count: zomatoObject.restaurants[0].restaurant.user_rating.votes,
                    url: zomatoObject.restaurants[0].restaurant.url
                }],
                provider: 'zomato'
            }

            // APPEND RESULTS

            appendResults(zomatoData);
        })
        .catch(err => console.log(err));
}

// END FETCH ZOMATO FUNCTION


// FETCH YELP FUNCTION

const yelpFetch = (name, lat, lng) => {

    const yelpEndpoint = 'https://api.yelp.com/v3'
    const CORS = 'https://cors-anywhere.herokuapp.com/'

    //// CORRECTING PLACE NAME

    let yelpTempName = name;

    // REMOVING SPECIFIC WORDS

    let regEx = /(bistro|restauracja|cantine)/ig;
    yelpTempName = yelpTempName.replace(regEx, '');

    // REMOVE WHITE SPACE AT THE BEGINNING

    regEx = /^ /i;
    yelpTempName = yelpTempName.replace(regEx, '');

    // REMOVING SOME SPECIAL CHARACTERS

    regEx = /(\-|\.)/ig;
    yelpTempName = yelpTempName.replace(regEx, '');

    // LEAVE ONLY 2 WORDS FROM THE BEGINNING OF THE NAME

    regEx = /\s\w*\s/i
    if (regEx.exec(yelpTempName) != null) {
        yelpTempName = yelpTempName.slice(0, yelpTempName.indexOf(regEx.exec(yelpTempName)) + regEx.exec(yelpTempName)[0].length);
    };

    // REMOVE WHITE SPACE AT THE END

    regEx = / +$/i;
    yelpTempName = yelpTempName.replace(regEx, '');

    const yelpName = yelpTempName;

    //// END CORRECTING PLACE NAME

    const yelpURL = `${CORS}${yelpEndpoint}/businesses/search?term=${yelpName}&latitude=${lat}&longitude=${lng}&limit=3&radius=100`

    fetch(yelpURL, {
            headers: {
                'Authorization': 'Bearer eUOzyXXUDELRannD8wqSnnZPs9cyKPqOsJBaFoBELGTTyghw1gL47dIPKLGb2HpFd_tDo0Z4TxJrd2Tv39b4dG_qjf7wMBU-sqUnjQY5kHOdXXDM-R50tLY5tETrX3Yx'
            }
        })
        .then(response => response.json())
        .then(yelpObject => {
            const yelpData = {
                data: [{
                    name: yelpObject.businesses[0].name,
                    rating: yelpObject.businesses[0].rating,
                    rating_count: yelpObject.businesses[0].review_count,
                    url: yelpObject.businesses[0].url
                }],
                provider: 'yelp'
            }

            // APPEND RESULTS

            appendResults(yelpData);

        })
        .catch(err => {
            const yelpData = {
                data: [{
                    name: 'no restaurant in my database',
                    rating: '',
                    rating_count: ''
                }],
                provider: 'yelp'
            }
            appendResults(yelpData);
        });
}

// END YELP FETCH


// FETCH SCORES FROM PROVIDERS - REQUEST TO BACKEND, CURRENTLY WORKS ONLY FOR FACEBOOK

const fetchResults = (lat, lng, name, provider) => {

    // PRELOADER

    providers.forEach(provider => {
        printOutput(provider, 'Loading...');
        printOutput(provider, 'Loading...');
    })

    // AMAZON SERVERLESS STORAGE REQUEST

    const params = `lat=${lat}&lng=${lng}&name=${name}&provider=${provider}`;
    const apiUrl = `https://5ysytaegql.execute-api.eu-north-1.amazonaws.com/search/by_lat_lng_name?${params}`;

    fetch(apiUrl)
        .then(resolve => resolve.json())
        .then(resolve => {
            appendResults(resolve)
        })
        .catch(err => console.log(err))

}

// SCORES TABLE GENERATION

const appendResults = results => {
    const place = results.data[0];
    const provider = results.provider;
    const url = results.data[0].url;
    const ratingSummaryEl = document.querySelector(".results-average");
    const resultsArrowEl = document.querySelector('.results-arrow');
    let providerTagEl = document.querySelector(`.results-provider-${provider}`);
    
    resultsArrowEl.classList.remove("hidden");

    if (place) {
        const rating = parseFloat(place.rating)
        const isRatingNumber = !isNaN(rating);

        if (isRatingNumber) {

            providerTagEl.innerHTML = `
            <p class="provider-name"><a href="${url}" target="_blank">${firstUpperCase(provider)}</a></p>
            <p class="provider-rating">${rating}</p>
            <p class="provider-rating-count">${place.rating_count}</p>
            `
        } else {
            providerTagEl.innerHTML = ("? / 0");
        }

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
            ratingSummaryEl.innerHTML = `
            <p class="score-info">średnia ocena</p>
            <p class="score-percentage">${percentage}%</p>`
        }

        // IF SCORE NOT AVAILABLE FOR THE PLACE, PRINTS "Couldn't find"

    } else {
        printOutput(provider, ':(');
        printOutput(provider, `Couldn't find`);
    }
}

// FETCH SCORE FROM GOOGLE AND THEN FROM OTHER PROVIDERS

const fetchResultsForGooglePlace = place => {

    const foodPlaceTypes = ["bakery", "bar", "cafe", "meal_delivery", "meal_takeaway", "restaurant"]
    if (place.types.join().match(foodPlaceTypes.join("|")) == null) {
        document.querySelector(".alert").classList.remove('hidden');

    } else {
        document.querySelector(".alert").classList.add('hidden');
        const name = place.name;
        const location = place.geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        place.rating_count = place.user_ratings_total;
        appendResults({
            data: [place],
            provider: "google"
        })

        const restaurantTitle = document.querySelector(".results-name");
        const restaurantAddress = document.querySelector(".results-address");

        let shareEndpoint = `${window.location.href.slice(0,window.location.href.indexOf('?query'))}/?query=`
        let shareLink = `${shareEndpoint}${place.name}, ${place.formatted_address}`

        restaurantTitle.innerHTML = `${place.name}<div class="results-share"><a target="_blank" href="${shareLink}">Udostępnij wynik</a></div>`;
        restaurantAddress.innerHTML = place.formatted_address;

        providers.forEach(provider => {
            fetchResults(lat, lng, name, provider);
        })

        zomatoFetch(name, lat, lng); // 1000 API calls daily
        yelpFetch(name, lat, lng); // 5000 API calls daily
        foursquareFetch(name, lat, lng); // 500 API calls daily

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
                fetchResultsForGooglePlace(place);
                input.value = '';
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
        input.value = '';
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
                input.value = '';

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