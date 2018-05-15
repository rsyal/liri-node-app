// Write and read files
require('dotenv').config()
var fs = require("fs"); 
var request = require("request");

// Nodes needed to run functions
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

// User input arguments
var input = process.argv[2];

switch(input) {
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifyThisSong (); break;
    case "movie-this": movieThis (); break;
    case "do-what-it-says": doWhatItSays (); break;


}
// Functions

function myTweets();
//  call twitter with node package
// var Twitter = require('twitter');

// Pull keys and put into var client
 
var client = new Twitter({
  consumer_key: 'TWITTER_CONSUMER_KEY',
  consumer_secret: 'TWITTER_CONSUMER_SECRET',
  access_token_key: 'TWITTER_ACCESS_TOKEN_KEY',
  access_token_secret: 'TWITTER_ACCESS_TOKEN_SECRET',
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});


function spotifyThisSong();
    var songName = process.argv[3];
    if(!songName) {
        songName = "The Sign"};

// Pull keys and put into var spotifyKeys
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });


    params = songName;
    spotify.search({ type: 'track', query: 'params' }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
            // Do something with 'data'
            // Artist: 
            // Song name:
            // Link to song:
            // Album:

        });


function movieThis();
        var movie = process.argv[3];
        if (!movie) {
                movie = "Mr. Nobody"};

        params = movie;
        request('http://www.omdbapi.com/?t='+params +"&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
            // need to parse and show info
});

function doWhatItSays();


