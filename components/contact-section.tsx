"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Github, Linkedin, Send, Copy, Sparkles, PhoneCall } from "lucide-react"
import { useState } from "react"
import { z } from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"

const contactSchema = z.object({
  name: z.string().min(2, "Digite seu nome"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "Mensagem muito curta"),
  website: z.string().optional(),
})

type ContactValues = z.infer<typeof contactSchema>

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [hovered, setHovered] = useState<string | null>(null)
  const email = "intelligentdevsolutions@gmail.com"
  const phoneDisplay = "11 98943-7498"
  const phoneTel = "+5511989437498"

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
    <section ref={ref} id="contact" className="min-h-screen flex items-center justify-center px-6 lg:px-8 py-24">
      <div className="max-w-5xl w-full space-y-12">
        <div
          className={`space-y-4 transition-all duration-700 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Vamos Conversar</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto text-balance leading-relaxed">
            Estou sempre aberto para novas oportunidades, colaborações ou simplesmente uma conversa sobre tecnologia e
            IA. Sinta-se à vontade para entrar em contato.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          <div
            className={`card-interactive p-8 space-y-6 transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Contato rápido</h3>
              <p className="text-sm text-muted-foreground">Escolha um canal ou mande uma mensagem pelo formulário.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02] text-sm group"
              >
                <Mail size={18} />
                Enviar Email
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <Button type="button" variant="outline" className="gap-2" onClick={copyEmail}>
                <Copy size={16} />
                Copiar email
              </Button>

              <Button asChild variant="outline" className="gap-2">
                <a href={`tel:${phoneTel}`} aria-label={`Ligar para ${phoneDisplay}`}>
                  <PhoneCall size={16} />
                  {phoneDisplay}
                </a>
              </Button>

              <Button type="button" variant="outline" className="gap-2" onClick={copyPhone}>
                <Copy size={16} />
                Copiar telefone
              </Button>
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Sparkles size={14} className="text-primary/70" />
                <span>Links sociais</span>
              </div>

              <div className="flex gap-4">
                {[
                  { name: "GitHub", href: "https://github.com/TenorioDevfullStack", icon: Github },
                  { name: "LinkedIn", href: "https://www.linkedin.com/in/leandro-ten%C3%B3rio-088378310/", icon: Linkedin },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHovered(social.name)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative group"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <div
                      className={`p-3 rounded-lg border border-border transition-all duration-300 ${
                        hovered === social.name
                          ? "bg-primary/15 border-primary/50 scale-110 shadow-lg shadow-primary/15"
                          : "hover:border-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      <social.icon
                        size={22}
                        className={`transition-all duration-300 ${
                          hovered === social.name ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`card-interactive p-8 transition-all duration-700 delay-150 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="space-y-2 mb-6">
              <h3 className="text-lg font-semibold">Enviar mensagem</h3>
              <p className="text-sm text-muted-foreground">Eu respondo assim que possível.</p>
            </div>

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

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" autoComplete="name" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="voce@exemplo.com" autoComplete="email" {...field} />
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
                      <FormLabel>Mensagem</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Conte um pouco sobre sua ideia…" rows={6} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full gap-2" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? <Spinner /> : <Send size={16} />}
                  {form.formState.isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <p
          className={`text-xs text-muted-foreground pt-12 text-center transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          © 2025 Leandro Tenório. Desenvolvido com React, Next.js e muito ☕
        </p>
      </div>
    </section>
  )
}
