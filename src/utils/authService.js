const service = require('../utils/genericService.js');
const personController = new service('person', (params)=>{return false;});

module.exports = async (req, userName)=>{
    const module = personController.module(req);
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