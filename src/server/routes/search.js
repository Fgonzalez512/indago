const express = require('express');
const router = express.Router();
const googlePlaces = require('../../../src/server/modules/google-places.js');
const radarSearch = googlePlaces.radarSearch;
const placeDetails = googlePlaces.details;

router.get('/', function (req, res, next) {
  res.render('pages/search');
});

router.post('/', function(req, res, next) {
  console.log(req.body);
});

module.exports = router;
