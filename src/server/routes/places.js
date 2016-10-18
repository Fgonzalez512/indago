const express = require('express');
const router = express.Router();
const Places = require('../modules/places');

router.get('/', function(req, res, next) {
  Places.get.list()
    .then((places) => {

      res.render('pages/places', {
        places: 'asdasdasasd'
      });

    });
});

// router.post('/', function(req, res, next) {
//   Places.insert()
//     .then((places) => {
//
//       res.render('pages/places', places);
//
//     });
// });

module.exports = router;
