
  
  function searchSpotify() {
    var inputArtist = $("#inlineFormInput").val().trim();
    var accessToken = "BQCnNYM63-5zQSzvybsEWZPYXJ7XioYnlQ-WH2_KuxPGcuCDVMHLdwuriprJw1th28HnfGefRlxNC2IYWY3VHafnya1Hf_2I6kDJx0QyXNl_amYnesiASK87eGE6AtO0LXh70p0l7v6MX3X3GhA"
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


        $("#list").append(artistName);
        SearchTopTracks(response.artists.items[0].id);

    });
}

function SearchTopTracks(id) {
    var topTracks = $("#inlineFormInput").val().trim();
    var accessToken = "BQCnNYM63-5zQSzvybsEWZPYXJ7XioYnlQ-WH2_KuxPGcuCDVMHLdwuriprJw1th28HnfGefRlxNC2IYWY3VHafnya1Hf_2I6kDJx0QyXNl_amYnesiASK87eGE6AtO0LXh70p0l7v6MX3X3GhA"

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
});


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
        var eventName = $("#events-results").text(response.events)
        var location = $("#location-results").text(response.events[0].venue.display_location)
        var tickets = $("#tickets-results").text(response.events[0].url)
        var venue = $("#venue-results").text(response.events[0].venue.name)
        
            //follow copy path to get informaiton, add id tag on HTML)
        console.log(artistName);

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