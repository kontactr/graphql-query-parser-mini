function parse(query){
    function alphanumeric(inputtxt)
    { 
        var letters = /^[0-9a-zA-Z]+$/;
        if(inputtxt.match(letters))
            return true;
        else
            return false;
    }

    const querylength = query.length;
    console.log("length" , querylength);
    const escapeCodes = [10,32,44,58]
    let prevQueryCache = '';
    let internalObjectParserQueryCache = "";
    function internalObjectParser(index, resultObject , stack , queryCache , flag){
        let character = query[index];
        console.log("Called" , character);
        
        if(character === '{'){
            if(resultObject === null){
                let resultObjectZero = {};
                resultObjectZero.__flag = false
                stack.push(resultObjectZero);
                return internalObjectParser(index+1 , resultObjectZero , stack , '' ,resultObjectZero.__flag);
            }   
            else{
            console.log(internalObjectParserQueryCache , "qsdfgh");
            if(!flag){
            resultObject[internalObjectParserQueryCache] = {}
            resultObject[internalObjectParserQueryCache].__flag = false
            stack.push(resultObject[internalObjectParserQueryCache]);
            internalObjectParserQueryCache = '';
            return internalObjectParser(index+1 , stack[stack.length - 1] , stack , '' , stack[stack.length - 1].__flag)
            }else{
                resultObject.push({});
                resultObject[resultObject.length - 1].__flag = false;
                stack.push(resultObject[resultObject.length - 1]);
                return internalObjectParser(index+1 , stack[stack.length - 1],stack,'',stack[stack.length-1].__flag )
            }
            
            }
        }
        else if(character === "}"){
            if(internalObjectParserQueryCache){
                resultObject[internalObjectParserQueryCache] = queryCache;
                internalObjectParserQueryCache = '';
            }

            stack.pop();
            if(stack.length <= 0){
                resultObject.skipIndex = index;
                return resultObject;
            }
            //console.log(stack.length , "pppppp");
            return internalObjectParser(index+1 , stack[stack.length - 1] , stack , '' , stack[stack.length - 1] ? stack[stack.length - 1].__flag : false)
        }
        else if(character === ":"){
            
            internalObjectParserQueryCache = queryCache.trim();
            queryCache = '';
            
            return internalObjectParser(index+1 , resultObject, stack , queryCache , resultObject.__flag);
        }
        else if(character === "["){
            resultObject[internalObjectParserQueryCache] = [];
            
            resultObject[internalObjectParserQueryCache].__flag = true
            let toy = resultObject[internalObjectParserQueryCache].__flag 
            stack.push(resultObject[internalObjectParserQueryCache]);
            internalObjectParserQueryCache = "";
            return internalObjectParser(index+1 , stack[stack.length - 1] , stack , '' , toy);
        }
        else if(character === "]"){
            if(queryCache)
                resultObject.push(queryCache);
            stack.pop()
            if(stack.length <= 0){
                resultObject.skipIndex = index;
                return resultObject;
            }
            return internalObjectParser(index+1 , stack[stack.length - 1] , stack, '' , stack[stack.length - 1].__flag)
        }
        else if(character === ","){
            if(flag){
                resultObject.push(queryCache);
            }else{
                if(internalObjectParserQueryCache && queryCache){
                resultObject[internalObjectParserQueryCache] = queryCache;
                internalObjectParserQueryCache = '';
                }
            }
            return internalObjectParser(index+1 , resultObject , stack , '' , resultObject.__flag);
        }
        else if( [10,32].includes(character.charCodeAt(0))){
            return internalObjectParser(index+1 , resultObject , stack , queryCache , resultObject.__flag);
        }
        else{
            return internalObjectParser(index+1 , resultObject , stack , queryCache + character , resultObject.__flag);
        }
        
    }

    function temp(queryObject , queryCharacter , queryCache , index , parserStack , flag){
        //console.log(queryCharacter);
        if(index >= querylength)
            {
                //console.log(queryObject)
                return queryObject
            }

        if( escapeCodes.includes(queryCharacter.charCodeAt(0))){
            if(!flag){
            if(queryCache == '')
                return temp(queryObject , query[index + 1] , '' , index + 1 , parserStack , queryObject.__flag);
            else{
                if(queryCache !== '__data')
                    queryObject[queryCache] = true
                return temp(queryObject , query[index + 1] , '' , index + 1 , parserStack , queryObject.__flag);
            }
        }else{
            //console.log(prevQueryCache , queryCache , "qwedsasd" , queryObject);
            if(queryCharacter === ':'){
                prevQueryCache = queryCache;

                if(query[index + 1] === "{"){
                     let getIndex = internalObjectParser(index+1,null,[],'',false);
                     //console.log(getIndex , query[getIndex] , "next now step");
                     queryObject[prevQueryCache] = getIndex;
                     prevQueryCache = '';
                     return temp(queryObject,query[getIndex.skipIndex+1],'',getIndex.skipIndex+1, parserStack ,queryObject.__flag);
                    //remianing work 
                    // return index   
                    // skip this parser to that index
                    // merge result object
                    //#endregion
                }else{

                return temp(queryObject , query[index+1] , '' , index + 1 , parserStack , queryObject.__flag);
                }
            }
            else if(queryCharacter === ','){
                queryObject[prevQueryCache] = queryCache;
                prevQueryCache = '';
                return temp(queryObject , query[index+1] , '' ,index + 1 , parserStack , queryObject.__flag);
            }else{
                return temp(queryObject , query[index+1] , '' , index+1 , parserStack , queryObject.__flag);
            }
            
            
        }
        }
        else if(alphanumeric(queryCharacter)){
            //console.log(queryCharacter , queryObject.__flag);
            return temp(queryObject , query[index + 1] , queryCache+queryCharacter , index + 1 , parserStack , queryObject.__flag)
        }    
        else if(queryCharacter === '{'){
            if("args" in queryObject){
                parserStack.pop();
            }
            queryObject[queryCache] = {}
            queryObject[queryCache].__flag = false
            parserStack.push(queryObject[queryCache])
            return temp(queryObject[queryCache] , query[index + 1] , '' , index+1 , parserStack , queryObject[queryCache].__flag)
        }
        else if(queryCharacter === '}'){
            let tempOne = parserStack.pop()
            //console.log(typeof query[index+1] , index , "Sdfghj")
            //console.log(parserStack[parserStack.length - 1])
            return temp(parserStack[parserStack.length - 1] , query[index + 1] , '' ,index + 1 , parserStack , parserStack[parserStack.length - 1].__flag);
        }
        else if(queryCharacter === '('){
            queryObject[queryCache] = {}
            queryObject[queryCache].__flag = false;
            parserStack.push(queryObject[queryCache]);
            queryObject[queryCache]["args"] = {}
            queryObject[queryCache]["args"].__flag = true;
            parserStack.push(queryObject[queryCache]["args"])
            return temp(queryObject[queryCache]["args"] , query[index + 1] , '' , index + 1 , parserStack , queryObject[queryCache]["args"].__flag);
    
        }
        else if(queryCharacter === ')'){
            if(prevQueryCache){
                queryObject[prevQueryCache] = queryCache;
                prevQueryCache = '';
            }
            let tempOne = parserStack.pop();
            if(escapeCodes.includes(query[index+1].charCodeAt(0)))
                parserStack.pop()
            return temp(parserStack[parserStack.length - 1] , query[index + 1] , '__data' , index + 1 ,parserStack , parserStack[parserStack.length - 1].__flag);
        }else{
            
            return queryObject
        }



    }
    let p = {}
    p["__flag"] = false
    temp(p , query[0] , '' , 0 , [p])
    console.log(p.mutation.g.args.id1.c[5].a6[10]);
    //console.log(internalObjectParser(0 , null , [] , '' , false).e.g);

}


module.exports = {
    parse,
}