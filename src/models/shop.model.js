
module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		"Shop",
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
}

