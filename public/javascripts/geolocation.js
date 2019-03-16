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
var fastCharge = {lat: 33.8728111, lng: -117.8487145};
var routeToClosest = false;
var routeToFastCharge = false;
var mileage;

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
  console.log("something's happening");
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
  if (routeToClosest && !routeToFastCharge) {
    request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING',
      waypoints: [
          {
            location: fastCharge,
            stopover: routeToFastCharge
          }],
    };
  } else if (routeToFastCharge && !routeToClosest) {
    request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING',
      waypoints: [
          {
            location: fastCharge,
            stopover: routeToFastCharge
          }],
    };
  } else if (routeToClosest && routeToFastCharge) {
    request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING',
      waypoints: [
          {
            location: chargeNearStart,
            stopover: routeToClosest
          },{
            location: fastCharge,
            stopover: routeToFastCharge
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
    } else if (status == 'NOT_FOUND') {
      alert("Please enter valid end destination");
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

async function getFastChargePoint() {
  var apiCall = "https://api.openchargemap.io/v2/poi/?output=json&countrycode=US&levelid=2&maxresults=10&compact=true&verbose=false&latitude=" + lati + "&longitude=" + longi;
  const response = await fetch(apiCall);
  const openChargeJSON = await response.json();
  var temp = openChargeJSON[0].AddressInfo;
  fastCharge = {lat: temp.Latitude, lng: temp.Longitude};
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

async function getDistance() {
  var url = window.location.href;
  var mileagePos = url.search("Mileage:");
  mileage = url.substring(mileagePos + "Mileage:".length);
  var start = $("#start").val();
  var end = $("#end").val();
  start = start.replace(/ /g, "+");
  end = end.replace(/ /g, "+");
  var gAPICall = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + start + "&destinations=" + end + "&key=AIzaSyAuT2VwWgUEz_dGwzYxN8BRQUntiDkXuQs";
  const gResponse = await fetch(gAPICall);
  const gResult = await gResponse.json();
  console.log(gResult)
  var distance = parseFloat(gResult.rows.elements.distance.text);
  if (mileagePos - distance < 15) {
    alert("You will have less than 15 miles of charge available if you make this trip");
  }
}

function startDistance() {
  var url = window.location.href;
  var mileagePos = url.search("Mileage:");
  mileage = url.substring(mileagePos + "Mileage:".length);
  var start = $("#start").val();
  var end = $("#end").val();
  start = start.replace(/ /g, "+");
  end = end.replace(/ /g, "+");
  var dataJson = { origin: start, dest: end };
  var endpoint = "start/" + start + "/end/" + end;
  $.ajax({
    method: "GET",
    url: endpoint,
    success: function(result) {
      console.log("we did it!");
    },
    error: function(err_data) {
      console.log("error");
      console.log(err_data);
    }
  })
}

function setNearestChargeTrue() { routeToClosest = true; }
function setNearestChargeFalse() { routeToClosest = false; }
function setSuperChargeTrue() { routeToFastCharge = true; }
function setSuperChargeFalse() { routeToFastCharge = false; }
