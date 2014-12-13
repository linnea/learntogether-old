var bcrypt = require('bcrypt-nodejs');

// create and return Sequelize schema
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User', {
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		isApproved: DataTypes.BOOLEAN,
		isAdmin: DataTypes.BOOLEAN,
		role: DataTypes.INTEGER
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