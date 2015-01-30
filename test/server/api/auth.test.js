// http://thewayofcode.wordpress.com/2013/04/21/how-to-build-and-test-rest-api-with-nodejs-express-mocha/
// http://strongloop.com/strongblog/how-to-test-an-api-with-node-js/
// http://meanjs.org/docs.html#server-tests

// http://mochajs.org/
// https://github.com/shouldjs/should.js
// https://github.com/tj/supertest

'use strict';

var should = require('should');
var supertest = require('supertest');

var server = require('../../../server/server.js');


describe('API - Auth', function () {

	/**
	 * Server test
	 */

	var agent = null;

	it('should have running server', function (done) {
		server
			.then(function (app) {
				agent = supertest.agent(app);
				done();
			})
			.catch(function (err) {
				done(err);
			});
	});

	/**
	 * Main tests
	 */

	var admin = null;
	var adminCredentials = {
		email: 'root',
		password: 'root'
	};

	var newUser = null;
	var newUserData = {
		firstName: 'newtest',
		lastName: 'newtest',
		email: 'newtest',
		password: 'newtest',
		// note: these should NOT work
		isApproved: true,
		isAdmin: true,
		role: 300
	};

	it('should have empty current session', function (done) {
		agent
			.get('/api/v1/auth/current')
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				should.exist(res.body.data);
				should.not.exist(res.body.data.user);
				should.not.exist(res.body.error);
				done();
			});
	});

	it('should register new user', function (done) {
		agent
			.post('/api/v1/auth/register')
			.send(newUserData)
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				should.not.exist(res.body.error);
				should.exist(res.body.data);
				should.exist(res.body.data.user);
				var resUser = res.body.data.user;
				resUser.should.have.property('id');
				resUser.firstName.should.equal(newUserData.firstName);
				resUser.lastName.should.equal(newUserData.lastName);
				resUser.email.should.equal(newUserData.email);

				// these should not have worked
				resUser.isApproved.should.equal(false);
				resUser.isAdmin.should.equal(false);
				resUser.role.should.equal(100);

				resUser.should.not.have.property('password');
				// save user for later
				newUser = resUser;
				done();
			});
	});

	it('should not authenticate new user', function (done) {
		agent
			.post('/api/v1/auth/login')
			.send(newUserData)
			.expect(403)
			.end(function (err, res) {
				should.not.exist(err);
				should.exist(res.body.error);
				done();
			});
	});

	it('should have empty current session', function (done) {
		agent
			.get('/api/v1/auth/current')
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
			.post('/api/v1/auth/login')
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
			.get('/api/v1/auth/current')
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				should.exist(res.body.data);
				should.exist(res.body.data.user);
				var resUser = res.body.data.user;
				resUser.id.should.equal(admin.id);
				resUser.firstName.should.equal(admin.firstName);
				resUser.lastName.should.equal(admin.lastName);
				resUser.email.should.equal(admin.email);
				resUser.isApproved.should.equal(true);
				resUser.isAdmin.should.equal(true);
				resUser.should.not.have.property('password');
				done();
			});
	});

	it('should delete new user', function (done) {
		agent
			.delete('/api/v1/users/' + newUser.id)
			.send(newUser)
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				should.not.exist(res.body.error);
				should.exist(res.body.data);
				should.exist(res.body.data.user);
				var resUser = res.body.data.user;
				resUser.id.should.equal(newUser.id);
				resUser.firstName.should.equal(newUser.firstName);
				resUser.lastName.should.equal(newUser.lastName);
				resUser.email.should.equal(newUser.email);
				resUser.isApproved.should.equal(newUser.isApproved);
				resUser.isAdmin.should.equal(newUser.isAdmin);
				resUser.role.should.equal(newUser.role);
				resUser.should.not.have.property('password');
				done();
			});
	});

});