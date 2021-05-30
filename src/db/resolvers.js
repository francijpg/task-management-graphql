const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const User = require("../models/User");

const createToken = (user, secret, expiresIn) => {
  const { id, email, name } = user;
  return jwt.sign({ id, email, name }, secret, { expiresIn });
};

const resolvers = {
  Query: {
    getProjects: async (_, {}, ctx) => {
      console.log("getting projects...");
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { email, password } = input;
      const userExists = await User.findOne({ email });

      if (userExists) {
        throw new Error("The user is already registered.");
      }
      try {
        const salt = await bcryptjs.genSalt(10);
        input.password = await bcryptjs.hash(password, salt);

        const newUser = new User(input);
        newUser.save();
        return "User Created Correctly";
      } catch (error) {
        console.log(error);
      }
    },
    authenticateUser: async (_, { input }) => {
      const { email, password } = input;
      const userExists = await User.findOne({ email });

      if (!userExists) {
        throw new Error("User is not registered.");
      }

      const correctPassword = await bcryptjs.compare(
        password,
        userExists.password
      );

      if (!correctPassword) {
        throw new Error("Incorrect Password");
      }

      return {
        token: createToken(userExists, process.env.SECRET, "4hr"),
      };
    },
  },
};

module.exports = resolvers;
