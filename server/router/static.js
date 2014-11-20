'use strict';

/**
 * Static request router
 */

var path = require('path');

var express = require('express');

var config = require('../config/env');
var users = require('../controllers/users');

module.exports = function () {
	var router = express.Router();


	/**
	 * Public
	 */
	
	router.use(
		'/public',
		express.static(
			path.resolve(
				__dirname, 
				'..', 
				'..', 
				config.paths.statics.public
			)
		)
	);


	/**
	 * Private
	 */
	
	// libs
	router.use(
		'/private/vendor', 
		users.webRequiresLogin,
		express.static(
			path.resolve(
				__dirname, 
				'..', 
				'..', 
				config.paths.statics.privates.vendor
			)
		)
	);

	// assets
	router.use(
		'/private/assets', 
		users.webRequiresLogin,
		express.static(
			path.resolve(
				__dirname, 
				'..', 
				'..', 
				config.paths.statics.privates.assets
			)
		)
	);

	// angular - main
	router.use(
		'/private/apps/main', 
		users.webRequiresLogin,
		express.static(
			path.resolve(
				__dirname, 
				'..', 
				'..', 
				config.paths.statics.privates.main
			)
		)
	);

	// angular - author
	router.use(
		'/private/apps/author', 
		users.webRequiresLogin,
		express.static(
			path.resolve(
				__dirname, 
				'..', 
				'..', 
				config.paths.statics.privates.author
			)
		)
	);

	// angular - admin
	router.use(
		'/private/apps/admin', 
		users.webRequiresLogin,
		users.webRequiresAdmin,
		express.static(
			path.resolve(
				__dirname, 
				'..', 
				'..',
				config.paths.statics.privates.admin
			)
		)
	);


	return router;
};