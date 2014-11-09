'use strict';

/**
 * Main API router
 */

var express = require('express');

var usersRouter = require('./users');

module.exports = function () {
	var router = express.Router();

	// add all api routers here
	router.use('/users', usersRouter());

	return router;
};