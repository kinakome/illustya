var express = require('express');
var router = express.Router();
var cors = require('cors');
// var url = process.env.windir;
// var tok = process.env.windir;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/kinmu', function(req, res, next) {
  res.render('kinmu');
});

router.get('/stock', function(req, res, next) {
  res.render('stock');
});

router.get('/chat', function(req, res, next) {
  res.render('chat');
});
// router.get('/train', cors(), function(req, res, next) {
//   res.redirect('http://rti-giken.jp/fhc/api/train_tetsudo/delay.json');
// });

module.exports = router;
