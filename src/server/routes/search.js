const express = require('express');
const router = express.Router();
const googlePlaces = require('../../../src/server/modules/google-places.js');
const Plans = require('../modules/plans');

// const radarSearch = googlePlaces.radarSearch;
// const nearbySearch = googlePlaces.nearbySearch;
// const placeDetails = googlePlaces.details;

router.get('/', function (req, res, next) {

  res.render('pages/search', {
    results : [],
  });
});

router.post('/', function(req, res, next) {

  let latAndLong = req.body.location.split(',');
  let lat = latAndLong[0];
  let long = latAndLong[1];

  googlePlaces.nearbySearch(lat, long, req.body.keyword, (data) => {
    res.render('pages/search', {
      results : data.results,
    });
  });
});

router.get('/details/:google_places_id', (req, res, next) => {

  let user = req.session.user[0];

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
