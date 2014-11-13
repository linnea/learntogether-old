'use strict';

/**
 * Private API router
 */

var express = require('express');

var usersRouter = require('./users');

module.exports = function () {
	var router = express.Router();

	router.use('/users', usersRouter());

	return router;
};