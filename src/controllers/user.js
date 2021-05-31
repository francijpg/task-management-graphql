const User = require("../models/User");
const bcryptjs = require("bcryptjs");

const register = async (input) => {
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
};

module.exports = {
  register,
};
