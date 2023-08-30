import { useState } from "react";
import { Button, Input, Search } from "..";
import styles from "./noteSection.module.css";
import Modal from "react-modal";

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
      <Modal
        isOpen={isModalOpen}
        shouldCloseOnEsc={true}
        onRequestClose={() => setIsModalOpen(false)}
        preventScroll={true}
        className={styles.modal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
          },
          content: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <div>
          <p>Create a new note</p>
          <Input placeholder="Title" />
          <textarea placeholder="Note text" />
          <Button>Save</Button>
        </div>
      </Modal>
    </>
  );
}
