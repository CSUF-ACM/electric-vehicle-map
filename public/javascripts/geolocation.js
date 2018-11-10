var theGeocoder;
var lati;// = 33.8728111;
var longi;// = -117.84871449999999;
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
//variable location is saved in
var userloc = "";
var directionsService;
var directionsDisplay;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(savePosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function savePosition(position) {
  console.log("This was reached");
  var crd = position.coords;
  longi = crd.longitude;
  lati = crd.latitude;
  var latlng = {lat: lati, lng: longi}
  //uses the lat and long to decode the location and places a list of addresses into results
  theGeocoder.geocode({'location': latlng}, function(results, status) {
    if (status == 'OK') {
      userloc = results[0].formatted_address;
    }
    else if (status == 'ERROR') {
      alert("Unable to get location");
    }
    else if (status == 'REQUEST_DENIED') {
      alert("Request denied, webpage unable to use the geocoder");
    }
  });
}

//this function is called with the google API
async function getUserLocation() {
  theGeocoder = new google.maps.Geocoder;
  getLocation();
  setTimeout(insertLocation, 400);
}

function insertLocation() {
  $("#start").val(userloc);
}

function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  var locationMap = new google.maps.LatLng(lati, longi);
  var mapOptions = {
    zoom:5,
    center: locationMap
  }
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('direction-panel'));
}

function calcRoute() {
  var start = $("#start").val();
  var end = $("#end").val();
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
      console.log("Status == OK");
    } else {
      alert('Directions request failed due to: ' + status);
    }
  });
}

/* To add waypoints add this to the request json above
waypoints: [
    {
      location: 'Joplin, MO',
      stopover: false
    },{
      location: 'Oklahoma City, OK',
      stopover: true
    }],

These are example locations
*/
