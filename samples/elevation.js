

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDd9Rh03DQESDELNKdJL1sy0vEY2thTJBU',
  Promise: Promise
});

const request = require('request');

// Get Directions.
googleMapsClient.elevation({
  locations: {
    lat: "33.8829226",
      lng: "-117.88692609999998"
  }
}, function(err, response) {
  if (!err) {
    request(response.requestUrl,(err,res,body)=>{
      if(err){return console.log(err);}
      console.log(body);
    });
  }
  else if (err === 'err.json'){console.log(err.json)}
  else{console.log(err)}
});
