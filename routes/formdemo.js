var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('formdemo', { title: 'Sign Into My Account' });
});

module.exports = router;
