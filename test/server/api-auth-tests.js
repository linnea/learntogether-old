// http://thewayofcode.wordpress.com/2013/04/21/how-to-build-and-test-rest-api-with-nodejs-express-mocha/
// http://strongloop.com/strongblog/how-to-test-an-api-with-node-js/
// http://meanjs.org/docs.html#server-tests

// http://mochajs.org/
// https://github.com/shouldjs/should.js
// https://github.com/tj/supertest

'use strict';

var should = require('should');
var supertest = require('supertest');

var app = require('../../server/server.js');

var agent = supertest.agent(app);


describe('API - Auth', function () {

	var admin = null;
	var adminCredentials = {
		email: 'root',
		password: 'root'
	};
	
	it('should have empty current session', function (done) {
		agent
			.get('/api/auth/current')
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				should.exist(res.body.data);
				should.not.exist(res.body.data.user);
				should.not.exist(res.body.error);
				done();
			});
	});

	it('should authenticate agent as admin', function (done) {
		agent
			.post('/api/auth/login')
			.send(adminCredentials)
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				should.exist(res.body.data);
				should.exist(res.body.data.user);
				// save admin for later
				admin = res.body.data.user;
				done();
			});
	});

	it('should have admin in current session', function (done) {
		agent
			.get('/api/auth/current')
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				should.exist(res.body.data);
				should.exist(res.body.data.user);
				var resUser = res.body.data.user;
				resUser.id.should.equal(admin.id);
				resUser.name.should.equal(admin.name);
				resUser.email.should.equal(admin.email);
				resUser.isApproved.should.equal(true);
				resUser.isAdmin.should.equal(true);
				resUser.should.not.have.property('password');
				done();
			});
	});

});