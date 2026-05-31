"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  ChevronLeft,
  ChevronRight,
  Github,
  Link as LinkIcon,
  Sparkles,
  X,
  Building2,
  Boxes,
  Globe,
  ShieldCheck,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { SectionHead } from "@/components/section-head"

type Project = {
  title: string
  category: string
  description: string
  longDescription: string
  tags: string[]
  icon: LucideIcon
  gradient: string
  highlights: string[]
  links: {
    demo?: string
    github?: string
  }
  images: string[]
}

const projects: Project[] = [
  {
    title: "AstroMonitor",
    category: "Global Solution 2026.1 — FIAP",
    description: "Plataforma de monitoramento ambiental satelital com dados, Machine Learning e visão computacional para previsão de risco de incêndios.",
    longDescription:
      "Prova de conceito desenvolvida na Global Solution da FIAP: monitoramento ambiental que cruza leituras de satélite e de sensores (BMP280) para prever risco de queimadas por região. Inclui mapa de risco interativo, predições com modelo GradientBoosting, estimativa de impacto na saúde respiratória (PM2,5 / padrão CONAMA), briefing automático para a Defesa Civil com IA, análise de imagens por visão computacional (NDVI e mapa de calor) e validação com dados reais do INPE (backtest do Pantanal 2024). Banco de dados em PostgreSQL (Supabase).",
    tags: ["Python", "Machine Learning", "Scikit-learn", "Visão Computacional", "PostgreSQL", "Supabase", "IA"],
    icon: Globe,
    gradient: "from-secondary/20 to-transparent",
    highlights: [
      "Predição de risco de incêndio com GradientBoosting",
      "Visão computacional: NDVI e mapa de calor por satélite",
      "Impacto na saúde respiratória (PM2,5 / CONAMA)",
      "Briefing automático para Defesa Civil com IA",
      "Validação com dados reais do INPE (backtest Pantanal 2024)",
    ],
    links: {
      demo: "https://astromonitor-dfjfv9n7qxdqca9v4ecrdo.streamlit.app/",
    },
    images: [
      "/imagens/astro-monitor/print-astro-monitor01.webp",
      "/imagens/astro-monitor/print-astro-monitor02.webp",
      "/imagens/astro-monitor/print-astro-monitor03.webp",
      "/imagens/astro-monitor/print-astro-monitor04.webp",
      "/imagens/astro-monitor/print-astro-monitor05.webp",
      "/imagens/astro-monitor/print-astro-monitor06.webp",
      "/imagens/astro-monitor/print-astro-monitor07.webp",
      "/imagens/astro-monitor/print-astro-monitor08.webp",
      "/imagens/astro-monitor/print-astro-monitor09.webp",
      "/imagens/astro-monitor/print-astro-monitor10.webp",
    ],
  },
  {
    title: "SafeHarvest AI",
    category: "Challenge Sompo Seguros — FIAP",
    description: "Sistema preditivo de risco operacional e ambiental para equipamentos agrícolas, desenvolvido para o Challenge Sompo Seguros.",
    longDescription:
      "Solução de dados e IA para o Challenge Sompo Seguros (FIAP 2026) que prevê riscos como atolamento, tombamento e colisão em operações agrícolas. A partir de um dataset simulado com 5.000+ registros, treina um modelo Gradient Boosting (acurácia 97,9%, F1 0,98) que gera um score de risco (0–100) e classe (Baixo a Crítico) por equipamento. Inclui API REST em Flask com autenticação JWT por perfil e dashboards distintos para Operador, Gestor de frota e Analista da Sompo.",
    tags: ["Python", "Machine Learning", "Gradient Boosting", "Scikit-learn", "Flask", "JWT", "SQL"],
    icon: ShieldCheck,
    gradient: "from-primary/20 to-transparent",
    highlights: [
      "Modelo Gradient Boosting com acurácia de 97,9%",
      "Score de risco (0–100) e classificação por equipamento",
      "API REST em Flask com autenticação JWT por perfil",
      "Dashboards por persona: Operador, Gestor e Analista Sompo",
    ],
    links: {},
    images: [
      "/imagens/safe-harvest/print-safe-harvest01.webp",
      "/imagens/safe-harvest/tela-operador.webp",
      "/imagens/safe-harvest/tela-gestor01.webp",
      "/imagens/safe-harvest/tela-gestor02.webp",
      "/imagens/safe-harvest/tela-analista-sompo01.webp",
      "/imagens/safe-harvest/tela-analista-sompo02.webp",
    ],
  },
  {
    title: "ImobAI",
    category: "Projeto de IA",
    description: "Aplicação que gera legendas de marketing automáticas a partir de fotos de imóveis usando IA Gemini.",
    longDescription:
      "O ImobAI permite subir fotos de imóveis e, com poucos dados básicos, a IA gera legendas persuasivas e otimizadas para redes sociais — explorando análise de imagem (visão computacional) e geração de texto com IA.",
    tags: ["Next.js", "Gemini AI", "TypeScript", "Tailwind CSS"],
    icon: Sparkles,
    gradient: "from-primary/20 to-transparent",
    highlights: ["Geração de legendas por IA", "Análise de imagem (visão computacional)", "Vários tons de voz selecionáveis"],
    links: {
      demo: "/imobai",
    },
    images: ["/imagens/imobai/Sem título.png"],
  },
  {
    title: "ObraGest",
    category: "Aplicação Full Stack",
    description: "Sistema para gestão de obras e projetos, com dashboards e módulos de controle de rotinas.",
    longDescription:
      "Aplicação Full Stack para organização e acompanhamento de obras, centralizando informações e fluxos. Envolve modelagem e integração de banco de dados, dashboards e áreas administrativas.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Vercel"],
    icon: Building2,
    gradient: "from-primary/20 to-transparent",
    highlights: ["Dashboard e visão geral", "Modelagem e integração de dados (PostgreSQL/Prisma)", "Configurações e áreas administrativas"],
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
    title: "StockManager",
    category: "Aplicação de dados",
    description: "Sistema de controle e gerenciamento de estoque para equipes de manutenção, com foco em organização e rastreabilidade dos dados.",
    longDescription:
      "Sistema de controle e gerenciamento de estoque voltado a equipes de manutenção. Centraliza materiais (SKU, categoria, quantidade mínima e localização), movimentações de entrada e retirada, equipe e documentos, com dashboard de métricas, alertas de estoque, relatórios e exportação em CSV.",
    tags: ["JavaScript", "Estoque", "Dashboard", "Relatórios CSV", "Rastreabilidade"],
    icon: Boxes,
    gradient: "from-accent/20 to-transparent",
    highlights: [
      "Dashboard com métricas e alertas de estoque",
      "Cadastro de materiais com SKU, categoria e localização",
      "Movimentações de entrada/retirada e gestão de equipe",
      "Relatórios e exportação de dados em CSV",
    ],
    links: {
      demo: "https://stock-manager-two-iota.vercel.app/",
    },
    images: [
      "/imagens/stock-manager/print-dashboard.webp",
      "/imagens/stock-manager/print-materiais.webp",
      "/imagens/stock-manager/print-movimentacoes.webp",
      "/imagens/stock-manager/print-equipe.webp",
      "/imagens/stock-manager/print-docs.webp",
      "/imagens/stock-manager/print-relatorios.webp",
    ],
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`Visualização ampliada das imagens do projeto ${selected.title}`}
            onClick={closeLightbox}
          >
            <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 font-mono">
                  <p className="truncate text-sm text-primary">{selected.title}</p>
                  <p className="text-xs text-muted-foreground">
                    img {Math.min(lightboxIndex + 1, lightboxImages.length)} / {lightboxImages.length}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {canNavigateLightbox ? (
                    <>
                      <Button variant="outline" className="h-8 gap-2 px-3 font-mono text-xs" onClick={prevLightbox}>
                        <ChevronLeft size={16} />
                        prev
                      </Button>
                      <Button variant="outline" className="h-8 gap-2 px-3 font-mono text-xs" onClick={nextLightbox}>
                        next
                        <ChevronRight size={16} />
                      </Button>
                    </>
                  ) : null}
                  <Button variant="outline" className="h-8 gap-2 px-3 font-mono text-xs" onClick={closeLightbox}>
                    <X size={16} />
                    esc
                  </Button>
                </div>
              </div>
              <div className="relative h-[78vh] w-full overflow-hidden border border-[rgb(var(--rgb-green)/0.3)] bg-black/40">
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
    <section ref={ref} id="projects" className="relative scroll-mt-16 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div
        className={`mx-auto max-w-6xl space-y-10 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <SectionHead
          index="03"
          label="PROC"
          title={
            <>
              Processos em <span className="gradient-text">execução</span>
            </>
          }
          subtitle={`${projects.length} projetos ativos — acadêmicos em Dados/IA e aplicações construídas na prática. Selecione um processo para inspecionar.`}
        />

        {/* process list header */}
        <div className="hidden grid-cols-[3rem_1fr_8rem] gap-4 border-b border-[rgb(var(--rgb-green)/0.18)] px-1 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:grid">
          <span>pid</span>
          <span>módulo</span>
          <span className="text-right">status</span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project, idx) => {
            const Icon = project.icon
            const featured = idx === 0
            return (
              <button
                key={project.title}
                type="button"
                onClick={() => openProject(idx)}
                className={`panel panel-hover corner-ticks group flex flex-col rounded-sm text-left transition-all duration-500 ${
                  featured ? "md:col-span-2" : ""
                } ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                style={{ transitionDelay: isVisible ? `${idx * 80}ms` : "0ms" }}
              >
                {/* title bar */}
                <div className="flex items-center justify-between gap-3 border-b border-[rgb(var(--rgb-green)/0.15)] bg-[rgb(var(--rgb-green)/0.04)] px-3 py-2 font-mono text-[11px]">
                  <span className="flex items-center gap-2 truncate text-muted-foreground">
                    <span className="text-primary">pid:{idx.toString().padStart(2, "0")}</span>
                    <span className="truncate uppercase tracking-[0.14em]">{project.category}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 uppercase tracking-[0.16em] text-primary">
                    <span className="led" />
                    run
                  </span>
                </div>

                <div className={`flex flex-1 gap-5 p-5 ${featured ? "flex-col lg:flex-row lg:p-6" : "flex-col"}`}>
                  <div
                    className={`relative shrink-0 overflow-hidden border border-[rgb(var(--rgb-green)/0.15)] bg-black/30 ${
                      featured ? "lg:w-1/2" : ""
                    }`}
                  >
                    <AspectRatio ratio={16 / 9}>
                      {project.images.length > 0 ? (
                        <Image
                          src={project.images[0]}
                          alt={`Preview do projeto ${project.title}`}
                          fill
                          sizes={featured ? "(min-width:1024px) 40vw, 100vw" : "(min-width:768px) 45vw, 100vw"}
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          priority={idx === 0}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Icon className="h-12 w-12 text-primary/60" />
                        </div>
                      )}
                      <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgb(0_0_0/0.5))]" />
                    </AspectRatio>
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center gap-2">
                      <Icon size={18} className="text-primary" />
                      <h3 className="font-sans text-lg font-bold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                        {project.title}
                      </h3>
                    </div>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">{project.description}</p>

                    {featured && (
                      <ul className="mt-3 space-y-1.5 font-mono text-[11px] text-muted-foreground">
                        {project.highlights.slice(0, 3).map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-primary">›</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                      {project.tags.slice(0, featured ? 7 : 4).map((tag) => (
                        <span
                          key={tag}
                          className="border border-[rgb(var(--rgb-green)/0.18)] bg-black/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground transition-colors group-hover:border-[rgb(var(--rgb-green)/0.4)] group-hover:text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-primary">
                      › inspecionar_processo
                    </p>
                  </div>
                </div>
              </button>
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
        <DialogContent className="w-[95vw] max-h-[90svh] overflow-y-auto overflow-x-hidden rounded-sm border-[rgb(var(--rgb-green)/0.3)] bg-card p-0 sm:max-w-3xl">
          {selected ? (
            <div className="grid lg:grid-cols-2">
              <div className="bg-black/30 p-5 lg:p-6">
                {selected.images.length > 0 ? (
                  <>
                    <Carousel opts={{ loop: true }} className="w-full">
                      <CarouselContent>
                        {selected.images.map((src, i) => (
                          <CarouselItem key={`${src}-${i}`}>
                            <button
                              type="button"
                              className="group/image w-full text-left"
                              onClick={() => openLightbox(i)}
                              aria-label={`Ampliar imagem ${i + 1} do projeto ${selected.title}`}
                            >
                              <AspectRatio
                                ratio={16 / 9}
                                className="cursor-zoom-in overflow-hidden border border-[rgb(var(--rgb-green)/0.2)]"
                              >
                                <Image
                                  src={src}
                                  alt={selected.title}
                                  fill
                                  sizes="(min-width: 1024px) 50vw, 100vw"
                                  className="object-cover transition-transform duration-300 group-hover/image:scale-[1.02]"
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
                    <p className="flex items-center gap-2 pt-3 font-mono text-[11px] text-muted-foreground">
                      <span className="text-primary">›</span> clique na imagem para ampliar
                    </p>
                  </>
                ) : (
                  <AspectRatio ratio={16 / 9} className="overflow-hidden border border-[rgb(var(--rgb-green)/0.2)]">
                    <div className="flex h-full w-full items-center justify-center bg-black/30">
                      <selected.icon className="h-16 w-16 text-primary/60" />
                    </div>
                  </AspectRatio>
                )}
              </div>

              <div className="space-y-6 p-5 lg:p-6">
                <DialogHeader>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">{selected.category}</p>
                  <DialogTitle className="font-sans text-2xl">{selected.title}</DialogTitle>
                  <DialogDescription className="font-mono text-sm leading-relaxed text-muted-foreground">
                    {selected.longDescription}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[rgb(var(--rgb-green)/0.2)] bg-black/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-secondary">// destaques</h4>
                  <ul className="space-y-1.5 font-mono text-xs text-muted-foreground">
                    {selected.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-primary">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  {selected.links.demo ? (
                    <Button asChild className="gap-2 font-mono text-xs">
                      <a href={selected.links.demo} target="_blank" rel="noopener noreferrer">
                        <LinkIcon size={15} />
                        abrir_demo
                      </a>
                    </Button>
                  ) : null}
                  {selected.links.github ? (
                    <Button variant="outline" asChild className="gap-2 font-mono text-xs">
                      <a href={selected.links.github} target="_blank" rel="noopener noreferrer">
                        <Github size={15} />
                        ver_código
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
