const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getAllProjects,
  addProject,
  deleteProject,
} = require("../controllers/projectController");

router.post("/", protect, addProject);
router.get("/", protect, getAllProjects);
router.delete("/:projectId", protect, deleteProject);

module.exports = router;
