'use strict';

/**
 * Main request router
 */

var express = require('express');

var staticRouter = require('./static');
var publicRouter = require('./public');
var privateRouter = require('./private');

module.exports = function () {
	var router = express.Router();

	// static file requests 
	router.use('/static', staticRouter());

	// public api & web requests 
	router.use('/', publicRouter());

	// private api & web requests
	router.use('/', privateRouter());

	/**
	 * NOTE
	 * private router ends with a catch-all
	 * routing all unhandled requests to main angular app
	 * so no requests will make it to this point
	 */

	return router;
};