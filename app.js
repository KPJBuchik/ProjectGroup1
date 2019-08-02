


function searchSpotify() {
    var inputArtist = $("#inlineFormInput").val().trim();

    var accessToken = "BQD2tLTkAo8qdurfnx3TDCC6SJR4ciPQMmIXz-ay5-QMoGqwQlpo6wrmv7We0OtuufzPwIZznwn1BVfHBEoBADSdOG1pG-L3Dt9XKmxwR1rRz0B0HhYpulVpTKaNNCx9XhiaOW0r5iZRM9A"
    var queryUrl = "https://api.spotify.com/v1/search?q=" + inputArtist + "&type=artist&limit=1"

    $.ajax({
        url: queryUrl, // 'https://api.spotify.com/v1/search',
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    }).then(function (response) {

        console.log(response);

        var artistName = $("#links-results").text(response.artists.items["0"]
        .external_urls.spotify)
       // var imgURL = $("#links-results").text(JSON.stringify((response.artists.items["0"].images["0"])))
        //var image = $("<img>").attr("src", imgURL);
        //imgURL.append(image);


        console.log(artistName)

        $("#list").append(artistName)

    })
}


$(".btn").on("click", function (event) {
    event.preventDefault();
    searchSpotify();

})

