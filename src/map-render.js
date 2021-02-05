import {
    renderResults
} from './render-results'
import {
    fetchResults
} from './fetch-init'
import {
    matchMediaMobile,
    matchMediaTablet,
    matchMediaDesktop,
    mapGrow
} from './mediaqueries'
import {
    swipeResults
} from './results-swipe'


export const mapRender = (client_lat, client_lon, zoom) => {

    let userQuery = window.location.search.slice((window.location.search.search('=') + 1));
    let markers = [];
    let infoWindow;

    const placeMarker = place => {

        markers.forEach(marker => {
            marker.setMap(null);
        });
        markers = [];


        let marker = new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location
        })
    
        markers.push(marker);

        infoWindow = new google.maps.InfoWindow({
            content: `<p class="infowindow-title">${place.name}</p>
            <p class="infowindow-text">${place.formatted_address}</p>
            <p class="infowindow-link"><a href="https://www.google.com/search?q=${place.name}%20${place.formatted_address}" target="_blank">Szukaj informacji o '${place.name}' w Google</a></p>
            `
        });

        // SHOW INFOWINDOW ONLY ON DESKTOP

        const infoWindowDesktop = _ => {
            if (matchMediaDesktop.matches) {
                infoWindow.open(map, marker);
            }
        }

        infoWindowDesktop();
        matchMediaDesktop.addListener(infoWindowDesktop);


    }

    const headerEl = document.querySelector("header");
    const inputEl = document.getElementById('pac-input');
    inputEl.blur();


    // SET MAP HEIGHT

    const mapEl = document.getElementById('map');

    const mapHeightDesktop = _ => {

        if (matchMediaDesktop.matches) {

            mapEl.style.height = `${window.innerHeight*0.45}px`;
            window.addEventListener("resize", _ => {
                mapEl.style.height = `${window.innerHeight*0.45}px`;

            })
        }
    }

    mapHeightDesktop();
    matchMediaDesktop.addListener(mapHeightDesktop);

    // CUSTOM MARKER

    const icon = {

        url: 'https://maps.gstatic.com/mapfiles/ms2/micons/green.png',
        // url: 'https://walanus.pl/metafoodie/img/marker-icon/noun_Map%20Marker_22297C.png',
        // size: new google.maps.Size(100, 132),
        origin: new google.maps.Point(0, 0)
        // anchor: new google.maps.Point(17, 34),
        // scaledSize: new google.maps.Size(50,50)
    };


    // INITIALIZING GOOGLE MAP

    const map = new google.maps.Map(mapEl, {
        center: {
            lat: client_lat,
            lng: client_lon
        },
        zoom: zoom,
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        streetViewControl: false,
        mapId: '33280f2f68566682'

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

                placeMarker(place);

                swipeResults(map);
                renderResults({
                    data: [place],
                    provider: "google"
                })

                fetchResults(place);
                inputEl.value = '';

            });
        }
    });

    searchBox.addListener('place_changed', _ => {

        let places = searchBox.getPlace();
        if (places.length == 0) {
            return;
        }

        // For each place, get the icon, name and location.
        let bounds = new google.maps.LatLngBounds();
        let place = places;

        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }


        // Create a marker for each place.

        placeMarker(place);


        if (place.geometry.viewport) {
            // Only geocodes have viewport
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
        inputEl.value = '';

        swipeResults(map);

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
        };

        placesService.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                // for (let i = 0; i < results.length; i++) {
                //     createMarker(results[i]);
                // }              

                let place = results[0];
                map.setCenter(place.geometry.location);
                map.setOptions({
                    zoom: 16
                })
                inputEl.value = '';

                if (matchMediaMobile.matches) {
                    mapGrow();
                }

                swipeResults(map);
                renderResults({
                    data: [place],
                    provider: "google"
                })

                fetchResults(place);

                placeMarker(place);

            }
        });

    }
};