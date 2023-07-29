import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import fakeData from '../fakeData/index';
import mongoose, { ConnectOptions } from 'mongoose';
import 'dotenv/config';

const app = express();
const httpServer = http.createServer(app);

const typeDefs = `#graphql

	type Folder {
		id:String,
		name: String,
		createdAt:String,
		author: Author,
    notes: [Note]
	}

  type Note {
    id:String,
    content: String,
  }

	type Author{
		id:String,
		name:String
	}

	type Query {
		folders: [Folder],
    folder(folderId: String): Folder,
    note(noteId:String): Note
	}
`;

const resolvers = {
  Query: {
    folders: () => {
      return fakeData.folders;
    },
    folder: (parent: any, args: any) => {
      //parent: Folder, args: params sent from client
      const folderId: string = args.folderId;
      const foundFolder = fakeData.folders.find(
        (folder) => folder.id === folderId
      );
      console.log(parent);
      return foundFolder;
    },
    note: (parent: any, args: any) => {
      console.log('parent', parent);
      return fakeData.notes.find((note) => note.id === args.noteId);
    },
  },
  Folder: {
    author: (parent: any, args: any, contextValue: any, info: any) => {
      console.log('parent', parent, 'args', args, contextValue, info);
      return fakeData.authors.find((author) => author.id === parent.authorId);
    },
    notes: (parent: any, args: any) => {
      console.log('parent', parent, 'args', args);
      return fakeData.notes.filter((note) => note.folderId === parent.id);
    },
  },
};

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
