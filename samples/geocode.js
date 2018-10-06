const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDd9Rh03DQESDELNKdJL1sy0vEY2thTJBU'
});

// Geocode an address.
googleMapsClient.geocode({
  address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
  }
});
