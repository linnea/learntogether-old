'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// http://www.hacksparrow.com/running-express-js-in-production-mode.html

console.log('-------------------------------------');
console.log(' Starting up server...');
console.log('-------------------------------------');


var chalk = require('chalk');
var Promise = require('bluebird');

var config = require('./config/env');
var configPassport = require('./config/passport');
var configExpress = require('./config/express');
var sequelize = require('./lib/sequelize')();


/**
 * Check db connection and start server
 * (exposes promise for testing)
 */
module.exports = new Promise(function (resolve, reject) {
	sequelize.authenticate().complete(function(err) {
		if (!!err) {

			/**
			 * Error
			 */

			console.error('Unable to connect to database:', err);

			// reject promise with error
			reject(err);

		} else {

			/**
			 * Success
			 */

			console.log('Database connection successful');

			// configure and listen
			configPassport();
			var app = configExpress();
			app.listen(config.port);

			// startup success!
			console.log(chalk.bold.blue('Server listening on port ' + config.port));

			// resolve promise with app
			resolve(app);

		}
	});
});











/**
 * TODO
 * - http->https
 * - graceful shutdown
 * - logging (http://blog.nodejs.org/2012/03/28/service-logging-in-json-with-bunyan/)
 * - forever (https://www.npmjs.com/package/forever)
 */