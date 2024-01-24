var express = require('express');
var auth = require('./api/auth')
var api = express.Router();



api.use('/auth', auth);

module.exports = api;
