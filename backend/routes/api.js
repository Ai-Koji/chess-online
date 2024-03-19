var express = require('express');
var auth = require('./api/auth');
var forum = require('./api/forum');
var library = require('./api/library');
var lesson = require('./api/lesson');
var api = express.Router();

api.use('/auth', auth);
api.use('/forum', forum);
api.use('/lessons', lesson);
api.use('/library', library);

module.exports = api;
