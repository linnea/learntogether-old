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
 * - http->https
 * - graceful shutdown
 * - logging (http://blog.nodejs.org/2012/03/28/service-logging-in-json-with-bunyan/)
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


// start the app by listening on <port>
app.listen(config.port);

// startup success!
console.log('Started on port ' + config.port);

// expose app for testing
module.exports = app;