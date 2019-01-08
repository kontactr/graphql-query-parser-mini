const graphql = require("../parser/graphqlTypes");
const lodash = require("lodash");

const booksArray = [
    {id: "1" , name: "name-1" , genre: "g1"},
    {id: "2" , name: "name-2" , genre: "g2"},
    {id: "3" , name: "name-3" , genre: "g3"}
]

const book = new graphql.GraphQLObject({
    name: "Book",
    fields: () => { return{
        id: {type:graphql.GraphQLString},
        name: {type:graphql.GraphQLString},
        genre: {type:graphql.GraphQLString}
    }}
});


const RootQuery = new graphql.GraphQLObject({
    name: "RootQuery",
    fields: {
        book : {
            type: book,
            args: {id:{type:new graphql.GraphQLList(new graphql.GraphQLList(new graphql.GraphQLList(book)))}},
            resolve(parent , args) {
               const t =   booksArray.filter((obj) => {return obj.id === args.id});
               return t.length > 0 ? t[0] : [];
            }
        },
        books: {
            type: new graphql.GraphQLList(graphql.GraphQLString),
            args: {id:{type: graphql.GraphQLString}},
            resolve(parent , args){
                return booksArray.map((book) => {return book.name});
            }
        }
    }
})

console.log(RootQuery.fields , "qqqq");

const RootMutation = new graphql.GraphQLObject({
    name: "RootMutation",
    fields: {
        bookOne: {
            //type: book,
            type: graphql.GraphQLString,
            args: {
                id: {type: graphql.GraphQLID},
                name: {type: graphql.GraphQLString},
                genre: {type: graphql.GraphQLString}
            },
            resolve(parent , args){
                console.log("qqq");
                const {id , name , genre} = args;
                booksArray.push({id , name , genre});
                //return { name , id , genre};
                return name
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});