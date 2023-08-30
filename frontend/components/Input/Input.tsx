import styles from "./input.module.css";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type InputProps = {
  isError?: boolean;
  helperText?: string;
  title?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function Input({
  isError,
  helperText,
  title,
  ...rest
}: InputProps) {
  return (
    <div className={styles.container}>
      {title && <p className={styles.title}>{title}</p>}
      <input {...rest} className={isError ? styles.inputError : styles.input} />
      {helperText && (
        <p className={isError ? styles.error : styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
}
