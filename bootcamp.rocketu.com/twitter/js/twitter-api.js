// Document ready event handler
// Used to bind functions to page elements and to carry out any initialization processes
$(document).ready(function(){

    // Function bound to click event on #gettweets button
    $('#gettweets').click(function(){
        
        // Find the value of the currently selected
        // option of the <select> element
        var numTweets = $("#numtweets").val();
        
        // Set the contents of the #tweets div to an empty string
        // to remove any previous content
        $('#tweets').html('');

        // Make an AJAX call with options
        $.ajax({ 
            url: 'gettwitterdata.php',  // URL for the server-side script
            data: {'count': numTweets}, // Parameters to be appended to the URL as a query tring
            dataType: 'json',           // Type of data that will be returned
            success: displayUpdates     // Function to be called when AJAX call returns
        });
    
    });

});

// Function called when AJAX returns
// Automatically passed any data
function displayUpdates(data) {

    // Declare a variable to hold text that will be used in the #tweets div
    // Initialize it with an empty string
    var html = '';
    
    // Iterate over the returned data
    $.each(data, function(key, val){
        
        // use += combined operator to append to existing string
        // append the text property of each data item wrapped in a <p> element
        html += '<p>' + val['text'] + '</p>';
        
    });
    
    // Now assign the constucted text as the contents of the div
    $('#tweets').html(html);
    
}

