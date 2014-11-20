'use strict';

var _ = require('lodash-node');
var passport = require('passport');

var errors = require('../lib/errors');
var models = require('../models');

var User = models.User;


/**
 * Endpoints
 */

// GET domain.com/api/users/current
exports.getCurrent = function (req, res, next) {
	// grab user from session
	var user = req.user;
	// overwrite sensitive info
	user.password = undefined;
	// send response
	res.jsond(user);
};

// GET domain.com/api/users/
exports.getAll = function (req, res, next) {
	// find all users
	User.findAll()
		.success(function (users) {
			if (users) {
				_(users).forEach(function (user) {
					// remove each password
					user.password = undefined;
				});
				res.jsond({ users: users });
			} else {
				// 404
				next(errors.notFound('No users found'));
			}
		})
		.error(function (error) {
			// 500
			next(errors.internalServerError('Database error'));
		});
};

// GET domain.com/api/users/:id
exports.get = function (req, res, next) {
	// find user by id
	User.find(req.params.id)
		.success(function (user) {
			if (user) {
				// remove password
				user.password = undefined;
				res.jsond({ user: user });
			} else {
				// 404
				next(errors.notFound('User not found'));
			}
		})
		.error(function (error) {
			// 500
			next(errors.internalServerError('Database error'));
		});
};

// POST domain.com/api/users/
exports.create = function (req, res, next) {
	User.find({where: {email: req.body.email}})
		.success(function (user) {
			if (user) {
				// 409
				next(errors.conflict('User already exists'));
			} else {
				var user = User.build();
				user.name = req.body.name;
				user.email = req.body.email;
				user.password = user.generateHash(req.body.password);
				user.isAdmin = req.body.isAdmin;
				user.save()
					.success(function () {
						// remove password
						user.password = undefined;
						res.jsond({ user: user });
					})
					.error(function (error) {
						// 500
						next(errors.internalServerError('Database error'));
					});
			}
		})
		.error(function (error) {
			// 500
			next(errors.internalServerError('Database error'));
		});
};

// PUT domain.com/api/users/:id
exports.update = function (req, res, next) {
	User.find(req.params.id)
		.success(function (user) {
			if (user) {
				user.name = req.body.name || user.name;
				user.email = req.body.email || user.email;
				user.isAdmin = req.body.isAdmin || user.isAdmin;
				if (req.body.password && user.password !== req.body.password) {
					// new password, hash it for storage
					user.password = user.generateHash(req.body.password);
				}
				user.save()
					.success(function () {
						// remove password
						user.password = undefined;
						res.jsond({ user: user });
					})
					.error(function (error) {
						// 500
						next(errors.internalServerError('Database error'));
					});
			} else {
				// 404
				next(errors.notFound('User not found'));
			}
		})
		.error(function (error) {
			// 500
			next(errors.internalServerError('Database error'));
		});
};

// DELETE domain.com/api/users/:id
exports.delete = function (req, res, next) {
	User.find(req.params.id)
		.success(function (user) {
			if (user) {
				user.destroy()
					.success(function () {
						// remove password
						user.password = undefined;
						res.jsond({ user: user });
					})
					.error(function (error) {
						// 500
						next(errors.internalServerError('Database error'));
					});
			} else {
				// 404
				next(errors.notFound('User not found'));
			}
		})
		.error(function (error) {
			// 500
			next(errors.internalServerError('Database error'));
		});
};


/**
 * Middleware
 */

// require login for api requests
exports.apiRequiresLogin = function(req, res, next) {
	
	// if request isn't authenticated
	if (!req.isAuthenticated()) {
		// send error
		next(errors.unauthorized());
	}

	next();
};

// require login for web requests
exports.webRequiresLogin = function(req, res, next) {

	// if request isn't authenticated
	if (!req.isAuthenticated()) {
		// redirect to public welcome
		return res.redirect('/welcome');
	}

	next();
};