const { gql } = require("apollo-server");

const typeDefs = gql`
  type Token {
    token: String
  }

  type Project {
    name: String
    id: ID
  }

  type Task {
    name: String
    id: ID
    project: String
    state: Boolean
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

  input TaskInput {
    name: String!
    project: String
  }

  input ProjectIDInput {
    project: String!
  }

  type Query {
    getProjects: [Project]
    getTasks(input: ProjectIDInput): [Task]
  }

  type Mutation {
    registerUser(input: UserInput): String
    authenticateUser(input: AuthenticateInput): Token
    newProject(input: ProjectInput): Project
    updateProject(id: ID!, input: ProjectInput): Project
    deleteProject(id: ID!): String
    newTask(input: TaskInput): Task
    updateTask(id: ID!, input: TaskInput, state: Boolean): Task
    deleteTask(id: ID!): String
  }
`;

module.exports = typeDefs;
