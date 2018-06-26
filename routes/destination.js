var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('destination', { title: 'Popular Destination' });
});

router.post('/', function(req, res, next) {
  console.log(req.body.place)
  res.render('destination', { title: 'Popular Destination' });
});

module.exports = router;
