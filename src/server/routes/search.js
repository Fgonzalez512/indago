const express = require('express');
const router = express.Router();
const googlePlaces = require('../modules/google-places.js');
const Plans = require('../modules/plans');
// const radarSearch = googlePlaces.radarSearch;
// const nearbySearch = googlePlaces.nearbySearch;
// const placeDetails = googlePlaces.details;

router.get('/', function(req, res, next) {
  res.render('pages/search', {
    results: [],
  });
});

router.post('/', function(req, res, next) {

  let latAndLong = req.body.location.split(',');
  let lat = latAndLong[0];
  let long = latAndLong[1];

  googlePlaces.nearbySearch(lat, long, req.body.keyword, (placesData) => {

    // let rejectedPlaces = ['7-Eleven', 'Domino\'s Pizza'];
    // let filteredResults = placesData.results.filter;

    res.render('pages/search', {
      results: placesData.results,
    });
  });
});

router.get('/details/:google_places_id', (req, res, next) => {

  let user = req.session.user || null;

  if (!user) {
    return googlePlaces.details(req.params.google_places_id, (data) => {
      res.render('pages/search_details', {
        result : data.result,
        user_plans : null,
      });
    });
  }

  Plans.by_user_id(user.id).then((user_plans) => {
    googlePlaces.details(req.params.google_places_id, (data) => {
      res.render('pages/search_details', {
        result : data.result,
        user_plans : user_plans,
      });
    });
  });
});

module.exports = router;
