const express = require('express');
const router = express.Router();
const knex = require('../db/connection');
// require knex from connection.js
//   /user/profile/:user_id

router.get('/:user_id', function (req, res, next) {
  //var current_user_profile =req.body;
  knex('user').where({'users_profile': req.body.user})
  .first()
  return({user: username, email: email, name: name  })
  .then((user)=>{
  res.render('profile',{user:current_user_profile});
});
});

  //use knex

  //get user information from the database

  //send user infromation to the render page
router.post('/:user_id', function (req, res, next) {
  var current_user_profile = req.body;
  knex('users_profile').where({user: req.body.user}).update({user: req.body.user.username, name: req.body.user.name, username: req.body.username, email: req.body.email}).then(function(){
    res.render('profile');
  })


  // return knex('user')
  //       .update({
  //         user_id: req.body.user_id,
  //         username: req.body.username,
  //         email: req.body.email
  //       }, '*')
  //       .where('id', req.params.id);


  //knex

  //get updated information from req.body

  //update user information in the database
