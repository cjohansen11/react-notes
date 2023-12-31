"use client";

import styles from "./page.module.css";
import { ActivityIndicator, Login, NoteSection } from "@/components";
import { useCreateUser, useReadUser } from "@/hooks";
import { useEffect, useState } from "react";

export default function Home() {
  const { mutate: createUser } = useCreateUser({
    options: {
      onSuccess(data) {
        window.localStorage.setItem("existingUser", data.email);
        setIsVerified(true);
      },
    },
  });

  const [userEmail, setUserEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: user,
    isLoading: isFetchingUser,
    refetch: refetchUser,
  } = useReadUser({
    email: userEmail,
    options: {
      enabled: !!userEmail,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess(data) {
        window.localStorage.setItem("existingUser", data.email);
        setIsVerified(true);
      },
      async onError() {
        await createUser({ email: userEmail });
        refetchUser();
      },
    },
  });

  const handleLoginSubmit = async ({ email }: { email: string }) => {
    setUserEmail(email);
  };

  useEffect(() => {
    const userEmail = window.localStorage.getItem("existingUser");

    if (userEmail) setUserEmail(userEmail);
    setIsLoading(false);
  }, []);

  if (isLoading || isFetchingUser)
    return (
      <main className={styles.main}>
        <ActivityIndicator />
      </main>
    );

  return (
    <main className={styles.main}>
      {isVerified && user ? (
        <NoteSection user={user} />
      ) : (
        <Login onSubmit={handleLoginSubmit} />
      )}
    </main>
  );
}
