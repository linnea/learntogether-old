'use strict';

/**
 * Public authentication router
 */

var express = require('express');
var passport = require('passport');

var auth = require('../../controllers/auth');

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
	router.post('/login', passport.authenticate('local-web', {
		successRedirect: '/', // pass to angular
		failureRedirect: '/auth/login',
		failureFlash: true
	}));


	/**
	 * Register
	 */

	// show the registration form
	router.get('/register', function (req, res) {
		// render the page and pass in any flash data if it exists
		res.render('register.ejs', {
			message: req.flash('registerMessage')
		});
	});

	// process the registration form
	router.post('/register', auth.registerWeb);


	/**
	 * Logout
	 */

	router.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});


	return router;
};