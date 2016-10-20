const express = require('express');
const router = express.Router();
const googlePlaces = require('../modules/google-places.js');
const Plans = require('../modules/plans');

const locations = {
  austin : {
    lat : '30.2729',
    long : '-97.7444',
  },
  san_francisco : {
    lat : '37.773972',
    long : '-122.431297',
  },
  new_york : {
    lat : '40.712784',
    long : '-74.005941',
  },
  seattle : {
    lat : '47.608013',
    long : '-122.335167',
  },
  miami : {
    lat : '25.761681',
    long : '-80.191788',
  },
  chicago : {
    lat : '41.881832',
    long : '-87.623177',
  },
};

router.get('/', function(req, res, next) {
  res.render('pages/search', {
    results: [],
  });
});

router.post('/', function(req, res, next) {

  //deprecated
  // let latAndLong = req.body.location.split(',');
  // let lat = latAndLong[0];
  // let long = latAndLong[1];
  console.log('=-=-=-=-=-=-=-=LOCATION BELOW=-=-=-=-=-=-=-=-=');
  console.log(req.body.location);
  let lat = locations[req.body.location].lat;
  let long = locations[req.body.location].long;

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
