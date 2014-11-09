'use strict';

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Grab environment config settings
var config = require('./config/env');

// Configure passport
require('./config/passport')();

// Initialize and configure express
var app = require('./config/express')();

// Start the app by listening on <port>
app.listen(config.port);

// Log initialization
console.log('LearnTogether application started on port ' + config.port);