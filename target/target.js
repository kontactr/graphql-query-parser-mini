const graphql = require("graphql");
const lodash = require("lodash");

const booksArray = [
    {id: "1" , name: "name-1" , genre: "g1"},
    {id: "2" , name: "name-2" , genre: "g2"},
    {id: "3" , name: "name-3" , genre: "g3"}
]

const book = new graphql.GraphQLObjectType({
    name: "Book",
    fields: () => { return{
        id: {type: graphql.GraphQLID},
        name: {type: graphql.GraphQLString},
        genre: {type: graphql.GraphQLString}
    }}
});


const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        book : {
            type: book,
            args: {id:{type: graphql.GraphQLID}},
            resolve(parent , args) {
               const t =   booksArray.filter((obj) => {return obj.id === args.id});
               return t.length > 0 ? t[0] : [];
            }
        },
        books: {
            type: new graphql.GraphQLList(graphql.GraphQLString),
            args: {id:{type: graphql.GraphQLID}},
            resolve(parent , args){
                return booksArray.map((book) => {return book.name});
            }
        }
    }
})

const RootMutation = new graphql.GraphQLObjectType({
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
})