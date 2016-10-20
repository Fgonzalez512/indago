const express = require('express');
const router = express.Router();
const knex = require('../db/connection.js');


router.get('/', function(req, res, next) {

  res.render('index');

});

router.get('/robertCSS', function(req, res, next) {
  res.render('pages/myplan');
});

module.exports = router;
