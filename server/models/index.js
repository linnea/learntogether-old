'use strict';

var _ = require('lodash-node');

var sequelize = require('../lib/sequelize')();


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


module.exports = models;

module.exports.sequelize = sequelize;