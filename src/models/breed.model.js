
module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		"Breed",
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
				{unique:true, fields:['name']},
			],
		}
	);
}

