import { useState } from "react";
import { Button } from "..";
import { useForm, Controller } from "react-hook-form";
import { LoginFormSchemaType, LoginFormSchema } from "@/types/Forms";
import { zodResolver } from "@hookform/resolvers/zod";

export type LoginProps = { onSubmit: ({ email }: { email: string }) => void };

export default function Login({ onSubmit }: LoginProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({ resolver: zodResolver(LoginFormSchema) });

  return (
    <div>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <input
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
          />
        )}
      />
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </div>
  );
}
