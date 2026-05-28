import { NextResponse } from "next/server";
import nodemailer, { type Transporter } from "nodemailer";
import { validateContact, isValid, type ContactPayload } from "@/lib/validation";

// Nodemailer работает только в Node-рантайме (не edge)
export const runtime = "nodejs";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface MailConfig {
  transporter: Transporter;
  from: string;
  owner: string;
  isTest: boolean;
}

async function buildMailConfig(): Promise<MailConfig> {
  const host = process.env.SMTP_HOST;

  if (host) {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    return {
      transporter,
      from: process.env.MAIL_FROM ?? process.env.SMTP_USER ?? "no-reply@portfolio",
      owner: process.env.CONTACT_TO ?? process.env.SMTP_USER ?? "",
      isTest: false,
    };
  }

  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
  return {
    transporter,
    from: testAccount.user,
    owner: process.env.CONTACT_TO ?? testAccount.user,
    isTest: true,
  };
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Некорректный формат запроса" },
      { status: 400 }
    );
  }

  const errors = validateContact(body);
  if (!isValid(errors)) {
    return NextResponse.json(
      { error: "Проверьте поля формы", errors },
      { status: 400 }
    );
  }

  const data: ContactPayload = {
    name: String(body.name).trim(),
    phone: String(body.phone).trim(),
    email: String(body.email).trim(),
    comment: String(body.comment ?? "").trim(),
  };

  try {
    const { transporter, from, owner, isTest } = await buildMailConfig();

    const safe = {
      name: escapeHtml(data.name),
      phone: escapeHtml(data.phone),
      email: escapeHtml(data.email),
      comment: escapeHtml(data.comment) || "—",
    };

    const ownerMail = await transporter.sendMail({
      from: `"Форма на сайте" <${from}>`,
      to: owner,
      replyTo: data.email,
      subject: `Новая заявка с портфолио — ${data.name}`,
      text:
        `Имя: ${data.name}\n` +
        `Телефон: ${data.phone}\n` +
        `Email: ${data.email}\n\n` +
        `Комментарий:\n${data.comment || "—"}`,
      html: `
        <h2>Новая заявка с сайта</h2>
        <p><strong>Имя:</strong> ${safe.name}</p>
        <p><strong>Телефон:</strong> ${safe.phone}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Комментарий:</strong><br>${safe.comment.replace(/\n/g, "<br>")}</p>
      `,
    });

    await transporter.sendMail({
      from: `"Арина — Frontend" <${from}>`,
      to: data.email,
      subject: "Спасибо за сообщение!",
      text:
        `Здравствуйте, ${data.name}!\n\n` +
        `Спасибо за обращение — я получила ваше сообщение и отвечу в ближайшее время.\n\n` +
        `Копия вашего сообщения:\n${data.comment || "—"}\n\n` +
        `— Арина`,
      html: `
        <p>Здравствуйте, ${safe.name}!</p>
        <p>Спасибо за обращение — я получила ваше сообщение и отвечу в ближайшее время.</p>
        <p><strong>Копия вашего сообщения:</strong><br>${safe.comment.replace(/\n/g, "<br>")}</p>
        <p>— Арина</p>
      `,
    });

    const previewUrl = isTest ? nodemailer.getTestMessageUrl(ownerMail) : null;

    return NextResponse.json({
      ok: true,
      message: isTest
        ? "Сообщение обработано в тестовом режиме."
        : "Сообщение отправлено. Копия письма ушла вам на почту.",
      previewUrl: previewUrl || undefined,
    });
  } catch (err) {
    console.error("Ошибка отправки письма:", err);
    return NextResponse.json(
      { error: "Не удалось отправить письмо. Попробуйте позже." },
      { status: 502 }
    );
  }
}