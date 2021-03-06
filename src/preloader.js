import {
    firstUpperCase
} from './first-upper-case.js'


// PRELOADER -> ROTATING ARROW

export const preloader = (provider) => {
    document.querySelector(`.results-provider-${provider}`).innerHTML = `
    <p class="provider-name">${firstUpperCase(provider)}</p>
    <div class="results-preloader-container"><img class="results-preloader" src="img/preloader-arrow.svg" alt="Trwa ładowanie wyników..."></div>

    `;
}