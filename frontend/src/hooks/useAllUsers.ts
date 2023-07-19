import { useGetAllUsersQuery } from "../features/auth/authService";
import { useUser } from "./useUser";

export const useAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  return allUsers;
};
