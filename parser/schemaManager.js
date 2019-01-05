const customSchemaObject = require("./schema");

class schemaManager{

    constructor(){
        this.schemasObject = {};
        this.idGenerator = this.__getNewId();
    }

    addSchema(schema){
        const newSchema = new customSchemaObject(schema , this.idGenerator() );
        this.schemasObject[newSchema.getId()] = newSchema;
        return newSchema.getId();
    }

    removeSchema(id){
        delete this.schemasObject[id];
    }

    __getNewId(){
        let id = 0;
        return (() => (id++));
    }

}

module.exports = schemaManager;