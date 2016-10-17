const express = require('express');
const router = express.Router();


router.get('/auth', function (req, res, next) {
  res.render('index');

});
router.get('/', function (req, res, next) {
  res.locals.user = req.session.user || null;
  res.locals.loggedIn = req.session.loggedIn || false;
  next();
});


module.exports = router;
