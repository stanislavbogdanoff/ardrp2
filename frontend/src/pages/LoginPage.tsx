import { useState } from "react";
import TextInput from "../components/inputs/TextInput";
import { useLoginMutation } from "../features/auth/authService";
import { TextInputEventType } from "../types";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import useAuthRedirection from "../hooks/useAuthRedirection";

// State type interface
interface User {
  username: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch();

  // Initial state
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
  });

  // Handle username input
  const hanldeUsernameInput = (e: TextInputEventType) => {
    setUserData({ ...userData, username: e.target.value });
  };

  // Handle password input
  const handlePasswordInput = (e: TextInputEventType) => {
    setUserData({ ...userData, password: e.target.value });
  };

  // Login handler
  const [login] = useLoginMutation();
  const handleLogin = async (): Promise<void> => {
    const res = await login(userData);
    dispatch(setUser({ ...res }));
  };

  // Redirection after login hook
  useAuthRedirection();

  return (
    <>
      <div>LoginPage</div>
      <TextInput onChange={(e) => hanldeUsernameInput(e)} />
      <TextInput onChange={(e) => handlePasswordInput(e)} />
      <button onClick={() => void handleLogin()}>Login</button>
    </>
  );
};

export default LoginPage;
