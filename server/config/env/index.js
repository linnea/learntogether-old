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
			statics: {
				public: 'client/public',
				privates: {
					// private static folders are siloed
					// so we can grant access to one
					// without granting access to all
					vendor: 'client/private/vendor',
					assets: 'client/private/assets',
					main: 'client/private/apps/main',
					author: 'client/private/apps/author',
					admin: 'client/private/apps/admin'
				}
			},
			angularRoots: {
				main: 'client/private/apps/main/index.html',
				author: 'client/private/apps/author/index.html',
				admin: 'client/private/apps/admin/index.html'
			}
		},
		roles: {
			user: 100,
			leader: 200,
			admin: 300,
			default: 100
		},
		port: process.env.PORT || 3000,
		secure: process.env.SECURE || false,
		sessionSecret: 'LeArNiNgIsFuNfOrYoUaNdMeOhWhEe'
	},
	require('./' + process.env.NODE_ENV) || {}
);