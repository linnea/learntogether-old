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

});