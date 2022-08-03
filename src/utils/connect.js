const {Sequelize, DataTypes} = require('sequelize');
const config = require('../../config/config.js').CONFIG_DEVELOPMENT_DB;
const logger = require('./logger.js').logger;
const fs = require('fs');
const path = require('path');
class Db{
    constructor() {
        this.sequelize = new Sequelize(config);
        this.models = {}
        this.searchModels();
    }

    async sync(){
        try{
            // Failed to sync db: Too many keys specified; max 64 keys allowed
            const sync = await this.sequelize.sync({ alter: true, force: false} );
            logger("Synced db.");
        }
        catch(err){
            logger("Failed to sync db: " + err.message);
        }
    }    

    searchModels(){
        const models = path.resolve(__dirname,'../models')
        const stat = fs.readdirSync(models);
        stat.forEach(element => {           
            const name = element.split('.')[0];
            this.models[name] = require(`${models}/${name}.model.js`)(this.sequelize, Sequelize);
        });
    }
}

module.exports = Db;
