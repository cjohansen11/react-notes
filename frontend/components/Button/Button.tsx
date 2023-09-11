import { PropsWithChildren } from "react";
import styles from "./button.module.css";
import { motion } from "framer-motion";

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
    <motion.button
      disabled={isDisabled}
      className={`${styles.button} ${getColor()}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.025 }}
    >
      {children}
    </motion.button>
  );
}
