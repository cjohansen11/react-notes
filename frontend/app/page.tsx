import styles from "./page.module.css";
import { Button, SearchBar } from "@/components";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>My Notes</h1>
      <Button>Click me</Button>
      <SearchBar></SearchBar>
    </main>
  );
}
