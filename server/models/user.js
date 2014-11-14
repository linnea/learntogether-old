var bcrypt = require('bcrypt-nodejs');

// create and return Sequelize schema
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User', {
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		isAdmin: DataTypes.BOOLEAN
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