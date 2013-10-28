$(document).ready(function(){

	var geoMessage = '';
	var myLat = '';
	var myLong = '';
	if (geoPosition.init()){
		console.log("geolocation available");
		$("#display-location-data").removeAttr("disabled");
		$("#display-location-map").removeAttr("disabled");
		geoMessage = "Use the button below to display location data";
		
		$("#display-location-data").on('click', function(){
			displayLocationData();
			console.log("inside displayLocationData function");
		});
		$('#display-location-map').on('click', function(){
			geoPosition.getCurrentPosition(buildLocationMap, displayLocationErrors);
		})
	}
	else{
		geoMessage = "Sorry, the geolocation API is not available";
		alert("no geolocation available");
	}
	
	$(".status-message:nth-child(2)").text(geoMessage);

	function displayLocationData(){
		positionOptions = new Object();
		positionOptions.enableHighAccuracy = 'FALSE';
		positionOptions.timeout = 1000;
		positionOptions.maximumAge = 10000;
		geoPosition.getCurrentPosition(buildLocationDataTable, displayLocationErrors, positionOptions);
		console.log(positionOptions);
		for (var key in positionOptions){
			console.log(key +": " + positionOptions[key]);
		}
	}


	function buildLocationDataTable(position){
		/*$('.status-message:nth-child(4)').text("Location data retrieved OK");
		$('.status-message:nth-child(4)').append(". Here's your position: " + position.coords.latitude + ", " + position.coords.longitude);*/
		console.log(position);
		var date = new Date(position.timestamp *1000);
		var day = date.getDay();
		var month = date.getMonth();
		var year = date.getYear();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var formattedDate = date;

		var LocationTable = "<table> <thead> <tr> <th colspan='2'>Geolocation Data</th> </tr> <tr><th colspan='2'> Last Updated " + formattedDate + " </tr> <tr> <th>Property</th> <th>Value</th> </tr></thead> <tbody> ";

		console.log(position.coords.length);
		console.log(position.coords);
		console.log(position.coords.accuracy);

		for (var key in position.coords){
			LocationTable += "<tr><td>" + key + "</td> <td>"+ position.coords[key] + "</td></tr>"
		}

	 	LocationTable += "</tbody> </table>";

	 	$("#location-data").append(LocationTable);

	};

	function displayLocationErrors(err){
		if (err.message == 1){
			$('.status-message:nth-child(4)').text("Error: User has denied access to their location.");
		}
		else if(err.message == 2){
			$('.status-message:nth-child(4)').text("Error: Location data is not available - please check internet & Wifi connection.");
		}
		else if(err.message == 3){
			$('.status-message:nth-child(4)').text("Error: Process has timed out.");
		}
		else{
			$('.status-message:nth-child(4)').text("Error: An unknown error has occurred.");
		}

		console.warn('ERROR(' + err.code + '):' + err.message);
	};


	function buildLocationMap(position){
		var myLocation = new google.maps.LatLng( position.coords.latitude + ','+ position.coords.longitude);
		
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		myPosition = latitude + "," + longitude;

		initializeDynamicMap(latitude, longitude)
		
		}
	
	function initializeDynamicMap(latitude, longitude){
		var markerMessage = "You are at Latitude " + latitude.toFixed(2) + ", Longitude " + longitude.toFixed(2) + ".";

		var mapOptions = {
	        center: new google.maps.LatLng(latitude, longitude),
	        zoom: 10,
	        mapTypeId: google.maps.MapTypeId.ROADMAP

		};

	    var map = new google.maps.Map(
	        document.getElementById("location-map"),
	        mapOptions
		); 

	    var marker = new google.maps.Marker({
	        position: new google.maps.LatLng(latitude,longitude),
	        map: map,
	    });

	    var infowindow = new google.maps.InfoWindow({
        content: markerMessage
  	 	 });

    	google.maps.event.addListener(marker, 'click', function(){
        	infowindow.open(map,marker);
    	});
	}

});