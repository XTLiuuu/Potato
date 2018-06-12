var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('indexBS', { title: 'Trip Planner' });
});

module.exports = router;
