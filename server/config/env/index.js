'use strict';

var _ = require('lodash-node');

/**
 * Load app configurations
 */
module.exports = _.extend(
	require('./all'),
	require('./' + process.env.NODE_ENV) || {}
);