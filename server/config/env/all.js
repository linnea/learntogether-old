'use strict';

module.exports = {
	app: {
		title: 'LearnTogether',
		description: 'Modular LMS platform designed for the next generation of online learning',
		keywords: 'learn, together'
	},
	port: process.env.PORT || 3000,
	secure: process.env.SECURE || false,
	sessionSecret: 'LeArNiNgIsFuNfOrYoUaNdMeOhWhEe',
	angularRoot: 'client/index.html'
};
