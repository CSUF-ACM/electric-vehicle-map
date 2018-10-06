const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDd9Rh03DQESDELNKdJL1sy0vEY2thTJBU',
  Promise: Promise
});

const request = require('request');

// Get Directions.
googleMapsClient.directions({
  origin: "1600 Amphitheatre Parkway, Mountain View, CA",
  destination:"1 Infinite Loop, Cupertino, CA 95014, USA",
  mode: "driving"
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
