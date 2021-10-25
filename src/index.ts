import { ApolloServer } from 'apollo-server';

import resolvers from './resolvers';
import typeDefs from './schema';
import TrackAPI from './datasource/track-api';
import { DocumentNode } from 'graphql';
import { IResolvers } from '@graphql-tools/utils/Interfaces';

const startApolloServer = async (
  typeDefs: DocumentNode,
  resolvers: IResolvers,
): Promise<void> => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      trackAPI: new TrackAPI(),
    }),
  });

  const { url, port } = await server.listen({
    port: process.env.PORT || 4000,
  });

  console.log(`
    🚀  Server is running!
    🔉  Listening on port ${port}
    📭  Query at ${url}
  `);
};

startApolloServer(typeDefs, resolvers);
