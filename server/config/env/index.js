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
		port: process.env.PORT || 3000,
		secure: process.env.SECURE || false,
		sessionSecret: 'LeArNiNgIsFuNfOrYoUaNdMeOhWhEe',
		angularRoot: 'client/index.html'
	},
	require('./' + process.env.NODE_ENV) || {}
);