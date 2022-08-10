const Service = require('./genericService.js');
const personService = new Service('person', (params)=>{return false;});
class AuthService{

  async findByUserName (models, userName){
    const module = personService.module(models);
    try{
        const consult = await module.findOne({
            where: {
              userName: userName
            }
          });
        if (consult) return consult;
        else {
            return{
              http:404,  
              error: `Cannot find userName=${userName}.`
            };
        }
    }catch(err){
        return{
            http:500,  
            error: err.message || `Some error occurred while getOne the ${this.moduleName}.`
        };
    }
  }

  updatePerson(person, id, models){
    return personService.update(models, person, id);
  }
}

module.exports = AuthService;