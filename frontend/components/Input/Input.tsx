import styles from "./input.module.css";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type InputProps = {
  isError?: boolean;
  helperText?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function Input({ isError, helperText, ...rest }: InputProps) {
  return (
    <div className={styles.container}>
      <input
        {...rest}
        className={isError ? styles.inputError : styles.input}
      ></input>
      {helperText && (
        <p className={isError ? styles.error : styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
}
