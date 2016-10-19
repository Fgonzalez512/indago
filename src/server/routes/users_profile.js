const express = require('express');
const router = express.Router();
const User = require('../modules/users');

router.get('/:user_id/', function (req, res, next) {
  var user_id = req.params.user_id;
  User.all().where('id', user_id).first().then((user)=>{
    res.render('pages/user_edit', {user : user});
  });
});


  //use knex

  //get user information from the database

  //send user infromation to the render page
router.patch('/:user_id/', function (req, res, next) {
  console.log(req.body);
  var user_id = req.params.user_id;
  User.update(req.body)
    .then(function(){
      //res.render('./pages/user_edit');
      res.redirect('/users/login');
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

router.delete('/:user_id', (req, res, next) => {
  // get user id from params
  console.log('yooooooo');
  let user_id = req.params.user_id;
  // delete user based on user id, in DB
  User.all()
    .where({id:user_id})
    .del()
    .then(function(err){
      // if (err) {
      //   console.log('error on route',err);
      //   res.send(err);
      // }
      console.log('deleted', user_id);
      res.redirect('/users/login');
    });
});


module.exports = router;
