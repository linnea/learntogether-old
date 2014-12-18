'use strict';

/**
 * Main application file
 */

console.log('-------------------------------------');
console.log(' Starting up system...');
console.log('-------------------------------------');

// set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/env');

// configure passport
require('./config/passport')();

// initialize and configure express
var app = require('./config/express')();

/**
 * TODO
 * - https
 * - graceful shutdown
 */

// start the app by listening on <port>
app.listen(config.port);

// startup success!
console.log('Started on port ' + config.port);

// expose app for testing
module.exports = app;