const express = require('express');
const router = express.Router();
const googlePlaces = require('../modules/google-places.js');
const Plans = require('../modules/plans');
const queryString = require('query-string');

const locations = {
  austin: {
    lat: '30.2729',
    long: '-97.7444',
  },
  san_francisco: {
    lat: '37.773972',
    long: '-122.431297',
  },
  new_york: {
    lat: '40.712784',
    long: '-74.005941',
  },
  seattle: {
    lat: '47.608013',
    long: '-122.335167',
  },
  miami: {
    lat: '25.761681',
    long: '-80.191788',
  },
  chicago: {
    lat: '41.881832',
    long: '-87.623177',
  },
};

router.get('/details/:google_places_id', (req, res, next) => {

  let user = req.session.user || null;

  if (!user) {
    return googlePlaces.details(req.params.google_places_id, (data) => {
      res.render('pages/search_details', {
        result : data.result,
        user_plans : null,
        user_id : null,
      });
    });
  }

  Plans.by_user_id(user.id).then((user_plans) => {
    googlePlaces.details(req.params.google_places_id, (data) => {
      res.render('pages/search_details', {
        result: data.result,
        user_plans : user_plans,
        user_id : user.id,
      });
    });
  });
});

router.get('/', function(req, res, next) {

  let search = queryString.parse(req.url) || null;

  let location = req.body.location || search['location'] || null;
  let keyword = req.body.keyword || search['/?keyword'] || null;

  console.log('location', location);
  console.log('keyword', keyword);

  let lat;
  let long;

  if (location) {
    lat = locations[location].lat || null;
    long = locations[location].long || null;
  }

  if (lat && long && keyword) {

    googlePlaces.nearbySearch(lat, long, keyword, (placesData) => {

      res.render('pages/search', {
        collection: placesData.results,
        createdPlan: req.body,
      });
    });
  } else {
    res.render('pages/search', {
      collection: [],
      createdPlan: {},
    });
  }
});

router.get('/:location/:keyword', function(req, res, next) {
  let location = req.params.location;
  let lat = locations[location].lat;
  let long = locations[location].long;
  let keyword = req.body.keyword || req.params.keyword;

  if (lat && long && keyword) {

    googlePlaces.nearbySearch(lat, long, keyword, (placesData) => {

    // for filtering out uninteresting place results that are seen often. should move this to a database if it gets really big:
    // let rejectedPlaces = ['7-Eleven', 'Domino\'s Pizza'];
    // let filteredResults = placesData.results.filter;

      res.render('pages/search', {
        collection: placesData.results,
        createdPlan: req.body,
      });
    });
  } else {
    res.render('pages/search', {
      collection: [],
      createdPlan: null,
    });
  }
});


module.exports = router;
