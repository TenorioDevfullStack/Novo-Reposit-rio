"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Copy, Github, Linkedin, Mail, PhoneCall, Send } from "lucide-react"
import { z } from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { Panel } from "@/components/panel"
import { SectionHead } from "@/components/section-head"
import { contactInfo } from "@/lib/nav"

const contactSchema = z.object({
  name: z.string().min(2, "Digite seu nome"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "Mensagem muito curta"),
  website: z.string().optional(),
})

type ContactValues = z.infer<typeof contactSchema>

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation()
  const email = contactInfo.email
  const phoneDisplay = contactInfo.phoneDisplay
  const phoneTel = contactInfo.phoneTel

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  })

  const openMailto = (values: ContactValues) => {
    const subject = encodeURIComponent(`Contato — ${values.name}`)
    const body = encodeURIComponent(`${values.message}\n\n—\n${values.name} (${values.email})`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  const onSubmit = async (values: ContactValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string }

      if (res.ok && data?.ok) {
        toast.success("Mensagem enviada!", { description: "Se não aparecer, verifique Spam/Enviados." })
        form.reset()
        return
      }

      if (data?.error?.includes("Missing env") || data?.error === "email_not_configured") {
        toast.error("Servidor de email não configurado", {
          description: "Configure SMTP_* no deploy (ou use o fallback por email).",
        })
      } else {
        toast.error("Não consegui enviar automaticamente. Abrindo seu email…")
      }

      openMailto(values)
    } catch {
      toast.error("Falha ao enviar. Abrindo seu email…")
      openMailto(values)
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      toast.success("Email copiado", { description: email })
    } catch {
      toast.error("Não foi possível copiar o email")
    }
  }

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneDisplay)
      toast.success("Telefone copiado", { description: phoneDisplay })
    } catch {
      toast.error("Não foi possível copiar o telefone")
    }
  }

  return (
    <section ref={ref} id="contact" className="relative scroll-mt-16 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div
        className={`mx-auto max-w-5xl space-y-10 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <SectionHead
          index="06"
          label="UPLINK"
          title={
            <>
              Abrir <span className="gradient-text">canal de comunicação</span>
            </>
          }
          subtitle="Vaga, colaboração, projeto ou troca de ideias sobre dados e IA — meus canais estão abertos."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <Panel label="channels" status="online" hover>
            <div className="space-y-5">
              <div className="flex flex-col gap-3">
                <a href={`mailto:${email}`} className="term-btn group justify-start">
                  <Mail size={16} />
                  enviar_email
                  <Send size={14} className="ml-auto transition-transform group-hover:translate-x-1" />
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" className="justify-center gap-2 font-mono text-xs" onClick={copyEmail}>
                    <Copy size={14} />
                    copiar email
                  </Button>
                  <Button asChild variant="outline" className="justify-center gap-2 font-mono text-xs">
                    <a href={`tel:${phoneTel}`} aria-label={`Ligar para ${phoneDisplay}`}>
                      <PhoneCall size={14} />
                      {phoneDisplay}
                    </a>
                  </Button>
                </div>
                <Button type="button" variant="outline" className="justify-center gap-2 font-mono text-xs" onClick={copyPhone}>
                  <Copy size={14} />
                  copiar telefone
                </Button>
              </div>

              <div className="border-t border-[rgb(var(--rgb-green)/0.12)] pt-4">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">// social</p>
                <div className="flex gap-3">
                  {[
                    { name: "GitHub", href: contactInfo.github, icon: Github },
                    { name: "LinkedIn", href: contactInfo.linkedin, icon: Linkedin },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center border border-[rgb(var(--rgb-green)/0.25)] text-muted-foreground transition-colors hover:border-[rgb(var(--rgb-green)/0.55)] hover:bg-[rgb(var(--rgb-green)/0.08)] hover:text-primary"
                      aria-label={social.name}
                      title={social.name}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <Panel label="transmit ~/message" status="aberto" statusColor="cyan" hover>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="new-password"
                            tabIndex={-1}
                            placeholder="https://..."
                            data-1p-ignore="true"
                            data-lp-ignore="true"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">nome</FormLabel>
                        <FormControl>
                          <Input placeholder="seu nome" autoComplete="name" className="font-mono" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">email</FormLabel>
                        <FormControl>
                          <Input placeholder="voce@exemplo.com" autoComplete="email" className="font-mono" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">mensagem</FormLabel>
                      <FormControl>
                        <Textarea placeholder="> escreva sua mensagem..." rows={6} className="font-mono" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button type="submit" className="term-btn w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? <Spinner /> : <Send size={16} />}
                  {form.formState.isSubmitting ? "transmitindo..." : "transmitir"}
                </button>
              </form>
            </Form>
          </Panel>
        </div>
      </div>
    </section>
  )
}
