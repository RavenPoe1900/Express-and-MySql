const send = require('../utils/functions.js').send;

class genericController{
    constructor(service){
        this.service = service;
    } 
    
    pagination(config = null){   
        const service = this.service;
        return async function (req, res){
            const garbageCollector = service;
            if(config) config = config(req.app.locals.models);
            const paginationService = await garbageCollector.pagination(req.app.locals.models,
                                                                         req.body, config)
            send(res,paginationService);
        }
    };
    
    getOne(config = null){
        const service = this.service;
        return async function (req, res){
            const garbageCollector = service;
            if(config) config = config(req.app.locals.models);
            const getOne = await garbageCollector.getOne(req.app.locals.models, req.params.id, config);
            send(res, getOne); 
        }
               
    };

    create(config = null) {
        const service = this.service;
        return async function (req, res){
            const garbageCollector = service;
            if(config) config = config(req.app.locals.models);
            const create = await garbageCollector.create(req.app.locals.models, req.body, config);
            send(res, create);
        }
        
    };
    
    update(){
        const service = this.service;
        return async function (req, res){
            const garbageCollector = service;
            const update = await garbageCollector.update(req.app.locals.models, req.body, req.params.id);
            send(res, update);  
        }
        
    };

    remove(){
        const service = this.service;
        return async function (req, res){
            const garbageCollector = service;
            const remove = await garbageCollector.remove(req.app.locals.models, req.params.id);
            send(res, remove);
        }       
    };
}

module.exports = genericController;