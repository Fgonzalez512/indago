const express = require('express');
const router = express.Router();



router.get('*',(req, res, next) =>{
  console.log('authentication');
  res.locals.user = req.session.user || null;
  res.locals.loggedIn = req.session.loggedIn || false;
  next();
});

module.exports = router;
