// PUSH INNER HTML TO SELECTED ELEMENT

export const printToHTML = (provider, info) => {
    document.querySelector(`.results-provider-${provider}`).innerHTML = info;
}