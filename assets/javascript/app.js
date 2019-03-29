var gifName = ["action", "animals", "emotions", "movies", "nature", "memes"];
var faveGif = [];

function renderButtons() {

    $("#buttonRow").empty();

    // Looping through the array of movies
    for (var i = 0; i < gifName.length; i++) {

        var a = $("<button>");
        // Adding a class
        a.addClass("gifBtn");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-gif", gifName[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(gifName[i]);
        // Adding the button to the HTML
        $("#buttonRow").append(a);
    }
}
// event.preventDefault();

$("#addBtn").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#gifInput").val().trim();

    if (gif != "") {
        // Adding movie from the textbox to our array
        gifName.push(gif);
        $('#gifInput').val("");
    }

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

function displayGifInfo() {
    $("#gifRow").html("");

    var gif = $(this).attr("data-gif");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {        
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var p = $("<p>").text("Rating: " + results[i].rating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");
            gifImage.attr("class", "gif");

            gifDiv.append(p);
            gifDiv.append(gifImage);

            $("#gifRow").append(gifDiv);
        }
    });
};

function stillAnimate() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        var newState = $(this).attr("data-animate");
        $(this).attr("src", newState);
        $(this).attr("data-state", "animate");

    } else {
        var newState = $(this).attr("data-still");
        $(this).attr("src", newState);
        $(this).attr("data-state", "still");
    }
};

$(document).on("click", ".gifBtn", displayGifInfo);
$(document).on("click", ".gif", stillAnimate);

renderButtons();

