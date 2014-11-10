'use strict';

/**
 * Main application router
 */

var path = require('path');

var express = require('express');

var config = require('../config/env');
var users = require('../controllers/users');
var apiRouter = require('./api');
var authRouter = require('./auth');

module.exports = function () {
	var router = express.Router();

	// public welcome page
	router.get('/welcome', function (req, res) {
		res.render('welcome.ejs');
	});

	// domain.com/api/...
	router.use('/api', apiRouter());

	// domain.com/... 
	router.use(authRouter());

	// all leftovers go to angular
	router.get('*', users.webRequiresLogin, function (req, res) {
		res.sendFile(
			path.resolve(__dirname, '..', '..', config.angularRoot)
		);
	});

	return router;
};