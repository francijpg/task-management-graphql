const { ApolloServer } = require("apollo-server");

const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");

const connectDB = require("./config/db");
const { token } = require("./utils");

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => token.validateToken(req),
});

server.listen().then(({ url }) => {
  console.log(`Server ready in: ${url}`);
});
