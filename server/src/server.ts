import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import fakeData from '../fakeData/index';

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
	}
`;

const resolvers = {
  Query: {
    folders: () => {
      return fakeData.folders;
    },
    folder: (parent: any, args: any) => {
      const folderId: string = args.folderId;
      const foundFolder = fakeData.folders.find(
        (folder) => folder.id === folderId
      );
      console.log(parent);
      return foundFolder;
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
main();
