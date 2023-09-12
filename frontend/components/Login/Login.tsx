import styles from "./login.module.css";
import { Button, Input } from "..";
import { useForm, Controller } from "react-hook-form";
import { LoginFormSchemaType, LoginFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

export type LoginProps = { onSubmit: ({ email }: { email: string }) => void };

export default function Login({ onSubmit }: LoginProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            helperText={errors.email?.message}
            isError={!!errors.email}
            placeholder="Enter your email"
            onKeyUp={(e) => {
              if (e.code.includes("Enter")) handleSubmit(onSubmit)();
            }}
          />
        )}
      />
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </div>
  );
}
