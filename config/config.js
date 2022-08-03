const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT; 

const CONFIG_DEVELOPMENT_DB = {
    database:  process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,    
    logging : false,
    version: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}

const JWT_SECRET = {
    key: process.env.JWT_SECRET_KEY,
    expires : process.env.JWT_SECRET_KEY_EXPIRES,
}

module.exports =  {    
    PORT,
    CONFIG_DEVELOPMENT_DB,   
    JWT_SECRET,
    URL:'/api',
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_SECRET_KEY_EXPIRES: process.env.JWT_SECRET_KEY_EXPIRES,
}