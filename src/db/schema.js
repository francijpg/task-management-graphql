const { gql } = require("apollo-server");

const typeDefs = gql`
  type Token {
    token: String
  }

  type Project {
    name: String
    id: ID
  }

  type Query {
    getProjects: [Project]
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

  input ProjectInput {
    name: String!
  }

  type Mutation {
    registerUser(input: UserInput): String
    authenticateUser(input: AuthenticateInput): Token
    newProject(input: ProjectInput): Project
    updateProject(id: ID!, input: ProjectInput): Project
    deleteProject(id: ID!): String
  }
`;

module.exports = typeDefs;
