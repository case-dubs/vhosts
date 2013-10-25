<?php

    // Server-side PHP code to send Twitter API 1.1 request
    
    // Code uses twitteroauth library:
    // https://github.com/abraham/twitteroauth
    
    // Note - variable names start with a '$' character in PHP
     
    // Load in the twitteroauth library
    require_once("twitteroauth/twitteroauth.php"); //Path to twitteroauth library
    
    // Assign values for API parameters
    // These can be found via the OAuth tab on the control panel for your twitter app 
    
    $twitteruser = "caseylwilson";
    $cons_key = "xKliznujtBMpYzVStCmoww";
    $cons_secret = "Fgk0xa6A1yVpnYQIapitNUeGGG15RdUC4A0pteY2pw";
    $oauth_token = "38264843-8Th8RtiYvjh9RPa0F4YcEUUXrAEhZB2hyJib5UDV8";
    $oauth_token_secret = "WLsmzd4BXetNdBLvWIHsZAwsBjqEKq2KUhgvI9esFBaQV";

    // How many tweets to pull from the feed  
    // Value is stored in $_GET server array with key of same name as passed-n parameter
    // Force it to an integerand assign to variable
    $numtweets = (int) $_GET['count'];
     
    // Instansiate a connection object from the library class 
    $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);

    // Call the get() method and pass in the parameters
    // Returns a PHP array        
    $tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$numtweets);
     
    // Convert the results to a JSON array structure and send back to the client
    echo json_encode($tweets);

?>