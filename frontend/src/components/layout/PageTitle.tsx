import { ReactNode } from "react";
import styles from "./Layout.module.scss";

type PageTitleProps = {
  children?: ReactNode;
};

const PageTitle = ({ children }: PageTitleProps) => {
  return <div className={styles.page_title}>{children}</div>;
};

export default PageTitle;
