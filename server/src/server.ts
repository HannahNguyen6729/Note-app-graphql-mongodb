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
import '../firebase/config';
import { getAuth } from 'firebase-admin/auth';

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

  //authorization middleware
  const authorizationJWT = async (req: any, res: any, next: any) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const accessToken = authorizationHeader.split(' ')[1];
      getAuth()
        .verifyIdToken(accessToken)
        .then((decodedToken) => {
          const uid = decodedToken.uid;
          res.locals.uid = uid;
          next();
        })
        .catch((error) => {
          console.log({ error });
          return res.status(403).json({ message: 'Forbidden', error });
        });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };

  app.use(
    cors<cors.CorsRequest>(),
    authorizationJWT,
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        console.log(req);
        return { uid: res.locals.uid };
      },
    })
  );

  await new Promise((resolve: any) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`Server is ready at http://localhost:4000`);
};
