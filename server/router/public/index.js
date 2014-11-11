'use strict';

/**
 * Public request router
 */

var path = require('path');

var express = require('express');

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

	return router;
};