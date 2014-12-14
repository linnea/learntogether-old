'use strict';

var _ = require('lodash-node');

/**
 * Load app configurations
 */

var env = process.env.NODE_ENV;

module.exports = _.extend(
	
	// settings for any environment
	{
		env: env,
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
					common: 'client/private/apps/common',
					main: 'client/private/apps/main',
					author: 'client/private/apps/author',
					admin: 'client/private/apps/admin'
				}
			},
			angularRoots: {
				// where to point routes for the angular apps
				main: 'client/private/apps/main/index.html',
				author: 'client/private/apps/author/index.html',
				admin: 'client/private/apps/admin/index.html'
			}
		},
		roles: {
			// authorization
			user: 100,
			leader: 200,
			admin: 300,
			default: 100
		},
		port: process.env.PORT || 3000,
		secure: process.env.SECURE || false
	},
	
	// settings for our current environment
	require('./' + env) || {},
	
	// secret settings sshhhhhhhh
	require('./secrets') || {}

);