'use strict';

var _ = require('lodash-node');
var passport = require('passport');

var errors = require('../lib/errors');
var models = require('../models');

var User = models.User;




// NOTE TODO
// user needs isApproved boolean
// for public registration to work





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

// un-authenticate session
// POST domain.com/api/auth/logout
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
				user.name = req.body.name;
				user.email = req.body.email;
				user.password = user.generateHash(req.body.password);
				user.isAdmin = req.body.isAdmin;
				user.isApproved = true; // created by an admin, so...
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
	
	// if request isn't authenticated
	if (!req.user.isAdmin) {
		// send error 403
		return next(errors.forbidden());
	}

	next();
};

// -> web request route
// require admin status 
exports.webRequiresAdmin = function(req, res, next) {

	// if request isn't authenticated
	if (!req.user.isAdmin) {
		// redirect to root
		return res.redirect('/');
	}

	next();
};