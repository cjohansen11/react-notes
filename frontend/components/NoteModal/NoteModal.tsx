import styles from "./noteModal.module.css";
import Modal from "react-modal";
import { Input, TextArea, Button } from "..";

export type NoteModalProps = { isVisible: boolean; handleClose: () => void };

export default function NoteModal({ isVisible, handleClose }: NoteModalProps) {
  return (
    <Modal
      isOpen={isVisible}
      shouldCloseOnEsc={true}
      onRequestClose={handleClose}
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
      <div className={styles.container}>
        <p className={styles.title}>Create a new note</p>
        <div>
          <Input placeholder="Title" />
          <TextArea placeholder="Note text" />
        </div>
        <Button>Save</Button>
      </div>
    </Modal>
  );
}
