'use strict';

/**
 * Users API router
 */

var express = require('express');

var users = require('../../controllers/users');

module.exports = function () {
	var router = express.Router();

	// add all user routes here
	
	// get current user
	router.get('/current', users.apiRequiresLogin, users.getCurrent);

	return router;
};