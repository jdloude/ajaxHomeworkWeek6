$(document).ready(function(){
let topics = ["Gob Bluth", "Daria", "Shaq", "Zoidberg", "Chris Farley", "Liz Lemon", "Ron Burgundy", "Monty Burns", "Leslie Knope", "Drake"];
let displayCount = 10;


let displayGif = () => {

    $(".giphyArea").empty();

    let content = $(this).attr("data-name");

    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + content + "&limit=10&api_key=qgvPzpbz1gpIcPzM74NX3mkHAhsflylb";

    console.log(response);

    $.ajax({

        url: queryURL,

        method: "GET"

        }).done(function (response) {

            for (let i = 0; i < response.data.length; i++) {

                let stillURL = response.data[i].images.original_still.url;

                let activeURL = response.data[i].images.original.url;

                let gif = $("<img>");

                gif.addClass("pic");

                gif.attr("data-active", activeURL);

                gif.attr("data-still", stillURL);

                gif.attr("src", stillURL);

                gif.attr("alt", "GIF");

                $(".giphyArea").append(gif);
            }   

        });

    let activateGif = () => {

        let activeSRC = $(this).attr("data-active");

        let newTag = $("<img>");

        $(this).attr("src", activeSRC);

    }

    $(document).on("click", ".pic", activateGif);

    let stopGif = () => {

        let stillSRC = $(this).attr("data-still");

        let stopTag = $("<img>");

        $(this).attr("src", stillSRC);

    }

    $(document).on("click", ".pic", stopGif);

}

    let renderButtons = () => {

        $(".buttonArea").empty();

            for (let i = 0; i < topics.length; i++) {

            let buttonSubjects = $("<button>");

            buttonSubjects.addClass("animeName");

            buttonSubjects.attr("data-name", topics[i]);

            buttonSubjects.text(topics[i]);

            $(".buttonArea").append(buttonSubjects);
        }
    }

    $(".addBtn").on("click", function (event) {

        event.preventDefault();

        let newAnime = $("#newSubject").val().trim()

        topics.push(newAnime);

        renderButtons();
    });

    //Shows GIF of clicked anime
    $(document).on("click", ".animeName", displayGif);

    //Show original button set
    renderButtons();
});