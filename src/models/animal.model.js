const shop = require("../models/shop.model");
const breed = require("../models/breed.model");

module.exports = (sequelize, Sequelize) => {
	const animal = sequelize.define(
		"Animal",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		price: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		amount: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	},
	{ 
		timestamps: false ,
		indexes: [
			{fields:['price','amount']},
		],
	}
	);
	shop(sequelize, Sequelize).hasMany(animal);
	animal.belongsTo(shop(sequelize, Sequelize));
	breed(sequelize, Sequelize).hasMany(animal);
	animal.belongsTo(breed(sequelize, Sequelize));

	return animal;
}

