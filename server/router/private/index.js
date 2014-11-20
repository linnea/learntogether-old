'use strict';

/**
 * Private request router
 * 
 * NOTE: 	ALL authentication checks happen here in index.js
 * 			all child files can assume authentication
 * 			BUT each are responsible for authorization
 */

var path = require('path');

var express = require('express');

var config = require('../../config/env');
var users = require('../../controllers/users');
var apiRouter = require('./api');
var authRouter = require('./auth');

module.exports = function () {
	var router = express.Router();


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
	 * Angular
	 */
	
	// admin app
	router.use(
		'/admin', 
		users.webRequiresLogin, 

		// authorization goes here?
		
		function (req, res) {
			res.sendFile(
				path.resolve(__dirname, '..', '..', '..', config.paths.angularRoots.admin)
			);
		}
	);

	// author app
	router.use(
		'/author', 
		users.webRequiresLogin, 

		// authorization goes here?

		function (req, res) {
			res.sendFile(
				path.resolve(__dirname, '..', '..', '..', config.paths.angularRoots.author)
			);
		}
	);

	// main app
	// CATCH-ALL 
	// (any unhandled requests end here)
	router.use(
		'*', 
		users.webRequiresLogin, 
		function (req, res) {
			res.sendFile(
				path.resolve(__dirname, '..', '..', '..', config.paths.angularRoots.main)
			);
		}
	);


	return router;
};