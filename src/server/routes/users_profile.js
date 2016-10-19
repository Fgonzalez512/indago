const express = require('express');
const router = express.Router();
const User = require('../modules/users');
const knex = require('knex');

// router.get('/',function (req,res,next) {
//   console.log('asds');
//   res.send('I am here');
// });


router.get('/:user_id/', function (req, res, next) {
  res.render('pages/user_edit');
  //users/profile/user_id;
  var user_id = req.params.user_id;
  User.all().where('id', user_id).first().then((user)=>{

    res.render('profile',{user_id : user_id});
  });
});


  //use knex

  //get user information from the database

  //send user infromation to the render page
router.put('/:user_id/', function (req, res, next) {
  var user_id = req.body.user_id;
  knex('users_profile').where({user: req.body.user}).update({user: req.body.username, first_name: req.body.first_name, last_name: req.body.user.last_name, username: req.body.username, email: req.body.user.email}).then(function(){
    res.render('./pages/user_edit');
  });
});


//
//
// router.get('/user/:username', function(req, res){
//   res.send('user ' + req.params.username);
//   return knex('user')
//   .update({
//     user_id: req.body.user_id,
//     username: req.body.username,
//     email: req.body.email
//   }, '*')
//   .where('id', req.params.id);
// });


  //knex

  //get updated information from req.body

  //update user information in the database


router.delete('/:user_id', (req, res, next)=>{
});


router.delete('/:user_id', (req, res, next) => {
  let user_id;

  knex('user')
    .where('id', req.params.id)
    .first()
    .then((user_id) => {
      if (!user_id) {
        return next();
      }

      return knex('users')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      delete user_id.id;
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;
