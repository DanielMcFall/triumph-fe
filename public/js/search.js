/* global define */

$('.summonerSubmit').click(function (event) {
    // Stop the form from doing its own thing so we can craft a nice URL.
    event.preventDefault();
    validateSearch();
});

function validateSearch() {
    var summonerName = $('.summonerName').val();
    var region = $('.regionSelect').val();

    // Make sure the player entered something for both fields.
    // TODO: Add more validation here or in the route handler.
    if (summonerName !== '' && region !== '') {
        doSearch(summonerName, region);
    }
}

function doSearch(summonerName, region) {
    // Directs the player to /summoner/:region/:name.
    window.location.href = '/summoner/' + region + '/' + summonerName;
}
