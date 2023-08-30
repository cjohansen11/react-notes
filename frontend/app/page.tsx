"use client";

import styles from "./page.module.css";
import { Button, SearchBar } from "@/components";
import { useEffect, useState } from "react";

export default function Home() {
  const [existingUser, setExistingUser] = useState("");

  useEffect(() => {
    const userEmail = window.localStorage.getItem("existingUser");

    if (userEmail) setExistingUser(userEmail);
  }, []);

  return (
    <main className={styles.main}>
      {existingUser ? (
        <>
          <h1 className={styles.title}>My Notes</h1>
          <SearchBar></SearchBar>
        </>
      ) : (
        <>
          <Button>Click me</Button>
        </>
      )}
    </main>
  );
}
