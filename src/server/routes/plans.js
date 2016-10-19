const router = require('express').Router();
const knex = require('../db/connection.js');
const Plans = require('../modules/plans');
const Places = require('../modules/Places');


router.get('/', function(req, res) {

  res.render('pages/plans');

});

//handles adding a new plan with a new place
router.post('/', (req, res, next) => {

  if (res.locals.loggedIn) {

    let newPlan = {
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
            res.redirect('/users/' + res.locals.user.id + '/plans/' + plan.id);
          });
      });

  } else {
    res.sendStatus(503);
  }


});

router.post('/:plan_id', (req, res) => {
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
