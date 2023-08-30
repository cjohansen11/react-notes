"use client";

import styles from "./page.module.css";
import { Button, SearchBar } from "@/components";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const userId = window.localStorage.getItem("userId");

    if (userId) window.alert(userId);
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>My Notes</h1>
      <Button>Click me</Button>
      <SearchBar></SearchBar>
    </main>
  );
}
