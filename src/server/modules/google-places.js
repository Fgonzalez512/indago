const request = require('request');
const base = 'https://maps.googleapis.com/maps/api/place/';

module.exports = {
  radarSearch : (lat, long, type) => {
    return request(base + 'radarsearch/json?location=' + lat + ',' + long + '&radius=5000&type=' + type + '&key=AIzaSyBzSrtzkd0500etRD3IsxjsKSON9ipJLBo', (error, response, body) => {
      if (!error && response.statusCode == 200) {
        return body;
      }
    });
  },
  details : (placeID) => {
    return request(base + 'details/json?placeid=' + placeID + '&key=AIzaSyBzSrtzkd0500etRD3IsxjsKSON9ipJLBo', (error, response, body) => {
      if(!error && response.statusCode == 200) {
        return body;
      }
    });
  },
};
