'use strict';

/**
 * Learning module configuration
 */

var UglifyJS = require('uglify-js');

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


	// TODO create databaser/user/pass if not exist
	// and send connection info to module


	// initialize module
	module.init({
		auth: auth,
		errors: errors,
		db: {}
	});

	// add any module scripts
	if (module.ngScripts) {
		moduleNgScripts += module.ngScripts();
		moduleNgScripts += '\n';
	}

	// save reference to module
	modules.push(module);

	console.log('loaded module "' + moduleName + '"');

});

// minify module ng scripts
moduleNgScripts = UglifyJS.minify(moduleNgScripts, { fromString: true }).code;


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
	app.use(
		'/modules/ng-scripts.js',
		function (req, res) {
			res.set('Content-Type', 'application/javascript');
			res.send(moduleNgScripts);
		}
	);

};

