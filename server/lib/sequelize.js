'use strict';

/**
 * Instantiate a sequelize instance with our database
 * http://sequelizejs.com/docs/1.7.8/usage#options
 */

var Sequelize = require('sequelize');

var config = require('../config/env');

// specify db query consoling
config.db.logging = console.log;

module.exports = function () {
	return new Sequelize(
		config.db.database, // String
		config.db.username, // String
		config.db.password, // String
		config.db // Object - pass extra options
	);
};