//0fb504ae2d6948b0932e14eb2767f9a5



$(".btn").on("click", function(event) {

function searchSpotify() {
    var searchAlbums = function (query) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'artist'
            },
            success: function (response) {
                resultsPlaceholder.innerHTML = template(response);
                console.log(response)
            }
        });
    };

}