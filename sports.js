// resets document
$(document).ready(function() {


// list of sport buttons      
var sports = ["soccer", "tennis", "golf",
			"track", "bingo", "skiing", "hocky", "baseball", "basketball", "roller derby",
			"ping pong", "laser tag", "water polo"];

// make buttons show on page
function renderButtons() {

// this is so button does does appear more than once
	$("#sport-buttons").empty();
	for (var i = 0; i < sports.length; i ++) {
		var a = $("<button>");

// adds info to button from the giffy API
		a.addClass("gifoption");
		a.attr("data-type", sports[i]);
		a.text(sports[i]);

// appends buttons
	$("#sport-buttons").append(a);
	}
}

//  Button triggers AJAX call so images show on page-->
    $(document).on("click", ".gifoption", function() {
 	event.preventDefault();
       $("#sports").empty();
 // gif movies
       $(this).addClass("active");
 // shows type
       var type = $(this).attr("data-type");

// creating variable for API URL. set the limit to 20 images on the page at one time
       var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

  // --------interested in making so new button is not already in the array-------
  
    // calling API
    $.ajax({
      url:queryURL,
      method: "GET"
    })

    // once we get data, run function
    .done(function(response) {
    	var results = response.data;
    	for (var i = 0; i < results.length; i++) {
        var sportDiv = $("<div class=\"sport-item\">");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);

    // we get the response back which is data which holds the image that will be passed to the imageUrl
    	var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
    
    // create empty img tag for each gif
    var sportImage = $("<img>");
    sportImage.attr("src", still);
    sportImage.attr("data-still", still);
    sportImage.attr("data-animate", animated);
    sportImage.attr("data-state", "still");
    sportImage.addClass("sport-image");

    // adds new image to the array
    sportDiv.append(p);
    sportDiv.append(sportImage)
    $("#sports").append(sportDiv);
  	};
  });
});
 $(document).on("click", ".sport-image", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  $("#addSportBtn").on("click", function(event) {
    event.preventDefault();
    var newSport = $("input").eq(0).val();
    
      sports.push(newSport);
    
   renderButtons () 
  });
 	renderButtons ()
});