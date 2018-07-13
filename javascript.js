var topics = ['rhoc', 'rhony', 'rhobh', 'bravo'];

var startBtns = $('button');

function renderButtons() {
  $('.giphyButtons').empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    var a = $('<button class="btn btn-light">');
    a.addClass('show');
    a.attr('data-name', topics[i]);
    a.text(topics[i]);
    $('.giphyButtons').append(a);
  }
}

function loadGIPHY() {
  var queryURL =
    'https://api.giphy.com/v1/gifs/search?api_key=SonLvDJGMTeL4Rt0GCJi7OY4LcLovfnX&q=' +
    topics +
    '&limit=10&offset=0&rating=G&lang=en';
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    console.log(queryURL);

    console.log(response);
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var showDiv = $('<div>');

      var p = $('<p>').text('Rating: ' + results[i].rating);

      var showGIF = $('<img>');

      showGIF.attr('src', results[i].images.fixed_height.url);

      showDiv.append(p);
      showDiv.append(showGIF);

      $('.gifs-load-here').prepend(showDiv);
    }
  });
}

$('document').ready(function() {
  console.log('ready!');
  renderButtons();
  loadGIPHY();
});
