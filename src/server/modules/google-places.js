const request = require('request');
const baseURI = 'https://maps.googleapis.com/maps/api/place/';
//TODO: make the below work without hardcoding the key;
const key = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyBzSrtzkd0500etRD3IsxjsKSON9ipJLBo';

const googlePlaces = {
  radarSearch : (lat, long, type, callback) => {
    //TODO: add support for 'keyword' argument/query
    //add string interpolation format
    request(baseURI + 'radarsearch/json?location=' + lat + ',' + long + '&radius=32000&type=' + type + '&key=' + key, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        if (body.error_message) {
          console.error('error: ' + body.error_message, 'status: ' + body.status);
          return;
        }
        return callback(JSON.parse(body));
      }
      console.error(error);
      console.log('response status:' + response.statusCode);
    });
  },
  nearbySearch : (lat, long, keyword, callback) => {
    request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + long + '&radius=32000&keyword=' + keyword + '&key=' + key, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        if (body.error_message) {
          console.error('error: ' + body.error_message, 'status: ' + body.status);
          return;
        }
        return callback(JSON.parse(body));
      }
      console.error(error);
      console.log('response status:' + response.statusCode);
    });
  },
  details : (placeID, callback) => {
    request(baseURI + 'details/json?placeid=' + placeID + '&key=' + key, (error, response, body) => {
      if(!error && response.statusCode == 200) {
        if (body.error_message) {
          console.error('error: ' + body.error_message, 'status: ' + body.status);
          return;
        }
        return callback(JSON.parse(body));
      }
      console.error(error);
      console.log('response status:' + response.statusCode);
    });
  },
};

module.exports = googlePlaces;
