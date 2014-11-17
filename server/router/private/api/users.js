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

	// I changed the following route from '/:id' to '/' so that the
	// database will auto-increment id instead of having to manually set it!
	// <3 James
	router.post('/', users.create);
	router.get('/:id', users.get);

	// all users
	router.get('/', users.getAll);

	return router;
};