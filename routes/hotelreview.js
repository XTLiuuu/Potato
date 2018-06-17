var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('hotelreview', { title: 'Hotel Review' });
});

router.post('/', function(req, res, next) {
  res.render('hotelreview', { title: 'Hotel Review'});
});

module.exports = router;
