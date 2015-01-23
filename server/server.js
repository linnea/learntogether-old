'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// http://www.hacksparrow.com/running-express-js-in-production-mode.html

console.log('-------------------------------------');
console.log(' Starting up servers...');
console.log('-------------------------------------');


var http = require('http');
var https = require('https');

var chalk = require('chalk');
var Promise = require('bluebird');

var config = require('./config/env');
var configPassport = require('./config/passport');
var configExpress = require('./config/express');
var sequelize = require('./lib/sequelize')();


/**
 * Check db connection and start server
 * (and expose promise for testing)
 */
module.exports = new Promise(function (resolve, reject) {
	sequelize.authenticate().complete(function(err) {
		if (!!err) {

			/**
			 * Error
			 */

			console.error(chalk.bold.yellow('Unable to connect to database:', err));
			console.error(chalk.bold.red('Server startup failed'));

			// reject promise with error
			reject(err);

		} else {

			/**
			 * Success
			 */

			console.log(chalk.bold.green('Database connection successful'));

			// configure passport & express
			configPassport();
			var app = configExpress();

			// create HTTPS server and pass express app as handler
			var httpsServer = https.createServer({
				key: config.private_key,
				cert: config.public_cert
			}, app);

			// create HTTP server for forwarding to HTTPS
			var httpServer = http.createServer(function (req, res) {
				var redirectUrl = 'https://' + config.domain;
				if (config.https_port !== 443) {
					redirectUrl += ':' + config.https_port;
				}
				redirectUrl += req.url;
				res.writeHead(301, {
					'Location': redirectUrl
				});
				res.end();
			});

			// start listening for HTTPS
			httpsServer.listen(config.https_port, function () {
				console.log(
					chalk.bold.cyan(
						'HTTPS app server listening on port ' +
						httpsServer.address().port
					)
				);
			});

			// start listening for HTTP
			httpServer.listen(config.http_port, function () {
				console.log(
					chalk.bold.blue(
						'HTTP redirect server listening on port ' +
						httpServer.address().port
					)
				);
			});

			// graceful shutdown
			// when the process is killed, this will close the server, refusing all new requests
			// but continuing to process existing ones, calling the callback when finished
			(function () {
				var isShutDown = false;
				function makeShutdown(signal) {
					return function () {
						if (isShutDown) return;
						else isShutDown = true;
						console.log();
						console.log(chalk.bold.yellow(signal + ' signal, shutting down servers...'));
						httpServer.close(function() {
							console.log(chalk.bold.red('HTTP redirect server shut down'));
						});
						httpsServer.close(function() {
							console.log(chalk.bold.red('HTTPS app server shut down'));

							// NOTE TODO
							// upgrade sequelize to 2.0
							// https://github.com/sequelize/sequelize/issues/2282
							// https://github.com/sequelize/sequelize/wiki/Upgrading-to-2.0

							// console.log(chalk.bold.yellow('Closing database connection...'));
							// sequelize.close(function () {
							// 	chalk.bold.red('Database connection closed')
							// });

						});
					};
				};
				process.on('SIGTERM', makeShutdown('SIGTERM'));
				process.on('SIGINT', makeShutdown('SIGINT'));
			})();

			// resolve promise with express app
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