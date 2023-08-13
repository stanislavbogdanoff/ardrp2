import { Request, Response } from "express";
import { UserReq } from "../types/types";
import { catchError } from "../utils/catchError";
import { Profile } from "../models/profileModel";

//@route  POST /api/profiles/
export const addNewProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.create(req.body);
    res
      .status(201)
      .json({ data: profile, message: "Successfully created new profile" });
  } catch (error) {
    catchError(error, res, "Could now create new profile");
  }
};

//@route  GET /api/profiles/:profileId
export const getProfile = async (req: Request, res: Response) => {
  const { profileId } = req.params;
  try {
    const profile = await Profile.findById(profileId);
    res
      .status(200)
      .json({ data: profile, message: `Profile ${profileId} found` });
  } catch (error) {
    catchError(error, res, `Could not get profile ${profileId}`);
  }
};

//@route  DELETE /api/profiles/:profileId
export const deleteProfile = async (req: Request, res: Response) => {
  const { profileId } = req.params;
  try {
    const deletedProfile = await Profile.findByIdAndDelete(profileId);
    res.status(200).json({
      data: deletedProfile,
      message: `Profile ${profileId} deleted successfully`,
    });
  } catch (error) {
    catchError(error, res, "Could not delete profile");
  }
};

//@route  PATCH /api/profiles/:profileId
export const updateProfile = async (req: Request, res: Response) => {
  const { profileId } = req.params;
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      req.body,
      { new: true }
    );
    res.status(200).json({
      data: updatedProfile,
      message: `Profile ${profileId} updated successfully`,
    });
  } catch (error) {
    catchError(error, res, `Could not update profile ${profileId}`);
  }
};

//@route  GET /api/profiles/user/:userId
export const getUserProfiles = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userProfiles = await Profile.find({ user: String(userId) });
    res
      .status(200)
      .json({
        data: userProfiles,
        message: "Successfully fetched user profiles",
      });
  } catch (error) {
    catchError(error, res, `Could not get profiles info on ${userId}`);
  }
};
