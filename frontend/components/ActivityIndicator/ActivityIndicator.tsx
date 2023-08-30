import styles from "./activityIndicator.module.css";

export default function ActivityIndicator() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}
