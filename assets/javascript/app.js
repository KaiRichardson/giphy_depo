var gifName = ["action", "animals", "emotions", "movies", "nature", "memes"];
var faveGif = [];
var currentBtn = "";
var moreGif = false;
var gifCount = 10;

function renderButtons() {
        $("#buttonRow").empty();

    // Looping through the array of movies
    for (var i = 0; i < gifName.length; i++) {

        var a = $("<button>");
        // Adding a class
        a.addClass("gifBtn btn");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-gif", gifName[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(gifName[i]);
        // Adding the button to the HTML
        $("#buttonRow").append(a);
    }
}

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
    $("#moreRow").html("");
    
    if (moreGif === false) {
        $("#gifRow").html("");
        currentBtn = $(this).attr("data-gif");
        var gif = $(this).attr("data-gif");
    }
    
    var gif = currentBtn;

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=1VROgf6YVudOX8A67lhS4EheWllnytNT";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {        
        var results = response.data;

        for (var i = 0; i < 10; i++) {
            var gifDiv = $("<div>");
            
            var p = $("<p>").text("Rating: " + results[i].rating);
            
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");
            gifImage.attr("class", "gif");
            
            var gifDiv = $("<div>");
            
            var download = $("<button>");
            download.addClass("download smlBtn");
            download.text("download");    
            
            gifDiv.append(gifImage);
            gifDiv.append(p);
            gifDiv.append(download);

            $("#gifRow").append(gifDiv);
        }

        var more = $("<button>");
        more.addClass("more_gif btn");
        more.text("Load More");
        $("#moreRow").append(more);
    
    });
    moreGif = false;
};

function printMoreGif() {
    moreGif = true;
    displayGifInfo();
}

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

$(document).on("click", "#moreRow", printMoreGif);
$(document).on("click", ".gifBtn", displayGifInfo);
$(document).on("click", ".gif", stillAnimate);

renderButtons();

