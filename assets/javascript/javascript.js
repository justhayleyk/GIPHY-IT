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
  var gifLimit = 1;
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

      results.forEach(element => {
        console.log(element);
        var ratingGif = element.rating.toUpperCase();
        console.log(ratingGif);

        var imgRef = $(element).attr(
          'src',
          element.images.fixed_height_still.url
        );

        var dataStill = $(element).attr(
          'data-still',
          element.images.fixed_height_still.url
        );
        // 'data-still',
        // this.images.fixed_height_still.url,
        // 'data-animate',
        // this.images.fixed_height.url,
        // 'data-state',
        // 'still'
        // );
        console.log(imgRef);
        console.log(dataStill);

        // gif.on('click', animateGif);

        // var card =
        //   '<div class="row"><div class="col-sm-6"><div class="card"> <img class="card-img-top"' +
        //   imgRef +
        //   '<div class="card-body"><p class="card-text"> Rating: ' +
        //   ratingGif +
        //   '</p></div></div></div>';

        // $('.gifs-load-here').html(card);
      });

      // for (var i = 0; i < results.length; i++) {
      //   const gifIndex = results[i];

      //   var ratingGif = gifIndex.rating.toUpperCase();

      //   var imgRef = gifIndex.attr(
      //     'src',
      //     gifIndex.images.fixed_height_still.url,
      //     'data-still',
      //     gifIndex.images.fixed_height_still.url,
      //     'data-animate',
      //     gifIndex.images.fixed_height.url,
      //     'data-state',
      //     'still'
      //   );

      //   gifIndex.on('click', animateGif);

      //   var card =
      //     '<div class="row"><div class="col-sm-6"><div class="card"> <img class="card-img-top"' +
      //     imgRef +
      //     '<div class="card-body"><p class="card-text"> Rating: ' +
      //     ratingGif +
      //     '</p></div></div></div>';

      // var showDiv = $('<div class="card" style="width: 18rem;">');

      // var cardBody = $('<div class="card-body">');
      // var p = $('<p class="card-text">').text(
      //   'Rating: ' + results[i].rating.toUpperCase()
      // );

      // var showGIF = $('<img class="card-img-top" id="gif">');

      // showGIF.attr('src', results[i].images.fixed_height_still.url);
      // showGIF.attr('data-still', results[i].images.fixed_height_still.url);
      // showGIF.attr('data-animate', results[i].images.fixed_height.url);
      // showGIF.attr('data-state', 'still');

      // showGIF.on('click', animateGif);

      // // LOAD ON SCREEN
      // gridRow.prepend(gridCol);
      // gridCol.append(showDiv);
      // showDiv.append(showGIF);
      // showGIF.append(cardBody);
      // cardBody.append(p);

      //   $('.gifs-load-here').html(card);
      //   console.log(card);
      // }
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
