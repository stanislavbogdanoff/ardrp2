import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  addProject,
  deleteProject,
  getAllProjects,
} from "../controllers/projectController";

const router = express.Router();

router.post("/", protect, addProject);
router.get("/", protect, getAllProjects);
router.delete("/:projectId", protect, deleteProject);

module.exports = router;
