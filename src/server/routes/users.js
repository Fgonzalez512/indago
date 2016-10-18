'use strict';


const express = require('express');
const router = express.Router();
const knex = require('../db/connection.js');
const bcrypt = require('bcrypt-nodejs');
const methodOverride = require('method-override');



// router.get('/', function(req, res) {
//   res.render('index');
// });

router.get('/signup', function(req, res) {
  res.render('pages/signup');
});

router.post('/signup', function(req, res) {
  knex('users').where('email', req.body.email).first().then(function(user) {
    if (!user) {
      bcrypt.hashSync(req.body.password, 12).then(function(
        hashed_password, err) {
        knex('users').insert({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          username: req.body.username,
          password: hashed_password
        }).then(function() {
          knex('users').where('email', req.body.email).first().then(
            function(newuser) {

              req.session.user = newuser;
              req.session.loggedIn = true;

              res.locals.user = newuser;
              res.locals.loggedIn = true;

              res.redirect('/index');
            });
        });
      });
    } else {
      res.send('User created');
    }
  });
});

router.get('/login', function(req, res) {
  res.render('pages/login');
});

router.post('/login', function(req, res) {
  knex('users').where('email', req.body.email).first().then(function(user) {
    if (!user) {
      res.redirect('/signup');
    }
    bcrypt.compareSync(req.body.password, user.password)
      .then(function() {

        req.session.user = user;
        req.session.loggedIn = true;

        res.locals.user = user;
        res.locals.loggedIn = true;

        res.redirect('/index');
      }, function() {
        res.redirect('back');
      });
  });
});

router.get('/logout', function(req, res) {
  req.session = null;
  res.redirect('pages/login');
});

module.exports = router;
