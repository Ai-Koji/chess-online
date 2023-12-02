var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/board', function(req, res, next) {
  req.end()
});

module.exports = router;
