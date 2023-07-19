import { useState } from "react";
import styles from "./Input.module.scss";

const PasswordDisplay = ({ text }: { text: string }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowPassword(true)}
      onMouseLeave={() => setShowPassword(false)}
      className={styles.password_input}
    >
      {showPassword ? (
        <span>{text}</span>
      ) : (
        <span>{text.split("").map(() => "*")}</span>
      )}
      <button onClick={() => navigator.clipboard.writeText(String(text))}>
        Copy!
      </button>
    </div>
  );
};

export default PasswordDisplay;
