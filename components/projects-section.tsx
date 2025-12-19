"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Code2,
  Github,
  Link as LinkIcon,
  Languages,
  Sparkles,
  X,
  Zap,
  Brain,
  Building2,
} from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"

import { Tilt } from "@/components/tilt"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const projects = [
  {
    title: "ObraGest",
    description: "Sistema para gestão de obras, projetos e organização de rotinas, com dashboards e módulos de controle.",
    longDescription:
      "Aplicação voltada para organização e acompanhamento de obras, centralizando informações e fluxos em uma experiência simples e objetiva.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Vercel"],
    icon: Building2,
    gradient: "from-primary/20 to-transparent",
    highlights: ["Dashboard e visão geral", "Módulos de projetos e organização", "Configurações e áreas administrativas"],
    links: {
      demo: "https://obragest.online",
    },
    images: [
      "/imagens/obragest/dashboard.png",
      "/imagens/obragest/projetos.png",
      "/imagens/obragest/organizacao.png",
      "/imagens/obragest/orcamentos.png",
      "/imagens/obragest/financas.png",
      "/imagens/obragest/config.png",
    ],
  },
  {
    title: "Landing Page — Professora de Espanhol",
    description: "Landing page para apresentação de serviços, dúvidas frequentes e chamada para contato.",
    longDescription:
      "Uma landing page moderna e responsiva para uma professora de espanhol, com seções objetivas para apresentar proposta, prova/aula, feedbacks e FAQ.",
    tags: ["Landing Page", "Responsivo", "Vercel"],
    icon: Languages,
    gradient: "from-accent/20 to-transparent",
    highlights: ["Seção hero com CTA", "FAQ e feedbacks", "Seção de prova/aula"],
    links: {
      demo: "https://landing-page-raquel-espanhol.vercel.app/#topo",
    },
    images: ["/imagens/raquel/hero.png", "/imagens/raquel/prova.png", "/imagens/raquel/feedback.png", "/imagens/raquel/faq.png"],
  },
  {
    title: "Assistente IA para E-commerce",
    description:
      "Plataforma de e-commerce com assistente AI que recomenda produtos e responde dúvidas de clientes em tempo real.",
    longDescription:
      "Um assistente de compras com IA generativa integrado ao catálogo, histórico e comportamento do usuário — pensado para reduzir atrito no funil e aumentar conversão.",
    tags: ["Next.js", "OpenAI", "PostgreSQL", "TypeScript"],
    icon: Brain,
    gradient: "from-primary/20 to-transparent",
    highlights: ["Chat com contexto + memória", "Recomendações personalizadas", "Painel com métricas e FAQs"],
    links: {
      demo: "https://example.com",
      github: "https://github.com",
    },
    images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
  },
  {
    title: "App Mobile de Análise de Dados",
    description:
      "Aplicativo mobile que analisa dados em tempo real com visualizações interativas e insights powered by IA.",
    longDescription:
      "Um app com dashboards e alertas em tempo real, unindo análises estatísticas e insights automatizados para tomada de decisão rápida em dispositivos móveis.",
    tags: ["React Native", "Node.js", "TensorFlow", "Firebase"],
    icon: Zap,
    gradient: "from-accent/20 to-transparent",
    highlights: ["Streaming de eventos", "Visualizações interativas", "Insights e alertas por IA"],
    links: {
      demo: "https://example.com",
      github: "https://github.com",
    },
    images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
  },
  {
    title: "Dashboard de Automação",
    description:
      "Sistema de automação inteligente para processos empresariais com IA generativa e orquestração de workflows.",
    longDescription:
      "Automação de rotinas com orquestração, logs e observabilidade. Projetado para escalar e integrar múltiplos serviços com segurança e controle de permissões.",
    tags: ["React", "Python", "IA Generativa", "Microserviços"],
    icon: Code2,
    gradient: "from-secondary/20 to-transparent",
    highlights: ["Workflows com passos reutilizáveis", "Observabilidade e trilha de auditoria", "Integrações e webhooks"],
    links: {
      demo: "https://example.com",
      github: "https://github.com",
    },
    images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
  },
]

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  const selected = selectedIndex != null ? projects[selectedIndex] : null
  const lightboxImages = useMemo(() => selected?.images ?? [], [selected])

  useEffect(() => setMounted(true), [])

  const openProject = (idx: number) => {
    setSelectedIndex(idx)
    setLightboxOpen(false)
    setLightboxIndex(0)
    setOpen(true)
  }

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx)
    setLightboxOpen(true)
    setOpen(false)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setOpen(true)
  }

  const canNavigateLightbox = lightboxImages.length > 1
  const nextLightbox = () => {
    if (!canNavigateLightbox) return
    setLightboxIndex((i) => (i + 1) % lightboxImages.length)
  }
  const prevLightbox = () => {
    if (!canNavigateLightbox) return
    setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length)
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const imagesLength = lightboxImages.length
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox()
        return
      }
      if (imagesLength <= 1) return
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % imagesLength)
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + imagesLength) % imagesLength)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [lightboxOpen, lightboxImages.length])

  useEffect(() => {
    if (!lightboxOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [lightboxOpen])

  const lightbox =
    mounted && lightboxOpen && selected
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`Visualização ampliada das imagens do projeto ${selected.title}`}
            onClick={closeLightbox}
          >
            <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground truncate">{selected.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Imagem {Math.min(lightboxIndex + 1, lightboxImages.length)} de {lightboxImages.length}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {canNavigateLightbox ? (
                    <>
                      <Button
                        variant="outline"
                        className="gap-2 bg-background/30 hover:bg-background/40 h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
                        onClick={prevLightbox}
                      >
                        <ChevronLeft size={16} />
                        Anterior
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-2 bg-background/30 hover:bg-background/40 h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
                        onClick={nextLightbox}
                      >
                        Próxima
                        <ChevronRight size={16} />
                      </Button>
                    </>
                  ) : null}
                  <Button
                    variant="outline"
                    className="gap-2 bg-background/30 hover:bg-background/40 h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
                    onClick={closeLightbox}
                  >
                    <X size={16} />
                    Fechar
                  </Button>
                </div>
              </div>

              <div className="relative w-full h-[78vh] rounded-xl overflow-hidden border border-white/10 bg-black/30">
                <Image
                  src={lightboxImages[lightboxIndex] ?? selected.images[0]}
                  alt={`${selected.title} — imagem ${lightboxIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <section ref={ref} id="projects" className="lg:min-h-screen flex items-center justify-center px-5 sm:px-6 lg:px-8 py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[520px] bg-primary/15 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -left-24 h-[460px] w-[460px] bg-accent/10 blur-3xl rounded-full" />
        <div className="absolute top-32 -right-24 h-[420px] w-[420px] bg-secondary/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl w-full space-y-14 relative z-10">
        <div
          className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono border border-primary/20">
                <Sparkles size={14} className="text-primary/80" />
                Projetos selecionados
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-balance">
                Projetos em <span className="gradient-text">Destaque</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Uma seleção de projetos que mostram minha evolução como desenvolvedor. Clique em um card para ver detalhes e imagens.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-muted/30 text-muted-foreground backdrop-blur">
                {projects.length} projetos
              </span>
              <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/15 text-primary backdrop-blur">
                Full Stack
              </span>
            </div>
          </div>

          <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-accent rounded-full mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, idx) => {
            const Icon = project.icon
            const isFeatured = idx === 0
            return (
              <Tilt
                key={idx}
                className={`group relative h-full cursor-pointer transition-all duration-700 ${
                  isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                } ${isFeatured ? "md:col-span-2 lg:col-span-2" : ""}`}
                style={{ transitionDelay: isVisible ? `${idx * 100}ms` : "0ms" }}
                role="button"
                tabIndex={0}
                onClick={() => openProject(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    openProject(idx)
                  }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl group-hover:border-primary/50 transition-all duration-300 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div className="absolute -right-16 -top-16 h-40 w-40 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="relative z-10 p-6 sm:p-7 lg:p-8 flex flex-col h-full backdrop-blur-sm">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-3.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/5 group-hover:shadow-primary/20">
                        <Icon className="text-primary w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        {isFeatured ? (
                          <span className="inline-flex items-center gap-2 text-[11px] font-mono text-primary/80">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            Destaque
                          </span>
                        ) : null}
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-primary opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300"
                    />
                  </div>

                  <div className={`relative rounded-xl overflow-hidden border border-border/50 bg-black/20 ${isFeatured ? "" : "mb-5"}`}>
                    <AspectRatio ratio={16 / 9} className="overflow-hidden">
                      <Image
                        src={project.images[0]}
                        alt={`Preview do projeto ${project.title}`}
                        fill
                        sizes={isFeatured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        priority={idx === 0}
                      />
                    </AspectRatio>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-70" />
                  </div>

                  <div className="flex-1">
                    <p className={`text-muted-foreground leading-relaxed ${isFeatured ? "pt-5" : ""}`}>{project.description}</p>
                    {isFeatured ? (
                      <ul className="pt-5 space-y-2 text-sm text-muted-foreground">
                        {project.highlights.slice(0, 3).map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/80 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-muted/30 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300 backdrop-blur"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 flex items-center gap-2 text-xs text-muted-foreground">
                    <Sparkles size={14} className="text-primary/70" />
                    <span className="group-hover:text-foreground transition-colors">Clique para ver detalhes</span>
                  </div>
                </div>
              </Tilt>
            )
          })}
        </div>
      </div>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) {
            setLightboxOpen(false)
            setSelectedIndex(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-3xl p-0 max-h-[90svh] overflow-y-auto overflow-x-hidden">
          {selected ? (
            <div className="grid lg:grid-cols-2">
              <div className="p-6 lg:p-8 bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
                <Carousel opts={{ loop: true }} className="w-full">
                  <CarouselContent>
                    {selected.images.map((src, i) => (
                      <CarouselItem key={`${src}-${i}`}>
                        <button
                          type="button"
                          className="w-full text-left group/image"
                          onClick={() => openLightbox(i)}
                          aria-label={`Ampliar imagem ${i + 1} do projeto ${selected.title}`}
                        >
                          <AspectRatio
                            ratio={16 / 9}
                            className="overflow-hidden rounded-xl border border-border/50 cursor-zoom-in"
                          >
                            <Image
                              src={src}
                              alt={selected.title}
                              fill
                              sizes="(min-width: 1024px) 50vw, 100vw"
                              className="object-cover group-hover/image:scale-[1.02] transition-transform duration-300"
                              priority={i === 0}
                            />
                          </AspectRatio>
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 -translate-y-1/2" />
                  <CarouselNext className="right-2 -translate-y-1/2" />
                </Carousel>
                <p className="pt-3 text-xs text-muted-foreground flex items-center gap-2">
                  <Sparkles size={14} className="text-primary/70" />
                  Clique na imagem para ampliar
                </p>
              </div>

              <div className="p-6 lg:p-8 space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selected.title}</DialogTitle>
                  <DialogDescription className="text-base leading-relaxed">{selected.longDescription}</DialogDescription>
                </DialogHeader>

                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-muted/40 text-muted-foreground hover:bg-primary/15 hover:text-primary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Destaques</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {selected.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/80" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {selected.links.demo ? (
                    <Button asChild className="gap-2">
                      <a href={selected.links.demo} target="_blank" rel="noopener noreferrer">
                        <LinkIcon size={16} />
                        Abrir demo
                      </a>
                    </Button>
                  ) : null}
                  {selected.links.github ? (
                    <Button variant="outline" asChild className="gap-2">
                      <a href={selected.links.github} target="_blank" rel="noopener noreferrer">
                        <Github size={16} />
                        Ver código
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
      {lightbox}
    </section>
  )
}
