const express = require('express');
const router  = express.Router();

// Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date(Date.now()).toString());
  next();
});

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;

