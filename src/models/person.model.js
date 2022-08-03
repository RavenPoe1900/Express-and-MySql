module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		"Person",
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
		userName: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{ 
		timestamps: false,
		indexes: [
			{fields:['name','userName','password']},
		],
	 }
	);
}
