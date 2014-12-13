'use strict';

var _ = require('lodash-node');
var passport = require('passport');

var config = require('../config/env');
var errors = require('../lib/errors');
var models = require('../models');

var User = models.User;


/**
 * Endpoints
 */

// currently authenticated session user, if any
// GET domain.com/api/auth/current
exports.current = function (req, res, next) {
	// grab user from session
	var user = req.user;
	// overwrite password
	if (user && user.password) {
		user.password = undefined;
	}
	// send json
	return res.jsond({
		user: user
	});
};

// authenticate session
// POST domain.com/api/auth/login
exports.login = function (req, res, next) {
	// authenticate user with passport
	passport.authenticate(
		'local-login-api',
		function (err, user, info) {
			if (err) {
				// general error
				return next(err);
			}
			// establish user session
			req.login(user, function (err) {
				if (err) {
					// general error
					return next(err);
				}
				// success! return session user
				user.password = undefined;
				return res.jsond({
					user: user
				});
			});
		}
	)(req, res, next);
};

// un-authenticate session
// POST domain.com/api/auth/logout
exports.logout = function (req, res, next) {
	req.logout();
	return res.jsond({
		message: 'Success'
	});
};

// register new user
// POST domain.com/api/auth/register
exports.register = function (req, res, next) {
	User.find({where: {email: req.body.email}})
		.success(function (user) {
			if (user) {
				// send error 409
				return next(
					errors.conflict('User already exists')
				);
			} else {
				var user = User.build();
				user.firstName = req.body.firstName;
				user.lastName = req.body.lastName;
				user.email = req.body.email;
				user.password = user.generateHash(req.body.password);
				// DANGER public registration
				// default user to lowest-level
				user.isAdmin = false;
				user.isApproved = false;
				user.role = config.roles.default;
				user.save()
					.success(function () {
						// overwrite password
						user.password = undefined;
						// send json
						res.jsond({ user: user });
					})
					.error(function (error) {
						// send error 500
						return next(
							errors.internalServerError('Database error')
						);
					});
			}
		})
		.error(function (error) {
			// send error 500
			return next(
				errors.internalServerError('Database error')
			);
		});
};


/**
 * Middleware
 */

// -> api request route
// require user login
exports.apiRequiresLogin = function(req, res, next) {
	
	// if request isn't authenticated
	if (!req.isAuthenticated()) {
		// send error 401
		return next(errors.unauthorized());
	}

	next();
};

// -> web request route
// require user login
exports.webRequiresLogin = function(req, res, next) {

	// if request isn't authenticated
	if (!req.isAuthenticated()) {
		// redirect to public welcome
		return res.redirect('/welcome');
	}

	next();
};


// -> api request route
// require user admin status 
exports.apiRequiresAdmin = function(req, res, next) {
	
	// if request user isn't admin
	if (!req.user.isAdmin) {
		// send error 403
		return next(errors.forbidden());
	}

	next();
};

// -> web request route
// require admin status 
exports.webRequiresAdmin = function(req, res, next) {

	// if request user isn't admin
	if (!req.user.isAdmin) {
		// redirect to root
		return res.redirect('/');
	}

	next();
};


// -> api request route
// require user admin status 
exports.apiRequiresRole = function (role) {
	return function(req, res, next) {
		
		// if request user isn't super admin
		if (!req.user.isAdmin) {
			// if request user role isn't high enough
			if (req.user.role < role) {
				// send error 403
				return next(errors.forbidden());
			}
		}

		next();
	};
};

// -> web request route
// require user admin status 
exports.webRequiresRole = function (role) {
	return function(req, res, next) {
		
		// if reuwst user isn't super admin
		if (!req.user.isAdmin) {
			// if reuwst user role isn't high enough
			if (req.user.role < role) {
				// redirect to root
				return res.redirect('/');
			}
		}

		next();
	};
};