const chalk = require('chalk');
let url = require('../../config/config.js').URL;


const logger = (text, info = 'INFO:', color='green')=>{
  const dateTime = new Date().toJSON().slice(0,19).replace('T',':');

  console.log(`${chalk.yellow(`[${dateTime}]`)} ${chalk[color](info)} ${chalk.bgBlue(text)}`)
};

const printEndpoints = (endpoints, isNotApp=true, dir='')=>{
  const data = endpoints.stack.filter(x=> x.route && x.route.path 
              && Object.keys(x.route.methods) != 0).map(layer => 
              ({ method :layer.route.stack[0].method.toUpperCase(), path: layer.route.path}));
  url = isNotApp? `${url}`: '';  
  for (let index = 0; index < data.length; index++) {
    logger(`${url}${dir}${data[index].path}, ${data[index].method}`,`[Router Explorer]`);     
  }
};

module.exports = {logger, printEndpoints};
