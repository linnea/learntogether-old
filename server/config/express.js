'use strict';

var path = require('path');

var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var helmet = require('helmet');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('./env');
var router = require('../router');

module.exports = function () {
	
	// initialize express app
	var app = express();

	// log requests
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev')); 
	}

	// read cookies (needed for auth)
	app.use(cookieParser());
	// parse application/json
	app.use(bodyParser.json());
	// parse application/vnd.api+json as json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: true }));

	// set up for ejs templating
	app.set('view engine', 'ejs');
	app.set('views', path.resolve(__dirname, '..', 'views'));

	// express session
	app.use(session({
		secret: config.sessionSecret,
		saveUninitialized: true,
		resave: true
	}));

	// passport session
	app.use(passport.initialize());
	app.use(passport.session());
	
	// use connect flash for flash messages
	app.use(flash());

	// use helmet to secure express headers
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');

	// add routes
	app.use('/', router());

	// set the static files location
	app.use(express.static(path.resolve(__dirname, '..', '..', 'client')));

	return app;
};