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

	// TODO make api-specific strategy
	// (or something? restructure current?)
	// to allow more granular error messages
	// currently, too interwoven with web/flash

	passport.authenticate(
		'local-login', 
		function (err, user, info) {
			if (err) {
				// general error
				return next(err);
			}
			if (!user) {
				// bad user error
				return next(
					errors.badRequest(
						'Not enough user data'
					)
				);
			}
			// made it! establish session
			req.login(user, function (err) {
				if (err) {
					// general error
					return next(err);
				}
				// made it! return session user
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
	

	// TODO
	// 
	// register user publicly
	// 
	// both HERE and FORM
	// ends up with isApproved = FALSE
	// 
	// BUT in users/create
	// isApproved = TRUE
	// because, admin made
	// 
	// SO
	// - isApproved in user model
	// - isApproved in database table
	// - isApproved in admin panel


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