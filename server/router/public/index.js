'use strict';

/**
 * Public request router
 */

var express = require('express');

var apiRouter = require('./api');
var authRouter = require('./auth');

module.exports = function () {
	var router = express.Router();

	router.use(function (req, res, next) {
		console.log('hi, public router');
		next();
	});

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