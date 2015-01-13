'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

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

			// reject promise & pass error
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

			// resolve promise & pass app
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
 *
 *	!!! use node-postgres
 *		- ensure db connection before starting app
 *		- allow config/modules.js to grab its own list of module names
 *
 *
 * hey also, should we really be using postgres?
 * we've been testing it out and found it difficult to work with
 * (aka PG Commander vs the buttery ease of Sequel Pro)
 * mysql has a massive community, broader adoption (facebook, wordpress)
 *
 * ok no wait, looks like pg is the most reliable, compliant, and ACID db option
 * https://www.digitalocean.com/community/tutorials/sqlite-vs-mysql-vs-postgresql-a-comparison-of-relational-database-management-systems
 *
 * but replication/clustering will be a thing to figure out
 * https://wiki.postgresql.org/wiki/Replication,_Clustering,_and_Connection_Pooling
 *
 */

