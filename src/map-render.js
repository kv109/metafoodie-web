import {
    renderResults
} from './render-results'
import {
    fetchResults
} from './fetch-init'
// import {inputEl} from './index'

// export const headerEl = document.querySelector("header");

// export const inputEl = document.getElementById('pac-input');

// console.log(inputEl)



export const mapRender = (client_lat, client_lon, zoom) => {
    // console.log('mapRender start')
    let userQuery = window.location.search.slice((window.location.search.search('=') + 1));
    let markers = [];

    const headerEl = document.querySelector("header");
    const inputEl = document.getElementById('pac-input');


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
            lat: client_lat,
            lng: client_lon
        },
        zoom: zoom,
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        streetViewControl: false,
        mapId: '33280f2f68566682',
    });

    // INITIALIZING GOOGLE PLACES SERVICE

    let placesService = new google.maps.places.PlacesService(map);

    // Create the search box and link it to the UI element.

    const autocompleteOptions = {
        // bounds: defaultBounds,
        types: ['establishment']
    };

    let searchBox = new google.maps.places.Autocomplete(inputEl, autocompleteOptions);

    searchBox.setFields(['geometry', 'formatted_address', 'name', 'rating', 'user_ratings_total', 'url', 'website']);

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


                renderResults({
                    data: [place],
                    provider: "google"
                })


                fetchResults(place);
                inputEl.value = '';
            });

            // RESET OF WEIGHTED AVERAGE CALCULATIONS

            scoresArr = [];
            totalRatingCount = 0;
        }
    });

    searchBox.addListener('place_changed', _ => {

        let places = searchBox.getPlace();
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
        let place = places;

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
        inputEl.value = '';

        renderResults({
            data: [place],
            provider: "google"
        })

        fetchResults(place)
    });

    // IF USER ENTERS QUERY IN WEB ADDRESS

    if (userQuery) {

        // DECODING OF URL QUERY

        let decodedUserQuery = decodeURIComponent(userQuery);

        // FIND PLACE FROM QUERY INTERFACE

        const request = {
            query: decodedUserQuery,
            fields: ["name", "geometry", "type", "rating", "user_ratings_total", "formatted_address"]
            // 'geometry', 'formatted_address', 'name', 'rating', 'user_ratings_total', 'url', 'website'
        };

        placesService.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }

                let place = results[0];
                map.setCenter(place.geometry.location);
                inputEl.value = '';

                renderResults({
                    data: [place],
                    provider: "google"
                })

                fetchResults(place);
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
};