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
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setServerMessage("Сообщение отправлено. Копия письма ушла вам на почту.");
      setValues(empty);
    } catch {
      setStatus("error");
      setServerMessage("Что-то пошло не так. Попробуйте позже.");
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
        <button
          type="button"
          className={styles.reset}
          onClick={() => {
            setStatus("idle");
            setServerMessage("");
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
        <label htmlFor="comment" className={styles.label}>
          Комментарий
        </label>
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