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
var auth = require('../../lib/auth');
var apiRouter = require('./api');
var authRouter = require('./auth');

module.exports = function () {
	var router = express.Router();

	// domain.com/api/v1/...
	router.use('/api/v1', auth.apiRequiresLogin, apiRouter());

	// domain.com/auth/...
	router.use('/auth', auth.webRequiresLogin, authRouter());

	/**
	 * Angular
	 */

	// admin app
	router.use(
		'/admin',
		auth.webRequiresLogin,
		auth.webRequiresAdmin,
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
		auth.webRequiresLogin,
		// todo auth.webRequiresAuthor,
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
		auth.webRequiresLogin,
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