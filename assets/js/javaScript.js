let topics = ["Cowboy Bebop", "Trigun", "Cod Geass", "Gundam Wing", "Dragon Ball Z", "Fullmetal Alchemist", "Bleach", "Sword Art Online", "Samurai Champloo", "Death Note", "Hunter x Hunter"];

let displayGif = () => {

    $(".giphyArea").empty();

    let content = $(this).attr("show");

    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + content + "&limit=10&api_key=qgvPzpbz1gpIcPzM74NX3mkHAhsflylb";

        $.ajax({

         url: queryURL,

         method: "GET"

        }).done(function (response) {

            console.log(queryURL);

            let results = response.data;

            for (let i = 0; i < results.length; i++) {

                let stillURL = results[i].images.original_still.url;

                let activeURL = results[i].images.original.url;

                let gif = $("<img>");

                gif.addClass("pic");

                gif.attr("data-active", activeURL);

                gif.attr("data-still", stillURL);

                gif.attr("src", stillURL);

                gif.attr("alt", "GIF");

                $(".giphyArea").append(gif);
            }   

        });
 
    $('.pic').on('click', () => {

        let src = $(this).attr("src");

            if($(this).hasClass('playing')){

            //stop
            $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))

            $(this).removeClass('playing');
        }

        else {

        //play
        $(this).addClass('playing');

        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))

      }

    });

}

    let renderButtons = () => {

        $(".buttonArea").empty();

        for (let i = 0; i < topics.length; i++) {

            let a = $("<button>");

            a.addClass("animeName");

            a.attr("show", topics[i]);

            a.text(topics[i]);

            $(".buttonArea").append(a);
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