//The intial arry to load in infomation for buttons
var topics = ["Cowboy Bebop", "Trigun", "Code Geass", "Gundam Wing", "Dragon Ball Z",
                "Fullmetal Alchemist", "Bleach", "Sword Art Online", "Samurai Champloo", "Death Note", "Hunter x Hunter"];

//sets up the function displayGif to be call later
function displayGif() {

    //empties out the giphyArea to be loaded with info later
    $(".giphyArea").empty();

    //sets up a variable to hold the show data to be called in the queryURL
    let searchResults = $(this).attr("data-show");

    //sets up a variable to hold the queryURL to shortn the requiered typing
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchResults + "&limit=10&api_key=qgvPzpbz1gpIcPzM74NX3mkHAhsflylb";

    //calls ajax to retreave data from the giphy API from the server
    $.ajax({

        url: queryURL,

        method: "GET"

        // when done loading the inforamtion call this function
        }).done(function (response) {

            console.log(queryURL);

            renderButtons();
            //sets up a variable to hold the response.data to shortn the requiered typing
            let results = response.data;

            //for loop to intialize the inforamton for response
            for (let i = 0; i < results.length; i++) {

                //sets up a stillURL variable to hold the still image of the gif
                let stillURL = results[i].images.original_still.url;

                //sets up a activeURL variable to hold the active gif url
                let activeURL = results[i].images.original.url;

                //grabs the rating info from the giphy API and stores it in rating
                let rating = results[i].rating;

                //gives the varible p the text of the string "Rating: " plus the rating info grabbed from the giphy API
                let p = $("<p>").text("Rating: " + rating);

                //sets up a varible to hold the div element to load in rating info
                let gifText = $("<div class='ratings'>");

                //sets up the gif as an image html 
                let gif = $("<img>");

                //adds a class to the gif that can be called later
                gif.addClass("pic");

                gif.attr("src", results[i].images.fixed_height_still.url);

                //gives the imagie a alt tag of gif for web page readers
                gif.attr("alt", "GIF");

                //grabs the p variable and puts it in the gifText variable
                gifText.prepend(p)

                //applys all the gif and gifText data to the giphyArea
                $(".giphyArea").append(gif, gifText);

            }   

        });
}

    //sets a on click function the the pic class given above
    $(document).on('click', '.pic', function() {

        //loads the source from the clicked pic class
        let src = $(this).attr("src");

            //sets up a if statement to be ran if the pic class has a class of playing
            if($(this).hasClass('playing')){

            //stops the pic after a on click event by replaceing the active url with still url
            $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))

            //removes the playing class so it will be still
            $(this).removeClass('playing');
        }

        else {

        //starts the gif after a on click event if it does not have a playing class
        $(this).addClass('playing');

        //starts the pic after a on click event by replaceing the still url with active url
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))

      }

    });
   
    //sets up the renderButton function to display all buttons
    function renderButtons() {

        //empties out the buttonArea to be loaded in with data
        $(".buttonArea").empty();

        //sets up how many buttons should be made based on the topics array
        for (let i = 0; i < topics.length; i++) {

            //given the variable animeButton the HTML element
            let animeButton = $("<button>");

            //adds a class to the button of animeName
            animeButton.addClass("animeName");

            //gives the button an attribute of data-show with the value of the one of the topics array
            animeButton.attr("data-show", topics[i]);

            //gives the button the text of one of the values of the topics array
            animeButton.text(topics[i]);

            //appends the data of animeButton to the buttonArea class
            $(".buttonArea").append(animeButton);
        }
    }

    //sets up the on click event for the submit button that adds a new button to the topics array
    $(".addBtn").on("click", function (event) {

        //prevents submit from happening
        event.preventDefault();

        //sets the value of whatever the user types into the newAnime variable
        let newAnime = $("#newSubject").val().trim()

        //pushes the user entery into the topics array
        topics.push(newAnime);

        //call the renderButtons function
        renderButtons();

        //clears the input text area after submission
        $('input[type="text"], textarea').val('');
    });

    //Shows GIF of clicked anime
    $(document).on("click", ".animeName", displayGif);

    //Show original button set
    renderButtons();