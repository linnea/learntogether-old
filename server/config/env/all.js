'use strict';

module.exports = {
	app: {
		title: 'LearnTogether',
		description: 'Next-generation modular LMS platform',
		keywords: 'learn, together'
	},
	port: process.env.PORT || 3000,
	secure: process.env.SECURE || false,
	sessionSecret: 'LeArNiNgIsFuNfOrYoUaNdMeOhWhEe',
	angularRoot: 'client/index.html'
};
