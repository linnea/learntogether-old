'use strict';

/**
 * Public request router
 */

var express = require('express');

var apiRouter = require('./api');
var authRouter = require('./auth');

module.exports = function () {
	var router = express.Router();

	// public welcome page
	router.get('/welcome', function (req, res) {
		if (req.isAuthenticated()) {
			// already logged in? redirect to root
			res.redirect('/');
		} else {
			// load welcome page
			res.render('welcome.ejs');
		}
	});

	// domain.com/api/...
	router.use('/api', apiRouter());

	// domain.com/auth/... 
	router.use('/auth', authRouter());

	return router;
};