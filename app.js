
function searchSpotify() {
    var inputArtist = $("#inlineFormInput").val().trim();
    var accessToken = "BQAU-B7totK5w-u5Y7H4TmQDTM0puTNimkbLGDXVSBc4TtpJ3WS3Qmz_hubGgP2Fuqy1AuPSpC2PsR1GpR5gPL7UFzAIU1E0R3EOz7cryhMTpTQVOK-EkjrtZiGBHrQbIeWnijy6gi-TreQ"
    var queryUrl = "https://api.spotify.com/v1/search?q=" + inputArtist + "&type=artist&limit=1"
    $.ajax({
        url: queryUrl,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    }).then(function (response) {
        console.log(response)

        var artistName = $("#links-results").attr("href", response.artists.items[0]
            .external_urls.spotify)
        $("#links-results").text(response.artists.items[0].name)
        var imgURL = $("#image-results").attr("src", response.artists.items[0].images[1].url)
        console.log(imgURL)
        SearchTopTracks(response.artists.items[0].id)

        if (inputArtist === 0){
            $(".modal").modal("hide")
    
        }
    

    })
}

function SearchTopTracks(id) {
    var topTracks = $("#inlineFormInput").val().trim();
    var accessToken = "BQAU-B7totK5w-u5Y7H4TmQDTM0puTNimkbLGDXVSBc4TtpJ3WS3Qmz_hubGgP2Fuqy1AuPSpC2PsR1GpR5gPL7UFzAIU1E0R3EOz7cryhMTpTQVOK-EkjrtZiGBHrQbIeWnijy6gi-TreQ"

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
//
$(".btn").on("click", function (event) {
    event.preventDefault();
    searchSpotify();
    searchSeatGeek();
    $(".modal").modal("show")
    $("#inlineFormInput").val("")
 
    // $(".modal").modal("hide")}
})



// $(document).ready(function(){
// $("#submitButton").click(function(){
//  $("#myModal").modal();
//});
//});



function trackInfo(id) {
    var trackInformation = $("#inlineFormInput").val().trim();
    var accessToken = "BQAU-B7totK5w-u5Y7H4TmQDTM0puTNimkbLGDXVSBc4TtpJ3WS3Qmz_hubGgP2Fuqy1AuPSpC2PsR1GpR5gPL7UFzAIU1E0R3EOz7cryhMTpTQVOK-EkjrtZiGBHrQbIeWnijy6gi-TreQ"

    // var queryUrl = "https://api.spotify.com/v1/audio-features/11dFghVXANMlKmJXsNCbNl"
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
            // var danceInfo = $("<p>")
            var danceInfo = $("#danceability").text("Can I dance to this?: Hell Yeah")
        }
        else if (response.danceability < 0.6)
            $("#danceability").text("Can I dance to this?: No Way")
        console.log(danceInfo)





    })
}
function searchSeatGeek() {
    var inputArtist = $("#inlineFormInput").val().trim();

    var queryUrl = "https://api.seatgeek.com/events?performers.slug=" + inputArtist + "&client_id=MTc3MjY2OTR8MTU2NDYwNTcxOC43MQ";

    $.ajax({
        url: queryUrl,
        method: "GET",

    }).then(function (response) {
        console.log(response);
        $("#events-results").text(response.events[0].title)
        $("#location-results").text(response.events[0].venue.display_location)
        $("#ticket-results").attr("href", response.events[0].url)
        $("#venue-results").text(response.events[0].venue.name)

        $("#events-results1").text(response.events[1].title)
        $("#location-results1").text(response.events[1].venue.display_location)
        $("#ticket-results1").attr("href", response.events[1].url)
        $("#venue-results1").text(response.events[1].venue.name)

        $("#events-results2").text(response.events[2].title)
        $("#location-results2").text(response.events[2].venue.display_location)
        $("#ticket-results2").attr("href", response.events[2].url)
        $("#venue-results2").text(response.events[2].venue.name)

    })  
}



  //create the html elements in javascript
  //add authorization?
  //mark attending?
  //play with the webplayback 