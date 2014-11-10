'use strict';

/**
 * Main application file
 */

// set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/env');

// configure passport
require('./config/passport')();

// initialize and configure express
var app = require('./config/express')();

// start the app by listening on <port>
app.listen(config.port);

// startup success!
console.log('LearnTogether -- started on port ' + config.port);