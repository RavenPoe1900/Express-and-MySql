
module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		"Permission",
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
			permissions: {
				type: Sequelize.STRING(512),
				allowNull: false,
			},
		},
		{ 
			timestamps: false,
			indexes: [
				{unique:true, fields:['name', 'permissions']},
			],
		}
	);
}

