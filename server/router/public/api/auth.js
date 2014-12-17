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

	// login, logout, register
	router.post('/login', auth.login);
	router.post('/logout', auth.logout);
	router.post('/register', auth.register);

	return router;
};