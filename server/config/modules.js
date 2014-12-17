'use strict';

/**
 * Learning module configuration
 */

var auth = require('../lib/auth');
var errors = require('../lib/errors');


/**
 * Init modules based on names
 */

var modules = [];
var moduleNames = [
	'test1'
];

moduleNames.forEach(function (moduleName) {
	var module = require(moduleName);
	if (!module) return;

	// TODO create db if not exists
	// TODO create db user if not exists
	// TODO create db connection and pass along

	module.init({
		db: null
	});

	modules.push(module);
});


/**
 * Interface
 */

// configuration function
module.exports = function (app) {

	// add middleware to express chain
	modules.forEach(function (module) {
		app.use(
			module.middleware({
				errors: errors
			})
		);
	});

	// add routers to express chain
	modules.forEach(function (module) {
		app.use(
			'/modules/' + module.name,
			module.router({
				errors: errors,
				auth: auth
			})
		);
	});

};

