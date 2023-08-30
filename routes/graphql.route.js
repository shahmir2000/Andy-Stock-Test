const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mergedTypeDefs = require("../graphql/typesDefs");
const mergedResolvers = require("../graphql/resolvers");

const router = express.Router();

const server = async () => {
  const apolloServer = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers
  });

  // Start the Apollo Server asynchronously
  await apolloServer.start();
  router.use(express.json());

  // Apply Apollo Server middleware
  apolloServer.applyMiddleware({ app: router, path: "/graphql" });
};

server();

module.exports = router;
