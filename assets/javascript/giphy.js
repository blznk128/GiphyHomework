var movies = [];
function displayMovieInfo() {
  var movie = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=rtiTwUTbyuQgXn3yIaK5CR8YpVou7RLJ&limit&=10&rating=pg";
                  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
      console.log(queryURL);
      console.log(response);
    for(var i = 0; i<results.length;i++) {
      var rating = "<div class='ratings'> Rating: " + (results[i].rating) + " </div>";
      var image = rating + '<img src = "' + results[i].images.fixed_height_still.url + '" data-still="' + results[i].images.fixed_height_still.url + '" data-animate="' + results[i].images.fixed_height.url + '" data-state="still" id="animateImage_'+results[i].id+'">';
      $("#movies-view").prepend(image);

    $(`#animateImage_${results[i].id}`).on("click", function(){
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }else {
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state", "still");
      };
     });
  };
  });
};

function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i<movies.length;i++) {
    var addButton = $("<button>");
    addButton.addClass("movie-btn");
    addButton.attr("data-name", movies[i]);
    addButton.text(movies[i]);
    $("#buttons-view").append(addButton);
    $("#buttons-view").append("  ");
  };
}
$("#add-movie").on("click", function(event) {
  event.preventDefault();
  var movie = $("#movie-input").val().trim();
  movies.push(movie);
  renderButtons();
});

$(document).on("click", ".movie-btn", displayMovieInfo);
renderButtons();
