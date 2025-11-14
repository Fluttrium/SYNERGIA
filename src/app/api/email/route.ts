import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export const runtime = "nodejs";

const REQUIRED_ENV_VARS = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "EMAIL_FROM",
  "EMAIL_TO",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  resettlement: "Переселение",
  legal_support: "Правовая поддержка",
  money_transfer: "Поддержка перевода денежных средств",
  other: "Другое",
};

function ensureEnv() {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Отсутствуют переменные окружения: ${missing.join(", ")}`);
  }
}

function parseRecipients(value?: string | null) {
  return value
    ?.split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean);
}

export async function POST(request: NextRequest) {
  try {
    ensureEnv();

    const formData = await request.formData();

    const category = formData.get("category")?.toString().trim();
    const fullName = formData.get("fullName")?.toString().trim();
    const organization = formData.get("organization")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!category || !fullName || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Заполните обязательные поля формы" },
        { status: 400 }
      );
    }

    const attachmentEntries = formData
      .getAll("attachments")
      .filter(
        (value): value is File =>
          value instanceof File && typeof value.name === "string" && value.size > 0
      );

    const attachments = await Promise.all(
      attachmentEntries.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type || "application/octet-stream",
      }))
    );

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = parseRecipients(process.env.EMAIL_TO);
    const cc = parseRecipients(process.env.EMAIL_CC);
    const bcc = parseRecipients(process.env.EMAIL_BCC);

    if (!to?.length) {
      throw new Error("Не указан получатель (EMAIL_TO)");
    }

    const readableCategory = CATEGORY_LABELS[category] ?? category;
    const subject = `Новое обращение: ${readableCategory}`;
    const plainText = [
      `Категория: ${readableCategory}`,
      `ФИО: ${fullName}`,
      organization ? `Организация: ${organization}` : null,
      `Email: ${email}`,
      `Телефон: ${phone}`,
      "",
      `Сообщение:`,
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const htmlBody = `
      <p><strong>Категория:</strong> ${readableCategory}</p>
      <p><strong>ФИО:</strong> ${fullName}</p>
      ${organization ? `<p><strong>Организация:</strong> ${organization}</p>` : ""}
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Сообщение:</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;

    const mailOptions: Mail.Options = {
      from: process.env.EMAIL_FROM,
      to,
      cc: cc && cc.length ? cc : undefined,
      bcc: bcc && bcc.length ? bcc : undefined,
      subject,
      text: plainText,
      html: htmlBody,
      attachments: attachments.length ? attachments : undefined,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Обращение отправлено" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { error: "Не удалось отправить обращение" },
      { status: 500 }
    );
  }
}
