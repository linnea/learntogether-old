'use strict';

/**
 * Learning module configuration
 */

var UglifyJS = require('uglify-js');
var CleanCSS = require('clean-css');

var auth = require('../lib/auth');
var errors = require('../lib/errors');


// TODO NOTE DANGER WARN
// open question:
// okay to leave concat js & css in memory?
// or better to write them to filesystem?


var modules = [];
var modulesJS = '';
var modulesCSS = '';
var moduleNames = [
	'test1'
];

// require and initialize each module by name
// (also, concat javascript file for angular)
moduleNames.forEach(function (moduleName) {

	// require module
	var module = require(moduleName);
	if (!module) return;


	// TODO create databaser/user/pass if not exist
	// and send connection info to module


	// initialize module
	module.init({
		auth: auth,
		errors: errors,
		db: {
			database: "",
			username: "",
			password: "",
			host: "",
			dialect: "",
			protocol: "",
		}
	});

	// grab any module js
	if (module.exportJS) {
		modulesJS += module.exportJS();
		modulesJS += '\n';
	}

	// grab any module css
	if (module.exportCSS) {
		modulesCSS += module.exportCSS();
		modulesCSS += '\n';
	}

	// save reference
	modules.push(module);

	console.log('loaded module "' + moduleName + '"');

});

// minify module js and css
modulesJS = UglifyJS.minify(modulesJS, { fromString: true }).code;
modulesCSS = new CleanCSS().minify(modulesCSS).styles;


/**
 * Interface
 */

// configuration function
module.exports = function (app) {

	// add middlewares to express chain
	modules.forEach(function (module) {
		if (!module.middleware) return;
		app.use(module.middleware());
	});

	// add routers to express chain
	modules.forEach(function (module) {
		if (!module.router) return;
		app.use('/modules/' + module.name, module.router());
	});

	// add module js to express chain
	app.use('/modules/all.min.js', function (req, res) {
		res.set('Content-Type', 'application/javascript');
		res.send(modulesJS);
	});

	// add module css to express chain
	app.use('/modules/all.min.css', function (req, res) {
		res.set('Content-Type', 'text/css');
		res.send(modulesCSS);
	});

};

