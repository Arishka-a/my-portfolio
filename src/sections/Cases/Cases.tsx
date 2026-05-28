import styles from "./Cases.module.scss";

interface CaseItem {
  title: string;
  tagline: string;
  did: string[];
  aiHelped: string;
  stack: string[];
  links?: { label: string; href: string }[];
}

const cases: CaseItem[] = [
  {
    title: "MOPS — управление сетевым оборудованием",
    tagline:
      "Внутренняя система управления оборудованием и стендами автотестирования (Форт-Телеком).",
    did: [
      "SPA на React 19 + TypeScript с feature-based архитектурой: 5 страниц, домены auth, devices, images, bolid",
      "Управление состоянием через Redux Toolkit и RTK Query с автоматической инвалидацией кэша по тегам",
      "JWT-аутентификация с redux-persist, автоматический выход по истечении токена и обработка 401-ответов",
      "Оптимистичные обновления при бронировании устройств с откатом при ошибке сервера",
      "Конечный автомат прошивки (install → reload → done/error) с сохранением состояния между перезагрузками",
      "SSH-консоль с очередью команд, синхронным и асинхронным режимами; polling длительных задач через кастомные хуки",
      "Загрузка прошивок через FormData с drag-and-drop, вкладочный интерфейс страницы устройства",
    ],
    aiHelped: "типизация запросов и шаблонный код кастомных хуков",
    stack: ["React 19", "TypeScript", "Redux Toolkit", "RTK Query", "Tailwind CSS"],
    links: [{ label: "GitHub", href: "https://github.com/Arishka-a/MOPS" }],
  },
  {
    title: "NBA Offer Manager (дипломный проект)",
    tagline: "Система управления офферами Next Best Action. Заказчик — ЭР-Телеком.",
    did: [
      "SPA на React 19 из 18 страниц с переиспользуемыми компонентами",
      "Защищённые маршруты (PrivateRoute HOC) и ролевой доступ для 3 типов пользователей (Admin / Analyst / Operator)",
      "Глобальное состояние через Context API (AuthContext) с кастомным хуком useAuth",
      "11 сервисных модулей (Service Layer) поверх 40+ REST-эндпоинтов, HTTP-клиент Axios с интерсепторами",
      "Интерактивные дашборды на Recharts; CRUD с модалками, поиск с debounce, фильтрация, сортировка, пагинация",
      "Конструктор условий и фильтров (FilterBuilder, ConditionManager), импорт/экспорт CSV / Excel / PDF",
      "Бэкенд на Node.js / Express (11 контроллеров, middleware, сервисы отчётов и email), схема PostgreSQL и Docker Compose, unit-тесты на Vitest",
    ],
    aiHelped: "настройка Axios-интерсепторов и единообразная обработка ошибок",
    stack: ["React 19", "React Router", "Node.js", "Express", "PostgreSQL", "Docker"],
    links: [
      { label: "GitHub", href: "https://github.com/Arishka-a/diplom_NBA_offer_manager" },
    ],
  },
  {
    title: "Лендинг-портфолио (этот сайт)",
    tagline:
      "Одностраничная презентация с рабочей формой обратной связи и AI-помощником.",
    did: [
      "Адаптивная вёрстка на SCSS-модулях с дизайн-токенами (переменные, брейкпоинты, миксины)",
      "Форма обратной связи: имя, телефон с маской +7, email, комментарий",
      "Валидация в общем модуле — одни правила на клиенте и на сервере",
      "Состояния loading / success / error с понятными сообщениями и спиннером",
      "Serverless-роут на Next.js: письмо владельцу и копия пользователю, экранирование ввода, тестовый режим без SMTP",
      "AI-эндпоинт для формулировки сообщения с ключом на сервере и демо-режимом без ключа",
    ],
    aiHelped: "черновики компонентов и разбор ошибок сборки",
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
              <div className={styles.cardMain}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.tagline}>{item.tagline}</p>

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
                        key={link.href}
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
              </div>

              <div className={styles.cardDetails}>
                <ul className={styles.points}>
                  {item.did.map((point) => (
                    <li key={point} className={styles.point}>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className={styles.aiBadge}>
                  <span className={styles.aiIcon} aria-hidden="true">
                    ✦
                  </span>
                  <span>
                    <strong>С помощью ИИ:</strong> {item.aiHelped}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}