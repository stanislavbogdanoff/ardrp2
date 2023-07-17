import { useState } from "react";

export const useAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  return allUsers;
};
