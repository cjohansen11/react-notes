import { Search } from "..";
import styles from "./noteSection.module.css";

export type NoteSectionProps = {
  email: string;
};

export default function NoteSection({ email }: NoteSectionProps) {
  return (
    <>
      <h1 className={styles.title}>{`${email.split("@")[0]}'s Notes`}</h1>
      <Search />
    </>
  );
}
