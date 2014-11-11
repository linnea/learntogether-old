'use strict';

/**
 * Private request router
 * 
 * NOTE: _all_ auth checks happen here in index.js
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

	// domain.com/... 
	router.use('/', users.webRequiresLogin, authRouter());

	// any remaining requests go to angular
	router.use('*', users.webRequiresLogin, function (req, res) {
		res.sendFile(
			path.resolve(__dirname, '..', '..', '..', config.paths.angularRoot)
		);
	});

	return router;
};