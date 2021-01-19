import {
    firstUpperCase
} from './first-upper-case'


export const loadingError = (provider) => {
    document.querySelector(`.results-provider-${provider}`).innerHTML =
        `           
    <p class="provider-name">${firstUpperCase(provider)}</p> 
    <p class="no-results-icon"><img src="img/no-results.svg" width="40%"></p>
    <p class="provider-rating-count no-results-info">Brak wyników lub problem z usługą</p></a>
    `
}

export const loadingErrorEndOfAPICalls = (provider) => {
    document.querySelector(`.results-provider-${provider}`).innerHTML =
        `          
    <p class="provider-name">${firstUpperCase(provider)}</p> 
    <p class="no-results-icon"><img src="img/no-results.svg" width="40%"></p>
    <p class="provider-rating-count no-results-info">Wyczerpany dzienny limit zapytań do API (500)</p></a>

    `
}