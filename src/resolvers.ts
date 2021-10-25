import { IResolvers } from '@graphql-tools/utils/Interfaces';
import { ApolloError } from 'apollo-server-errors/src';

const resolvers: IResolvers = {
  Query: {
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    track: (_, { id }, { dataSources }) => dataSources.trackAPI.getTrack(id),
  },
  Mutation: {
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (error) {
        const { extensions } = error as ApolloError;
        return {
          code: extensions.response.status,
          success: false,
          message: extensions.response.body,
          track: null,
        };
      }
    },
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) =>
      dataSources.trackAPI.getAuthor(authorId),
    modules: ({ id }, _, { dataSources }) =>
      dataSources.trackAPI.getTrackModules(id),
  },
};

export default resolvers;
