class genericController{
    constructor(moduleName, validationFunction, modelsValidate = null, idNames = null){
        this.moduleName = moduleName;
        this.validationFunction = validationFunction;
        this.modelsValidate = modelsValidate;
        this.idNames = idNames;
    }

    module(req){
        return req.app.locals.models[this.moduleName];
    }

    validationVariables(req, data){
        return {
            req: req,
            data: data,
            models: this.modelsValidate,
            idNames: this.idNames,
        }
    }

    async validationId(req, data, operation, config = null){
        const validation = await this.validationFunction(this.validationVariables(req, data))
        if(validation){
           return {
                http:404,
                error: `Validation property error`
            };;  
        }
        return operation(req, config);
    }

    async findAndOperation(req, data, id, response, operation, message){
        const module = this.module(req);
        try{
            let consult = await module.findByPk(Number(id));;
            if (consult) {        
                await consult[operation](data);
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

    async pagination(req, data,config){   
        const page = (data.page - 1) * data.size;
        const paginationConfig = {
            limit: data.size,
            offset: page,
         } 
        config = Object.assign({}, paginationConfig, config)    
        const module = this.module(req);
        try{
            const {count, rows} = await module.findAndCountAll(config);
            const pages = Math.ceil(count / data.size);
            const nextPage = data.page + 1 > pages? pages : data.page + 1;

            return {
                rows,
                meta:{
                    page: data.page,
                    page_size: data.size,
                    total: count,
                    pages: pages,
                    next_page: nextPage, 
                    prev_page: data.page - 1 > 1 ? nextPage - 1 : 1,
                }
            };
        }catch(err){
            return{
                http:500, 
                error: err.message || `Some error occurred while paging the ${this.moduleName}.`
            };
        }
    };
    
    async getOne(req, id, config={}){
        const module = this.module(req);
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

    create(req, data, config) {
        const operation = async (req, config) =>{
            const module = this.module(req);
            try{                
                const consult = await module.create(data,{
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
        return this.validationId(req, data, operation, config);
    };
    
    update(req, data, id){
        const operation = (req) =>{
            const response = (data)=>{
                return{
                    data,
                };
            };
            return this.findAndOperation(req, data, id, response, "update", "updating"); 
        } 
        return this.validationId(req, data, operation);
    };

    remove(req, id){
        const response = (data)=>{
            return{
                message: `successfully removed`
            };
        };
        return this.findAndOperation(req, null, id, response, "destroy", "deleting");
    };
}

module.exports = genericController;