'use strict';

/**
 * Private request router
 * 
 * NOTE: 	ALL authentication checks happen here in index.js
 * 			all child files can assume authentication
 * 			BUT each are responsible 
 */

var path = require('path');

var express = require('express');

var config = require('../../config/env');
var users = require('../../controllers/users');
var apiRouter = require('./api');
var authRouter = require('./auth');

module.exports = function () {
	var router = express.Router();

	router.use(function (req, res, next) {
		console.log('hi, private router');
		next();
	});

	/**
	 * API requests
	 * domain.com/api/...
	 */
	
	router.use('/api', users.apiRequiresLogin, apiRouter());

	/**
	 * Web requests
	 * domain.com/... 
	 */
	
	router.use('/', users.webRequiresLogin, authRouter());

	/**
	 * Angular requests
	 */
	
	// admin 
	router.use(
		'/admin', 
		users.webRequiresLogin, 

		// authorization goes here?
		
		function (req, res) {
			res.sendFile(
				path.resolve(__dirname, '..', '..', '..', config.paths.angulars.admin)
			);
		}
	);

	// author
	router.use(
		'/author', 
		users.webRequiresLogin, 

		// authorization goes here?

		function (req, res) {
			res.sendFile(
				path.resolve(__dirname, '..', '..', '..', config.paths.angulars.author)
			);
		}
	);

	// main 
	// CATCH-ALL 
	// (any unhandled requests end here)
	router.use(
		'*', 
		users.webRequiresLogin, 
		function (req, res) {
			res.sendFile(
				path.resolve(__dirname, '..', '..', '..', config.paths.angulars.main)
			);
		}
	);

	return router;
};