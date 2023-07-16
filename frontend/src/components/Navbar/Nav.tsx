import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { RootState } from "../../app/store";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user from redux state
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      {user ? (
        <button onClick={() => dispatch(logout())}>Logout</button>
      ) : (
        <>
          <button onClick={() => navigate("/login")}>Login</button>
        </>
      )}
    </div>
  );
};

export default Nav;
