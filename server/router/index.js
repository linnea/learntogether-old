'use strict';

/**
 * Main request router
 */

var path = require('path');

var express = require('express');

var publicRouter = require('./public');
var privateRouter = require('./private');

module.exports = function () {
	var router = express.Router();

	// public requests 
	// -> check first! before auth screen
	router.use('/', publicRouter());

	// private requests
	// -> must be authenticated
	router.use('/', privateRouter());

	return router;
};