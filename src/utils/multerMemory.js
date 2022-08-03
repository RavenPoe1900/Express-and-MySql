const multer  = require('multer')
const image = require('../schemas/image.schema.js'); 

const storageImage = multer.memoryStorage({})

const maxSize = 2000 * 1000 * 1000;
   
module.exports = multer({ 
					fileFilter: (req, file, cb) => {
						const format = file.mimetype.split('/');
						const data = {
							name: req.params.id,
							format: format[1],
							mimeType:format[0]
						}
						const {error, body} = image.validate(data);   
						if(error){
							const { details } = error; 
							const message = details.map(i => i.message).join(',');
							cb(null, false);
							return cb(error.message);
						}else cb(null, true);
					},
					storage: storageImage ,
					limits: { fileSize: maxSize },
					
				}).single('image')

    