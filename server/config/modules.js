'use strict';

/**
 * Learning module configuration
 */

var fs = require('fs');

var auth = require('../lib/auth');
var errors = require('../lib/errors');

var modules = [];
var moduleNgScripts = '';
var moduleNames = [
	'test1'
];

// require and initialize each module by name
// also, construct javascript file for angular
moduleNames.forEach(function (moduleName) {

	// require module
	var module = require(moduleName);

	// skip if failed
	if (!module) return;

	// TODO create db if not exists
	// TODO create db user if not exists
	// TODO create db connection and pass along

	// initialize module
	module.init({
		db: null
	});

	// add any module scripts
	// if (module.ngScripts && module.ngScripts.length) {
	// 	module.ngScripts.forEach(function (filename) {
	// 		moduleScripts += fs.readFileSync(filename, {
	// 			encoding: 'utf8'
	// 		});
	// 	});
	// }

	// grab reference to module
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

	// add module scripts to express chain

};

