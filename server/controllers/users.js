'use strict';

var _ = require('lodash-node');
var passport = require('passport');

var errors = require('../lib/errors');
var models = require('../models');

var User = models.User;


/**
 * Private helpers
 */

// handle sequelize errors
function handleDbError(error, next) {
	// validation fail?
	var cols = [
		'firstName', 
		'lastName', 
		'email', 
		'password', 
		'isApproved', 
		'isAdmin', 
		'role'
	];
	if (error && _.any(cols, function (col) { return !!error[col]; })) {
		// validation error, zip together messages and return
		var msg = "";
		_.forEach(cols, function (col) {
			if (error[col]) {
				msg += error[col] + ' ';
			}
		});
		// send error 422
		return next(
			errors.unprocessableEntity('Database validation failed: ' + msg)
		);
	} else {
		// send error 500
		return next(
			errors.internalServerError('Database error')
		);
	}
}


/**
 * Endpoints
 */

// public user profile
// GET domain.com/api/users/profile/:id
exports.getProfile = function (req, res, next) {
	// find user by id
	User.find(req.params.id)
		.success(function (user) {
			if (user) {
				// send json
				return res.jsond({
					profile: {
						// only public data
						firstName: user.firstName,
						lastName: user.lastName
					}
				});
			} else {
				// send error 404
				return next(
					errors.notFound('User not found')
				);
			}
		})
		.error(function (error) {
			// database error
			return handleDbError(error, next);
		});
};

// get all users
// GET domain.com/api/users/
exports.getAll = function (req, res, next) {
	// find all users
	User.findAll()
		.success(function (users) {
			if (users) {
				_(users).forEach(function (user) {
					// overwrite each password
					user.password = undefined;
				});
				// send json
				return res.jsond({ 
					users: users 
				});
			} else {
				// send error 404
				return next(
					errors.notFound('No users found')
				);
			}
		})
		.error(function (error) {
			// database error
			return handleDbError(error, next);
		});
};

// CRUD - read user
// GET domain.com/api/users/:id
exports.get = function (req, res, next) {
	// find user by id
	User.find(req.params.id)
		.success(function (user) {
			if (user) {
				// overwrite password
				user.password = undefined;
				// send json
				return res.jsond({ user: user });
			} else {
				// send error 404
				return next(
					errors.notFound('User not found')
				);
			}
		})
		.error(function (error) {
			// database error
			return handleDbError(error, next);
		});
};

// CRUD - create user
// POST domain.com/api/users/
exports.create = function (req, res, next) {
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
				// this is admin only method, safe
				user.isApproved = req.body.isApproved;
				user.isAdmin = req.body.isAdmin;
				user.role = Number(req.body.role);
				user.save()
					.success(function () {
						// overwrite password
						user.password = undefined;
						// send json
						res.jsond({ user: user });
					})
					.error(function (error) {
						// database error
						return handleDbError(error, next);
					});
			}
		})
		.error(function (error) {
			// database error
			return handleDbError(error, next);
		});
};

// CRUD - update user
// PUT domain.com/api/users/:id
exports.update = function (req, res, next) {
	User.find(req.params.id)
		.success(function (user) {
			if (user) {
				user.firstName = req.body.firstName || user.firstName;
				user.lastName = req.body.lastName || user.lastName;
				user.email = req.body.email || user.email;
				user.isApproved = req.body.isApproved;
				user.isAdmin = req.body.isAdmin;
				user.role = Number(req.body.role);
				if (req.body.password && user.password !== req.body.password) {
					// new password, hash it for storage
					user.password = user.generateHash(req.body.password);
				}
				user.save()
					.success(function () {
						// overwrite password
						user.password = undefined;
						// send json
						return res.jsond({ 
							user: user 
						});
					})
					.error(function (error) {
						// database error
						return handleDbError(error, next);
					});
			} else {
				// send error 404
				return next(
					errors.notFound('User not found')
				);
			}
		})
		.error(function (error) {
			// database error
			return handleDbError(error, next);
		});
};

// CRUD - delete user
// DELETE domain.com/api/users/:id
exports.delete = function (req, res, next) {
	User.find(req.params.id)
		.success(function (user) {
			if (user) {
				user.destroy()
					.success(function () {
						// overwrite password
						user.password = undefined;
						// send json
						return res.jsond({ 
							user: user 
						});
					})
					.error(function (error) {
						// database error
						return handleDbError(error, next);
					});
			} else {
				// send error 404
				return next(
					errors.notFound('User not found')
				);
			}
		})
		.error(function (error) {
			// database error
			return handleDbError(error, next);
		});
};