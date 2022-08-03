class AbstractService{    
    pagination(){   
        throw "Not implemantaion pagination";
    };
    
    getOne(){
        throw "Not implemantaion getOne";
    };

    create() {
        throw "Not implemantaion create";
    };
    
    update(){
        throw "Not implemantaion update";
    };

    remove(){
        throw "Not implemantaion remove";
    };
}

module.exports = AbstractService;