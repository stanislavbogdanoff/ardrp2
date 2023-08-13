import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Discord } from "../models/discordModel";
import { catchError } from "../utils/catchError";
import { Email } from "../models/emailModel";
import { IDiscord, IEmail } from "../types/types";

//@desc   Add new discord
//@route  POST /api/discords
//@access Private
export const addNewDiscord = asyncHandler(
  async (req: Request, res: Response) => {
    const discord = await Discord.create(req.body);
    if (discord) res.status(201).json(discord);
    else {
      res.status(400);
      throw new Error("Could not add new discord");
    }
  }
);

//@desc   Parse new disords
//@route  POST /api/discords/parse
//@access Private
export const parseNewDiscords = asyncHandler(async (req, res) => {
  const { discordsString } = req.body;
  const discords = discordsString.split("\n");

  let parsedDiscords: IDiscord[] = [];
  let parsedEmails: IEmail[] = [];

  discords.forEach((ds: string) => {
    const splitDs = ds.split(":");

    parsedDiscords.push({
      password: splitDs[1],
      email: splitDs[3],
    } as IDiscord);

    parsedEmails.push({
      email: splitDs[3],
      password: splitDs[4],
    } as IEmail);
  });

  // console.log(parsedDiscords, "old parsed ds");

  try {
    const insertedEmails: string[] = [];

    const newEmails = await Promise.all(
      parsedEmails.map(async (emailData) => {
        try {
          const newEmail = await Email.create(emailData);
          insertedEmails.push(newEmail.email); // Track successfully inserted email
          return newEmail;
        } catch (error: any) {
          if (error.code !== 11000) {
            // Ignore duplicate key errors
            throw error;
          }
        }
      })
    );
    console.log(
      newEmails,
      "NEW EMAILS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n"
    );

    let newParsedDiscords: IDiscord[] = [];

    for (const ds of parsedDiscords) {
      if (insertedEmails.includes(String(ds.email))) {
        // Check if the email was successfully inserted
        newParsedDiscords.push({
          ...ds,
          email: ds.email, // Use the original email, as it's unique
        } as IDiscord);
      }
    }

    // console.log(newParsedDiscords, "parsed discords");

    const newDiscords = await Discord.insertMany(newParsedDiscords, {
      ordered: false,
    });

    res.status(201).json({ discords: newDiscords, emails: newEmails });
  } catch (error) {
    catchError(
      error,
      res,
      "Some Discord entries were not unique but others have been created."
    );
  }
});
