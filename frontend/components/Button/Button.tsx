import { PropsWithChildren } from "react";
import styles from "./button.module.css";

export type ButtonProps = {
  onClick?: () => void;
  isDisabled?: boolean;
  color?: "light" | "dark";
} & PropsWithChildren;

export default function Button({
  children,
  onClick,
  isDisabled,
  color,
}: ButtonProps) {
  const handleClick = () => {
    onClick ? onClick() : null;
  };

  const getColor = () => {
    return color === "dark" ? styles.dark : "";
  };

  return (
    <button
      disabled={isDisabled}
      className={`${styles.button} ${getColor()}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
