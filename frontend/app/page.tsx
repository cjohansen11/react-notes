"use client";

import styles from "./page.module.css";
import { Button, Login, SearchBar } from "@/components";
import useCreateUser from "@/hooks/useCreateUser";
import useReadUser from "@/hooks/useReadUser";
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

  const { data: user, isLoading: isFetchingUser } = useReadUser({
    email: userEmail,
    options: {
      enabled: !!userEmail,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        window.localStorage.setItem("existingUser", data.email);
        setIsVerified(true);
      },
    },
  });

  const handleLoginSubmit = async (email: string) => {
    setUserEmail(email);

    if (!user) await createUser({ email });
  };

  useEffect(() => {
    const userEmail = window.localStorage.getItem("existingUser");

    if (userEmail) setUserEmail(userEmail);
  }, []);

  return (
    <main className={styles.main}>
      {isVerified ? (
        <>
          <h1 className={styles.title}>{`${
            userEmail.split("@")[0]
          }'s Notes`}</h1>
          <SearchBar></SearchBar>
        </>
      ) : (
        <Login onSubmit={handleLoginSubmit} />
      )}
    </main>
  );
}
