'use strict';

/**
 * Public authentication router
 */

var express = require('express');
var passport = require('passport');

module.exports = function () {
	var router = express.Router();


	/**
	 * Login
	 */

	// show the login form
	router.get('/login', function (req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { 
			message: req.flash('loginMessage') 
		});
	});

	// process the login form
	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/', // pass to angular
		failureRedirect: '/login',
		failureFlash: true
	}));


	/**
	 * Signup
	 */

	// show the signup form
	router.get('/signup', function (req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { 
			message: req.flash('signupMessage') 
		});
	});

	// process the signup form
	router.post('/signup', passport.authenticate('local-signup', {
		// redirect to the secure profile section
		successRedirect: '/profile',
		// redirect back to the signup page if there's an error
		failureRedirect: '/signup',
		// allow flash messages
		failureFlash: true
	}));


	/**
	 * Signout
	 */
	
	router.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});


	return router;
};