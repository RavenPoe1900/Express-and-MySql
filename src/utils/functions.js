const fs = require('fs');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const validationError =(res, next, error)=>{
  if (error == null)return next(); 
  let message = '';
  const { details } = error; 
  if(details)
      message = details.map(i => i.message).join(',');
  if( error.message)
      message += error.message;
  res.status(422).json({ error: message })
};

function fileExists(path) {
  try {
    return fs.statSync(path).isFile();
  } catch (e) {
    return false;
  }
}

function removeFile(path){
  try {
    fs.unlinkSync(path)
    return 'successful file remove'
  } catch(err) {
    return `warning: no such file`;
  }
}

async function idValidation({models, body, modelsName, idNames}){
  let ids = [];
  idNames.forEach(element => {
    ids.push(body[element])
  }); 
  for (let index = 0; index < models.length; index++) {
    const model = models[modelsName[index]];
    const find = await model.findByPk(ids[index]);
    if(!find) return true    
  }
  return false;
}

async function hashPassword(plaintextPassword) {
  const hash = await bcrypt.hash(plaintextPassword, 10);
  return hash;
}

async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

function send(res, data){
  if (data.error) res.status(data.http).send(data.error);
  else res.send(data);
}

function createOrRefreshToken(id, userName, key, expires){
  const token = jwt.sign(
    { userId: id, userName: userName},
    key,
    {
      expiresIn: expires,
    }
  ); 
  return token;
}

module.exports = {
  validationError, 
  fileExists, 
  idValidation,
  hashPassword,
  comparePassword,
  send,
  removeFile,
  createOrRefreshToken,
};

