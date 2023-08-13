import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  addNewProfile,
  deleteProfile,
  getProfile,
  getUserProfiles,
  updateProfile,
} from "../controllers/profileController";

const router = express.Router();

router.route("/").post(protect, addNewProfile);
router
  .route("/:profileId")
  .get(protect, getProfile)
  .delete(protect, deleteProfile)
  .patch(protect, updateProfile);
router.route("/user/:userId").get(protect, getUserProfiles);

module.exports = router;
