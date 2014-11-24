'use strict';

/**
 * Private API router
 */

var express = require('express');

var errors = require('../../../lib/errors');
var usersRouter = require('./users');

module.exports = function () {
	var router = express.Router();

	router.use('/users', usersRouter());

	// NOTE 
	// this is the last stop for API requests 
	// (already been through public)
	// so any further requests are 404
	router.use('/', function (req, res, next) {
		next(errors.notFound());
	});

	return router;
};