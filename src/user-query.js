// Searching for user query

export const searchForUserQuery = _ => {
    let userQuery = window.location.search.slice((window.location.search.search('=') + 1));
    if (userQuery !== '') {
        let decodedUserQuery = decodeURIComponent(userQuery);
        console.log(decodedUserQuery);
        appendResults(decodedUserQuery);
    } else {
        console.log('string null')
    }
}