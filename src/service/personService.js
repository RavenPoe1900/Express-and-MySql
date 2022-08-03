const Service = require('./genericService.js');
const fs = require('fs');
const path = require('path');
const ResizeAndWrite = require('../utils/resizeAndWrite.js');
const removeFile = require('../utils/functions.js').removeFile;


class PersonService extends Service{
	constructor(moduleName, validationFunction, modelsValidate = null, idNames = null){
		super(moduleName, validationFunction, modelsValidate, idNames);
	}

	async remove(models, id){
       const remove = await super.remove(models, id);
	   if(remove.error) return remove;
	   const dir = `${path.resolve(__dirname,'../../')}/uploads/${id}.png`;
	   const removeF = removeFile(dir);
	   remove.message += ` and ${removeF}`;
	   return remove;
    };

	async imageUpload(models,id,file) {
		const module = this.module(models);
		const consult = await module.findByPk(Number(id));
		if(consult === null) return {
			http:404,  
			error: `Cannot find id=${id}.`
		  };
		
		const myPath = `/uploads/${id}.${file.mimetype.split('/')[1]}`;
		const resizeAndWrite = new ResizeAndWrite(file.buffer, 250, 400,myPath);
		await resizeAndWrite.init();
		if(resizeAndWrite.error) return {
			http:404,  
			error: resizeAndWrite.error,
		  };
		else{
			return {
				message:'Success Uploaded!'
			}
		};
	  };
	async imageDownload(id){
		const dir = `${path.resolve(__dirname,'../../')}/uploads`;
		const stat = fs.readdirSync(dir)
		for (let index = 0; index < stat.length; index++) {
			if (stat[index].split('.')[0] === id)
				return `${dir}/${stat[index]}`;		
		}
		return {
			http:404,  
			error: 'Cannot find file',
		  };		
	};
}
module.exports = PersonService;