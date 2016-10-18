const express = require('express');
const router = express.Router();
const googlePlaces = require('../../../src/server/modules/google-places.js');
const radarSearch = googlePlaces.radarSearch;
const nearbySearch = googlePlaces.nearbySearch;
const placeDetails = googlePlaces.details;

router.get('/', function (req, res, next) {
  res.render('pages/search', {
    results : [],
  });
});

router.post('/', function(req, res, next) {
  var lat = req.body.location.split(',')[0];
  var long = req.body.location.split(',')[1];
  nearbySearch(lat, long, req.body.keyword, (data) => {
    res.render('pages/search', {
      results : data.results,
    });
  });
});

module.exports = router;
