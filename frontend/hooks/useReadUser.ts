import api from "@/api";
import { User } from "@/types";
import { UseQueryOptions, useQuery } from "react-query";

export default function useReadUser({
  email,
  options,
}: {
  email: string;
  options: UseQueryOptions<User, unknown, User, string[]>;
}) {
  return useQuery(
    ["read-user", email],
    () => api.users.readUserByEmail({ email }),
    options
  );
}
