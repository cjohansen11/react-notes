import { MutateOptions, useMutation } from "react-query";
import api from "@/api";
import { User } from "@/types";

export default function useCreateUser({
  options,
}: {
  options?: MutateOptions<User, unknown, { email: string }>;
}) {
  return useMutation(
    "create-user",
    ({ email }) => api.users.createUser({ email }),
    options
  );
}
