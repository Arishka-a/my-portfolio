import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface AssistBody {
  draft?: string;
  name?: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        demo: true,
        error: "AI-помощник в демо-режиме: API-ключ не подключён.",
      },
      { status: 200 }
    );
  }

  let body: AssistBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const draft = (body.draft ?? "").trim().slice(0, 800);
  const name = (body.name ?? "").trim().slice(0, 80);

  if (draft.length < 3) {
    return NextResponse.json(
      { error: "Слишком короткий черновик для обработки" },
      { status: 400 }
    );
  }

  const baseUrl = process.env.AI_BASE_URL ?? "https://api.openai.com/v1";
  const model = process.env.AI_MODEL ?? "gpt-4o-mini";

  const systemPrompt =
    "Ты помогаешь посетителю сайта-портфолио сформулировать вежливое деловое сообщение " +
    "разработчику через форму обратной связи. На основе черновика напиши аккуратный, " +
    "понятный текст на русском языке от первого лица. Сохрани смысл и факты, не придумывай " +
    "детали. Длина — 2–4 предложения. Без приветствий-шаблонов вроде «Уважаемый», без подписи. " +
    "Верни только готовый текст сообщения, без пояснений и кавычек.";

  const userPrompt =
    (name ? `Имя отправителя: ${name}.\n` : "") +
    `Черновик сообщения: """${draft}"""`;

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.6,
        max_tokens: 250,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("AI API error:", res.status, detail);
      return NextResponse.json(
        { error: "AI-сервис вернул ошибку. Попробуйте позже." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const text: string | undefined = data?.choices?.[0]?.message?.content?.trim();

    if (!text) {
      return NextResponse.json({ error: "Пустой ответ от AI" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, text });
  } catch (err) {
    console.error("AI request failed:", err);
    return NextResponse.json(
      { error: "Не удалось связаться с AI-сервисом." },
      { status: 502 }
    );
  }
}