import styles from "./About.module.scss";

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "JavaScript (ES6+)",
  "HTML5",
  "SCSS / CSS",
  "REST API",
  "Git",
];

const directions = [
  {
    title: "Вёрстка интерфейсов",
    text: "Адаптивная, валидная и доступная вёрстка от макета до пикселя.",
  },
  {
    title: "SPA на React",
    text: "Компонентные приложения на React и Next.js с продуманной структурой.",
  },
  {
    title: "Работа с API",
    text: "Интеграция с REST API, обработка состояний загрузки и ошибок.",
  },
];

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner}>
        <h2 className={styles.heading}>О себе</h2>

        <p className={styles.lead}>
          Frontend-разработчик. Люблю превращать макеты в живые интерфейсы и
          доводить продукт до рабочего состояния — от вёрстки до логики и
          интеграции с бэкендом. Внимательна к деталям, аккуратности кода и
          удобству пользователя.
        </p>

        <div className={styles.block}>
          <h3 className={styles.subheading}>Стек</h3>
          <ul className={styles.stack}>
            {stack.map((item) => (
              <li key={item} className={styles.tag}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.block}>
          <h3 className={styles.subheading}>Направления</h3>
          <div className={styles.directions}>
            {directions.map((dir) => (
              <article key={dir.title} className={styles.card}>
                <h4 className={styles.cardTitle}>{dir.title}</h4>
                <p className={styles.cardText}>{dir.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}