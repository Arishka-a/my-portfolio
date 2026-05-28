export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(data: Partial<ContactPayload>): ContactErrors {
  const errors: ContactErrors = {};

  const name = (data.name ?? "").trim();
  const phone = (data.phone ?? "").trim();
  const email = (data.email ?? "").trim();
  const comment = (data.comment ?? "").trim();

  if (name.length < 2) {
    errors.name = "Укажите имя (минимум 2 символа)";
  } else if (name.length > 80) {
    errors.name = "Слишком длинное имя";
  }

  const phoneDigits = phone.replace(/\D/g, "");
  if (!phone || phoneDigits === "7") {
    errors.phone = "Укажите телефон";
  } else if (phoneDigits.length !== 11) {
    errors.phone = "Введите номер полностью";
  }

  if (!email) {
    errors.email = "Укажите email";
  } else if (!EMAIL_RE.test(email) || email.length > 120) {
    errors.email = "Проверьте формат email";
  }

  if (comment.length > 1000) {
    errors.comment = "Комментарий слишком длинный (макс. 1000 символов)";
  }

  return errors;
}

export function isValid(errors: ContactErrors): boolean {
  return Object.keys(errors).length === 0;
}