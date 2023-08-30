import { useState } from "react";
import { Button, NoteModal, Search } from "..";
import styles from "./noteSection.module.css";

export type NoteSectionProps = {
  email: string;
};

export default function NoteSection({ email }: NoteSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewNote = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>{`${email.split("@")[0]}'s Notes`}</h1>
        <div className={styles.activityContainer}>
          <Search />
          <Button onClick={handleNewNote}>Create Note</Button>
        </div>
      </div>
      <NoteModal
        isVisible={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
