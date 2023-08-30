import { PropsWithChildren } from "react";
import styles from "./button.module.css";
import useCreateUser from "@/hooks/useCreateUser";

export type ButtonProps = PropsWithChildren;

export default function Button({ children }: ButtonProps) {
  const { mutate } = useCreateUser({
    options: {
      onError(error, variables, context) {
        console.log({ error });
      },
      onSuccess(data, variables, context) {
        console.log({ data });
        window.localStorage.setItem("userId", data.id);
      },
    },
  });

  const onClick = async () => {
    await mutate({ email: "christian@gmail.com" });
  };

  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
