const express = require('express');
const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');
const methodOverride = require('method-override');
const knex = require('../db/connection.js');

router.get('/', function(req, res) {
  res.render('pages/plans');
});

//handles adding a new plan with a new place
router.post('/', (req, res) => {
  // let user = req.session.user;
  //
  // if(!user) {
  //   return res.redirect('back');
  // }

  res.sendStatus(404);

});

router.post('/:plan_id', (req, res) => {
  // let user = req.sesson.user;
  //
  // if(!user) {
  //   return res.redirect('back');
  // }

  res.sendStatus('404');
});


router.get('/cities/:city', function(req, res) {
  let cityID = req.params.city;
  res.locals.page_type = cityID;
  knex('plans').where('city', cityID).orderBy('upvote', 'DESC').then((plans) => {
    res.render('pages/plans', {
      plans: plans
    });
  });
});

router.get('/:id/upvote', (req, res) => {
  let planID = req.params.id;
  knex('plans').where('id', planID).first().then((id) => {
    var newScore = (++id.upvote);
    knex('plans').where({
      id: planID
    }).update({
      upvote: newScore,
    }).then(() => {
      res.redirect('back');
    });
  });
});



module.exports = router;
