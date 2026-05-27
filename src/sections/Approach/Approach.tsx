import styles from "./Approach.module.scss";

const steps = [
  {
    num: "01",
    title: "Разбираю задачу",
    text: "Уточняю требования и ожидаемый результат, разбиваю большую задачу на понятные шаги.",
  },
  {
    num: "02",
    title: "Проектирую структуру",
    text: "Продумываю структуру компонентов и данных до того, как писать код, чтобы потом было проще поддерживать.",
  },
  {
    num: "03",
    title: "Пишу и проверяю",
    text: "Делаю аккуратно и итеративно: вёрстка, логика, обработка ошибок и проверка на разных экранах.",
  },
  {
    num: "04",
    title: "Довожу до результата",
    text: "Тестирую полный цикл, чищу код и проверяю, что всё работает так, как задумано.",
  },
];

export default function Approach() {
  return (
    <section className={styles.approach} id="approach">
      <div className={styles.inner}>
        <h2 className={styles.heading}>Как я работаю</h2>

        <div className={styles.steps}>
          {steps.map((step) => (
            <article key={step.num} className={styles.step}>
              <span className={styles.num}>{step.num}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.ai}>
          <h3 className={styles.aiTitle}>AI в работе</h3>
          <p className={styles.aiText}>
            ИИ помогает мне работать быстрее: разрабатывать черновик кода, разбираться с ошибками, 
            продумывать варианты реализации. Но всё, что он выдаёт, я перепроверяю и переписываю под задачу.
          </p>
        </div>
      </div>
    </section>
  );
}