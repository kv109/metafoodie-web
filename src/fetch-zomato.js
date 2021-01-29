import {
    preloader
} from './preloader'
import {
    renderResults
} from './render-results'
import {
    loadingError
} from './loading-error-catch'



// FETCH ZOMATO FUNCTION

export const zomatoFetch = (name, lat, lng) => {
    preloader('zomato');

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

    const provider = 'zomato';
    const params = `lat=${lat}&lng=${lng}&name=${zomatoName}`;
    const apiUrl = `https://5ysytaegql.execute-api.eu-north-1.amazonaws.com/search/${provider}?${params}`;

    preloader(provider);

    fetch(apiUrl)
        .then(response => response.json())
        .then(zomatoObject => {

            const zomatoData = {
                data: [{
                    name: zomatoObject.restaurants[0].restaurant.name,
                    rating: Number(zomatoObject.restaurants[0].restaurant.user_rating.aggregate_rating),
                    rating_count: zomatoObject.restaurants[0].restaurant.user_rating.votes,
                    url: zomatoObject.restaurants[0].restaurant.url
                }],
                provider
            }

            if (zomatoObject.restaurants[0].restaurant.user_rating.aggregate_rating == null || zomatoObject.restaurants[0].restaurant.user_rating.votes == null) {
                console.log("niepełne???")
                loadingError(provider)

            } else {

            // RENDER RESULTS

            renderResults(zomatoData);

            }

        })
        .catch(err => {
            loadingError(provider)
        })

}