
function searchSpotify() {
    var inputArtist = $("#validationDefault01").val().trim();

    var accessToken = "BQABM22ZuUFO5_77Jtp1KRTijhiPdlw9MmmIs4GoXJ5fkUr-WldquyT1M_-P-tULG-LpHyfvOI7Buah62HPnyVjZ8EkqzhBwH4U3x7pnsqEzccXa8abV4rqqTzfqehReyr368GkHNOr5ke0"
    var queryUrl = "https://api.spotify.com/v1/search?q=" + inputArtist + "&type=artist&limit=1"
    $.ajax({
        url: queryUrl,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    }).then(function (response) {
        console.log(response)

        $("#links-results").attr("href", response.artists.items[0]
            .external_urls.spotify)
        $("#links-results").text(response.artists.items[0].name)
        var imgURL = $("#image-results").attr("src", response.artists.items[0].images[1].url)
        console.log(imgURL)
        SearchTopTracks(response.artists.items[0].id)



    })
}

function SearchTopTracks(id) {
    var topTracks = $("#validationDefault01").val().trim();
    var accessToken = "BQABM22ZuUFO5_77Jtp1KRTijhiPdlw9MmmIs4GoXJ5fkUr-WldquyT1M_-P-tULG-LpHyfvOI7Buah62HPnyVjZ8EkqzhBwH4U3x7pnsqEzccXa8abV4rqqTzfqehReyr368GkHNOr5ke0"

    var queryUrl = "https://api.spotify.com/v1/artists/" + id + "/top-tracks?country=us"

    $.ajax({
        url: queryUrl,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    }).then(function (response) {
        console.log(response)
        var displayTracks = $("#track-results").attr("href", response.tracks[0].external_urls.spotify)
        $("#track-results").text(response.tracks[0].name)
        console.log(displayTracks)
        $("#track-results1").attr("href", response.tracks[1].external_urls.spotify)
        $("#track-results1").text(response.tracks[1].name)
        $("#track-results2").attr("href", response.tracks[2].external_urls.spotify)
        $("#track-results2").text(response.tracks[2].name)
        trackInfo(response.tracks[0].id)
        $("#widget").attr("src", "https://open.spotify.com/embed/album/" + response.tracks[0].album.id)

    })
}
$(".btn").on("click", function (event) {


    event.preventDefault();
    $(".events-results").empty();
    $("#alert").text("please type an artist into the search bar")
    if ($("#validationDefault01").val() !== "") {
        searchSpotify();
        searchSeatGeek();
        $(".modal").modal("show");
        $("#alert").text("")

    }


    $("#validationDefault01").val("")

})




function trackInfo(id) {
    var trackInformation = $("#validationDefault01").val().trim();
    var accessToken = "BQABM22ZuUFO5_77Jtp1KRTijhiPdlw9MmmIs4GoXJ5fkUr-WldquyT1M_-P-tULG-LpHyfvOI7Buah62HPnyVjZ8EkqzhBwH4U3x7pnsqEzccXa8abV4rqqTzfqehReyr368GkHNOr5ke0"

    var queryUrl = "https://api.spotify.com/v1/audio-features/" + id
    $.ajax({
        url: queryUrl,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    }).then(function (response) {
        console.log(response)

        if (response.danceability > 0.6) {
            $("#danceability").text("Can I dance to this?: Oh Yeah");
        }
        else if (response.danceability < 0.6)
            $("#danceability").text("Can I dance to this?: No Way");

        if (response.loudness < -9) {
            $("#loudness").text("Bring Earplugs?: Definitely");
        }
        else if (response.loudness > -9)
            $("#loudness").text("Bring Earplugs?: Nah, You're Good");

        if (response.energy > .5) {
            $("#energy").text("Will the Show be Boring?: No they rock!");
        }
        else if (response.energy < .5)
            $("#energy").text("Will the Show be Boring?: Maybe stay home");

    })
}
function searchSeatGeek() {
    var inputArtist = $("#validationDefault01").val().trim();

    var queryUrl = "https://api.seatgeek.com/events?performers.slug=" + inputArtist + "&client_id=MTc3MjY2OTR8MTU2NDYwNTcxOC43MQ";

    $.ajax({
        url: queryUrl,
        method: "GET",

    }).then(function (response) {
        console.log(response);

        for (var i = 0; i < 5; i++) {
            let results = response.events[i]
            let eventDiv = $("<div>")
            let eventDisplay = $("<h3>").text(results.title)
            let atSign = $("<p>").text("@")
            let locationDisplay = $("<p>").text(results.venue.display_location)
            let venueDisplay = $("<p>").text(results.venue.name)
            let ticketDisplay = $("<a>").attr("href", response.events[0].url)
            ticketDisplay.text("Buy Tickets")

            eventDiv.append(eventDisplay);
            eventDiv.append(atSign)
            eventDiv.append(locationDisplay);
            eventDiv.append(venueDisplay);
            eventDiv.append(ticketDisplay);
            eventDiv.append("<hr>");
            $(".events-results").append(eventDiv)

        }

        if (results === "") {
            $(".events-results").text("Sorry")
        }


    })
}
$(".btn").on("click", function (event) {
    event.preventDefault();
    var textWrapper = document.querySelector('#alert');
    textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: false })
        .add({
            targets: '#alert .letter',
            scale: [4, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: function (el, i) {
                return 70 * i;
            }
        }).add({
            targets: '#alert',
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000,
        });

})
