// Write and read files
require('dotenv').config();
var fs = require("fs"); 
var request = require("request");

// Nodes needed to run functions
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');


var keys = require("./keys.js");

// User input arguments
var input = process.argv[2];
var search = process.argv[3];



switch(input) {
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifyThisSong (); break;
    case "movie-this": movieThis (); break;
    case "do-what-it-says": doWhatItSays (); break;
    default:
        console.log("I am LIRI. In order to utilize my functions, type in the following: \n\
        'my-tweets' will display my most recent tweets \n\
        'spotify-this-song' followed by the song title \n\
        'movie-this' followed by the movie name \n\
        'do-what-it-says' will fun a function called random txt");


}
// Functions

function myTweets() {

    var client = new Twitter(keys.twitter);
    var params = {screen_name: 't_rsyal1618'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
         

        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("------------------------");
                console.log(tweets[i].text);
                console.log("------------------------");
                
                }
            }
        });
    }


function spotifyThisSong() {
var spotify = new Spotify(keys.spotify);
    var userInput = process.argv.slice(3).join(" ");
    if(!userInput) {
        if (!search) {
            search = "The Sign Ace of Base";
        }
        userInput = search;
 
    }
            console.log(userInput);
    spotify.search({ 
        type: 'track', 
        query: userInput 
    }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            } else {
                var songInfo = data.tracks.items;
                for (var i = 0; i<3; i++) {
                    if (songInfo[i] !=undefined) {
                        console.log ("---------------------------------------------------------------------------------------------------------------");
                        console.log ("Song Name: " + songInfo[i].name);
                        console.log ("Album Name: " + songInfo[i].album.name);
                        console.log ("Artist Name: " + songInfo[i].artists[0].name);
                        console.log ("URL: " + songInfo[i].preview_url);
                        console.log ("---------------------------------------------------------------------------------------------------------------");
                    }
                }

            }
        });

    }

function movieThis () {
    if (search === undefined) {
        search = "Mr.Nobody";
    } else {
    request("http://www.omdbapi.com/?t=" + search +"&y=&plot=short&apikey=fa485602", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country produced in: " + JSON.parse(body).Country);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            

        }
    });

}
}

function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
     
    } else {
        var command = data.toString().split(",");
        input = command[0];
        search = command[1];
        switch (input) {
            case "my-tweets":
            myTweets();
            break;

        case "spotify-this-song":
            spotifyThisSong();
            break;

        case "movie-this":
            movieThis();
            break;
        }
    }
      
    
  });

}

