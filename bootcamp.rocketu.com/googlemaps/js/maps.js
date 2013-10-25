function initialize() {
	
    var myLocation = new google.maps.LatLng(37.790896,-122.401500)

    var mapOptions = {
        center: myLocation,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID

	};
    var map = new google.maps.Map(
        document.getElementById("map-canvas"),
        mapOptions
	); 

    var marker = new google.maps.Marker({
        position: myLocation,
        map: map,
        title: "RocketSpace Office"
    });

    var RocketU = '<h3>RocketU, 225 Bush St., San Francisco, CA</h3>';

    var infowindow = new google.maps.InfoWindow({
        content: RocketU
    });

    google.maps.event.addListener(marker, 'click', function(){
        infowindow.open(map,marker);
    })
}

google.maps.event.addDomListener(window, 'load', initialize);