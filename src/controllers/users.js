const bcryptjs = require("bcryptjs");

const { User } = require("../models");
const { token } = require("../utils");

const register = async (input) => {
  const { email, password } = input;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("The user is already registered");
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
};

const authentication = async (input) => {
  const { email, password } = input;
  const userExists = await User.findOne({ email });

  if (!userExists) {
    throw new Error("User is not registered");
  }
  const correctPassword = await bcryptjs.compare(password, userExists.password);

  if (!correctPassword) {
    throw new Error("Incorrect Password");
  }

  return {
    token: token.createToken(userExists),
  };
};

module.exports = {
  register,
  authentication,
};
