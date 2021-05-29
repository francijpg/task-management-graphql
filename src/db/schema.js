const { gql } = require("apollo-server");

const typeDefs = gql`
  type Course {
    titulo: String
  }
  type Query {
    getCourses: [Course]
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(input: UserInput): String
  }
`;

module.exports = typeDefs;
