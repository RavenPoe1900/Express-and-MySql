const express = require('express');
const app = express();
const Db = require('./utils/connect.js');
const db = new Db();
const RedisClient = require('./utils/redis.js');
const cors = require('cors');
const {logger, printEndpoints} = require('./utils/logger.js');
const cookieParser = require('cookie-parser');
const config = require('../config/config.js');
const bodyParser = require('body-parser');
const breedRouter = require('./routes/breed.route.js');
const personRouter = require('./routes/person.route.js');
const petRouter = require('./routes/pet.route.js');
const shopRouter = require('./routes/shop.route.js');
const animalRouter = require('./routes/animal.route.js');
const purchaseRouter = require('./routes/purchase.route.js');
const errorHandler = require('./middlewares/handleError.middleware.js');
const authRouter = require('./routes/auth.route.js');


const port =  config.PORT||3000;
const corsOPtions = {
    origin:'*'
};

app.locals.models = db.models;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors(corsOPtions));
app.use(express.json());

app.use('/api/breed',breedRouter);
app.use('/api/person',personRouter);
app.use('/api/pet',petRouter);
app.use('/api/shop',shopRouter);
app.use('/api/animal',animalRouter);
app.use('/api/purchase',purchaseRouter);
app.use('/api/auth',authRouter);

app.use(errorHandler);

async function init(){
    printEndpoints(app._router, false);
    app.locals.redisClient = await RedisClient.connect();    
    await db.sync();
    app.listen(port,()=>{
        logger(`Server is running in port:${port}`);    
    })
}

init();
