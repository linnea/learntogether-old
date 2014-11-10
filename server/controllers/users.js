'use strict';

var _ = require('lodash-node');
var passport = require('passport');

var models = require('../models');
var User = models.User;

/**
 * domain.com/api/users/current
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
 * Require login routing middleware for api requests
 */
exports.apiRequiresLogin = function(req, res, next) {
	
	// if user isn't authenticated, return error
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};

/**
 * Require login routing middleware for web requests
 */
exports.webRequiresLogin = function(req, res, next) {

	// if user isn't authenticated, return error
	if (!req.isAuthenticated()) {
		return res.redirect('/welcome');
	}

	next();
};