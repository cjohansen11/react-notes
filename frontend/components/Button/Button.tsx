import { PropsWithChildren } from "react";
import styles from "./button.module.css";

export type ButtonProps = PropsWithChildren;

export default function Button({ children }: ButtonProps) {
  return <button className={styles.button}>{children}</button>;
}
