import { Link } from "react-router-dom";
import styles from "./Dashboard.module.scss";

interface TabProps {
  label: string;
  link: string;
}

const Tab = ({ label, link }: TabProps) => {
  return (
    <Link to={`/dashboard${link}`} className={styles.tab}>
      {label}
    </Link>
  );
};

export default Tab;
