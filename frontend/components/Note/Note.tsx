import styles from "./note.module.css";
import { Note as NoteType } from "@/types";
import { motion } from "framer-motion";

export type NoteProps = {
  handleDelete: ({ noteId }: { noteId: string }) => Promise<void>;
  toggleModal: () => void;
  sortByUpdated?: boolean;
} & NoteType;

export default function Note({
  id,
  note,
  createDate,
  updateDate,
  title,
  sortByUpdated,
  handleDelete,
  toggleModal,
}: NoteProps) {
  const getDateString = (dateString: string) => {
    const date = new Date(dateString);

    const formatTwoDigits = (n: number) => (n < 10 ? "0" : "") + n;

    const month = formatTwoDigits(date.getMonth() + 1);
    const day = formatTwoDigits(date.getDate());
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = formatTwoDigits(date.getMinutes());
    const seconds = formatTwoDigits(date.getSeconds());

    const ampm = hours >= 12 ? "pm" : "am";

    const hour12 = hours % 12 || 12;

    const formattedDate = `${month}/${day}/${year} @ ${formatTwoDigits(
      hour12
    )}:${minutes}:${seconds} ${ampm}`;

    return formattedDate;
  };

  return (
    <motion.div
      className={styles.container}
      onClick={toggleModal}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 1.015 }}
    >
      <div>
        <p className={styles.title}>{title || `${note.slice(0, 17)}...`}</p>
        <p className={styles.noteBody}>{note}</p>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.dateContainer}>
          {sortByUpdated ? (
            <div className={styles.date}>
              <p className={`${styles.updateDate} ${styles.dateTitle}`}>
                Updated:{" "}
              </p>
              <p className={styles.updateDate}>{getDateString(updateDate)}</p>
            </div>
          ) : (
            <div className={styles.date}>
              <p className={`${styles.createDate} ${styles.dateTitle}`}>
                Created:{" "}
              </p>
              <p className={styles.createDate}>{getDateString(createDate)}</p>
            </div>
          )}
        </div>
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete({ noteId: id });
          }}
        >
          <img src="/icon_delete.png" alt="delete note icon" />
        </button>
      </div>
    </motion.div>
  );
}
