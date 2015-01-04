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


// modules loaded by name
var moduleNames = [
	'test1'
];

var modules = [];
var modulesClientJS = '';
var modulesClientCSS = '';


// require and initialize each module
// concat any client-side js and/or css they export
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

	// grab any client-side js
	if (module.clientJS) {
		modulesClientJS += module.clientJS();
		modulesClientJS += '\n';
	}

	// grab any client-side css
	if (module.clientCSS) {
		modulesClientCSS += module.clientCSS();
		modulesClientCSS += '\n';
	}

	// save reference
	modules.push(module);

	console.log('loaded module "' + moduleName + '"');

});

// minify module js and css
modulesClientJS = UglifyJS.minify(modulesClientJS, { fromString: true }).code;
modulesClientCSS = new CleanCSS().minify(modulesClientCSS).styles;


/**
 * Interface
 */

// add module things to express request chain
module.exports = function (app) {


	//
	// sidenote
	//
	// here the modules are coupled directly with express
	// however Dr Stearns recommends we maintain our own layer between
	//
	// request -> express -> our layer -> modules (middleware, routes)
	//
	// so we could add/remove modules dynamically
	// without needing a server restart to reconfig express
	//
	//
	// BUT
	// this would also require
	// rethinking clientJS & clientCSS
	// -> now: static insertion before runtime
	// -> need: dynamic insertion during runtime
	//


	// add any middleware
	modules.forEach(function (module) {
		if (module.middleware) {
			app.use(module.middleware());
		}
	});

	// add any routers
	modules.forEach(function (module) {
		if (module.router) {
			app.use('/modules/' + module.name, module.router());
		}
	});

	// add pile of client js
	app.use('/modules/client.min.js', function (req, res) {
		res.set('Content-Type', 'application/javascript');
		res.send(modulesClientJS);
	});

	// add pile of client css
	app.use('/modules/client.min.css', function (req, res) {
		res.set('Content-Type', 'text/css');
		res.send(modulesClientCSS);
	});

};

