


function searchSpotify() {
    var inputArtist = $("#inlineFormInput").val().trim();

    var accessToken = "BQAxtYN4aIAmj0Uz1Ziua2O7RQpb41025WH9ocsy_PiijfNA4n1ZmPZ8etk5KaAX7R78kxxfZDHr90bK8WKicSAtj9kvJO4eXH-3gTgzrA4bcbDZ8T8D7i1TitwM_bDwnoIj49bHu87uEWY"
    var queryUrl = "https://api.spotify.com/v1/search?q=" + inputArtist + "&type=artist&limit=1"

    $.ajax({
        url: queryUrl, // 'https://api.spotify.com/v1/search',
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    }).then(function (response) {
        console.log(response)

        var artistName = $("#links-results").text(response.artists.items[0]
            .external_urls.spotify)
        // artistName.attr("href", artistName )
        //var imgURL = $("#image-results").text(JSON.stringify((response.artists.items["0"].images["0"])))
        //var image = $("<img>").attr("src", imgURL);
        //imgURL.append(image);


        $("#list").append(artistName)
        SearchTopTracks(response.artists.items[0].id)

    })
}

function SearchTopTracks(id) {
    var topTracks = $("#inlineFormInput").val().trim();
    var accessToken = "BQAxtYN4aIAmj0Uz1Ziua2O7RQpb41025WH9ocsy_PiijfNA4n1ZmPZ8etk5KaAX7R78kxxfZDHr90bK8WKicSAtj9kvJO4eXH-3gTgzrA4bcbDZ8T8D7i1TitwM_bDwnoIj49bHu87uEWY"

    var queryUrl = "https://api.spotify.com/v1/artists/" + id + "/top-tracks?country=us"

    $.ajax({
        url: queryUrl,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    }).then(function (response) {
        console.log(response)
        // var displayTracks = $("#track-results").text()

        console.log(topTracks)

    })
}

$(".btn").on("click", function (event) {
    event.preventDefault();
    searchSpotify();
    searchSeatGeek();
    // SearchTopTracks();

})


function searchSeatGeek() {
    var inputArtist = $("#inlineFormInput").val().trim();

    var queryUrl = "https://api.seatgeek.com/events?performers.slug=" + inputArtist + "&client_id=MTc3MjY2OTR8MTU2NDYwNTcxOC43MQ";

    $.ajax({
        url: queryUrl, 
        method: "GET",
         
    }).then(function (response) {

        
        console.log(response);
        //location
        //link to tickets
        //venue
        var eventName = $("#events-results").text(response.events[0].title)
        console.log(artistName)

        $("#list").append(eventName)

    })
}


//$(".inputArtist").on("click", function (event) {
  //  event.preventDefault();
    //searchSeatGeek();

//})
