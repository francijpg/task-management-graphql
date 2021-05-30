const { gql } = require("apollo-server");

const typeDefs = gql`
  type Token {
    token: String
  }

  type Query {
    getProjects: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input AuthenticateInput {
    email: String!
    password: String!
  }

  type Mutation {
    createUser(input: UserInput): String
    authenticateUser(input: AuthenticateInput): Token
  }
`;

module.exports = typeDefs;
