// http://thewayofcode.wordpress.com/2013/04/21/how-to-build-and-test-rest-api-with-nodejs-express-mocha/
// http://strongloop.com/strongblog/how-to-test-an-api-with-node-js/
// https://github.com/tj/supertest

'use strict';

var should = require('should');
var supertest = require('supertest');

var app = require('../../server/server.js');

var agent = supertest.agent(app);

