var express = require('express');
var auth = require('./api/auth');
var board = require('./api/board');
var forum = require('./api/forum');
var library = require('./api/library');
var lesson = require('./api/lesson');
var debut = require('./api/debut');
var api = express.Router();

api.use('/auth', auth);
api.use('/board', board);
api.use('/forum', forum);
api.use('/lessons', lesson);
api.use('/debuts', debut);
api.use('/library', library);

module.exports = api;
