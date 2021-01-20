require("./app")

import {mapRender} from './map-render'



// ------------------------------------------- APP INIT AND GEOLOCATION

window.App.initAutocomplete = _ => {

    // IP GEOLOCATION 1. HTML5 geolocation 2. IP geolocation, 3. Predefined location

    fetch('https://ipinfo.io/?token=76daefe47a48fd')
        .then(response => response.json())
        .then(geolocation => {

            // IP INFO

            let client_lat = Number(geolocation.loc.split(',')[0]);
            let client_lon = Number(geolocation.loc.split(',')[1]);
            mapRender(client_lat, client_lon, 16);

            // HTML5

            navigator.geolocation.getCurrentPosition(position => {
                mapRender(position.coords.latitude, position.coords.longitude, 16);
            })
        })

        .catch(err => {
            mapRender(52.0730317, 16.624927, 5);
        })

}