const validationFunction = require('../utils/functions.js').idValidation;
const Service = require('./genericService.js');
const petController = new Service('pet',validationFunction,
							['breed','person'],['BreedId','OwnerId']);
const personController = new Service('person', (params)=>{return false;});
const animalController = new Service('animal',validationFunction,
							['breed','shop'],['BreedId','ShopId']);

class PurchaseService{
    
    async init(models, body){
        let id = body.OwnerId;
        const person = 	await personController.getOne(models, id);
        if(person.error) return person;
        id = body.AnimalId;
        const animal = await animalController.getOne(models, id);
        if(animal.error) return animal;       
        if(animal.ShopId != body.ShopId)
            return {
                error:'Shop id does not match animal shop id.',
                http:404
            }; 
        if(animal.amount < 1)
            return {
                error:'No animals to offer.',
                http:404
            };             
        const animalData = {
            "ShopId": animal.ShopId,
            "BreedId": animal.BreedId,
            "price": animal.price,
            "amount": animal.amount - 1,
        }
        const update = await animalController.update(models, animalData, id);
        if(update.error) return update;
        const petData = {
            "name": body.name,
            "BreedId": animal.BreedId,
            "OwnerId": body.OwnerId
        }
        const create = await petController.create(models, petData);
        return create;
    }
}

module.exports = PurchaseService;