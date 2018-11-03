var theGeocoder;
var lati;// = 33.8728111;
var longi;// = -117.84871449999999;
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
//variable location is saved in
var location;

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
      location = results[0].formatted_address;
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
function getUserLocation() {
  theGeocoder = new google.maps.Geocoder;
  getLocation();
  document.getElementById("start").attribute = location;
}
