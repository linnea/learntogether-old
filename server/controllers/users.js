'use strict';

var _ = require('lodash-node');
var passport = require('passport');

var errors = require('../lib/errors');
var models = require('../models');

var User = models.User;

/**
 * Endpoint - GET domain.com/api/users/current
 */
exports.getCurrent = function (req, res) {
	// grab user from session
	var user = req.user;
	// overwrite sensitive info
	user.password = undefined;
	// send response
	res.json(user);
};

/**
 * Middleware - require login for api requests
 */
exports.apiRequiresLogin = function(req, res, next) {
	
	// if request isn't authenticated
	if (!req.isAuthenticated()) {
		// send error
		next(errors.unauthorized());
	}

	next();
};

/**
 * Middleware - require login for web requests
 */
exports.webRequiresLogin = function(req, res, next) {

	// if request isn't authenticated
	if (!req.isAuthenticated()) {
		// redirect to public welcome
		return res.redirect('/welcome');
	}

	next();
};