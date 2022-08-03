const controller = require('./genericController.js');
const send = require('../utils/functions.js').send;

class personController extends controller {
    constructor(service){
        super(service);
    }
    async imageUpload(req, res){
        const imageUpload = await this.service.imageUpload(req, req.params.id, req.file);
        send(res, imageUpload);
    };

    async imageDownload(req, res){
       const path = await this.service.imageDownload(req.params.id);
       if(path.error) return res.status(path.http).send(path.error);
       res.sendFile(path);
    }
}

module.exports = personController;