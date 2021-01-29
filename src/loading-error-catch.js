import {
    firstUpperCase
} from './first-upper-case'
import {
    matchMediaMobile,
    matchMediaTablet,
    matchMediaDesktop,
    mediaQueryChange
} from './mediaqueries'

export const loadingErrorMobile = (provider) => {

    if (matchMediaMobile.matches) {

        document.querySelector(`.results-provider-${provider}`).innerHTML =
            `           
            <p class="provider-icon"><img class="icon" src="img/provider-${provider}-dim.svg" alt="${provider}"></p>
            <p class="provider-rating-count no-results-info">Brak danych</p></div>
            `
    }
}

export const loadingErrorTablet = (provider) => {

    if (matchMediaTablet.matches) {

        document.querySelector(`.results-provider-${provider}`).innerHTML =
            `           
            <p class="provider-icon"><img class="icon" src="img/provider-${provider}-dim.svg" alt="${provider}"></p>
            <p class="provider-rating-count no-results-info">Brak danych</p></div>
            `
    }
}

export const loadingErrorDesktop = (provider) => {

    if (matchMediaDesktop.matches) {

        document.querySelector(`.results-provider-${provider}`).innerHTML =
            `           
            <div class="error-background">
            <p class="provider-icon"><img class="icon" src="img/provider-${provider}-dim.svg" alt="${provider}"></p>
            <!-- <p class="no-results-icon"><img src="img/no-results.svg" alt="Przepraszamy!" width="40%"></p> -->
            <p class="provider-rating-count no-results-info">Brak wyników lub problem z usługą</p></div>
    `
    }
}

export const loadingErrorEndOfAPICalls = (provider) => {
    document.querySelector(`.results-provider-${provider}`).innerHTML =
        `          
        <div class="error-background">
        <p class="provider-name">${firstUpperCase(provider)}</p> 
        <!-- <p class="no-results-icon"><img src="img/no-results.svg" alt="Przepraszamy!" width="40%"></p> -->
        <p class="provider-rating-count no-results-info">Wyczerpany dzienny limit zapytań do API (500)</p></div>

    `
}

export const loadingError = provider => {
    loadingErrorMobile(provider)
    // loadingErrorTablet(provider)
    loadingErrorDesktop(provider)
    if (!mediaQueryChange) {
        matchMediaMobile.addListener(_ => loadingErrorMobile(provider))
        // matchMediaTablet.addListener(_ => loadingErrorTablet(provider))
        matchMediaDesktop.addListener(_ => loadingErrorDesktop(provider))
    }
}