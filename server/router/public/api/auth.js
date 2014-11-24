'use strict';

/**
 * Public auth API router
 */

var express = require('express');

var auth = require('../../../controllers/auth');

module.exports = function () {
	var router = express.Router();
	
	// current session user, if any
	router.get('/current', auth.current);
	
	// login and logout
	router.post('/login', auth.login);
	router.post('/logout', auth.logout);

	return router;
};