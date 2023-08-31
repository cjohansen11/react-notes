import styles from "./search.module.css";
import { Input } from "..";

export default function Search() {
  const selectOptions = ["Newest", "Oldest", "Recently Updated"];

  return (
    <div className={styles.container}>
      <Input placeholder="Search notes" />
      <div className={styles.selectContainer}>
        <select className={styles.select}>
          {selectOptions.map((sortOption) => (
            <option>{sortOption}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
