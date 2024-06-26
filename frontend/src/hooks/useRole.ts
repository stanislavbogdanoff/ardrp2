import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { User } from "../types";

interface Data {
  data: User;
}

export const useRole = () => {
  // Get user from redux state
  const { user } = useSelector((state: RootState) => state.auth);

  // Parse user data to object
  const userData = JSON.parse(user!) as Data;

  // Declare role state
  const [role, setRole] = useState("");

  // Check and set role
  useEffect(() => {
    setRole(userData?.data?.role as string);
  }, [userData]);

  return role;
};
