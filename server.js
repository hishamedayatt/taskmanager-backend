// import {ApolloServer} from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
// import { gql } from 'graphql-tag';


// const users = [
//     {id:"1",title:"gdygfui", discription:"bjhbhbhb", status:"inprogress", date:"01/11/5000"},
//     {id:"2",title:"gdygfui", discription:"bjhbhbhb", status:"compleate", date:"01/11/3000"},
//     {id:"3",title:"gdygfui", discription:"bjhbhbhb", status:"incomleate", date:"01/11/1000"},
//     {id:"4",title:"gdygfui", discription:"bjhbhbhb", status:"progress", date:"01/11/2000"}
// ];

// const typeDefs = gql `
//     type Query {
//         getUsers: [User]
//         getUserById(id: ID): User
//     }

//     type Mutation {
//         createUser(title: String!, discription: String!, status: String!, date: String!): User
//     }

//     type User {
//         id: ID!
//         title: String!
//         discription: String!
//         status: String!
//         date: String!

//     }`;

// const resolvers = {
//     Query: {
//         getUsers: () =>{
//            return users; 
//         },
//         getUserById: (parent,args) =>{
//             const id = args.id
//             return users.find((user) => user.id ===id)
//         },
//     },
//     Mutation: {
//         createUser: (parent,args) =>{
//              const { title, discription, status, date } = args;
//              const newUser = {
//                 id: (users.length + 1).toString(),
//                 title,
//                 discription,
//                 status,
//                 date,
//              };
//              users.push(newUser);
//         },
       

//     },
// };
// const server = new ApolloServer ({ typeDefs, resolvers });

// const{url} = await startStandaloneServer(server, {
//     listen:{port:4000},
// });
// console.log(`server running at ${url}`);

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'




async function startServer() {
    const app = express();

    const apolloServer = new ApolloServer({ typeDefs, resolvers})
    await apolloServer.start();
    // apolloServer.expressMiddleware ({app})


    app.use(
        '/graphql',
        cors(),
        bodyParser.json(),
        expressMiddleware(apolloServer)
    );
    dotenv.config();

    // app.use((req,res)=>{
    //     res.send("server started......")
    // })
    const PORT = process.env.PORT||5000;
    try {
        await mongoose.connect(process.env.mongo_db);
        console.log(`connected db as port ${PORT}`);
        
    } catch (error) {
        console.log(error);
        
    }
    
    app.listen(PORT,()=>{
        console.log(`express server running port ${PORT}`);
        
    })
}

startServer()