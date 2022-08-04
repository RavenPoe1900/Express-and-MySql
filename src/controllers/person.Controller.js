const controller = require('./generic.Controller.js');
const send = require('../utils/functions.js').send;

class personController extends controller {
    constructor(service){
        super(service);
    }

    imageUpload(){
        const service = this.service;
        return async function (req, res){
            const garbageCollector = service;
            const imageUpload = await garbageCollector.imageUpload(req.app.locals.models, req.params.id, req.file);
            send(res, imageUpload);
        }
    };

    imageDownload(){
        const service = this.service;
        return async function (req, res){
            const garbageCollector = service;
            const path = await garbageCollector.imageDownload(req.params.id);
            if(path.error) return res.status(path.http).send(path.error);
            res.sendFile(path);
        }       
    }
}

module.exports = personController;