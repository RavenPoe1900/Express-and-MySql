const redis = require('redis');
const {REDIS} = require('../../config/config.js');
const {logger} = require('../utils/logger.js');

class Redis {
    
    async connect() {
      const client = redis.createClient(REDIS);
      try{
        await client.connect();
        if(client.isReady && client.isOpen) logger('Client connected to redis and ready to use.')  
        else logger('Client not ready to use');      
      }catch(err){
          logger(err.message);
      }
      return client;
    }
  }
  
  module.exports = new Redis();

//  run();