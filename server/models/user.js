'use strict';

var bcrypt = require('bcrypt-nodejs');

var config = require('../config/env');

// create and return Sequelize schema
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User', {
		firstName: {
			type: DataTypes.STRING,
			validate: {
				isAlpha: true,
				notNull: true
			}
		},
		lastName: {
			type: DataTypes.STRING,
			validate: {
				isAlpha: true,
				notNull: true
			}
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				notNull: true
			}
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				notNull: true
			}
		},
		isApproved: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		role: {
			type: DataTypes.INTEGER,
			defaultValue: config.roles.default,
			validate: {
				isNumeric: true
			}
		}
	}, {
		instanceMethods: {
			generateHash: function (password) {
				return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
			},
			validPassword: function (password) {
				return bcrypt.compareSync(password, this.password);
			}
		}
	});
};