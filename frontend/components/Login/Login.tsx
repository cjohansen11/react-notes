import { useState } from "react";
import { Button } from "..";

export type LoginProps = { onSubmit: (email: string) => void };

export default function Login({ onSubmit }: LoginProps) {
  const [email, setEmail] = useState("");

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)}></input>
      <Button isDisabled={!email} onClick={() => onSubmit(email)}>
        Submit
      </Button>
    </div>
  );
}
