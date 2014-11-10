'use strict';

module.exports = {
	db: {
		database : "learntogether",
		username : "root",
		password : "root",
		host: "127.0.0.1",
		dialect: "postgres",
		protocol: "postgres",
		port: 5432,
		pool: {
			maxConnections: 1,
			maxIdleTime: 30
		}
	}
};
