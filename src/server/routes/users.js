'use strict';

const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');
const Users = require('../modules/users');
const users_profile = require('./users_profile');
const knex = require('../db/connection.js');
const Places = require('../modules/places');
const Plans = require('../modules/plans');



//handles adding a new plan with a new place
router.post('/:user_id/plans/new/place/new', (req, res, next) => {

  if (res.locals.loggedIn) {

    let newPlan = {
      user_id:res.locals.user.id,
      name: req.body.place_name
    };
    let newPlace = {
      name: req.body.plan_name,
      address: req.body.plan_name,
      city: req.body.plan_name,
      state: req.body.plan_name,
      zipcode: req.body.plan_name,

    };
    Plans.insert(newPlan)
      .then((plan) => {
        newPlace.plan_id = plan.id;
        Places.insert(newPlace)
          .then((place) => {
            res.redirect('/');
          });
      });

  } else {
    res.sendStatus(503);
  }

});


//add a new plan for
router.post('/:user_id/plans/:plan_id/places/new', (req, res, next) => {

  if (res.locals.loggedIn) {

    let newPlace = req.body;

    newPlace.plan_id = parseInt(req.params.plan_id);

    Places.insert(newPlace).then((result) => {

      res.redirect('back');

    });

  }else {
    res.redirect('/login');
  }
});

//creates new plan
router.post('/:user_id/plans/new', (req, res,next) => {

  if (res.locals.loggedIn) {

    let newPlan = req.body;

    newPlan.user_id = req.params.user_id;

    Plans.insert(newPlan).then((result) => {

      res.redirect('/');

    });

  }else {
    res.redirect('/');
  }

});


router.post('/:user_id/plans/new', (req, res) => {

  if (res.locals.loggedIn) {

    let newPlan = req.body;

    newPlan.user_id = req.params.user_id;

    Plans.insert(newPlan).then((result) => {

      res.redirect('/');

    });

  }else {
    res.redirect('/');
  }

});

router.use('/profile', users_profile);

router.get('/signup', function(req, res) {
  res.locals.loggedIn = req.session.loggedIn || false;
  res.render('pages/signup');
});

router.post('/signup', function(req, res) {

  Users.withEmail(req.body.email)
    .then(function(user) {
      if (!user) {
        let pBcryptHash = new Promise((resolve) => {
          resolve(bcrypt.hashSync(req.body.password));
        });

        pBcryptHash.then((hashed_password) => {

          Users.insert({
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

            res.redirect('/');

          });

        });
      } else {
        res.send('User created');
      }
    });
});

router.get('/login', function(req, res) {
  res.locals.loggedIn = req.session.loggedIn || false;
  res.render('pages/login');
});

router.post('/login', function(req, res) {


  Users.withEmail(req.body.email)
    .then(function(user) {

      if (!user) {
        res.redirect('/users/signup');
      }

      let pBcryptCompare = new Promise((resolve) => {
        resolve(bcrypt.compareSync(req.body.password, user.password));
      });

      pBcryptCompare.then((result) => {

        if (result) {

          req.session.user = user;
          req.session.loggedIn = true;

          res.locals.user = user;
          res.locals.loggedIn = true;

          res.redirect('/');

        } else {
          res.render('pages/login');
        }
      });
    });
});

router.get('/:id/plans', function(req, res) {

  var userID = Number.parseInt(req.params.id);

  res.locals.page_type = 'My Plans';

  knex('plans').where('user_id', '=', userID).then(function(plans) {
    res.render('pages/plans', {
      plans: plans,
    });
  });
});
//we need to attach the userID of the user that's favoriting places to the places table - maybe during the POST request when they click the favorite button?

// router.get('/:id/fav-places', function(req, res, next) {
//
//   var userID = Number.parseInt(req.params.id);
//
//   res.locals.page_type = 'My Favorite Places';
//
//   knex('places').where('user_id', '=', userID).then(function(places) {
//     res.render('pages/fav-places', {
//       places: places,
//     });
//   });
// });

router.get('/:user_id/plans/:plan_id/favorite', (req, res) => {
  let planID = req.params.plan_id;
  Plans.by_id(planID).then((planCopy)=>{
    planCopy.user_id = res.locals.user.id;
    planCopy.is_favorite = true;
    Places.listWithPlanID(planCopy.id).then((placesCopy)=>{
      delete planCopy['id'];
      Plans.insert(planCopy).then(planNew=>{
        placesCopy = placesCopy.map((place)=> {
          place.plan_id = planNew.id;
          delete place['id'];
        });
        Places.insert(placesCopy).then((placesNew)=>{
          res.redirect('/pages/plans');
        });
      });
    });
  });
});

router.get('/:id/fav-plans', function(req, res) {
  res.locals.page_type = 'My Favorite Plans';
  knex('plans').where('is_favorite', '=', true).then(function(plans) {
    res.render('pages/plans', {
      plans: plans,
    });
  });
});



router.get('/:id/plans/new', function(req, res) {
  res.render('pages/myplan');
});

router.get('/logout', function(req, res) {
  req.session.user = null;
  req.session.loggedIn = false;
  res.redirect('/users/login');
});

module.exports = router;
