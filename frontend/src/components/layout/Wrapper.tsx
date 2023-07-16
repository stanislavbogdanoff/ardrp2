import { ReactNode } from "react";
import styles from "./Layout.module.scss";

type WrapperProps = {
  ver?: boolean;
  children?: ReactNode;
};

const Wrapper = ({ children, ver }: WrapperProps) => {
  return (
    <div className={`${styles.layout_wrapper} ${ver ? styles.ver : ""}`}>
      {children}
    </div>
  );
};

export default Wrapper;
