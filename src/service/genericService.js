const AbstractService = require('./abstractService.js');

class GenericController extends AbstractService{
    constructor(moduleName, validationFunction, modelsValidate = null, idNames = null){
        super();
        this.moduleName = moduleName;
        this.validationFunction = validationFunction;
        this.modelsValidate = modelsValidate;
        this.idNames = idNames;
    }

    module(models){
        return models[this.moduleName];
    }

    validationVariables(models, body){
        return {
            models: models,
            body: body,
            modelsName: this.modelsValidate,
            idNames: this.idNames,
        }
    }

    async validationId(models, body, operation, config = null){
        const validation = await this.validationFunction(this.validationVariables(models, body))
        if(validation){
           return {
                http:404,
                error: `Validation property error`
            };;  
        }
        return operation(models, config);
    }

    async findAndOperation(models, body, id, response, operation, message){
        const module = this.module(models);
        try{
            let consult = await module.findByPk(Number(id));;
            if (consult) {        
                await consult[operation](body);
                return response(consult);
            } else {
                return {
                    http:404,
                    error: `Id not found!`
                }; 
            }
        }catch(err){
                return {
                    http:500,
                    error: err.message || `Some error occurred while ${message} the ${this.moduleName}.`
                };
            
        }   
    }

    async pagination(models, body,config){   
        const page = (body.page - 1) * body.size;
        const paginationConfig = {
            limit: body.size,
            offset: page,
         } 
        const configuration = Object.assign({}, paginationConfig, config)    
        const module = this.module(models);
        try{
            const {count, rows} = await module.findAndCountAll(configuration);
            const pages = Math.ceil(count / body.size);
            const nextPage = body.page + 1 > pages? pages : body.page + 1;

            return {
                rows,
                meta:{
                    page: body.page,
                    page_size: body.size,
                    total: count,
                    pages: pages,
                    next_page: nextPage, 
                    prev_page: body.page - 1 > 1 ? nextPage - 1 : 1,
                }
            };
        }catch(err){
            return{
                http:500, 
                error: err.message || `Some error occurred while paging the ${this.moduleName}.`
            };
        }
    };
    
    async getOne(models, id, config={}){
        const module = this.module(models);
        try{
            const consult = await module.findByPk(Number(id), config);
            if (consult) return consult;
            else {
                return{
                  http:404,  
                  error: `Cannot find id=${id}.`
                };
            }
        }catch(err){
            return{
                http:500,  
                error: err.message || `Some error occurred while getOne the ${this.moduleName}.`
            };
        }
        
    };

    create(models, body, config) {
        const operation = async (models, config) =>{
            const module = this.module(models);
            try{                
                const consult = await module.create(body,{
                        config
                    });
                return{
                    consult,
                };
            }catch(err){                
                return{
                    http:500,
                    error: err.message || `Some error occurred while creating the ${this.moduleName}.`
                };
            }   
        };   
        return this.validationId(models, body, operation, config);
    };
    
    update(models, body, id){
        const operation = (models) =>{
            const response = (body)=>{
                return{
                    body,
                };
            };
            return this.findAndOperation(models, body, id, response, "update", "updating"); 
        } 
        return this.validationId(models, body, operation);
    };

    remove(models, id){
        const response = (body)=>{
            return{
                message: `successfully removed`
            };
        };
        return this.findAndOperation(models, null, id, response, "destroy", "deleting");
    };
}

module.exports = GenericController;