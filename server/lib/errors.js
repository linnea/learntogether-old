'use strict';

/**
 * Middleware -- http error handler
 */
module.exports = function() {
    return function(err, req, res, next) {
        if (!err.statusCode && err.stack) {
            console.error(err.stack);
        }

        if (401 === err.statusCode || 400 === err.statusCode) {
            console.log(
            	err.statusCode + ' | ' +
            	new Date().toISOString() + ' | ' +
            	req.url + ' | ' +
            	(req.user ? req.user.id : 'anonymous')
            );
        }

        res
        	.status(err.statusCode || 500)
        	.json({message: err.message || err.toString()});
    };
};

/**
 * Errors to "throw" in middleware
 * -> next(errors.errorName());
 */
module.exports.unauthorized = function(msg) {
    var err = new Error(msg || 'You are not authorized to perform this action on this resource');
    err.statusCode = 401;
    return err;
};
module.exports.notFound = function(msg) {
    var err = new Error(msg || 'The requested resource does not exist');
    err.statusCode = 404;
    return err;
};
module.exports.invalid = function(msg) {
    var err = new Error(msg || 'The data sent was not valid');
    err.statusCode = 400;
    return err;
};