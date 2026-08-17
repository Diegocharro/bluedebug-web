import { NextResponse } from "next/server";
import { site } from "@/lib/site-config";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  area?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Payload | null;

  if (!body?.name?.trim() || !body.email?.trim() || !EMAIL_RE.test(body.email)) {
    return NextResponse.json(
      { ok: false, error: "Faltan datos obligatorios." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? site.email;

  // Sin clave configurada no hay envío posible: se devuelve un error honesto
  // en lugar de fingir que el mensaje ha salido.
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "unconfigured" },
      { status: 503 },
    );
  }

  const lines = [
    `Nombre: ${body.name}`,
    `Email: ${body.email}`,
    `Empresa: ${body.company || "—"}`,
    `Área: ${body.area || "—"}`,
    "",
    body.message || "(sin mensaje)",
  ];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Bluedebug <web@bluedebug.com>",
      to: [to],
      reply_to: body.email,
      subject: `Nueva consulta de ${body.name}`,
      text: lines.join("\n"),
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar el mensaje." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
