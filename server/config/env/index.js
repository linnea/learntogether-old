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
			favicon: 'client/public/favicon.ico',
			angulars: {
				main: 'client/private/apps/main/index.html',
				author: 'client/private/apps/author/index.html',
				admin: 'client/private/apps/admin/index.html'
			},
			statics: {
				public: 'client/public',
				privates: {
					libs: 'client/private/libs',
					assets: 'client/private/assets',
					main: 'client/private/apps/main',
					author: 'client/private/apps/author',
					admin: 'client/private/apps/admin'
				}
			}
		},
		port: process.env.PORT || 3000,
		secure: process.env.SECURE || false,
		sessionSecret: 'LeArNiNgIsFuNfOrYoUaNdMeOhWhEe'
	},
	require('./' + process.env.NODE_ENV) || {}
);