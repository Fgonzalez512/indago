const express = require('express');
const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');
const methodOverride = require('method-override');
const knex = require('../db/connection.js');

router.get('/', function(req, res) {
  res.render('pages/plans');
});

router.get('/cities/:city', function(req, res) {
  let cityID = req.params.city;

  res.locals.page_type = cityID;

  console.log(res.locals.page_type);

  knex('plans').where('city', cityID).then((plans) => {
    console.log(plans);
    res.render('pages/plans', {
      plans: plans
    });
  });
});


router.post('/:id/upvote', (req, res)=> {
  let planID = req.params.plan;
  knex('plans').where('id', planID).first().then((id) => {
    var newScore = (++id.upvote);
    knex('plans').where('id', planID).update({
      upvote : newScore,
    }).then(() => {
      res.redirect('back');
    });
  });
});


module.exports = router;
