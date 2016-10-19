const express = require('express');
const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');
const methodOverride = require('method-override');
const knex = require('../db/connection.js');

router.get('/', function(req, res) {
  res.render('pages/plans');
});

router.get('/cities/:city', function(req, res, next) {
  let cityID = req.params.city;
  res.locals.page_type = cityID;
  knex('plans').where('city', cityID).then((plans) => {
    console.log(plans);
    res.render('pages/plans', {
      plans: plans
    });
  });
});


router.post('/:plan_id/upvote', (req, res) => {
  knex('plans').where({
      id: req.params.id,
    })
    .first()
    .then((id) => {
      var newScore = (++id.upvote);
      knex('plans').where({
          id: req.params.id,
        })
        .update({
          upvote: newScore,
        }).then(() => {
          res.redirect('back');
        });
    });
});
//


module.exports = router;
