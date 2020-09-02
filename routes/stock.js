var express = require('express');
var router = express.Router();

router.get('/stock', function(req, res, next) {
    res.render('stock');
  });

module.exports = router;
