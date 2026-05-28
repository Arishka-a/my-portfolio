import styles from "./Footer.module.scss";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.name}>
          Арина<span className={styles.dot}>.</span>
        </p>
        <p className={styles.copy}>© {year} · Frontend-разработчик</p>
      </div>
    </footer>
  );
}