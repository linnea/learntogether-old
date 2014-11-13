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

	// TEMP
	router.use(function (req, res, next) {
		console.log('hi, static router');
		next();
	});


	/**
	 * Public
	 */
	
	router.use(
		'/public',
		express.static(path.resolve(__dirname, '..', '..', config.paths.statics.public))
	);


	/**
	 * Private
	 */
	
	// libs
	router.use(
		'/private/libs', 
		users.webRequiresLogin,
		express.static(path.resolve(__dirname, '..', '..', config.paths.statics.privates.libs))
	);

	// assets
	router.use(
		'/private/assets', 
		users.webRequiresLogin,
		express.static(path.resolve(__dirname, '..', '..', config.paths.statics.privates.assets))
	);

	// angular - main
	router.use(
		'/private/main', 
		users.webRequiresLogin,
		express.static(path.resolve(__dirname, '..', '..', config.paths.statics.privates.main))
	);

	// angular - author
	router.use(
		'/private/author', 
		users.webRequiresLogin,
		express.static(path.resolve(__dirname, '..', '..', config.paths.statics.privates.author))
	);

	// angular - admin
	router.use(
		'/private/admin', 
		users.webRequiresLogin,
		express.static(path.resolve(__dirname, '..', '..', config.paths.statics.privates.admin))
	);


	return router;
};