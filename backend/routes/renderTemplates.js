var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (_, res) {
	// res.render('index', { title: 'Express' });
	res.render('index');
});
router.get('/board', function (_, res) {
  res.render('index');
});
router.get('/debut-base*', function (_, res) {
	res.render('index');
});
router.get('/forum*', function (_, res) {
	res.render('index');
});
router.get('/beginner-lessons', function (_, res) {
	res.render('index');
});
router.get('/beginner-lessons*', function (_, res) {
	res.render('index');
});
router.get('/library*', function (_, res) {
	res.render('index');
});
router.get('/auth/login', function (_, res) {
	res.render('index');
});
router.get('/auth/registration', function (_, res) {
	res.render('index');
});
router.get('/auth/logout', function (_, res) {
	res.render('index');
});

module.exports = router;
