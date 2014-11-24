'use strict';

/**
 * Private request router
 * 
 * NOTE: 	all authentication checks happen here in index.js
 * 			all child files can assume authentication
 * 			but each are responsible for authorization
 */

var path = require('path');

var express = require('express');

var config = require('../../config/env');
var users = require('../../controllers/users');
var apiRouter = require('./api');
var authRouter = require('./auth');

module.exports = function () {
	var router = express.Router();

	// domain.com/api/...
	router.use('/api', users.apiRequiresLogin, apiRouter());

	// domain.com/auth/... 
	router.use('/auth', users.webRequiresLogin, authRouter());


	/**
	 * Angular
	 */
	
	// admin app
	router.use(
		'/admin', 
		users.webRequiresLogin, 
		users.webRequiresAdmin,
		function (req, res) {
			res.sendFile(
				path.resolve(
					__dirname,
					'..',
					'..',
					'..',
					config.paths.angularRoots.admin
				)
			);
		}
	);

	// author app
	router.use(
		'/author', 
		users.webRequiresLogin, 
		// todo users.webRequiresAuthor,
		function (req, res) {
			res.sendFile(
				path.resolve(
					__dirname,
					'..',
					'..',
					'..',
					config.paths.angularRoots.author
				)
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
				path.resolve(
					__dirname,
					'..',
					'..',
					'..',
					config.paths.angularRoots.main
				)
			);
		}
	);


	return router;
};