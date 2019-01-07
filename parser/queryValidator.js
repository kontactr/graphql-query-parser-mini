const graphql = require('../parser/graphqlTypes');

function __validateArgs(queryArgs , structureArgs){
    
    let results = true;
    
    function internalValidation(QueryKeys , structureKeys , flag){
        //console.log("start")
        //console.log();
        //console.log(QueryKeys , Array.isArray(QueryKeys) , structureKeys)
        //console.log();
        //console.log("end")
        
            console.log(QueryKeys,structureKeys , "poiuy");
        

        if( !Array.isArray(QueryKeys) && structureKeys.type === "GraphQLObject"  ) {                

            if(structureKeys.__functionFields){
                structureKeys.functionTofields();
            }
            //console.log()
            //console.log(structureKeys , "data")
            //console.log()

        for(let key of Object.keys(QueryKeys).filter((key) => (key !== '__flag' && key !== 'skipIndex'))){
            //console.log();
            //console.log(key , "Begin-Start" , structureKeys);      
            if(structureKeys.fields[key]){
            results = results && internalValidation(QueryKeys[key] , structureKeys.fields[key]);
            if(!results)
                break; }else{
                    results = results && false;
                    break;
            }
        }
            return results;
        }else if(Array.isArray(QueryKeys) && structureKeys.type === "GraphQLList" ){
            //console.log(structureKeys);
            for(let y of QueryKeys){
                if(y == 1){
                console.log()
                console.log(y ,"Array-y", structureKeys , "Array-structureKeys");
                console.log()
                }
                results = results && internalValidation(y , structureKeys.validationType , false);
                if(!results)
                break;
            }
            return results;
        }else if(typeof structureKeys === "function"){
            //console.log(typeof structureKeys , typeof QueryKeys ,"sdfghjasdfghtesdfgh");
            results = results && structureKeys.validate(QueryKeys).booleanConverstion();
            return results;
        }else{
            results = results && false;
            return results;
        }
    }
    
    console.log(internalValidation(queryArgs , structureArgs , false));
    
}

function __validateStructure(query , structure){
    //console.log(query  );
    //console.log();
    //console.log(structure);
//console.log(structure.args)
    if("args" in query){
        for(let y of Object.keys(query.args).filter((key) => key !== "__flag")){
            //console.log(query.args[y] , structure.args[y] , "Begin");
        console.log(__validateArgs(query.args[y] , structure.args[y]));
        }
    }

}



function validate(parsedQuery , schema){
    //console.log(parsedQuery , schema.query);

    if(!schema.query || !parsedQuery){
        return false;
    }

    
    if('query' in parsedQuery){
        let queries = parsedQuery.query;
        let results = true
        for(let k of Object.keys(queries).filter((queryq) => queryq !== '__flag')){
                let query = queries[k];
                if("query" in schema && "fields" in schema.query){
                    let structure = schema.query.fields[k];
                    __validateStructure(query , structure);
                }
            
        }

    }
}

module.exports = {
    validate
}