const { Task } = require("../models");

const validateTask = async (id, ctx) => {
  let task = await Task.findById(id);
  if (!task) {
    throw new Error("Task not found");
  }

  if (task.creator.toString() !== ctx.user.id) {
    throw new Error("You don't have the credentials to edit it");
  }
};

const create = async (input, ctx) => {
  try {
    const task = new Task(input);
    task.creator = ctx.user.id;

    const result = await task.save();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, input, state, ctx) => {
  await validateTask(id, ctx);
  input.state = state;
  task = await Task.findOneAndUpdate({ _id: id }, input, { new: true });
  return task;
};

const remove = async (id, ctx) => {
  await validateTask(id, ctx);
  await Task.findOneAndDelete({ _id: id });
  return "Task Deleted";
};

const getAll = async (input, ctx) => {
  const tasks = await Task.find({ creator: ctx.user.id })
    .where("project")
    .equals(input.project);

  return tasks;
};

module.exports = {
  create,
  update,
  remove,
  getAll,
};
