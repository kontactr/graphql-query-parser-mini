class schema{

    constructor(schema , id){
        this.schema = schema
        this.id = id;
    }

    getSchema(){
        return this.schema;
    }

    getId(){
        return this.id;
    }

}

module.exports = schema;