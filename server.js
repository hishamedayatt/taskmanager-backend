

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
        console.log(`express server running port http://localhost:${PORT}/graphql`);
        
    })
}

startServer()
