import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Frontend-разработчик</p>
        <h1 className={styles.title}>
          Привет, я Арина
        </h1>
        <p className={styles.subtitle}>
          Создаю аккуратные адаптивные интерфейсы на React и TypeScript —
          от вёрстки до рабочей логики и интеграции с API.
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