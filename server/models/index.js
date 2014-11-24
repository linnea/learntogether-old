'use strict';

var _ = require('lodash-node');
var Sequelize = require('sequelize');

var config = require('../config/env');

// instantiate sequelize with our database
// http://sequelizejs.com/docs/1.7.8/usage#options
var sequelize = new Sequelize(
	config.db.database, // String
	config.db.username, // String
	config.db.password, // String
	config.db // Object - pass extra options
);

// test db connection
sequelize.authenticate()
	.complete(function(err) {
		if (!!err) {
			console.log('Unable to connect to database:', err);

			// TODO
			// what do if database fails?

		} else {
			console.log('Database connection successful');
		}
	});


/**
 * Load models based on name
 */

var models = {};
var modelNames = [
	'User'
];

// use Sequelize to import each model
_(modelNames).forEach(function (modelName) {
	models[modelName] = sequelize['import'](
		'./' + modelName.toLowerCase() + '.js'
	);
});

// associate models if needed
_(modelNames).forEach(function (modelName) {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models);
	}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;