// $(function () {
//     $("#clear-button").on("click", () => {
//         $("#pac-input").val(null);
//         $("#pac-input").focus();
//     })
// });

document.querySelector("#clear-button").addEventListener("click", _ => {
    // $("#pac-input").val(null);
    document.querySelector("#pac-input").value = null;
    // $("#pac-input").focus();
})

// console.log(document.querySelector("#clear-button"));