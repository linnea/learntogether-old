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
	
	// user CRUD
	router.delete('/:id', users.delete);
	router.put('/:id', users.update);
	router.post('/', users.create);
	router.get('/:id', users.get);

	// all users
	router.get('/', users.getAll);

	return router;
};