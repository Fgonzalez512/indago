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
  knex('plans').where('city', cityID).first().then((city)=>{
    res.render('pages/plans', {
      city:city,
      name:city,
    });
  });
});

module.exports = router;
