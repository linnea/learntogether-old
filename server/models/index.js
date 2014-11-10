'use strict';

var _ = require('lodash-node');
var Sequelize = require('sequelize');

var config = require('../config/env').database;

// instantiate sequelize with our database
var sequelize = new Sequelize(
	config.database, 
	config.username, 
	config.password, 
	config
);

// test db connection
sequelize.authenticate()
	.complete(function(err) {
		if (!!err) {
			console.log('Unable to connect to database:', err);
		} else {
			console.log('Database connection successful.');
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
	models[modelName] = sequelize['import']('./' + modelName + '.js');
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