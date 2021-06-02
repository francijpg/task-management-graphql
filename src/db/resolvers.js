const { users, projects, tasks } = require("./../controllers");

const resolvers = {
  Query: {
    getProjects: (_, {}, ctx) => projects.getAll(ctx),
    getTasks: (_, { input }, ctx) => tasks.getAll(input, ctx),
  },
  Mutation: {
    registerUser: (_, { input }) => users.register(input),
    authenticateUser: (_, { input }) => users.authentication(input),
    newProject: (_, { input }, ctx) => projects.create(input, ctx),
    updateProject: (_, { id, input }, ctx) => projects.update(id, input, ctx),
    deleteProject: (_, { id }, ctx) => projects.remove(id, ctx),
    newTask: (_, { input }, ctx) => tasks.create(input, ctx),
    updateTask: (_, { id, input, state }, ctx) =>
      tasks.update(id, input, state, ctx),
    deleteTask: (_, { id }, ctx) => tasks.remove(id, ctx),
  },
};

module.exports = resolvers;
