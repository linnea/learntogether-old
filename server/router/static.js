'use strict';

/**
 * Static request router
 */

var path = require('path');

var express = require('express');

var config = require('../config/env');
var auth = require('../lib/auth');

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

	// assets
	router.use(
		'/private/assets',
		auth.webRequiresLogin,
		express.static(
			path.resolve(
				__dirname,
				'..',
				'..',
				config.paths.statics.privates.assets
			)
		)
	);

	//angular - common (shared angular assets)
	router.use(
		'/private/apps/common',
		auth.webRequiresLogin,
		express.static(
			path.resolve(
				__dirname,
				'..',
				'..',
				config.paths.statics.privates.common
			)
		)
	)

	// angular - main
	router.use(
		'/private/apps/main',
		auth.webRequiresLogin,
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
		auth.webRequiresLogin,
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
		auth.webRequiresLogin,
		auth.webRequiresAdmin,
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