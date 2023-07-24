import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import fakeData from "../fakeData/index";

const app = express();
const httpServer = http.createServer(app);

const typeDefs = `#graphql

	type Folder {
		id:String,
		name: String,
		createdAt:String,
		author: Author
	}

	type Author{
		id:String,
		name:String
	}

	type Query {
		folders: [Folder]
	}
`;

const resolvers = {
  Query: {
    folders: () => {
      return fakeData.folders;
    },
  },
  Folder: {
    author: () => {
      return { id: "123", name: "Anna" };
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
