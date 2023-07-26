const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const { isValidObjectId } = require("mongoose");

//@desc   Add new project
//@route  POST /api/projects
//@access Private
const addProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  if (project) res.status(200).json(project);
  else res.status(400).json({ error: "Could not add new project" });
});

//@desc   Get all projects
//@route  GET /api/projects
//@access Private
const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  if (projects) res.status(200).json(projects);
  else res.status(200).json([]);
});

//@desc   Delete project
//@route  DELETE /api/projects/:projectId
//@access Private
const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.projectId;
  const deletedProject = await Project.deleteOne({ _id: projectId });
  if (deletedProject) res.status(200).json(deletedProject);
  else {
    res.status(400);
    throw new Error("Could not delete this project");
  }
});

module.exports = {
  addProject,
  getAllProjects,
  deleteProject,
};
