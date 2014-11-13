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

	router.use(function (req, res, next) {
		console.log('hi, main router');
		next();
	});

	// static file requests 
	router.use('/static', staticRouter());

	// public api & web requests 
	router.use('/', publicRouter());

	// private api & web requests
	router.use('/', privateRouter());

	return router;
};