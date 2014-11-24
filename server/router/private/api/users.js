'use strict';

/**
 * Private users API router
 */

var express = require('express');

var users = require('../../../controllers/users');

module.exports = function () {
	var router = express.Router();
	
	// current session user
	router.get('/current', users.getCurrent);

	// public user profile
	router.get('/profile/:id', users.getProfile);
	
	// user CRUD
	router.post('/', users.apiRequiresAdmin, users.create);
	router.get('/:id', users.apiRequiresAdmin, users.get);
	router.put('/:id', users.apiRequiresAdmin, users.update);
	router.delete('/:id', users.apiRequiresAdmin, users.delete);

	// all users
	router.get('/', users.apiRequiresAdmin, users.getAll);

	return router;
};