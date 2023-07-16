import { ReactNode } from "react";
import styles from "./Layout.module.scss";

type ContainerProps = {
  children?: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className={styles.layout_container}>{children}</div>;
};

export default Container;
