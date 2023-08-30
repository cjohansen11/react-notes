import styles from "./textArea.module.css";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

export type TextAreaProps = {
  isError?: boolean;
  helperText?: string;
} & DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export default function TextArea({
  isError,
  helperText,
  ...rest
}: TextAreaProps) {
  return (
    <div>
      <textarea
        {...rest}
        className={`${styles.textArea} ${isError ? styles.error : ""}`}
      />
      {helperText && (
        <p
          className={`${styles.helperText} ${
            isError ? styles.helperTextError : ""
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
