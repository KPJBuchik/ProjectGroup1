// Wrap every letter in a span
var textWrapper = document.querySelector('.searched-artist');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.searched-artist .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: function(el, i) {
      return 70*i;
    }
  }).add({
    targets: '.searched-artist',
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
  
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

/*
//$(".inputArtist").on("click", function (event) {
  //  event.preventDefault();
    //searchSeatGeek();

//})
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
*/