'use strict';

var fs = require('fs');

module.exports = {
	domain: "localhost",
	http_port: process.env.HTTP_PORT || 80,
	https_port: process.env.HTTPS_PORT || 443,
	private_key: fs.readFileSync(__dirname + '/ssl/local-key.pem', 'utf-8'),
	public_cert: fs.readFileSync(__dirname + '/ssl/local-cert.pem', 'utf-8'),
	db: {
		database: "learntogether",
		username: "root",
		password: "root",
		host: "db",
		dialect: "postgres",
		protocol: "postgres",
		port: 5432,
		pool: {
			maxConnections: 1,
			maxIdleTime: 30
		}
	}
};
