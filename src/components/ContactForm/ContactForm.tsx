"use client";

import { useState } from "react";
import {
  validateContact,
  isValid,
  type ContactPayload,
  type ContactErrors,
} from "@/lib/validation";
import styles from "./ContactForm.module.scss";

type Status = "idle" | "loading" | "success" | "error";

const empty: ContactPayload = { name: "", phone: "", email: "", comment: "" };

export default function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const update = (field: keyof ContactPayload, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateField = (field: keyof ContactPayload) => {
    const fieldErrors = validateContact(values);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  };

  const handleAiAssist = async () => {
    setAiError("");
    setAiLoading(true);
    try {
      const res = await fetch("/api/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft: values.comment, name: values.name }),
      });
      const data = await res.json();

      // Демо-режим: ключа нет 
      if (data?.demo) {
        update(
          "comment",
          "Здесь появился бы текст, сформулированный AI на основе вашего черновика. " +
            "Демо-режим: OpenAI-ключ не подключён, поэтому показан пример."
        );
        setAiError(
          "✦ Демо: интеграция с AI реализована (свой серверный роут, ключ хранится на сервере, " +
            "есть обработка ошибок). Чтобы кнопка переписывала текст по-настоящему, в .env.local " +
            "нужно добавить OPENAI_API_KEY."
        );
        return;
      }

      if (!res.ok) {
        throw new Error(data?.error || "AI-помощник сейчас недоступен");
      }
      update("comment", data.text);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Не удалось обратиться к AI");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateContact(values);
    setErrors(validationErrors);
    if (!isValid(validationErrors)) {
      setStatus("idle");
      return;
    }

    setStatus("loading");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data?.errors) setErrors(data.errors);
        throw new Error(data?.error || "Не удалось отправить сообщение");
      }

      setStatus("success");
      setServerMessage(
        data?.message || "Сообщение отправлено. Копия письма ушла вам на почту."
      );
      if (data?.previewUrl) setPreviewUrl(data.previewUrl);
      setValues(empty);
    } catch (err) {
      setStatus("error");
      setServerMessage(err instanceof Error ? err.message : "Что-то пошло не так");
    }
  };

  const loading = status === "loading";

  if (status === "success") {
    return (
      <div className={styles.result} role="status" aria-live="polite">
        <div className={`${styles.icon} ${styles.iconSuccess}`} aria-hidden>
          ✓
        </div>
        <h3 className={styles.resultTitle}>Спасибо! Сообщение отправлено</h3>
        <p className={styles.resultText}>{serverMessage}</p>
        {previewUrl && (
          <p className={styles.resultText}>
            Тестовый режим. Посмотреть письмо:{" "}
            <a href={previewUrl} target="_blank" rel="noreferrer noopener">
              открыть превью ↗
            </a>
          </p>
        )}
        <button
          type="button"
          className={styles.reset}
          onClick={() => {
            setStatus("idle");
            setServerMessage("");
            setPreviewUrl(null);
          }}
        >
          Отправить ещё одно
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Имя
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={() => validateField("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          disabled={loading}
          autoComplete="name"
        />
        {errors.name && (
          <span id="name-error" className={styles.error}>
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="phone" className={styles.label}>
            Телефон
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={`${styles.input} ${errors.phone ? styles.invalid : ""}`}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => validateField("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            placeholder="+7 999 123-45-67"
            disabled={loading}
            autoComplete="tel"
          />
          {errors.phone && (
            <span id="phone-error" className={styles.error}>
              {errors.phone}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => validateField("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="you@example.com"
            disabled={loading}
            autoComplete="email"
          />
          {errors.email && (
            <span id="email-error" className={styles.error}>
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor="comment" className={styles.label}>
            Комментарий
          </label>
          <button
            type="button"
            className={styles.aiButton}
            onClick={handleAiAssist}
            disabled={aiLoading || loading || values.comment.trim().length < 3}
            title="Переписать черновик в аккуратное сообщение с помощью AI"
          >
            {aiLoading ? "AI пишет…" : "✦ Сформулировать с AI"}
          </button>
        </div>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          className={`${styles.input} ${styles.textarea} ${
            errors.comment ? styles.invalid : ""
          }`}
          value={values.comment}
          onChange={(e) => update("comment", e.target.value)}
          onBlur={() => validateField("comment")}
          aria-invalid={!!errors.comment}
          aria-describedby={errors.comment ? "comment-error" : undefined}
          placeholder="Пара слов о проекте или вакансии."
          disabled={loading}
        />
        {errors.comment && (
          <span id="comment-error" className={styles.error}>
            {errors.comment}
          </span>
        )}
        {aiError && <span className={styles.error}>{aiError}</span>}
      </div>

      {status === "error" && (
        <div className={styles.alert} role="alert">
          {serverMessage}
        </div>
      )}

      <button type="submit" className={styles.submit} disabled={loading}>
        {loading && <span className={styles.spinner} aria-hidden />}
        {loading ? "Отправляем…" : "Отправить"}
      </button>

      <p className={styles.hint}>
        Письмо придёт владельцу сайта, а вам — копия на указанный email.
      </p>
    </form>
  );
}