const express = require('express');
const router = express.Router();


router.get('/search', function (req, res, next) {
  res.render('pages/search');
});

router.post('/search', function(req, res, next) {
  res.sendStatus(404);
});

module.exports = router;
