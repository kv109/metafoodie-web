import {
    preloader
} from './preloader'
import {
    loadingError,
    loadingErrorEndOfAPICalls
} from './loading-error-catch'
import {
    renderResults
} from './render-results'

let yelpData = {}; 


// FETCH YELP FUNCTION

export const yelpFetch = (name, lat, lng) => {
    preloader('yelp');

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

    // // CHANGE WHITE SPACES TO %20

    // regEx = / /;
    // yelpTempName = yelpTempName.replace(regEx, '%20');


    const yelpName = encodeURI(yelpTempName);

    //// END CORRECTING PLACE NAME




    //// FETCH

        const provider = 'yelp';
        const params = `lat=${lat}&lng=${lng}&name=${yelpName}`;
        const apiUrl = `https://5ysytaegql.execute-api.eu-north-1.amazonaws.com/search/${provider}?${params}`;

        // console.log(yelpName);
        // console.log(apiUrl);


        preloader(provider);
    
        fetch(apiUrl)
            .then(response => response.json())
            .then(yelpObject => {
    
                // console.log(provider)
                // console.log(yelpObject)
    
                const yelpData = {
                    data: [{
                        name: yelpObject.businesses[0].name,
                        rating: yelpObject.businesses[0].rating,
                        rating_count: yelpObject.businesses[0].review_count,
                        url: yelpObject.businesses[0].url
                    }],
                    provider
                }
    
                // RENDER RESULTS
    
                renderResults(yelpData);
    
            })
            .catch(err => {
                loadingError('yelp')
            })
    
    }

// const yelpEndpoint = 'https://api.yelp.com/v3'
// const CORS = 'https://cors-anywhere.herokuapp.com/'

//     const yelpURL = `${CORS}${yelpEndpoint}/businesses/search?term=${yelpName}&latitude=${lat}&longitude=${lng}&limit=3&radius=100`

//     fetch(yelpURL, {
//             headers: {
//                 'Authorization': 'Bearer eUOzyXXUDELRannD8wqSnnZPs9cyKPqOsJBaFoBELGTTyghw1gL47dIPKLGb2HpFd_tDo0Z4TxJrd2Tv39b4dG_qjf7wMBU-sqUnjQY5kHOdXXDM-R50tLY5tETrX3Yx'
//             }
//         })
//         .then(response => response.json())
//         .then(yelpObject => {
//             console.log('yelpObject pre')
//             console.log(yelpObject)

//             yelpData = {
//                 data: [{
//                     name: yelpObject.businesses[0].name,
//                     rating: yelpObject.businesses[0].rating,
//                     rating_count: yelpObject.businesses[0].review_count,
//                     url: yelpObject.businesses[0].url
//                 }],
//                 provider: 'yelp'
//             }

//             // APPEND RESULTS
//             console.log('yelpObject post')
//             console.log(yelpObject)


//             renderResults(yelpData);

//         })
//         .catch(err => {

//             // if (getIdObject.meta.code === 429) {
//             //     loadingErrorEndOfAPICalls('yelp')
//             // } else if (getIdObject.meta.code === 404) {
//             //     loadingError('yelp')
//             // } else {
//             loadingError('yelp')
//             // }
//             console.log(err);

//         });
// }

// END YELP FETCH