import styles from "./textArea.module.css";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

export type TextAreaProps = {} & DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export default function TextArea({ ...rest }: TextAreaProps) {
  return (
    <textarea
      {...rest}
      maxLength={300}
      minLength={50}
      className={styles.textArea}
    />
  );
}
