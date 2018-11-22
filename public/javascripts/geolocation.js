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
var waypoint;
var chargeNearStart = {lat: 33.8728111, lng: -117.8487145};
var chargeNearDest = {lat: 33.8728111, lng: -117.8487145};
var routeToChargeStationStart = false;
var routeToChargeStationDest = false;

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
  setTimeout(insertLocation,750);
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
  var request;
  if (routeToChargeStationDest || routeToChargeStationStart) {
    request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING',
      waypoints: [
          {
            location: chargeNearStart,
            stopover: routeToChargeStationStart
          },{
            location: chargeNearDest,
            stopover: routeToChargeStationDest
          }],
    };
  } else {
    var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING',
    };
  }

  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
      console.log("Status == OK");
    } else {
      alert('Directions request failed due to: ' + status);
    }
  });
}

async function getStartChargePoints() {
  var apiCall = "https://api.openchargemap.io/v2/poi/?output=json&countrycode=US&maxresults=10&compact=true&verbose=false&latitude=" + lati + "&longitude=" + longi;
  const response = await fetch(apiCall);
  const openChargeJSON = await response.json();
  var temp = openChargeJSON[0].AddressInfo;
  chargeNearStart = {lat: temp.Latitude, lng: temp.Longitude};
}

async function getDestChargePoints() {
  var dest = $("#end").val();
  var formattedDest = dest.replace(/ /g, "+");
  var gAPICall = "https://maps.googleapis.com/maps/api/geocode/json?address=" + formattedDest + "&key=AIzaSyAuT2VwWgUEz_dGwzYxN8BRQUntiDkXuQs";
  const gResponse = await fetch(gAPICall);
  const gResult = await gResponse.json();
  var gLatLng = gResult.results[0].geometry.location;
  var apiCall = "https://api.openchargemap.io/v2/poi/?output=json&countrycode=US&maxresults=10&compact=true&verbose=false&latitude=" + gLatLng.lat + "&longitude=" + gLatLng.lng;
  console.log(apiCall);
  const response = await fetch(apiCall);
  const openChargeJSON = await response.json();
  var temp = openChargeJSON[0].AddressInfo;
  chargeNearDest = {lat: temp.Latitude, lng: temp.Longitude};
}
