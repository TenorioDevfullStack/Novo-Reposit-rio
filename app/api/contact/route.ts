import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

export const runtime = "nodejs"

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  message: z.string().min(10).max(4000),
  website: z.string().optional(),
})

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5

const rateLimit = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown"
  return request.headers.get("x-real-ip") ?? "unknown"
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function requireEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing env: ${name}`)
  return value
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const now = Date.now()

  const current = rateLimit.get(ip)
  if (!current || now > current.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
  } else {
    current.count += 1
    if (current.count > RATE_LIMIT_MAX) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 })
    }
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 })
  }

  const { name, email, message, website } = parsed.data
  const honeypot = Boolean(website?.trim())

  let transporter: nodemailer.Transporter
  try {
    const host = requireEnv("SMTP_HOST")
    const port = Number(process.env.SMTP_PORT ?? 465)
    const user = requireEnv("SMTP_USER")
    const pass = requireEnv("SMTP_PASS")

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })
  } catch (err) {
    const reason = err instanceof Error ? err.message : "email_not_configured"
    return NextResponse.json({ ok: false, error: reason }, { status: 501 })
  }

  const to = process.env.CONTACT_TO ?? process.env.SMTP_USER
  const from = process.env.CONTACT_FROM ?? process.env.SMTP_USER

  if (!to || !from) {
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 501 })
  }

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message)

  try {
    const info = await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `${honeypot ? "[Possível bot] " : ""}Contato do portfólio — ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\n${message}\n`,
      html: `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
          <h2 style="margin:0 0 12px;">Novo contato pelo portfólio</h2>
          <p style="margin:0 0 6px;"><strong>Nome:</strong> ${safeName}</p>
          <p style="margin:0 0 16px;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          ${
            honeypot
              ? `<p style="margin:0 0 16px; color: rgba(0,0,0,0.65)"><strong>Honeypot:</strong> preenchido (${escapeHtml(
                  website ?? "",
                )})</p>`
              : ""
          }
          <div style="padding:12px 14px; border:1px solid rgba(0,0,0,0.08); border-radius:12px;">
            <pre style="margin:0; white-space:pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">${safeMessage}</pre>
          </div>
        </div>
      `,
    })

    const accepted = Array.isArray(info.accepted) ? info.accepted.length : 0
    const rejected = Array.isArray(info.rejected) ? info.rejected.length : 0

    if (process.env.CONTACT_DEBUG === "1") {
      return NextResponse.json({
        ok: accepted > 0 && rejected === 0,
        debug: {
          messageId: info.messageId,
          accepted: info.accepted,
          rejected: info.rejected,
          response: info.response,
          honeypot,
        },
      })
    }

    if (accepted === 0 || rejected > 0) {
      return NextResponse.json({ ok: false, error: "not_accepted" }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 })
  }
}
