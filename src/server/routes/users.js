'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const methodOverride = require('method-override');
const User = require('../modules/users');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/signup', function(req, res) {
  res.render('pages/signup');
});

router.post('/signup', function(req, res) {

  User.withEmail(req.body.email)
    .then(function(user) {
      if (!user) {
        let pBcryptHash = new Promise((resolve)=> {
          resolve(bcrypt.hashSync(req.body.password));
        });

        pBcryptHash.then((hashed_password) =>{
          User.insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: req.body.username,
            password: hashed_password
          }).then(function(newUser) {

            req.session.user = newUser;
            req.session.loggedIn = true;

            res.locals.user = newUser;
            res.locals.loggedIn = true;

            res.redirect('/index');

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

  User.withEmail(req.body.email)
    .then(function(user) {
      if (!user) {
        res.redirect('/signup');
      }

      let pBcryptCompare = new Promise((resolve)=>{
        resolve(bcrypt.compareSync(req.body.password, user.password));
      });

      pBcryptCompare.then((result) => {
        if (result) {
          req.session.user = user;
          req.session.loggedIn = true;

          res.locals.user = user;
          res.locals.loggedIn = true;
          res.redirect('/');
        }else {
          res.render('pages/login');
        }
      });
    });
});

router.get('/logout', function(req, res) {
  req.session = null;
  res.redirect('pages/login');
});

module.exports = router;
