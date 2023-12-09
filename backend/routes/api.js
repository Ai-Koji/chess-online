var express = require('express');
var router = express.Router();

/* GET users listing. */

router.post('/registration', function(req, res, next) {
  console.log(req.body)
  res.sendStatus(200);
});

module.exports = router;
