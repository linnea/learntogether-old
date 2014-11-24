'use strict';

var _ = require('lodash-node');
var passport = require('passport');

var errors = require('../lib/errors');
var models = require('../models');

var User = models.User;


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
						name: user.name
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
			// send error 500
			return next(
				errors.internalServerError('Database error')
			);
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
			// send error 500
			return next(
				errors.internalServerError('Database error')
			);
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
			// send error 500
			return next(
				errors.internalServerError('Database error')
			);
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
				user.name = req.body.name;
				user.email = req.body.email;
				user.password = user.generateHash(req.body.password);
				user.isAdmin = req.body.isAdmin;
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

// CRUD - update user
// PUT domain.com/api/users/:id
exports.update = function (req, res, next) {
	User.find(req.params.id)
		.success(function (user) {
			if (user) {
				user.name = req.body.name || user.name;
				user.email = req.body.email || user.email;
				user.isAdmin = req.body.isAdmin;
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
						// send error 500
						return next(
							errors.internalServerError('Database error')
						);
					});
			} else {
				// send error 404
				return next(
					errors.notFound('User not found')
				);
			}
		})
		.error(function (error) {
			// send error 500
			return next(
				errors.internalServerError('Database error')
			);
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
						// send error 500
						return next(
							errors.internalServerError('Database error')
						);
					});
			} else {
				// send error 404
				return next(
					errors.notFound('User not found')
				);
			}
		})
		.error(function (error) {
			// send error 500
			return next(
				errors.internalServerError('Database error')
			);
		});
};