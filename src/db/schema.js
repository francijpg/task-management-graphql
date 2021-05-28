const { gql } = require("apollo-server");

const typeDefs = gql`
  type Course {
    titulo: String
  }
  type Query {
    getCourses: [Course]
  }
`;

module.exports = typeDefs;
