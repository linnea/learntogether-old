'use strict';

var _ = require('lodash-node');

/**
 * Load app configurations
 */
module.exports = _.extend(
	{
		app: {
			title: 'LearnTogether',
			description: 'Modular LMS platform designed for the next generation of online learning',
			keywords: 'learn, together'
		},
		paths: {
			staticFiles: 'client',
			favicon: 'client/favicon.ico',
			angularRoot: 'client/index.html',
		},
		port: process.env.PORT || 3000,
		secure: process.env.SECURE || false,
		sessionSecret: 'LeArNiNgIsFuNfOrYoUaNdMeOhWhEe'
	},
	require('./' + process.env.NODE_ENV) || {}
);