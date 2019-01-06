class GraphQLError{
    static type(){
        return "GraphQLError";
    }

    static booleanConverstion(){
        return false;
    }
}
GraphQLError.type = "GraphQLError";

class GraphQLSuccess{
    static type(){
        return "GraphQLSuccess";
    }
    
    static booleanConverstion(){
        return true;
    }
}
GraphQLSuccess.type = "GraphQLSuccess";


class GraphQLString{
    static type(){
        return "String"
    }
    static validate(data){
        if(data.constructor === String){
            return GraphQLSuccess;
        }else{
            return GraphQLError;
        }
    }
    static converstion(data){
        let temp = string(data);
        if(temp){
            return {__flag: GraphQLSuccess , __value: temp};
        }else{
            return {__flag: GraphQLError , __value: temp};
        }
    }

}
GraphQLString.type = "GraphQLString";


class GraphQLNumber{
    static type(){
        return "Number"
    }
    static validate(data){
        if(data.constructor === Number){
            return GraphQLSuccess;
        }else{
            return GraphQLError;
        }
    }
    static converstion(data){
        let temp = Number(data);
        if(temp){
            return {__flag: GraphQLSuccess , __value: temp};
        }else{
            return {__flag: GraphQLError , __value: temp};
        }
    }
}
GraphQLNumber.type = "GraphQLNumber";


class GraphQLBoolean{
    static type(){
        return "boolean";
    }
    static validate(data){
        if(data.constructor === Boolean){
            return GraphQLSuccess;
        }else{
            return GraphQLError;
        }
    }

    
    static converstion(data){
        let temp = Boolean(data);
        if([true , false].includes(temp)){
            return {__flag: GraphQLSuccess , __value: temp};
        }else{
            return {__flag: GraphQLError , __value: temp};
        }
    }

}
GraphQLBoolean.type = "GraphQLBoolean";


class GraphQLObject{
    constructor(object){
        this.type = "GraphQLObject"
        if(object.name && object.fields){
        this.name = object.name;
        this.fields = object.fields;
        if( (typeof this.fields) == 'function'){
            this.__functionFields = true;
        }else{
            this.__functionFields = false;
        }
        }else{
            this.data = null;
            this.fields = null;
        }
    }

    functionTofields(){
        if(this.__functionFields){
            this.fields = this.fields();
            this.__functionFields = false;
        }
    }

    static type(){
        return "Object"
    }

    validate(data){
        if(data.name && data.fields){
            return GraphQLSuccess;
        }else{
            return GraphQLError;
        }
    }

}

class GraphQLList{
    constructor(validationType){
        this.type = "GraphQLList";
        this.validationType = validationType;
    }

    static type(){
        return "Array List";
    }
    static validate(data){
        if(Array.isArray(data)){
            return GraphQLSuccess;
        }else{
            return GraphQLError;
        }
    }
}

class GraphQLSchema{
    constructor(data){
        this.query = data.query;
        this.mutation = data.mutation;
    }
}
GraphQLSchema.type = "GraphQLSchema";


module.exports = {
    GraphQLBoolean,
    GraphQLError,
    GraphQLList,
    GraphQLNumber,
    GraphQLObject,
    GraphQLSchema,
    GraphQLString,
    GraphQLSuccess
};