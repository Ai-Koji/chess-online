var express = require('express');
var auth = require('./api/auth');
var forum = require('./api/forum');
var api = express.Router();

api.use('/auth', auth);
api.use('/forum', forum);

module.exports = api;
