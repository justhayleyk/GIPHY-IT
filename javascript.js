// Initial Starting Topics
var topics = ["RHOC", "RHONY", "RHOBH", "BRAVO"];

// Function to render the buttons on the page.
function renderButtons() {
  $(".giphyButtons").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    var a = $('<button class="btn btn-secondary">');
    a.addClass("show");
    a.attr("id", topics[i]);
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $(".giphyButtons").append(a);
    a.on("click", clickGIFLoad);
  }
}

// Function grabs the input from the form on the site and pushes it into the 'topics' array.  Then it calls the Render Buttons fuction to add another button to the page.
function pushTopic() {
  $("#userInput").click(function() {
    console.log($("#userAdded").val());
    topics.push($("#userAdded").val());
    renderButtons();
  });
}

// This function will load the gifs from Giphy API based on the topic/query.

var apiURL =
  "https://api.giphy.com/v1/gifs/search?api_key=SonLvDJGMTeL4Rt0GCJi7OY4LcLovfnX&q=";
var gifLimit = 10;
var gifOffsetRating = "&offset=0&rating=G&lang=en";

function clickGIFLoad() {
  console.log(this);
  var clickedID = this.id;
  console.log(clickedID);

  var queryURL = apiURL + clickedID + "&limit=" + gifLimit + gifOffsetRating;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(queryURL);

    console.log(response);
    var results = response.data;
    $(".gifs-load-here").empty();

    for (var i = 0; i <= results.length; i++) {
      var showDiv = $("<div>");

      // var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());

      var showGIF = $("<img id='gif'>");

      showGIF.attr("src", results[i].images.original_still.url);
      showGIF.attr("data-still", results[i].images.original_still.url);
      showGIF.attr("data-animate", results[i].images.original.url);
      showGIF.attr("data-state", "still");

      showGIF.on("click", animateGif);

      // showDiv.append(p);
      showDiv.append(showGIF);

      $(".gifs-load-here").append(showDiv);
      console.log(results[i]);
    }
  });
}

function animateGif() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

$("document").ready(function() {
  console.log("ready!");
  renderButtons();
  pushTopic();
});
