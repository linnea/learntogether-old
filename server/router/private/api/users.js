'use strict';

/**
 * Private users API router
 */

var express = require('express');

var users = require('../../../controllers/users');

module.exports = function () {
	var router = express.Router();
	
	// get current user
	router.get('/current', users.getCurrent);

	return router;
};