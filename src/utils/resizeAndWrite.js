const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const fileExists = require('./functions.js').fileExists;

class ResizeAndWrite{
    constructor(buffer, width, height,fileName){
        this.buffer = buffer;
        this.width = width;
        this.height = height;
        this.fileName = fileName; 
        this.error = null;
    }
    async init(){
        const dir = `${path.resolve(__dirname,'../../')}${this.fileName}`;
        if(fileExists(dir)) this.error = 'File with name id already exists';
        else{
            const resizeBuffer = await this.resize();   
            fs.createWriteStream(`.${this.fileName}`).write(resizeBuffer);
        }
    }

    resize(){
        let resizeProcess = sharp(this.buffer).resize(this.width,this.height);        
        return resizeProcess.toBuffer();
    }    

    
}

module.exports = ResizeAndWrite;