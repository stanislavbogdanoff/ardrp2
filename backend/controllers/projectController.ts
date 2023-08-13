import { Request, Response } from "express";
import { catchError } from "../utils/catchError";
import asyncHandler from "express-async-handler";
import { Project } from "../models/projectModel";

//@desc   Add new project
//@route  POST /api/projects
//@access Private
export const addProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body);
    if (project) res.status(200).json(project);
    else res.status(400).json({ error: "Could not add new project" });
  } catch (error) {
    catchError(error, res, "Could not add new project");
  }
};

//@desc   Get all projects
//@route  GET /api/projects
//@access Private
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    if (projects) res.status(200).json(projects);
    else res.status(200).json([]);
  } catch (error) {
    catchError(error, res, "Could not get all projects");
  }
};

//@desc   Delete project
//@route  DELETE /api/projects/:projectId
//@access Private
export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    try {
      const deletedProject = await Project.deleteOne({ _id: projectId });
      if (deletedProject) res.status(200).json(deletedProject);
      else {
        res.status(400);
        throw new Error("Could not delete this project");
      }
    } catch (error) {
      catchError(error, res, "Could not delete project");
    }
  }
);
