const express = require('express');
const router = express.Router();



router.get('*',(req, res, next) =>{
  res.locals.user = req.session.user || null;
  res.locals.loggedIn = req.session.loggedIn || false;
  next();
});

module.exports = router;
