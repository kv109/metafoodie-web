$(function () {
    $("#clear-button").on("click", () => {
        $("#pac-input").val(null);
        $("#pac-input").focus();
    })
});