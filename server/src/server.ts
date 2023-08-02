import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import 'dotenv/config';
import { typeDefs } from '../schemas/index';
import { resolvers } from '../resolvers/index';

const app = express();
const httpServer = http.createServer(app);

//connect to database:
const connectDB = async () => {
  const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cfdt7pq.mongodb.net/?retryWrites=true&w=majority`;

  mongoose.set('strictQuery', false);
  await mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(async () => {
      console.log('Connected to Database - Initial Connection');
      await main();
    })
    .catch((err) => {
      console.log(`Initial Database connection error occured`, err);
    });
};

connectDB();

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  // Note you must call `start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await server.start();

  app.use(cors<cors.CorsRequest>(), json(), expressMiddleware(server));

  await new Promise((resolve: any) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`Server is ready at http://localhost:4000`);
};
