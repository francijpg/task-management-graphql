const { users, projects } = require("./../controllers");

const resolvers = {
  Query: {
    getProjects: (_, {}, ctx) => projects.getAll(ctx),
  },
  Mutation: {
    registerUser: (_, { input }) => users.register(input),
    authenticateUser: (_, { input }) => users.authentication(input),
    newProject: (_, { input }, ctx) => projects.create(input, ctx),
    updateProject: (_, { id, input }, ctx) => projects.update(id, input, ctx),
    deleteProject: (_, { id }, ctx) => projects.remove(id, ctx),
  },
};

module.exports = resolvers;
