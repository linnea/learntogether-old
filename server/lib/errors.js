'use strict';

/**
 * Middleware - http error handler
 */
module.exports = function() {
	return function(err, req, res, next) {
		// strange error?
		if (!err.statusCode && err.stack) {
			console.error(err.stack);
		}

		// send error status & json
		// error object modeled after:
		// 	- https://developers.facebook.com/docs/graph-api/using-graph-api/v2.2#errors
		// 	- https://dev.twitter.com/overview/api/response-codes
		res
			.status(err.statusCode || 500)
			.json({
				error: {
					message: err.message || err.toString()
				}
			});

		// don't call next
		// stop express chain
	};
};

/**
 * Errors to "throw" in middleware
 * -> next(errors.errorName());
 *
 * errors modeled after HTTP status codes:
 * - https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
 * - http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
 */
module.exports.badRequest = function (msg) {
	var err = new Error(msg || 'The request could not be understood by the server');
	err.statusCode = 400;
	return err;
};
module.exports.unauthorized = function (msg) {
	var err = new Error(msg || 'Authentication is required, and has failed or not yet been provided');
	err.statusCode = 401;
	return err;
};
module.exports.forbidden = function (msg) {
	var err = new Error(msg || 'You are not authorized to perform this action on this resource');
	err.statusCode = 403;
	return err;
};
module.exports.notFound = function (msg) {
	var err = new Error(msg || 'The requested resource could not be found');
	err.statusCode = 404;
	return err;
};
module.exports.conflict = function (msg) {
	var err = new Error(msg || 'The request could not be completed due to a conflict with the current state of the resource');
	err.statusCode = 409;
	return err;
};
module.exports.internalServerError = function (msg) {
	var err = new Error(msg || 'The server encountered an unexpected condition which prevented it from fulfilling the request');
	err.statusCode = 500;
	return err;
};