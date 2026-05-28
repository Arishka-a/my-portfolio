import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.inner}>
        <h1 className={styles.title}>
          Frontend-разработчик
        </h1>
        <p className={styles.subtitle}>
          Аккуратная вёрстка снаружи, продуманная логика внутри.
        </p>
        <div className={styles.actions}>
          <a href="#contact" className={styles.primary}>
            Связаться со мной
          </a>
          <a href="#cases" className={styles.secondary}>
            Смотреть проекты
          </a>
        </div>
      </div>
    </section>
  );
}