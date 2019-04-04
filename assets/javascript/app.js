var gifName = ["action", "animals", "emotions", "movies", "nature", "memes"];
var faveGif = [];
var currentBtn = "";
var moreGif = false;
var gifCount = 10;
var offset = 0;

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

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=1VROgf6YVudOX8A67lhS4EheWllnytNT&offset=" + offset;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {        
        var results = response.data;

        console.log(response);
        

        for (var i = 0; i < 10; i++) {
            var gifDiv = $("<div>");
            
            // creatting the gifs
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");
            gifImage.addClass("gif");
            
            var gifBtnDiv = $("<div>");

            //creating the rating 
            var p = $("<p>").text("Rating: " + results[i].rating);
            
            //creating the download button
            var downloadBtn = $("<button>");
            var downloadImage = $("<img>");
            downloadImage.attr("src", "./assets/images/download.png");
            downloadImage.attr("download", results[i].images.fixed_height.url);
            downloadImage.addClass("smlImg");
            downloadBtn.addClass("download smlBtn topBtn");
            downloadBtn.append(downloadImage);
            gifBtnDiv.append(downloadBtn);

            gifBtnDiv.append("<br>");
            
            //creating the favorite button
            var favoriteBtn = $("<button>");
            var favoriteImage = $("<img>");
            favoriteImage.attr("src", "./assets/images/check.png");
            favoriteImage.addClass("smlImg");
            favoriteBtn.addClass("favorite smlBtn btmBtn");
            favoriteBtn.append(favoriteImage);
            gifBtnDiv.append(favoriteBtn);
            
            //append it all the to dom
            gifDiv.append(p);
            gifDiv.append(gifImage);
            gifDiv.append(gifBtnDiv);
            $("#gifRow").append(gifDiv);
        }

        //add more gifs button
        var more = $("<button>");
        more.addClass("more_gif btn");
        more.text("Load More");
        $("#moreRow").append(more);
    
    });
    moreGif = false;
};

//funct to add more gifs
function printMoreGif() {
    offset += 10;
    moreGif = true;
    displayGifInfo();
}

// funct to stop/play gifs
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

//if clicked, do:
$(document).on("click", "#moreRow", printMoreGif);
$(document).on("click", ".gifBtn", displayGifInfo);
$(document).on("click", ".gif", stillAnimate);

// on start up make butons
renderButtons();