// http://thewayofcode.wordpress.com/2013/04/21/how-to-build-and-test-rest-api-with-nodejs-express-mocha/
// http://strongloop.com/strongblog/how-to-test-an-api-with-node-js/
// https://github.com/tj/supertest

'use strict';

var should = require('should');
var supertest = require('supertest');

var app = require('../../server/server.js');

var agent = supertest.agent(app);


describe('/api/users', function () {

	var admin = null;
	var adminCredentials = {
		email: 'root',
		password: 'root'
	};
	
	it('should respond with 401 to unauthed calls', function (done) {
		agent
			.get('/api/users')
			.expect(401)
			.end(function (err, res) {
				should.not.exist(err);
				done();
			});
	});

	it('authenticating agent as admin', function (done) {
		agent
			.post('/api/auth/login')
			.send(adminCredentials)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				admin = res.body.data.user;
				done();
			});
	});

	/**
	 * Authenticated tests
	 */
	
	it('should return all users', function (done) {
		agent
			.get('/api/users/')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				done();
			});
	});

	it('should return admin user', function (done) {
		agent
			.get('/api/users/' + admin.id)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				done();
			});
	});

});