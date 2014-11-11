'use strict';

/**
 * Private authentication router
 */

var express = require('express');
var passport = require('passport');

module.exports = function () {
	var router = express.Router();


	/**
	 * Profile
	 */
	
	// if user is authenticated, let them see their profile
	router.get('/profile', function (req, res) {
		// grab user from session
		var user = req.user;
		// overwrite sensitive info
		user.password = undefined;
		// render the profile page
		res.render('profile.ejs', { 
			user: user
		});
	});


	return router;
};