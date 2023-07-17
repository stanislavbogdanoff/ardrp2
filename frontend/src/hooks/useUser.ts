import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { ObjectId } from "mongoose";

interface User {
  role?: string;
  _id?: ObjectId;
  password?: string;
  username?: string;
  token?: string;
}

interface Data {
  data: User;
}

export const useUser = () => {
  // Get user from redux state
  const { user } = useSelector((state: RootState) => state.auth);

  // Parse user data to object
  const parsedUser = JSON.parse(user!) as Data;

  // Declare role state
  const [userData, setUserData] = useState<User>();

  // Check and set role
  useEffect(() => {
    setUserData(parsedUser?.data);
  }, []);

  return userData;
};
