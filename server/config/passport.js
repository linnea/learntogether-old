'use strict';

/**
 * Passport configuration
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var config = require('../config/env');
var errors = require('../lib/errors');
var models = require('../models');

var User = models.User;

module.exports = function () {

	/**
	 * Session setup
	 */

	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function (id, done) {
		User.find(id)
			.success(function (user) {
				done(null, user);
			})
			.error(function (err) {
				done(err, null);
			});
	});


	/**
	 * Strategy - Local login (web)
	 */

	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called "local"
	passport.use('local-web', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function (req, email, password, done) {

		// find a user whose email matches the one in the form
		// we're checking to see if user trying to login exists
		User.find({where: {email: email}})
			.success(function (user) {

				// if no user is found, return message
				if (!user) {
					return done(
						null,
						false,
						req.flash('loginMessage', 'Incorrect username or password.')
					);
				}

				// if user is found but password is wrong
				if (!user.validPassword(password)) {
					return done(
						null,
						false,
						req.flash('loginMessage', 'Incorrect username or password.')
					);
				}

				// if user is found but they're not approved
				if (!user.isApproved) {
					return done(
						null,
						false,
						req.flash('loginMessage', 'This user account has not been approved.')
					);
				}

				// all is well, return successful user
				return done(null, user);

			})
			.error(function (err) {
				return done(err);
			});
	}));


	/**
	 * Strategy - Local login
	 *
	 * restructured to return api-friendly errors
	 *
	 */

	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called "local"
	passport.use('local-api', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function (req, email, password, done) {

		// find a user whose email matches the one in the form
		// we're checking to see if user trying to login exists
		User.find({where: {email: email}})
			.success(function (user) {

				// if no user is found
				if (!user) {
					// error 422
					return done(
						errors.unprocessableEntity(
							'The user\'s email or password was incorrect'
						)
					);
				}

				// if user is found but password is wrong
				if (!user.validPassword(password)) {
					// error 422
					return done(
						errors.unprocessableEntity(
							'The user\'s email or password was incorrect'
						)
					);
				}

				// if user is found but they're not approved
				if (!user.isApproved) {
					// error 403
					return done(
						errors.forbidden(
							'This user account has not been approved'
						)
					);
				}

				// all is well, return successful user
				return done(null, user);

			})
			.error(function (err) {
				return done(err);
			});
	}));

};