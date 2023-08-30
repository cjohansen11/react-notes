import { MutateOptions, useMutation } from "react-query";
import api from "@/api";

export default function useCreateUser({
  options,
}: {
  options?: MutateOptions<
    { email: string; id: string },
    unknown,
    { email: string }
  >;
}) {
  return useMutation(
    "create-user",
    ({ email }) => api.users.createUser({ email }),
    options
  );
}
