var express = require('express');
var router = express.Router();


router.get('/kinmu', function(req, res, next) {
    res.render('kinmu');
  });

module.exports = router;
