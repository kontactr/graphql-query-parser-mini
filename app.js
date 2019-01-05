/*xy.run(`query{
    bookOne(id: "34" , name: "qq" , genre: "Qwswq"){
        abc
        bcd
    }
}`)*/

const schemaManager = require('./parser/schemaManager');
const schema = require('./target/target');
const queryParser = require('./parser/queryParser');


const sm = new schemaManager();
sm.addSchema(schema);

const  p = `,:
 
`;

for(let o=0 ; o<p.length ; o++){
    console.log(p.charCodeAt(o));
}


queryParser.parse(	`mutation{
    b(id:1){
        a
    }
    d(id: 2){
        b
    }
    c(id:4),
    d1(id:347)
    e(id:5){
        e
    }
    f(id:0,id1:1,id2:2,id3:3){
        q,
        l(p:0){
            lo
        }
    }
    g(id:567,id1:{a:1,b:2,c:[1,2,3,4,r,{5:5,a6:[1,2,3,4,5,6,7,8,8,9,{2:2}]}]})
    
}`)

//queryParser.parse(`{a:2,b:4,c:5,d:[1,2,3,4],e:{r:4,e:5,t:3,g:[1,2,3,4,5,6,7,8,9,10,{1:1,2:2,3:3,4:[1,2,3,4]}]}}`)



//console.log(sm);