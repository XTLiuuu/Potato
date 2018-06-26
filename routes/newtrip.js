var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newtrip', { title: 'CSS Demonstration' });
});

router.post('/', function(req, res, next) {
  console.log(req.body.country)
  console.log(req.body.city)
  console.log(req.body.depdate)
  console.log(req.body.retdate)
  console.log(req.body.hotel)
  console.log(req.body.airline)
  console.log(req.body.purpose)
  const country = req.body.country
  const city = req.body.city
  res.render('newtrip', { title: 'CSS Demonstration',country, city});
});

module.exports = router;
