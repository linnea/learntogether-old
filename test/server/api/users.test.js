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


describe('API - Users', function () {

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
	 * Authentication tests
	 */

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
				should.not.exist(res.body.data);
				should.exist(res.body.error);
				should.exist(res.body.error.message);
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

	/**
	 * Main tests
	 */

	var newUser = null;
	var newUserData = {
		firstName: 'Test',
		lastName: 'User',
		email: 'test@test.net',
		password: 'testestest',
		isApproved: true,
		isAdmin: false,
		role: 200,
	};

	it('should return all users', function (done) {
		agent
			.get('/api/users/')
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				should.not.exist(res.body.error);
				should.exist(res.body.data);
				should.exist(res.body.data.users);
				should.exist(res.body.data.users.length);
				done();
			});
	});

	it('should create new user', function (done) {
		agent
			.post('/api/users/')
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
				resUser.isApproved.should.equal(newUserData.isApproved);
				resUser.isAdmin.should.equal(newUserData.isAdmin);
				resUser.role.should.equal(newUserData.role);
				resUser.should.not.have.property('password');
				// save user for later
				newUser = resUser;
				done();
			});
	});

	it('should read new user', function (done) {
		agent
			.get('/api/users/' + newUser.id)
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

	it('should update new user', function (done) {
		newUser.firstName = 'Updated';
		newUser.lastName = 'Name';
		agent
			.put('/api/users/' + newUser.id)
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

	it('should delete new user', function (done) {
		agent
			.delete('/api/users/' + newUser.id)
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

	it('should not read new user', function (done) {
		agent
			.get('/api/users/' + newUser.id)
			.expect(404)
			.end(function (err, res) {
				should.not.exist(err);
				should.not.exist(res.body.data);
				should.exist(res.body.error);
				should.exist(res.body.error.message);
				done();
			});
	});

});