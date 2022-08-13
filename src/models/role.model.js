const permision = require("./permission.model.js");

module.exports = (sequelize, Sequelize) => {
	const role = sequelize.define(
		"Role",
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		},
		{ 
			timestamps: false,
			indexes: [
				{fields:['name']},
			],
		}
	);
	
	permision(sequelize, Sequelize).hasMany(role);
	role.belongsTo(permision(sequelize, Sequelize));

	return role;
}

