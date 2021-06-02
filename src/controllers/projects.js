const { Project } = require("../models");

const validateProject = async (id, ctx) => {
  let project = await Project.findById(id);

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.creator.toString() !== ctx.user.id) {
    throw new Error("You don't have the credentials to edit it");
  }
};

const create = async (input, ctx) => {
  try {
    const project = new Project(input);
    project.creator = ctx.user.id;

    const result = await project.save();

    return result;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, input, ctx) => {
  await validateProject(id, ctx);
  project = await Project.findOneAndUpdate({ _id: id }, input, { new: true });
  
  return project;
};

const getAll = async (ctx) => {
  const projects = await Project.find({ creator: ctx.user.id });

  return projects;
};

const remove = async (id, ctx) => {
  await validateProject(id, ctx);
  await Project.findOneAndDelete({ _id: id });

  return "Project Deleted";
};

module.exports = {
  create,
  update,
  getAll,
  remove,
};
