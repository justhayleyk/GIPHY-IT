$('document').ready(function() {
  // Initial Starting Topics
  var topics = ['RHOC', 'RHONY', 'RHOBH', 'BRAVO'];

  // Function to render the buttons on the page.
  function renderButtons() {
    $('.giphyButtons').empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {
      var x = $('<button class="btn btn-secondary">');
      x.addClass('show');
      x.attr('id', topics[i]);
      x.attr('data-name', topics[i]);
      x.text(topics[i]);
      $('.giphyButtons').append(x);
      x.on('click', clickGIFLoad);
    }
  }

  // Function grabs the input from the form on the site and pushes it into the 'topics' array.  Then it calls the Render Buttons fuction to add another button to the page.
  function pushTopic() {
    $('#userInput').click(function() {
      topics.push($('#userAdded').val());
      renderButtons();
    });
  }

  // This function will load the gifs from Giphy API based on the topic/query.

  var apiURL =
    'https://api.giphy.com/v1/gifs/search?api_key=76fkjhw48rHiwuZ361P9ku9owicnknH7&q=';
  var gifLimit = 10;
  var gifOffsetRating = '&offset=0&rating=G&lang=en';

  function clickGIFLoad() {
    var clickedID = this.id;

    var queryURL = apiURL + clickedID + '&limit=' + gifLimit + gifOffsetRating;

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      console.log(response);
      var results = response.data;
      $('.gifs-load-here').empty();

      results.forEach(function(result) {
        output =
          "<div class='card' style='width: 18rem;'>" +
          "<img class='card-img-top' src='" +
          result.images.fixed_height.url +
          "' alt='Card image cap'>" +
          "<div class='card-body'>" +
          "<p class='card-text'> This Giphy rating is " +
          result.rating +
          '</p> </div> </div>';
      });

      $('.gifs-load-here').html(output);
    });
  }

  function animateGif() {
    var state = $(this).attr('data-state');
    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  }

  renderButtons();
  pushTopic();
});
