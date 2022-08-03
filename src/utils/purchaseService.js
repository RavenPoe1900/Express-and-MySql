const validationFunction = require('../utils/functions.js').idValidation;
const service = require('../utils/genericService.js');
const petController = new service('pet',validationFunction,
							['breed','person'],['BreedId','OwnerId']);
const personController = new service('person', (params)=>{return false;});
const animalController = new service('animal',validationFunction,
							['breed','shop'],['BreedId','ShopId']);

class PurchaseService{
    
    async init(req, data){
        let id = data.OwnerId;
        const person = 	await personController.getOne(req, id);
        if(person.error) return person;
        id = data.AnimalId;
        const animal = await animalController.getOne(req, id);
        if(animal.error) return animal;       
        if(animal.ShopId != data.ShopId)
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
        const update = await animalController.update(req, animalData, id);
        if(update.error) return update;
        const petData = {
            "name": data.name,
            "BreedId": animal.BreedId,
            "OwnerId": data.OwnerId
        }
        const create = await petController.create(req, petData);
        return create;
    }
}

module.exports = PurchaseService;