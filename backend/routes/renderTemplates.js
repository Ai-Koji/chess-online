var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	// res.render('index', { title: 'Express' });
	res.render('index');
});
router.get('/board', function (req, res, next) {
  res.render('index');
});
router.get('/debut-base*', function (req, res, next) {
	res.render('index');
});
router.get('/forum*', function (req, res, next) {
	res.render('index');
});
router.get('/beginner-lessons', function (req, res, next) {
	res.render('index');
});
router.get('/beginner-lessons*', function (req, res, next) {
	res.render('index');
});
router.get('/library*', function (req, res, next) {
	res.render('index');
});
router.get('/auth/login', function (req, res, next) {
	res.render('index');
});
router.get('/auth/registration', function (req, res, next) {
	res.render('index');
});
router.get('/auth/logout', function (req, res, next) {
	res.render('index');
});

module.exports = router;
