  function searchSpotify() {
    var inputArtist = $("#inlineFormInput").val().trim();
    var accessToken = "BQDs6lyA21gFf6E9RS0WRnq9ZRPuO87fksre7u0yJ_kFFGlIQj2Zmqb0DtrQGyeGWVPnQ5CqEK9ac1hg-Nt5kOAe0GB6BorAEtzbmkTdE5QNoT74Bqk-GEh0PJIvJOcVG-chY_JdZ6815nI"
    var queryUrl = "https://api.spotify.com/v1/search?q=" + inputArtist + "&type=artist&limit=1"
    $.ajax({
        url: queryUrl, // 'https://api.spotify.com/v1/search',
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    }).then(function (response) {
        console.log(response);
        var artistName = $("#links-results").text(response.artists.items["0"].external_urls.spotify)
        console.log(artistName)
        $("#list").append(artistName)
    })
}
$(".btn").on("click", function (event) {
    event.preventDefault();
    searchSpotify();
})
