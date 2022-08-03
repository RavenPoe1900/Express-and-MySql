const person = require("../models/person.model");
const breed = require("../models/breed.model");

module.exports = (sequelize, Sequelize) => {
	const pet = sequelize.define(
		"Pet",
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
	
	breed(sequelize, Sequelize).hasMany(pet);
	pet.belongsTo(breed(sequelize, Sequelize));
	person(sequelize, Sequelize).hasMany(pet, { as: "pets", foreignKey: "OwnerId" });
	pet.belongsTo(person(sequelize, Sequelize), { as: "Owner" });

	return pet;
}
