import { PropsWithChildren } from "react";
import styles from "./button.module.css";

export type ButtonProps = {
  onClick?: () => void;
  isDisabled?: boolean;
} & PropsWithChildren;

export default function Button({ children, onClick, isDisabled }: ButtonProps) {
  const handleClick = () => {
    onClick ? onClick() : null;
  };

  return (
    <button
      disabled={isDisabled}
      className={styles.button}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
