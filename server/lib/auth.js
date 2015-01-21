'use strict';

var errors = require('./errors');

/**
 * Middleware for authentication & authorization
 */

// -> api request route
// require user login
exports.apiRequiresLogin = function(req, res, next) {

	// if request isn't authenticated
	if (!req.isAuthenticated()) {
		// send error 401
		return next(errors.unauthorized());
	}

	// if user isn't approved
	if (!req.user.isApproved) {
		// send error 403
		return next(errors.forbidden('User has not been approved'));
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

	// if user isn't approved
	if (!req.user.isApproved) {
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

		// if request user isn't super admin
		if (!req.user.isAdmin) {
			// if request user role isn't high enough
			if (req.user.role < role) {
				// redirect to root
				return res.redirect('/');
			}
		}

		next();
	};
};