const express = require('express');
const router = express.Router();
const googlePlaces = require('../../../src/server/modules/google-places.js');
// const radarSearch = googlePlaces.radarSearch;
// const nearbySearch = googlePlaces.nearbySearch;
// const placeDetails = googlePlaces.details;

router.get('/', function (req, res, next) {
  res.render('pages/search', {
    results : [],
  });
});

router.post('/', function(req, res, next) {
  var lat = req.body.location.split(',')[0];
  var long = req.body.location.split(',')[1];
  googlePlaces.nearbySearch(lat, long, req.body.keyword, (data) => {
    res.render('pages/search', {
      results : data.results,
    });
  });
});

router.get('/details/:google_places_id', (req, res, next) => {
  googlePlaces.details(req.params.google_places_id, (data) => {
    res.render('pages/search_details', {
      result : data.result,
    });
  });
});

module.exports = router;
