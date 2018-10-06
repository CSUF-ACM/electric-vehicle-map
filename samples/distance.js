const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDd9Rh03DQESDELNKdJL1sy0vEY2thTJBU'
});

const request = require('request');

// Get Directions.
googleMapsClient.distanceMatrix({
  // Google Mountain View Campus:
  origins: {
    lat: "37.3324975",
    lng: "-122.0289785"
  },
  // CSUF:
  destinations:{
    lat: "33.8829226",
    lng: "-117.88692609999998"
  }
}, function(err, response) {
  if (!err) {
    console.log(response.requestUrl)
    request(response.requestUrl,(err,res,body)=>{
      if(err){return console.log(err);}
      console.log(body);
    });
  }
});
