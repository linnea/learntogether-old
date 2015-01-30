'use strict';

/**
 * Private users API router
 */

var express = require('express');

var auth = require('../../../lib/auth');
var users = require('../../../controllers/users');

module.exports = function () {
	var router = express.Router();

	// user CRUD
	router.post('/', auth.apiRequiresAdmin, users.create);
	router.get('/:id', auth.apiRequiresAdmin, users.get);
	router.put('/:id', auth.apiRequiresAdmin, users.update);
	router.delete('/:id', auth.apiRequiresAdmin, users.delete);

	// all users
	router.get('/', auth.apiRequiresAdmin, users.getAll);

	return router;
};