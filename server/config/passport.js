'use strict';

/**
 * Passport configuration
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
	 * Strategy - Local signup
	 */

	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called "local"
	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password
		// we will override with email
		usernameField: 'email',
		passwordField: 'password',
		// allows us to pass the entire request to the callback
		passReqToCallback: true
	},
	function (req, email, password, done) {

		// asynchronous
		process.nextTick(function () {

			User.find({where: {email: email}})
				.success(function (user) {

					// check to see if there's already a user with that email
					if (user) {
						return done(
							// err
							null, 
							// user
							false, 
							// info
							req.flash('signupMessage', 'That email is already taken.')
						);
					} else {

						// create new user
						var newUser = User.build();
						newUser.name = req.body.name || 'Default Name';
						newUser.email = email;
						newUser.password = newUser.generateHash(password);

						// save the user
						newUser.save()
							.success(function () {
								return done(null, newUser);
							})
							.error(function (err) {
								return done(err);
							});

					}
				}).error(function (err) {
					return done(err);
				});
		});

	}));


	/**
	 * Strategy - Local login
	 */
	
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called "local"
	passport.use('local-login', new LocalStrategy({
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
						req.flash('loginMessage', 'No user found.')
					);
				}

				// if user is found but password is wrong
				if (!user.validPassword(password)) {
					return done(
						null,
						false,
						req.flash('loginMessage', 'Oops! Wrong password.')
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