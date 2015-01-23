'use strict';

module.exports = {
	db: {
		database : "learntogether",
		username : "root",
		password : "root",
		host: process.env.CONTAINER_IP,
		dialect: "postgres",
		protocol: "postgres",
		port: 5432,
		pool: {
			maxConnections: 1,
			maxIdleTime: 30
		}
	}
};
