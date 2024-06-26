import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { User } from "../types";

interface Data {
  data: User;
}

export const useUserId = () => {
  // Get user from redux state
  const { user } = useSelector((state: RootState) => state.auth);

  // Parse user data to object
  const userData = JSON.parse(user!) as Data;

  // Declare role state
  const [userId, setUserId] = useState("");

  // Check and set role
  useEffect(() => {
    setUserId(String(userData?.data?._id));
  }, [userData]);

  return userId;
};
