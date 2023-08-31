import styles from "./note.module.css";
import { Note as NoteType } from "@/types/Notes";

export type NoteProps = { sortByUpdated?: boolean } & NoteType;

export default function Note({
  id,
  note,
  createDate,
  updateDate,
  userId,
  title,
  sortByUpdated,
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
    <div className={styles.container}>
      <div>
        <p className={styles.title}>{title || `${note.slice(0, 17)}...`}</p>
        <p className={styles.noteBody}>{note}</p>
      </div>
      <div className={styles.dateContainer}>
        {sortByUpdated ? (
          <div className={styles.date}>
            <p className={styles.updateDate}>Updated: </p>
            <p className={styles.updateDate}>{getDateString(updateDate)}</p>
          </div>
        ) : (
          <div className={styles.date}>
            <p className={styles.createDate}>Created: </p>
            <p className={styles.createDate}>{getDateString(createDate)}</p>
          </div>
        )}
      </div>
    </div>
  );
}