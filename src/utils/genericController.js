const send = require('../utils/functions.js').send;

class genericController{
    constructor(service){
        this.service = service;
    }   

    async pagination(req,res,config){   
        const paginationService = await this.service.pagination(req, req.body, config)
        send(res,paginationService);
    };
    
    async getOne(req, res, config){
        const getOne = await this.service.getOne(req, req.params.id, config);
        send(res, getOne);        
    };

    async create(req, res, config = null) {
        const create = await this.service.create(req, req.body, config);
        send(res, create);
    };
    
    async update(req, res){
        const update = await this.service.update(req, req.body, req.params.id);
        send(res, update);  
    };

    async remove(req, res){
        const remove = await this.service.remove(req, req.params.id);
        send(res, remove);
    };
}

module.exports = genericController;