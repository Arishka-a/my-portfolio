import styles from "./Cases.module.scss";

interface Contribution {
  label: string;
  intro?: string;
  points: string[];
}

interface CaseItem {
  title: string;
  tagline: string;
  contributions: Contribution[];
  stack: string[];
  links?: { label: string; href: string }[];
}

const cases: CaseItem[] = [
  {
    title: "MOPS — управление сетевым оборудованием",
    tagline:
      "Внутренняя система управления оборудованием и стендами автотестирования (Форт-Телеком).",
    contributions: [
      {
        label: "Фронтенд",
        intro: "Лично реализовала ",
        points: [
          "SPA на React 19 + TypeScript с feature-based архитектурой (домены auth, devices, images, bolid)",
          "Состояние на Redux Toolkit и RTK Query, JWT-аутентификация с redux-persist",
          "Конечный автомат прошивки устройств и SSH-консоль с очередью команд",
        ],
      },
      {
        label: "Интеграция с API",
        points: [
          "Лично реализовала подключение REST-эндпоинтов и кэширование на RTK Query",
          "AI помог с типизацией запросов и шаблонным кодом кастомных хуков",
        ],
      },
    ],
    stack: ["React 19", "TypeScript", "Redux Toolkit", "RTK Query", "Tailwind CSS"],
    links: [{  label: "GitHub",  href: "https://github.com/Arishka-a/MOPS" }],
  },
  {
    title: "NBA Offer Manager (дипломный проект)",
    tagline: "Система управления офферами Next Best Action. Заказчик — ЭР-Телеком.",
    contributions: [
      {
        label: "Фронтенд",        
        intro: "Лично реализовала ",
        points: [
          "SPA на React 19: защищённые маршруты и ролевой доступ (Admin / Analyst / Operator)",
          "Глобальное состояние через AuthContext + useAuth, дашборды на Recharts",
          "CRUD с модалками, поиск с debounce, фильтрация, пагинация, импорт/экспорт CSV/Excel/PDF",
        ],
      },
      {
        label: "Бэкенд / API",
        points: [
          "Лично реализовала бэкенд на Node.js / Express (контроллеры, middleware, сервисы отчётов и email), схему PostgreSQL и Docker Compose",
          "AI помог с настройкой Axios-интерсепторов и единообразной обработкой ошибок",
        ],
      },
    ],
    stack: ["React 19", "React Router", "Node.js", "Express", "PostgreSQL", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/Arishka-a/diplom_NBA_offer_manager" }],
  },
  {
    title: "Лендинг-портфолио (этот сайт)",
    tagline:
      "Одностраничная презентация с рабочей формой обратной связи и AI-помощником.",
    contributions: [
      {
        label: "Фронтенд",        
        intro: "Лично реализовала ",
        points: [
          "Вёрстку на SCSS-модулях с адаптивностью",
          "Форма с валидацией и состояниями loading / success / error",
        ],
      },
      {
        label: "API",
        points: [
          "Лично реализовала serverless-роут на Next.js для отправки писем — владельцу и копией пользователю",
          "AI помог на этапе черновиков и разбора ошибок — весь код перепроверяла",
        ],
      },
    ],
    stack: ["Next.js", "TypeScript", "SCSS", "Nodemailer"],
    links: [{ label: "GitHub", href: "https://github.com/Arishka-a/my-portfolio" }],
  },
];

export default function Cases() {
  return (
    <section className={styles.cases} id="cases">
      <div className={styles.inner}>
        <h2 className={styles.heading}>Проекты и опыт</h2>
        <p className={styles.lead}>
          Несколько работ, на которых видно подход: от вёрстки до рабочей логики
          и интеграции с API.
        </p>

        <div className={styles.grid}>
          {cases.map((item) => (
            <article key={item.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.tagline}>{item.tagline}</p>

              {item.contributions.map((block) => (
                <div key={block.label} className={styles.block}>
                  <p className={styles.blockLabel}>{block.label}</p>
                  {block.intro && <p className={styles.intro}>{block.intro}</p>}
                  <ul className={styles.points}>
                    {block.points.map((point) => (
                      <li key={point} className={styles.point}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <ul className={styles.stack}>
                {item.stack.map((tech) => (
                  <li key={tech} className={styles.tag}>
                    {tech}
                  </li>
                ))}
              </ul>

              {item.links && item.links.length > 0 && (
                <div className={styles.links}>
                    {item.links.map((link) => (
                    <a
                        key={link.href}                    // key здесь
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={styles.linkButton}
                    >
                        <svg
                        className={styles.linkIcon}
                        viewBox="0 0 16 16"
                        width="16"
                        height="16"
                        aria-hidden="true"
                        >
                        <path
                            fill="currentColor"
                            d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                        />
                        </svg>
                        {link.label}
                    </a>
                    ))}
                </div>
                )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}