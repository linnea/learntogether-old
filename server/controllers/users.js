'use strict';

var _ = require('lodash-node');
var passport = require('passport');

var errors = require('../lib/errors');
var models = require('../models');

var User = models.User;



/**
 * NOTE! todo >>> better error handling (use/expand errors lib)
 */




/**
 * Endpoints
 */

// GET domain.com/api/users/current
exports.getCurrent = function (req, res) {
	// grab user from session
	var user = req.user;
	// overwrite sensitive info
	user.password = undefined;
	// send response
	res.jsond(user);
};

// GET domain.com/api/users/
exports.getAll = function (req, res) {
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
				res.jsond({ error: "No users found" });
			}
		})
		.error(function (error) {
			// 500?
			res.jsond({ error: error });
		});
};

// GET domain.com/api/users/:id
exports.get = function (req, res) {
	// find user by id
	User.find(req.params.id)
		.success(function (user) {
			if (user) {
				// remove password
				user.password = undefined;
				res.jsond({ user: user });
			} else {
				// 404
				res.jsond({ error: "User not found" });
			}
		})
		.error(function (error) {
			// 500?
			res.jsond({ error: error });
		});
};

// POST domain.com/api/users/:id
exports.create = function (req, res) {
	User.find({where: {email: req.body.email}})
		.success(function (user) {
			if (user) {
				// http status?
				res.jsond({ error: "User already exists" });
			} else {
				var user = User.build();
				user.name = req.body.name;
				user.email = req.body.email;
				user.password = req.body.password;
				user.isAdmin = req.body.isAdmin;
				user.save()
					.success(function () {
						// remove password
						user.password = undefined;
						res.jsond({ user: user });
					})
					.error(function (error) {
						// 500?
						res.jsond({ error: error });
					});
			}
		})
		.error(function (error) {
			// 500?
			res.jsond({ error: error });
		});
};

// PUT domain.com/api/users/:id
exports.update = function (req, res) {
	User.find(req.params.id)
		.success(function (user) {
			if (user) {
				user.name = req.body.name || user.name;
				user.email = req.body.email || user.email;
				user.isAdmin = req.body.isAdmin || user.isAdmin;
				user.save()
					.success(function () {
						// remove password
						user.password = undefined;
						res.jsond({ user: user });
					})
					.error(function (error) {
						// 500?
						res.jsond({ error: error });
					});
			} else {
				// 404
				res.jsond({ error: "User not found" });
			}
		})
		.error(function (error) {
			// 500?
			res.jsond({ error: error });
		});
};

// DELETE domain.com/api/users/:id
exports.delete = function (req, res) {
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
						// 500?
						res.jsond({ error: error });
					});
			} else {
				// 404
				res.jsond({ error: "User not found" });
			}
		})
		.error(function (error) {
			// 500?
			res.jsond({ error: error });
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