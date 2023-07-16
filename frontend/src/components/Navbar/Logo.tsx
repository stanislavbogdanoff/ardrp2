import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/")} className={styles.logo}>
      Ardrp
    </div>
  );
};

export default Logo;
