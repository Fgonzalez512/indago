const express = require('express');
const router = express.Router();
const knex = require('../db/connection.js');


router.get('/', function(req, res, next) {
  if (req.session.loggedIn) {
    var userID = Number.parseInt(req.session.user.id);
    knex('users').where('id', '=', userID).then(function(info) {
      res.render('index', {
        info: info
      });
    });
  } else {
    res.render('index');
  }
});

router.get('/myplan', function(req, res, next) {
  res.render('pages/myplan');
});

module.exports = router;
