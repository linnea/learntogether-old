'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'local';
// http://www.hacksparrow.com/running-express-js-in-production-mode.html
// http://en.wikipedia.org/wiki/Development_environment_(software_development_process)

console.log('-------------------------------------');
console.log(' Starting up servers...');
console.log('-------------------------------------');
console.log('Environment "' + process.env.NODE_ENV + '"');


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
				console.log(chalk.bold.yellow('Redirecting HTTP request: ' + req.url));
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
			//
			// new!
			// force killing current connections also
			// because server was taking forever to exit
			// (so, is this even needed anymore? TBD)
			// http://stackoverflow.com/questions/14626636
			(function () {

				var isShutDown = false;
				var sockets = {};

				function handleConnection(socket) {
					// add newly connected socket
					var key = socket.remoteAddress + ':' + socket.remotePort;
					sockets[key] = socket;
					//console.log(chalk.bold.yellow('( ) socket opened: ' + key));
					// remove socket when it closes
					socket.once('close', function () {
						delete sockets[key];
						//console.log(chalk.bold.yellow('(X) socket closed: ' + key));
					});
				}

				function makeHandleShutdown(signal) {
					return function handleShutdown() {
						if (isShutDown) return;
						else isShutDown = true;
						console.log();
						console.log(chalk.bold.yellow(signal + ' signal, shutting down servers...'));
						// close http server
						httpServer.close(function() {
							console.log(chalk.bold.red('HTTP redirect server shut down'));
						});
						// close https server
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
						// destroy remaining sockets
						Object.keys(sockets).forEach(function (key) {
							sockets[key].destroy();
						});
					};
				};

				// listen for server connections
				httpServer.on('connection', handleConnection);
				httpsServer.on('connection', handleConnection);

				// listen for shutdown signals
				process.on('SIGTERM', makeHandleShutdown('SIGTERM'));
				process.on('SIGINT', makeHandleShutdown('SIGINT'));

			})();


			// resolve promise with express app
			resolve(app);

		}
	});
});











/**
 * TODO
 * - forever (https://www.npmjs.com/package/forever)
 */